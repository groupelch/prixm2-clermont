import { readFile, writeFile } from 'fs/promises';

export async function applyFixes(page, auditResult, dupResult, root, config, toValidate) {
  const applied = [];
  const blocked = [];

  if (!config.allowContentRewrite && !config.allowMetaRewrite) {
    return { applied, toValidate: blocked };
  }

  let content = await readFile(page.filePath, 'utf-8');
  let modified = false;

  const allIssues = [
    ...auditResult.issues,
    ...(dupResult?.issues || [])
  ];

  for (const issue of allIssues) {
    if (issue.fix !== 'auto') {
      blocked.push({ page: page.relativePath, action: issue.message, reason: 'Nécessite validation humaine', issue });
      continue;
    }

    try {
      const result = await fixIssue(content, issue, page, auditResult, config);
      if (result.changed) {
        content = result.content;
        modified = true;
        applied.push({
          page: page.relativePath,
          type: issue.type,
          description: issue.message,
          fix: result.description
        });
      }
    } catch (err) {
      blocked.push({ page: page.relativePath, action: issue.message, reason: `Erreur: ${err.message}`, issue });
    }
  }

  if (modified) {
    await writeFile(page.filePath, content, 'utf-8');
  }

  return { applied, toValidate: blocked };
}

async function fixIssue(content, issue, page, auditResult, config) {
  switch (issue.type) {
    case 'missing_title':
    case 'title_too_long':
    case 'title_too_short':
      if (!config.allowMetaRewrite) return { changed: false };
      return fixTitle(content, issue, page, auditResult);

    case 'missing_description':
    case 'description_too_long':
    case 'description_too_short':
      if (!config.allowMetaRewrite) return { changed: false };
      return fixDescription(content, issue, page, auditResult);

    case 'missing_h1':
      if (!config.allowContentRewrite) return { changed: false };
      return fixMissingH1(content, page, auditResult);

    case 'images_no_alt':
    case 'images_empty_alt':
      return fixImageAlts(content, page);

    case 'generic_content':
      if (!config.allowContentRewrite) return { changed: false };
      return fixGenericContent(content, page);

    case 'duplicate_title':
      if (!config.allowMetaRewrite) return { changed: false };
      return fixDuplicateTitle(content, page, auditResult);

    case 'duplicate_description':
      if (!config.allowMetaRewrite) return { changed: false };
      return fixDuplicateDescription(content, page, auditResult);

    default:
      return { changed: false };
  }
}

function fixTitle(content, issue, page, auditResult) {
  const route = page.routePath || '';
  const city = extractCityFromRoute(route);
  const service = extractServiceFromRoute(route);
  const keyword = [service, city].filter(Boolean).join(' à ') || 'devis travaux';

  let newTitle = '';
  if (city && service) {
    newTitle = `${capitalize(service)} à ${capitalize(city)} — Prix & Devis Gratuit`;
  } else if (city) {
    newTitle = `Devis Travaux à ${capitalize(city)} — Comparer les Prix`;
  } else if (service) {
    newTitle = `${capitalize(service)} — Comparer les Devis en Ligne`;
  } else {
    newTitle = `Devis Travaux Gratuit — Comparez les Artisans`;
  }

  newTitle = newTitle.slice(0, 60);

  // Replace in Next.js metadata
  const metaReplaced = content.replace(
    /(export\s+const\s+metadata[^=]*=\s*\{[^}]*title\s*:\s*)[`"'][^`"']*[`"']/s,
    `$1"${newTitle}"`
  );
  if (metaReplaced !== content) {
    return { changed: true, content: metaReplaced, description: `Title mis à jour: "${newTitle}"` };
  }

  // Add metadata if missing
  if (!content.includes('export const metadata') && !content.includes('generateMetadata')) {
    const metaBlock = `\nexport const metadata = {\n  title: "${newTitle}",\n  description: "",\n};\n\n`;
    const newContent = metaBlock + content;
    return { changed: true, content: newContent, description: `Metadata ajoutée avec title: "${newTitle}"` };
  }

  return { changed: false };
}

function fixDescription(content, issue, page, auditResult) {
  const route = page.routePath || '';
  const city = extractCityFromRoute(route);
  const service = extractServiceFromRoute(route);

  let newDesc = '';
  if (city && service) {
    newDesc = `Comparez les devis de ${service} à ${city}. Obtenez 3 devis gratuits d'artisans locaux qualifiés. Réponse rapide sous 24h.`;
  } else if (city) {
    newDesc = `Obtenez des devis travaux gratuits à ${city}. Comparez les prix des artisans qualifiés de votre région en quelques minutes.`;
  } else if (service) {
    newDesc = `Comparez les devis de ${service} partout en France. Artisans qualifiés, prix transparents, devis gratuit en 2 minutes.`;
  } else {
    newDesc = `Comparez les devis travaux gratuits en France. Artisans certifiés, prix transparents et réponse rapide sous 24h.`;
  }

  newDesc = newDesc.slice(0, 158);

  // Replace description in metadata
  const replaced = content.replace(
    /(description\s*:\s*)[`"'][^`"']*[`"']/,
    `$1"${newDesc}"`
  );
  if (replaced !== content) {
    return { changed: true, content: replaced, description: `Description mise à jour (${newDesc.length} chars)` };
  }

  // Add to existing metadata block
  if (content.includes('export const metadata')) {
    const withDesc = content.replace(
      /(export\s+const\s+metadata[^=]*=\s*\{)/,
      `$1\n  description: "${newDesc}",`
    );
    if (withDesc !== content) {
      return { changed: true, content: withDesc, description: `Description ajoutée dans metadata` };
    }
  }

  return { changed: false };
}

function fixMissingH1(content, page, auditResult) {
  const route = page.routePath || '';
  const city = extractCityFromRoute(route);
  const service = extractServiceFromRoute(route);

  let h1 = '';
  if (city && service) h1 = `${capitalize(service)} à ${capitalize(city)}`;
  else if (city) h1 = `Devis Travaux à ${capitalize(city)}`;
  else if (service) h1 = capitalize(service);
  else return { changed: false };

  // Find first JSX return and add h1
  const replaced = content.replace(
    /(<(?:main|section|div)[^>]*>)/,
    `$1\n      <h1>${h1}</h1>`
  );
  if (replaced !== content) {
    return { changed: true, content: replaced, description: `H1 ajouté: "${h1}"` };
  }
  return { changed: false };
}

function fixImageAlts(content, page) {
  const route = page.routePath || '';
  const context = extractServiceFromRoute(route) || 'travaux';

  let changed = false;
  let newContent = content;
  let count = 0;

  // Fix images without alt
  newContent = newContent.replace(/<(img|Image)([^>]*?)(?<!\balt\s*=\s*["`'][^"`']*["`'])(\s*\/?>)/gi, (match, tag, attrs, close) => {
    if (attrs.includes('alt=')) return match;
    count++;
    changed = true;
    return `<${tag}${attrs} alt="${capitalize(context)} - illustration ${count}"${close}`;
  });

  // Fix empty alts
  newContent = newContent.replace(/alt\s*=\s*["`']\s*["`']/gi, `alt="${capitalize(context)}"`);
  if (newContent !== content) changed = true;

  return changed
    ? { changed: true, content: newContent, description: `${count} attribut(s) alt ajouté(s)` }
    : { changed: false };
}

function fixGenericContent(content, page) {
  const replacements = [
    [
      /nous intervenons à ([^,\.]+) pour vous accompagner dans vos projets[^\.]*\./gi,
      (_, city) => `À ${city.trim()}, les chantiers de rénovation présentent des spécificités liées au bâti local. Notre réseau d'artisans connaît parfaitement le tissu urbain et les contraintes techniques de la zone.`
    ],
    [
      /n'hésitez pas à nous contacter[^\.]*\./gi,
      () => `Obtenez votre devis en 2 minutes — réponse sous 24h.`
    ],
    [
      /notre équipe d'experts[^\.]*\./gi,
      () => `Nos artisans sélectionnés interviennent dans des délais précis et communiquent sur l'avancement.`
    ],
    [
      /nous sommes à votre disposition[^\.]*\./gi,
      () => `Devis gratuit, sans engagement, sous 24h.`
    ]
  ];

  let newContent = content;
  let count = 0;
  for (const [pattern, replacement] of replacements) {
    const before = newContent;
    newContent = newContent.replace(pattern, replacement);
    if (newContent !== before) count++;
  }

  return count > 0
    ? { changed: true, content: newContent, description: `${count} formule(s) générique(s) remplacée(s)` }
    : { changed: false };
}

function fixDuplicateTitle(content, page, auditResult) {
  const route = page.routePath || '';
  const city = extractCityFromRoute(route);
  const service = extractServiceFromRoute(route);
  const suffix = city ? ` à ${capitalize(city)}` : service ? ` — ${capitalize(service)}` : ` — Devis Gratuit`;

  const replaced = content.replace(
    /(title\s*:\s*)[`"']([^`"']+)[`"']/,
    (_, prefix, title) => `${prefix}"${title.replace(/ — .*$/, '')}${suffix}"`
  );
  return replaced !== content
    ? { changed: true, content: replaced, description: `Title différencié avec suffix "${suffix}"` }
    : { changed: false };
}

function fixDuplicateDescription(content, page, auditResult) {
  const route = page.routePath || '';
  const city = extractCityFromRoute(route);
  const prefix = city ? `À ${capitalize(city)} : ` : '';

  const replaced = content.replace(
    /(description\s*:\s*)[`"']([^`"']+)[`"']/,
    (_, key, desc) => `${key}"${prefix}${desc}"`
  );
  return replaced !== content
    ? { changed: true, content: replaced, description: `Description différenciée avec préfixe ville` }
    : { changed: false };
}

// Helpers
function extractCityFromRoute(route) {
  // /[ville]/... or /artisan-clermont-ferrand
  const match = route.match(/\/([a-z-]+(?:-[a-z]+)*)(?:\/|$)/);
  if (!match) return null;
  const candidate = match[1];
  const notCities = ['travaux', 'prix', 'devis', 'artisans', 'blog', 'simulateur', 'faq', 'contact', 'mentions', 'api'];
  if (notCities.includes(candidate)) return null;
  return candidate.replace(/-/g, ' ');
}

function extractServiceFromRoute(route) {
  const services = ['plomberie', 'chauffage', 'renovation', 'rénovation', 'electricite', 'électricité', 'isolation', 'peinture', 'carrelage', 'toiture', 'maçonnerie'];
  const lower = route.toLowerCase();
  for (const s of services) {
    if (lower.includes(s)) return s.replace('renovation', 'rénovation').replace('electricite', 'électricité');
  }
  // Extract from path
  const parts = route.split('/').filter(Boolean);
  if (parts.length > 0 && !['[ville]', 'travaux', 'prix', 'artisans'].includes(parts[0])) {
    return parts[0].replace(/-/g, ' ');
  }
  return null;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
