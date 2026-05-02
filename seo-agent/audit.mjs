#!/usr/bin/env node
/**
 * Audit standalone — sans modification, sans boucle
 * Usage : node seo-agent/audit.mjs [--output json|md]
 */

import { resolve, join } from 'path';
import { readFile, writeFile } from 'fs/promises';

import { scanPages } from './lib/scanner.mjs';
import { auditPage } from './lib/audit.mjs';
import { scorePage, computePagePriority } from './lib/scorer.mjs';
import { detectDuplication } from './lib/duplication.mjs';
import { avg, now } from './lib/utils.mjs';

const ROOT = resolve(process.cwd());
const SEO_DIR = join(ROOT, 'seo-agent');

async function loadConfig() {
  return JSON.parse(await readFile(join(SEO_DIR, 'config.json'), 'utf-8'));
}

async function main() {
  const config = await loadConfig();
  const args = process.argv.slice(2);
  const outputFormat = args.find(a => a.startsWith('--output='))?.split('=')[1] || 'md';

  console.log('🔍 Boucle SEO / Audit — Audit standalone\n');
  console.log(`Projet : ${config.targetProject} | Stack : ${config.stack}\n`);

  // Scanner les pages
  const allPages = await scanPages(ROOT, config);
  console.log(`📋 ${allPages.length} page(s) détectée(s)\n`);

  const results = [];

  for (const page of allPages) {
    process.stdout.write(`  Audit: ${page.relativePath}...`);

    const auditResult = await auditPage(page, ROOT, config);
    const dupResult = await detectDuplication(page, allPages, ROOT, config);
    auditResult.issues.push(...dupResult.issues);

    const score = scorePage(auditResult);
    const priority = computePagePriority(page, {});

    results.push({
      page: page.relativePath,
      route: page.routePath,
      type: page.type,
      score,
      issues: auditResult.issues,
      priority
    });

    process.stdout.write(` ${score.global}/100 (${score.label})\n`);
  }

  // Trier par score croissant (les plus faibles en premier)
  results.sort((a, b) => a.score.global - b.score.global);

  const allScores = results.map(r => r.score.global);
  const avgScore = avg(allScores).toFixed(1);
  const weak = results.filter(r => r.score.global < 60);
  const medium = results.filter(r => r.score.global >= 60 && r.score.global < 75);
  const good = results.filter(r => r.score.global >= 75);

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`📊 RÉSUMÉ AUDIT`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`Score moyen   : ${avgScore}/100`);
  console.log(`Pages faibles : ${weak.length} (< 60)`);
  console.log(`Pages moyennes: ${medium.length} (60-74)`);
  console.log(`Pages bonnes  : ${good.length} (≥ 75)`);
  console.log(`${'─'.repeat(50)}\n`);

  if (outputFormat === 'md') {
    await generateAuditReport(SEO_DIR, results, avgScore);
    console.log('📄 Rapport généré : seo-agent/reports/audit-standalone.md');
  } else {
    const jsonOut = join(SEO_DIR, 'reports', 'audit-standalone.json');
    await writeFile(jsonOut, JSON.stringify(results, null, 2), 'utf-8');
    console.log('📄 Rapport JSON : seo-agent/reports/audit-standalone.json');
  }

  // Top 5 problèmes récurrents
  const issueCount = {};
  for (const r of results) {
    for (const i of r.issues) {
      issueCount[i.type] = (issueCount[i.type] || 0) + 1;
    }
  }
  const topIssues = Object.entries(issueCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  console.log('🔴 Top 5 problèmes récurrents :');
  for (const [type, count] of topIssues) {
    console.log(`  ${count}x ${type}`);
  }
}

async function generateAuditReport(seoDir, results, avgScore) {
  const date = new Date().toLocaleString('fr-FR');
  const rows = results.map(r => {
    const s = r.score;
    const issues = r.issues.filter(i => i.severity === 'critical').length;
    const warnings = r.issues.filter(i => i.severity === 'warning').length;
    return `| ${r.page} | ${s.global}/100 | ${s.label} | ${issues} crit. | ${warnings} warn. |`;
  }).join('\n');

  const topIssues = {};
  for (const r of results) {
    for (const i of r.issues) {
      if (!topIssues[i.type]) topIssues[i.type] = { count: 0, pages: [] };
      topIssues[i.type].count++;
      topIssues[i.type].pages.push(r.page);
    }
  }

  const issueSection = Object.entries(topIssues)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([type, data]) => `- **${type}** — ${data.count} page(s) affectée(s)`)
    .join('\n');

  const report = `# Rapport d'Audit SEO Standalone

**Date :** ${date}
**Pages analysées :** ${results.length}
**Score moyen :** ${avgScore}/100

---

## Scores par page

| Page | Score | Niveau | Critiques | Warnings |
|------|-------|--------|-----------|---------|
${rows}

---

## Problèmes détectés

${issueSection || '_Aucun problème détecté_'}

---

## Recommandations

1. Traiter en priorité les ${results.filter(r => r.score.global < 60).length} pages avec un score < 60
2. Lancer \`npm run seo-agent:start\` pour corriger automatiquement les problèmes
3. Valider manuellement les actions listées dans \`actions-a-valider.md\`

---
_Généré par Boucle SEO / Audit — ${date}_
`;

  await writeFile(join(seoDir, 'reports', 'audit-standalone.md'), report, 'utf-8');
}

main().catch(err => {
  console.error('\n💥 Erreur:', err.message);
  process.exit(1);
});
