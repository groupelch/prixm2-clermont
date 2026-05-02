export function scorePage(auditResult) {
  const issues = auditResult.issues || [];

  let seoTechnique = 20;
  let contenu = 25;
  let seoLocal = 20;
  let seoIa = 15;
  let ux = 10;
  let unicite = 10;

  for (const issue of issues) {
    const penalty = issue.severity === 'critical' ? 5 : issue.severity === 'warning' ? 2 : 1;

    switch (issue.category) {
      case 'technique': seoTechnique = Math.max(0, seoTechnique - penalty); break;
      case 'content':   contenu = Math.max(0, contenu - penalty); break;
      case 'local':     seoLocal = Math.max(0, seoLocal - penalty); break;
      case 'seo_ia':    seoIa = Math.max(0, seoIa - penalty); break;
      case 'ux':        ux = Math.max(0, ux - penalty); break;
      case 'duplication': unicite = Math.max(0, unicite - penalty); break;
    }
  }

  // Bonus si metadata complète et unique
  if (auditResult.meta.title && auditResult.meta.description) seoTechnique = Math.min(20, seoTechnique + 1);
  if (auditResult.structure.h1?.length === 1) seoTechnique = Math.min(20, seoTechnique + 1);

  const global = seoTechnique + contenu + seoLocal + seoIa + ux + unicite;

  return {
    global,
    seoTechnique,
    contenu,
    seoLocal,
    seoIa,
    ux,
    unicite,
    label: global >= 85 ? 'excellent' : global >= 75 ? 'bon' : global >= 60 ? 'moyen' : 'faible'
  };
}

export function computePagePriority(page, auditedState) {
  let priority = 0;
  const path = page.relativePath.toLowerCase();

  if (path.includes('/travaux/') || path.includes('/prix/')) priority += 10;
  if (path.includes('[ville]') || path.includes('/villes/')) priority += 8;
  if (page.routePath === '/') priority += 7;
  if (path.includes('/simulateur') || path.includes('/devis')) priority += 6;
  if (path.includes('/blog/')) priority += 5;

  const state = auditedState?.[page.relativePath];
  if (!state) {
    priority += 6; // non encore audité → prioritaire
  } else {
    if (state.lastScore < 60) priority += 5;
    else if (state.lastScore < 75) priority += 3;
    if (!state.modified) priority += 2;
  }

  return priority;
}
