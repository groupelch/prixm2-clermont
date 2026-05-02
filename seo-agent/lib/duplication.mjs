import { readFile } from 'fs/promises';
import { similarity } from './utils.mjs';

export async function detectDuplication(page, allPages, root, config) {
  const maxSim = config.maxSimilarityPercent || 30;
  const issues = [];
  const text = page.content?.text || extractText(page.content || '');

  for (const other of allPages) {
    if (other.filePath === page.filePath) continue;
    const otherText = other.content?.text || extractText(other.content || '');
    const sim = similarity(text.slice(0, 2000), otherText.slice(0, 2000));
    if (sim > maxSim) {
      issues.push({
        type: 'high_similarity',
        severity: sim > 60 ? 'critical' : 'warning',
        fix: 'auto',
        message: `Similarité ${sim}% avec ${other.relativePath}`,
        similarPage: other.relativePath,
        similarityScore: sim
      });
    }
  }

  // Check duplicate titles
  const title = extractTitle(page.content);
  if (title) {
    const dupTitle = allPages.find(p => p.filePath !== page.filePath && extractTitle(p.content) === title);
    if (dupTitle) {
      issues.push({ type: 'duplicate_title', severity: 'critical', fix: 'auto', message: `Title identique à ${dupTitle.relativePath}` });
    }
  }

  // Check duplicate meta descriptions
  const desc = extractDescription(page.content);
  if (desc) {
    const dupDesc = allPages.find(p => p.filePath !== page.filePath && extractDescription(p.content) === desc);
    if (dupDesc) {
      issues.push({ type: 'duplicate_description', severity: 'warning', fix: 'auto', message: `Meta description identique à ${dupDesc.relativePath}` });
    }
  }

  return { issues: issues.map(i => ({ ...i, category: 'duplication' })) };
}

function extractText(content) {
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/import[^\n]+\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(content) {
  const m = content?.match(/title\s*:\s*[`"']([^`"']+)[`"']/);
  return m?.[1]?.trim() || null;
}

function extractDescription(content) {
  const m = content?.match(/description\s*:\s*[`"']([^`"']+)[`"']/);
  return m?.[1]?.trim() || null;
}
