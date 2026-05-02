import { readFile, writeFile, appendFile } from 'fs/promises';
import { join } from 'path';

export function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

export function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export function now() {
  return new Date().toISOString();
}

export function formatDuration(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${h}h${String(m).padStart(2, '0')}m${String(s).padStart(2, '0')}s`;
}

export async function appendToLog(seoDir, message) {
  const logFile = join(seoDir, 'logs', 'agent.log');
  const line = `[${new Date().toLocaleString('fr-FR')}] ${message}\n`;
  await appendFile(logFile, line, 'utf-8').catch(() => {});
  console.log(message);
}

export async function appendToScores(seoDir, entry) {
  const file = join(seoDir, 'scores.csv');
  const s = entry.scoreAfter || {};
  const line = [
    entry.date,
    entry.cycle,
    `"${entry.page}"`,
    s.global ?? 0,
    s.seoTechnique ?? 0,
    s.contenu ?? 0,
    s.seoLocal ?? 0,
    s.seoIa ?? 0,
    s.ux ?? 0,
    s.unicite ?? 0,
    `"${(entry.actions || []).join('; ')}"`
  ].join(',') + '\n';
  await appendFile(file, line, 'utf-8').catch(() => {});
}

export function sanitizeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function truncate(str, max = 160) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max - 3) + '...';
}

export function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function similarity(a, b) {
  if (!a || !b) return 0;
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...wordsA].filter(w => wordsB.has(w)).length;
  const union = new Set([...wordsA, ...wordsB]).size;
  return union ? Math.round((intersection / union) * 100) : 0;
}
