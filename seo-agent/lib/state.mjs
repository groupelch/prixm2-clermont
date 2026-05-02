import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DEFAULT_STATE = {
  startTime: null,
  lastCycle: 0,
  lastUpdate: null,
  totalActionsApplied: 0,
  totalDuplicationsFixed: 0,
  pagesAudited: {},
  pagesModified: [],
  recurringIssues: [],
  status: 'idle'
};

export async function loadState(seoDir) {
  try {
    const raw = await readFile(join(seoDir, 'state.json'), 'utf-8');
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export async function saveState(seoDir, state) {
  await writeFile(
    join(seoDir, 'state.json'),
    JSON.stringify({ ...state, lastUpdate: new Date().toISOString() }, null, 2),
    'utf-8'
  );
}
