#!/usr/bin/env node
/**
 * Rollback vers la dernière sauvegarde saine
 * Usage : node seo-agent/rollback.mjs [--cycle N]
 */
import { readdir } from 'fs/promises';
import { join, resolve } from 'path';
import { rollbackFromBackup } from './lib/backup.mjs';

const ROOT = resolve(process.cwd());
const SEO_DIR = join(ROOT, 'seo-agent');

async function main() {
  const args = process.argv.slice(2);
  const cycleArg = args.find(a => a.startsWith('--cycle='))?.split('=')[1];

  const backupsDir = join(SEO_DIR, 'backups');
  let entries;
  try {
    entries = await readdir(backupsDir);
  } catch {
    console.error('Aucun backup disponible.');
    process.exit(1);
  }

  const backups = entries.filter(e => e.startsWith('backup-cycle-')).sort();
  if (backups.length === 0) {
    console.log('Aucun backup disponible.');
    return;
  }

  let targetCycle;
  if (cycleArg) {
    targetCycle = parseInt(cycleArg);
  } else {
    // Prendre le dernier backup avant le cycle actuel
    const latest = backups[backups.length - 1];
    targetCycle = parseInt(latest.match(/backup-cycle-(\d+)/)?.[1] || '0');
  }

  console.log(`Rollback vers backup cycle ${targetCycle}...`);
  const ok = await rollbackFromBackup(SEO_DIR, targetCycle);

  if (ok) {
    console.log('✅ Rollback effectué.');
    console.log('⚠️  Vérifiez le build : npm run typecheck');
  } else {
    console.error('❌ Aucun backup trouvé pour le cycle', targetCycle);
    console.log('Backups disponibles :');
    backups.forEach(b => console.log(' -', b));
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Erreur:', err.message);
  process.exit(1);
});
