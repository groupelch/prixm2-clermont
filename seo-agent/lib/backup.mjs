import { readFile, writeFile, mkdir, readdir, copyFile } from 'fs/promises';
import { join, relative, dirname } from 'path';

export async function createBackup(root, seoDir, cycleNumber) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = join(seoDir, 'backups', `backup-cycle-${cycleNumber}-${timestamp}`);
  await mkdir(backupDir, { recursive: true });

  // Backup only source files (no node_modules, .next, seo-agent itself)
  const srcDir = join(root, 'src');
  await copyDirSelective(srcDir, join(backupDir, 'src'));

  // Backup a few key files at root
  for (const file of ['next.config.ts', 'robots.ts']) {
    try {
      await copyFile(join(root, file), join(backupDir, file));
    } catch {}
  }

  return backupDir;
}

async function copyDirSelective(src, dest) {
  try {
    await mkdir(dest, { recursive: true });
    const entries = await readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirSelective(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch {}
}

export async function rollbackFromBackup(seoDir, cycleNumber) {
  const backupsDir = join(seoDir, 'backups');
  let entries;
  try { entries = await readdir(backupsDir); } catch { return false; }

  const cycleDirs = entries
    .filter(e => e.startsWith(`backup-cycle-${cycleNumber}-`))
    .sort();

  if (cycleDirs.length === 0) return false;

  const latestBackup = join(backupsDir, cycleDirs[cycleDirs.length - 1]);
  // Restore src/
  const backupSrc = join(latestBackup, 'src');
  const projectSrc = join(seoDir, '..', 'src');
  await copyDirSelective(backupSrc, projectSrc);

  return true;
}
