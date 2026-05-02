import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { countWords, similarity } from './utils.mjs';

export async function auditPage(page, root, config) {
  const { content, routePath, type, filePath } = page;
  const isNextjs = config.stack === 'nextjs';

  const result = {
    page: page.relativePath,
    route: routePath,
    type,
    issues: [],
    suggestions: [],
    meta: {},
    structure: {},
    content: {}
  };

  if (isNextjs) {
    extractNextjsMeta(content, result);
  } else {
    extractHtmlMeta(content, result);
  }

  auditTechnique(result, content, isNextjs);
  auditContent(result, content, config);
  auditLocal(result, content, routePath, config);
  auditIA(result, content);
  auditUX(result, content, isNextjs);

  return result;
}

function extractNextjsMeta(content, result) {
  // Static metadata
  const metaMatch = content.match(/export\s+const\s+metadata[^=]*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
  if (metaMatch) {
    const block = metaMatch[1];
    const titleMatch = block.match(/title\s*:\s*[`"']([^`"']+)[`"']/);
    const descMatch = block.match(/description\s*:\s*[`"']([^`"']+)[`"']/);
    if (titleMatch) result.meta.title = titleMatch[1].trim();
    if (descMatch) result.meta.description = descMatch[1].trim();
    result.meta.hasStaticMetadata = true;
  }

  // Dynamic metadata (generateMetadata)
  if (content.includes('generateMetadata')) {
    result.meta.hasDynamicMetadata = true;
    // Try to extract template patterns
    const titleInFunc = content.match(/title\s*:\s*[`"']([^`"']+)[`"']/g);
    if (titleInFunc && !result.meta.title) {
      result.meta.title = titleInFunc[0].replace(/title\s*:\s*[`"']/, '').replace(/[`"']$/, '');
    }
  }

  // H1
  const h1Matches = [...content.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)];
  result.structure.h1 = h1Matches.map(m => m[1].trim());

  // H2
  const h2Matches = [...content.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)];
  result.structure.h2 = h2Matches.map(m => m[1].trim());

  // H3
  const h3Matches = [...content.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi)];
  result.structure.h3 = h3Matches.map(m => m[1].trim());

  // Links
  const linkMatches = [...content.matchAll(/href\s*=\s*["`']([^"`']+)["`']/gi)];
  result.structure.links = linkMatches.map(m => m[1]).filter(l => l.startsWith('/'));

  // Images without alt
  const imgMatches = [...content.matchAll(/<(?:img|Image)[^>]+>/gi)];
  result.structure.imagesWithoutAlt = imgMatches.filter(m => !m[0].includes('alt=')).length;
  result.structure.imagesWithEmptyAlt = imgMatches.filter(m => m[0].match(/alt\s*=\s*["`']\s*["`']/)).length;

  // Extract readable text
  const textContent = content
    .replace(/import[^\n]+\n/g, '')
    .replace(/export[^\n]+\{[^}]*\}/gs, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim();
  result.content.text = textContent;
  result.content.wordCount = countWords(textContent);
}

function extractHtmlMeta(content, result) {
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) result.meta.title = titleMatch[1].trim();

  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    || content.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  if (descMatch) result.meta.description = descMatch[1].trim();

  const h1Matches = [...content.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)];
  result.structure.h1 = h1Matches.map(m => m[1].trim());
  const h2Matches = [...content.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)];
  result.structure.h2 = h2Matches.map(m => m[1].trim());

  const linkMatches = [...content.matchAll(/href=["']([^"']+)["']/gi)];
  result.structure.links = linkMatches.map(m => m[1]).filter(l => !l.startsWith('http') && !l.startsWith('#') && !l.startsWith('mailto'));

  const imgMatches = [...content.matchAll(/<img[^>]+>/gi)];
  result.structure.imagesWithoutAlt = imgMatches.filter(m => !m[0].includes('alt=')).length;

  result.content.text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  result.content.wordCount = countWords(result.content.text);
}

function auditTechnique(result, content, isNextjs) {
  const issues = [];

  // Title
  if (!result.meta.title) {
    issues.push({ type: 'missing_title', severity: 'critical', fix: 'auto', message: 'Titre manquant' });
  } else if (result.meta.title.length > 60) {
    issues.push({ type: 'title_too_long', severity: 'warning', fix: 'auto', message: `Titre trop long: ${result.meta.title.length} chars (max 60)` });
  } else if (result.meta.title.length < 20) {
    issues.push({ type: 'title_too_short', severity: 'warning', fix: 'auto', message: 'Titre trop court' });
  }

  // Description
  if (!result.meta.description) {
    issues.push({ type: 'missing_description', severity: 'critical', fix: 'auto', message: 'Meta description manquante' });
  } else if (result.meta.description.length > 160) {
    issues.push({ type: 'description_too_long', severity: 'warning', fix: 'auto', message: `Description trop longue: ${result.meta.description.length} chars` });
  } else if (result.meta.description.length < 80) {
    issues.push({ type: 'description_too_short', severity: 'info', fix: 'auto', message: 'Description trop courte' });
  }

  // H1
  if (!result.structure.h1 || result.structure.h1.length === 0) {
    issues.push({ type: 'missing_h1', severity: 'critical', fix: 'auto', message: 'H1 manquant' });
  } else if (result.structure.h1.length > 1) {
    issues.push({ type: 'multiple_h1', severity: 'warning', fix: 'review', message: `${result.structure.h1.length} H1 détectés` });
  }

  // Images sans alt
  if (result.structure.imagesWithoutAlt > 0) {
    issues.push({ type: 'images_no_alt', severity: 'warning', fix: 'auto', message: `${result.structure.imagesWithoutAlt} image(s) sans attribut alt` });
  }
  if (result.structure.imagesWithEmptyAlt > 0) {
    issues.push({ type: 'images_empty_alt', severity: 'info', fix: 'auto', message: `${result.structure.imagesWithEmptyAlt} image(s) avec alt vide` });
  }

  result.issues.push(...issues.map(i => ({ ...i, category: 'technique' })));
}

function auditContent(result, content, config) {
  const issues = [];
  const text = result.content.text || '';
  const words = result.content.wordCount || 0;

  // Contenu trop court
  if (words < 200 && result.type !== 'home') {
    issues.push({ type: 'content_too_short', severity: 'warning', fix: 'auto', message: `Contenu trop court: ${words} mots` });
  }

  // Texte générique détecté
  const genericPatterns = [
    /nous intervenons à .{1,30} pour vous accompagner/i,
    /n'hésitez pas à nous contacter/i,
    /notre équipe d'experts/i,
    /nous sommes à votre disposition/i,
    /contactez-nous dès maintenant pour un devis gratuit/i,
    /des professionnels qualifiés/i,
    /une équipe de professionnels/i
  ];
  const genericFound = genericPatterns.filter(p => p.test(text));
  if (genericFound.length > 0) {
    issues.push({ type: 'generic_content', severity: 'warning', fix: 'auto', message: `${genericFound.length} formule(s) générique(s) détectée(s)` });
  }

  // Absence de FAQ
  if (!content.includes('FAQ') && !content.includes('faq') && !content.includes('Question') && result.type !== 'legal') {
    issues.push({ type: 'no_faq', severity: 'info', fix: 'auto', message: 'Pas de FAQ détectée' });
  }

  // Absence de CTA
  const hasCta = /devis|contact|appel|rappel|simulateur|commencer|estimer/i.test(text);
  if (!hasCta) {
    issues.push({ type: 'no_cta', severity: 'warning', fix: 'auto', message: 'Aucun appel à l\'action détecté' });
  }

  result.issues.push(...issues.map(i => ({ ...i, category: 'content' })));
}

function auditLocal(result, content, routePath, config) {
  if (result.type !== 'local' && result.type !== 'service') return;

  const issues = [];
  const text = result.content.text || '';

  // Page locale sans ville
  if (result.type === 'local') {
    const cityInRoute = routePath.match(/\/([a-z-]+)$/)?.[1]?.replace(/-/g, ' ');
    if (cityInRoute && !text.toLowerCase().includes(cityInRoute.toLowerCase())) {
      issues.push({ type: 'city_not_mentioned', severity: 'critical', fix: 'auto', message: `Ville "${cityInRoute}" non mentionnée dans le contenu` });
    }

    // Pas de contexte local
    const localSignals = ['quartier', 'arrondissement', 'commune', 'agglomération', 'bassin', 'habitat', 'immobilier local'];
    const hasLocalContext = localSignals.some(s => text.toLowerCase().includes(s));
    if (!hasLocalContext) {
      issues.push({ type: 'no_local_context', severity: 'warning', fix: 'auto', message: 'Absence de contexte local spécifique' });
    }

    // Absence de maillage vers villes voisines
    if (!content.includes('href') || result.structure.links?.length < 3) {
      issues.push({ type: 'weak_local_linking', severity: 'info', fix: 'auto', message: 'Maillage local insuffisant (< 3 liens)' });
    }
  }

  result.issues.push(...issues.map(i => ({ ...i, category: 'local' })));
}

function auditIA(result, content) {
  const issues = [];
  const text = result.content.text || '';

  // Paragraphes trop longs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  const longParagraphs = paragraphs.filter(p => countWords(p) > 80);
  if (longParagraphs.length > 2) {
    issues.push({ type: 'long_paragraphs', severity: 'info', fix: 'auto', message: `${longParagraphs.length} paragraphes trop longs (> 80 mots)` });
  }

  // Absence de Q/R ou FAQ structurée
  const hasQR = content.includes('?') && (content.includes('FAQ') || content.includes('AccordionItem') || content.includes('question'));
  if (!hasQR && result.type !== 'legal') {
    issues.push({ type: 'no_qa_blocks', severity: 'info', fix: 'auto', message: 'Pas de blocs Q/R structurés pour SEO IA' });
  }

  // Réponse directe manquante (intro trop vague)
  const firstWords = text.slice(0, 200).toLowerCase();
  const hasDirectAnswer = /coût|prix|tarif|combien|comment|pourquoi|qu'est|voici|pour/.test(firstWords);
  if (!hasDirectAnswer) {
    issues.push({ type: 'no_direct_answer', severity: 'info', fix: 'auto', message: 'Réponse directe manquante en début de page' });
  }

  result.issues.push(...issues.map(i => ({ ...i, category: 'seo_ia' })));
}

function auditUX(result, content, isNextjs) {
  const issues = [];

  // CTA en haut de page
  const contentTop = content.slice(0, 2000);
  const hasCTATop = /devis|contact|simuler|estimer|appel/i.test(contentTop);
  if (!hasCTATop) {
    issues.push({ type: 'no_cta_above_fold', severity: 'warning', fix: 'review', message: 'Pas de CTA visible dans la première partie de page' });
  }

  result.issues.push(...issues.map(i => ({ ...i, category: 'ux' })));
}
