import { execSync } from 'child_process';

export async function commitCycle(root, cycleNumber, actions) {
  try {
    // Check if in git repo
    execSync('git rev-parse --git-dir', { cwd: root, stdio: 'pipe' });
  } catch {
    return false; // Not a git repo, skip
  }

  try {
    // Check for changes
    const status = execSync('git status --porcelain', { cwd: root, encoding: 'utf-8' });
    if (!status.trim()) return false; // Nothing to commit

    const summary = actions.length > 0
      ? `${actions.length} correction(s): ${actions.slice(0, 3).map(a => a.type).join(', ')}${actions.length > 3 ? '...' : ''}`
      : 'audit sans modification';

    execSync('git add -A src/', { cwd: root, stdio: 'pipe' });
    execSync(
      `git commit -m "SEO Agent - Cycle ${cycleNumber} - ${summary}"`,
      { cwd: root, stdio: 'pipe' }
    );
    return true;
  } catch {
    return false;
  }
}

export function ensureBranch(root, branchName) {
  try {
    execSync(`git checkout -b ${branchName} 2>/dev/null || git checkout ${branchName}`, { cwd: root, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

export function checkBuild(root) {
  try {
    execSync('npm run typecheck 2>&1', { cwd: root, stdio: 'pipe', timeout: 60000 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.stdout?.toString() || err.message };
  }
}
