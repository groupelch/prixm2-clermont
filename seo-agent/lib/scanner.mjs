import { readdir, readFile, stat } from 'fs/promises';
import { join, relative, extname } from 'path';

export async function scanPages(root, config) {
  const pages = [];

  if (config.stack === 'nextjs') {
    // Support both src/app and app/ at root
    let appDir = join(root, 'src', 'app');
    try { await stat(appDir); } catch { appDir = join(root, 'app'); }
    await scanNextjsDir(appDir, appDir, pages, root);
  } else {
    await scanStaticDir(root, root, pages);
  }

  return pages;
}

async function scanNextjsDir(dir, appRoot, pages, projectRoot) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ignorer api/, _components, node_modules
      if (['node_modules', '.next', 'api', '_components', 'components'].includes(entry.name)) continue;
      await scanNextjsDir(fullPath, appRoot, pages, projectRoot);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      const routePath = relative(appRoot, dir) || '/';
      const relPath = relative(projectRoot, fullPath);
      try {
        const content = await readFile(fullPath, 'utf-8');
        pages.push({
          filePath: fullPath,
          relativePath: relPath,
          routePath: routePath === '.' ? '/' : '/' + routePath.replace(/\\/g, '/'),
          type: detectPageType(routePath, content),
          content,
          isDynamic: routePath.includes('[')
        });
      } catch {}
    }
  }
}

async function scanStaticDir(dir, root, pages) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'seo-agent'].includes(entry.name)) continue;
      await scanStaticDir(fullPath, root, pages);
    } else if (entry.isFile() && ['.html', '.htm'].includes(extname(entry.name))) {
      try {
        const content = await readFile(fullPath, 'utf-8');
        pages.push({
          filePath: fullPath,
          relativePath: relative(root, fullPath),
          routePath: '/' + relative(root, fullPath),
          type: detectPageType(entry.name, content),
          content,
          isDynamic: false
        });
      } catch {}
    }
  }
}

function detectPageType(path, content) {
  const p = path.toLowerCase();
  if (p.includes('blog') || p.includes('article')) return 'blog';
  if (p.includes('[ville]') || p.includes('villes') || p.includes('-clermont') || p.includes('-lyon')) return 'local';
  if (p.includes('travaux') || p.includes('services') || p.includes('prix')) return 'service';
  if (p.includes('simulateur') || p.includes('devis')) return 'tool';
  if (p === '/' || p === 'index' || p.includes('page.tsx') && !p.includes('/')) return 'home';
  if (p.includes('artisans') || p.includes('partenaires')) return 'partner';
  if (p.includes('mentions') || p.includes('cgu') || p.includes('confidentialite')) return 'legal';
  if (p.includes('faq')) return 'faq';
  return 'other';
}
