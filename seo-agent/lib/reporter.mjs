import { writeFile } from 'fs/promises';
import { join } from 'path';
import { avg, formatDuration } from './utils.mjs';

export async function generateCycleReport(seoDir, data) {
  const {
    cycleNumber, startTime, endTime, duration,
    pagesAudited, scoresBefore, scoresAfter,
    actionsApplied, actionsToValidate, duplicationDetected
  } = data;

  const avgBefore = avg(scoresBefore.map(s => s.score?.global ?? 0));
  const avgAfter = avg(scoresAfter.map(s => s.score?.global ?? 0));
  const delta = avgAfter - avgBefore;
  const deltaStr = delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);

  const scoreSummary = scoresAfter.map(s => {
    const before = scoresBefore.find(b => b.page === s.page)?.score?.global ?? 0;
    const diff = (s.score?.global ?? 0) - before;
    const diffStr = diff >= 0 ? `+${diff.toFixed(0)}` : diff.toFixed(0);
    return `| ${s.page} | ${before}/100 | ${s.score?.global ?? 0}/100 | ${diffStr} |`;
  }).join('\n');

  const report = `# Rapport Cycle ${cycleNumber}

**Début :** ${startTime}
**Fin :** ${endTime}
**Durée :** ${formatDuration(duration)}

---

## Résumé

| Métrique | Valeur |
|----------|--------|
| Pages auditées | ${pagesAudited.length} |
| Pages modifiées | ${actionsApplied.length > 0 ? actionsApplied.map(a => a.page).filter((v, i, a) => a.indexOf(v) === i).length : 0} |
| Corrections appliquées | ${actionsApplied.length} |
| Actions à valider | ${actionsToValidate.length} |
| Duplications détectées | ${duplicationDetected.reduce((n, d) => n + d.issues.length, 0)} |
| Score moyen avant | ${avgBefore.toFixed(1)}/100 |
| Score moyen après | ${avgAfter.toFixed(1)}/100 |
| Évolution | **${deltaStr} pts** |

---

## Scores par page

| Page | Avant | Après | Évolution |
|------|-------|-------|-----------|
${scoreSummary}

---

## Corrections appliquées (${actionsApplied.length})

${actionsApplied.length > 0
  ? actionsApplied.map(a => `- **${a.page}** — ${a.description}`).join('\n')
  : '_Aucune correction appliquée_'}

---

## Actions à valider (${actionsToValidate.length})

${actionsToValidate.length > 0
  ? actionsToValidate.map(a => `- **${a.page}** — ${a.action} _(${a.reason})_`).join('\n')
  : '_Aucune_'}

---

## Duplications détectées

${duplicationDetected.length > 0
  ? duplicationDetected.map(d => `- **${d.page}** : ${d.issues.map(i => i.message).join(', ')}`).join('\n')
  : '_Aucune duplication détectée_'}

---

_Généré automatiquement le ${new Date().toLocaleString('fr-FR')}_
`;

  await writeFile(join(seoDir, 'reports', `cycle-${cycleNumber}.md`), report, 'utf-8');
}

export async function generateFinalReport(seoDir, state, allPages, totalCycles, startTime) {
  const duration = Date.now() - startTime;
  const pagesAudited = Object.keys(state.pagesAudited || {});
  const scores = Object.values(state.pagesAudited || {}).map(p => p.lastScore).filter(n => n != null);
  const avgScore = scores.length ? avg(scores).toFixed(1) : 'N/A';

  const weakPages = Object.entries(state.pagesAudited || {})
    .filter(([, v]) => (v.lastScore || 0) < 60)
    .sort((a, b) => (a[1].lastScore || 0) - (b[1].lastScore || 0))
    .map(([k, v]) => `- ${k} (score: ${v.lastScore || 0}/100)`);

  const modifiedPages = Object.entries(state.pagesAudited || {})
    .filter(([, v]) => v.modified)
    .map(([k]) => k);

  const report = `# Rapport Final — Boucle SEO / Audit

**Date :** ${new Date().toLocaleString('fr-FR')}
**Durée totale :** ${formatDuration(duration)}
**Cycles réalisés :** ${totalCycles}

---

## 1. Résumé global

| Indicateur | Résultat |
|------------|----------|
| Pages totales détectées | ${allPages.length} |
| Pages auditées | ${pagesAudited.length} |
| Pages modifiées | ${modifiedPages.length} |
| Corrections appliquées | ${state.totalActionsApplied || 0} |
| Duplications corrigées | ${state.totalDuplicationsFixed || 0} |
| Score moyen final | **${avgScore}/100** |

---

## 2. Pages encore faibles (score < 60)

${weakPages.length > 0 ? weakPages.join('\n') : '_Toutes les pages auditées ont un score ≥ 60_'}

---

## 3. Pages prioritaires à retravailler manuellement

${weakPages.slice(0, 5).join('\n') || '_Aucune_'}

---

## 4. Recommandations stratégiques

1. **Contenu local** — Continuer l'enrichissement des pages [ville] avec du contenu vraiment différencié
2. **SEO IA** — Structurer davantage de pages avec des blocs Q/R pour les moteurs conversationnels
3. **Maillage interne** — Renforcer les liens entre pages services et pages locales
4. **FAQ** — S'assurer que chaque page locale dispose d'une FAQ unique (min. 5 questions)
5. **Performance** — Optimiser les images lourdes et réduire le JavaScript non critique

---

## 5. Prochaines actions prioritaires

- [ ] Valider les actions dans \`actions-a-valider.md\`
- [ ] Relire les pages modifiées avec un score < 70
- [ ] Ajouter du contenu factuel local sur les pages faibles restantes
- [ ] Vérifier le sitemap.xml après les modifications
- [ ] Tester le build Next.js complet

---

_Rapport généré automatiquement par Boucle SEO / Audit_
`;

  await writeFile(join(seoDir, 'rapport-final.md'), report, 'utf-8');
}
