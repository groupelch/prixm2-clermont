#!/usr/bin/env node
/**
 * Boucle SEO / Audit — Agent principal
 * Durée : 10 heures par défaut (configurable dans config.json)
 * Usage : node seo-agent/agent.mjs [--dry-run] [--max-cycles N]
 */

import { readFile, writeFile, appendFile } from 'fs/promises';
import { join, resolve } from 'path';
import { execSync } from 'child_process';

import { scanPages } from './lib/scanner.mjs';
import { auditPage } from './lib/audit.mjs';
import { scorePage, computePagePriority } from './lib/scorer.mjs';
import { applyFixes } from './lib/fixer.mjs';
import { generateCycleReport, generateFinalReport } from './lib/reporter.mjs';
import { loadState, saveState } from './lib/state.mjs';
import { createBackup, rollbackFromBackup } from './lib/backup.mjs';
import { commitCycle, ensureBranch, checkBuild } from './lib/git.mjs';
import { updateDashboard } from './lib/dashboard.mjs';
import { detectDuplication } from './lib/duplication.mjs';
import { appendToLog, appendToScores, avg, sleep, formatDuration, now } from './lib/utils.mjs';

const ROOT = resolve(process.cwd());
const SEO_DIR = join(ROOT, 'seo-agent');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const MAX_CYCLES = parseInt(args.find(a => a.startsWith('--max-cycles='))?.split('=')[1]) || Infinity;

// Handle graceful stop
let shouldStop = false;
process.on('SIGINT', () => { shouldStop = true; console.log('\n\nArrêt demandé — finalisation en cours...'); });
process.on('SIGTERM', () => { shouldStop = true; });

async function loadConfig() {
  return JSON.parse(await readFile(join(SEO_DIR, 'config.json'), 'utf-8'));
}

async function main() {
  const config = await loadConfig();
  const startTime = Date.now();
  const endTime = startTime + config.durationHours * 3600000;

  await appendToLog(SEO_DIR, `\n${'='.repeat(60)}`);
  await appendToLog(SEO_DIR, `BOUCLE SEO / AUDIT — DÉMARRAGE`);
  await appendToLog(SEO_DIR, `Projet : ${config.targetProject} | Stack : ${config.stack}`);
  await appendToLog(SEO_DIR, `Durée : ${config.durationHours}h | Dry-run : ${DRY_RUN}`);
  await appendToLog(SEO_DIR, '='.repeat(60));

  if (DRY_RUN) await appendToLog(SEO_DIR, '⚠️  MODE DRY-RUN : aucune modification ne sera appliquée');

  // État
  let state = await loadState(SEO_DIR);
  if (!state.startTime) state.startTime = now();
  state.status = 'running';
  await saveState(SEO_DIR, state);

  // Branch Git
  if (config.autoDeploy && !DRY_RUN) {
    ensureBranch(ROOT, config.gitBranch || 'seo-agent/boucle-audit');
  }

  // Sauvegarde initiale
  if (config.requireBackup && !DRY_RUN) {
    await appendToLog(SEO_DIR, '💾 Sauvegarde initiale...');
    await createBackup(ROOT, SEO_DIR, 0);
  }

  // Scanner toutes les pages
  await appendToLog(SEO_DIR, '🔍 Scan des pages...');
  const allPages = await scanPages(ROOT, config);
  await appendToLog(SEO_DIR, `📋 ${allPages.length} page(s) détectée(s)`);

  if (allPages.length === 0) {
    await appendToLog(SEO_DIR, '❌ Aucune page trouvée. Vérifiez la stack dans config.json.');
    process.exit(1);
  }

  // Pré-charger le contenu de toutes les pages pour la détection de duplication
  for (const page of allPages) {
    page.content = page.content || '';
  }

  let cycleNumber = state.lastCycle || 0;

  // Boucle principale
  while (Date.now() < endTime && !shouldStop && cycleNumber < MAX_CYCLES) {
    cycleNumber++;
    const cycleStart = Date.now();
    const remaining = endTime - Date.now();

    await appendToLog(SEO_DIR, `\n${'─'.repeat(40)}`);
    await appendToLog(SEO_DIR, `CYCLE ${cycleNumber} | Restant : ${formatDuration(remaining)}`);
    await appendToLog(SEO_DIR, '─'.repeat(40));

    // Sélectionner les pages prioritaires
    const prioritized = allPages
      .map(p => ({ ...p, priority: computePagePriority(p, state.pagesAudited) }))
      .sort((a, b) => b.priority - a.priority)
      .slice(0, config.maxPagesPerCycle || 20);

    await appendToLog(SEO_DIR, `🎯 ${prioritized.length} pages sélectionnées`);

    const scoresBefore = [];
    const scoresAfter = [];
    const allActionsApplied = [];
    const allToValidate = [];
    const duplicationResults = [];

    // Sauvegarde avant cycle
    if (config.requireBackup && !DRY_RUN) {
      await createBackup(ROOT, SEO_DIR, cycleNumber);
    }

    // Traiter chaque page
    for (const page of prioritized) {
      if (shouldStop) break;

      try {
        await appendToLog(SEO_DIR, `  📄 ${page.relativePath}`);

        // Audit
        const auditResult = await auditPage(page, ROOT, config);
        const scoreBefore = scorePage(auditResult);
        scoresBefore.push({ page: page.relativePath, score: scoreBefore });

        // Duplication
        const dupResult = await detectDuplication(page, allPages, ROOT, config);
        if (dupResult.issues.length > 0) {
          duplicationResults.push({ page: page.relativePath, issues: dupResult.issues });
          // Ajouter les issues de duplication dans auditResult pour le scoring
          auditResult.issues.push(...dupResult.issues);
        }

        // Corrections
        let fixes = { applied: [], toValidate: [] };
        if (!DRY_RUN) {
          fixes = await applyFixes(page, auditResult, dupResult, ROOT, config, allToValidate);
        } else {
          // En dry-run, simuler les fixes sans écrire
          fixes.applied = auditResult.issues
            .filter(i => i.fix === 'auto')
            .map(i => ({ page: page.relativePath, type: i.type, description: `[DRY-RUN] ${i.message}`, fix: i.message }));
          fixes.toValidate = auditResult.issues
            .filter(i => i.fix === 'review')
            .map(i => ({ page: page.relativePath, action: i.message, reason: 'Validation requise' }));
        }

        allActionsApplied.push(...fixes.applied);
        allToValidate.push(...fixes.toValidate);

        // Re-audit après corrections
        const auditAfter = DRY_RUN ? auditResult : await auditPage(page, ROOT, config);
        const scoreAfter = scorePage(auditAfter);
        scoresAfter.push({ page: page.relativePath, score: scoreAfter });

        // Enregistrer le score
        await appendToScores(SEO_DIR, {
          date: now(),
          cycle: cycleNumber,
          page: page.relativePath,
          scoreAfter,
          actions: fixes.applied.map(a => a.description)
        });

        // Mettre à jour l'état de la page
        state.pagesAudited = state.pagesAudited || {};
        state.pagesAudited[page.relativePath] = {
          lastAudit: now(),
          lastScore: scoreAfter.global,
          modified: fixes.applied.length > 0,
          issuesCount: auditResult.issues.length
        };

        const delta = scoreAfter.global - scoreBefore.global;
        const deltaStr = delta >= 0 ? `+${delta}` : `${delta}`;
        await appendToLog(SEO_DIR, `    Score: ${scoreBefore.global}→${scoreAfter.global} (${deltaStr}) | ${fixes.applied.length} fix(es)`);

      } catch (err) {
        await appendToLog(SEO_DIR, `  ⚠️  Erreur sur ${page.relativePath}: ${err.message}`);
        if (!DRY_RUN) {
          await rollbackFromBackup(SEO_DIR, cycleNumber);
        }
      }
    }

    // Actions à valider
    if (allToValidate.length > 0) {
      await updateValidationFile(SEO_DIR, cycleNumber, allToValidate);
    }

    // Vérifier build avant commit
    let buildOk = true;
    if (config.autoDeploy && !DRY_RUN && allActionsApplied.length > 0) {
      await appendToLog(SEO_DIR, '🔨 Vérification TypeScript...');
      const build = checkBuild(ROOT);
      buildOk = build.ok;
      if (!build.ok) {
        await appendToLog(SEO_DIR, `⚠️  TypeCheck failed — rollback`);
        await rollbackFromBackup(SEO_DIR, cycleNumber);
        buildOk = false;
      }
    }

    // Git commit
    if (config.autoDeploy && !DRY_RUN && buildOk && allActionsApplied.length > 0) {
      const committed = await commitCycle(ROOT, cycleNumber, allActionsApplied);
      if (committed) await appendToLog(SEO_DIR, '✅ Commit Git effectué');
    }

    // Rapport de cycle
    const cycleDuration = Date.now() - cycleStart;
    await generateCycleReport(SEO_DIR, {
      cycleNumber,
      startTime: new Date(cycleStart).toISOString(),
      endTime: now(),
      duration: cycleDuration,
      pagesAudited: prioritized.map(p => p.relativePath),
      scoresBefore,
      scoresAfter,
      actionsApplied: allActionsApplied,
      actionsToValidate: allToValidate,
      duplicationDetected: duplicationResults
    });

    // Mettre à jour l'état global
    state.lastCycle = cycleNumber;
    state.totalActionsApplied = (state.totalActionsApplied || 0) + allActionsApplied.length;
    state.totalDuplicationsFixed = (state.totalDuplicationsFixed || 0) +
      duplicationResults.reduce((n, d) => n + d.issues.filter(i => i.fix === 'auto').length, 0);
    await saveState(SEO_DIR, state);

    // Dashboard
    const pagesTreated = Object.keys(state.pagesAudited || {}).length;
    await updateDashboard(SEO_DIR, {
      cycleNumber,
      timeRemaining: endTime - Date.now(),
      totalDuration: config.durationHours * 3600000,
      pagesTotal: allPages.length,
      pagesTreated,
      scoresAfter,
      actionsApplied: allActionsApplied,
      actionsToValidate: allToValidate
    });

    const avgBefore = avg(scoresBefore.map(s => s.score?.global ?? 0));
    const avgAfter = avg(scoresAfter.map(s => s.score?.global ?? 0));
    await appendToLog(SEO_DIR, `✅ Cycle ${cycleNumber} — ${Math.round(cycleDuration / 1000)}s | Score moy: ${avgBefore.toFixed(1)}→${avgAfter.toFixed(1)} | ${allActionsApplied.length} fixes`);

    // Attendre le minimum entre cycles (éviter de trop chaîner rapidement)
    const minWait = 5000; // 5 secondes minimum
    const elapsed = Date.now() - cycleStart;
    if (elapsed < minWait) await sleep(minWait - elapsed);
  }

  // Rapport final
  await appendToLog(SEO_DIR, '\n📊 Génération du rapport final...');
  await generateFinalReport(SEO_DIR, state, allPages, cycleNumber, startTime);

  state.status = 'completed';
  await saveState(SEO_DIR, state);

  const totalDuration = Date.now() - startTime;
  await appendToLog(SEO_DIR, `\n${'='.repeat(60)}`);
  await appendToLog(SEO_DIR, `BOUCLE SEO TERMINÉE — ${formatDuration(totalDuration)}`);
  await appendToLog(SEO_DIR, `${cycleNumber} cycles | ${state.totalActionsApplied} corrections | ${Object.keys(state.pagesAudited || {}).length} pages`);
  await appendToLog(SEO_DIR, '='.repeat(60));

  console.log('\nRapport final : seo-agent/rapport-final.md');
  console.log('Dashboard    : seo-agent/dashboard.html');
  console.log('Logs         : seo-agent/logs/agent.log');
}

async function updateValidationFile(seoDir, cycleNumber, actions) {
  const filePath = join(seoDir, 'actions-a-valider.md');
  let existing = '';
  try { existing = await readFile(filePath, 'utf-8'); } catch {}

  if (existing.includes('_Aucune action en attente._')) {
    existing = existing.replace('_Aucune action en attente._', '');
  }

  const entries = actions.map(a =>
    `## Cycle ${cycleNumber} — ${new Date().toLocaleDateString('fr-FR')}\n\n**Page :** \`${a.page}\`  \n**Action :** ${a.action}  \n**Raison :** ${a.reason}\n\n---`
  ).join('\n\n');

  await writeFile(filePath, existing + '\n\n' + entries, 'utf-8');
}

main().catch(async err => {
  await appendToLog(join(resolve(process.cwd()), 'seo-agent'), `💥 ERREUR FATALE: ${err.stack || err.message}`).catch(() => {});
  console.error('\n💥 Erreur fatale:', err.message);
  process.exit(1);
});
