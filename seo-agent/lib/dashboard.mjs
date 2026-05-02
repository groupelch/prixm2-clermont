import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { formatDuration } from './utils.mjs';

export async function updateDashboard(seoDir, data) {
  const {
    cycleNumber, timeRemaining, totalDuration,
    pagesTotal, pagesTreated, scoresAfter,
    actionsApplied = [], actionsToValidate = []
  } = data;

  const avgScore = scoresAfter?.length
    ? Math.round(scoresAfter.reduce((s, p) => s + (p.score?.global ?? 0), 0) / scoresAfter.length)
    : 0;

  const percentDone = Math.min(100, Math.round(((totalDuration - timeRemaining) / totalDuration) * 100));
  const pagesPercent = pagesTotal ? Math.round((pagesTreated / pagesTotal) * 100) : 0;

  const recentActions = actionsApplied.slice(-10).reverse();

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="30">
<title>Boucle SEO — Dashboard</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; background: #0B0B0B; color: #E5E5E5; padding: 24px; min-height: 100vh; }
  h1 { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .card { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; }
  .card-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 8px; }
  .card-value { font-size: 32px; font-weight: 700; color: #fff; }
  .card-value.green { color: #4ADE80; }
  .card-value.yellow { color: #FACC15; }
  .card-value.red { color: #F87171; }
  .card-sub { font-size: 12px; color: #666; margin-top: 4px; }
  .progress-bar { height: 8px; background: #2A2A2A; border-radius: 4px; overflow: hidden; margin: 8px 0; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #3B82F6, #8B5CF6); border-radius: 4px; transition: width 0.5s; }
  .section-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 12px; }
  .list { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
  .list-item { font-size: 12px; color: #AAA; padding: 6px 0; border-bottom: 1px solid #2A2A2A; }
  .list-item:last-child { border-bottom: none; }
  .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; text-transform: uppercase; }
  .tag-auto { background: #1E3A2A; color: #4ADE80; }
  .tag-validate { background: #3A2A1E; color: #FACC15; }
  .badge-score { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .badge-good { background: #1E3A2A; color: #4ADE80; }
  .badge-medium { background: #3A3A1E; color: #FACC15; }
  .badge-weak { background: #3A1E1E; color: #F87171; }
  .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; margin-right: 6px; animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  footer { text-align: center; font-size: 11px; color: #444; margin-top: 24px; }
</style>
</head>
<body>
<h1><span class="status-dot"></span>Boucle SEO / Audit</h1>
<p class="subtitle">Dernier rafraîchissement : ${new Date().toLocaleString('fr-FR')} · Cycle ${cycleNumber}</p>

<div class="grid">
  <div class="card">
    <div class="card-label">Temps restant</div>
    <div class="card-value ${timeRemaining < 3600000 ? 'yellow' : ''}">${formatDuration(Math.max(0, timeRemaining))}</div>
    <div class="progress-bar"><div class="progress-fill" style="width:${percentDone}%"></div></div>
    <div class="card-sub">${percentDone}% écoulé</div>
  </div>
  <div class="card">
    <div class="card-label">Cycle en cours</div>
    <div class="card-value">${cycleNumber}</div>
  </div>
  <div class="card">
    <div class="card-label">Pages traitées</div>
    <div class="card-value green">${pagesTreated}</div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pagesPercent}%"></div></div>
    <div class="card-sub">sur ${pagesTotal} pages · ${pagesPercent}%</div>
  </div>
  <div class="card">
    <div class="card-label">Score moyen</div>
    <div class="card-value ${avgScore >= 75 ? 'green' : avgScore >= 60 ? 'yellow' : 'red'}">${avgScore}<span style="font-size:16px">/100</span></div>
  </div>
  <div class="card">
    <div class="card-label">Corrections auto</div>
    <div class="card-value green">${actionsApplied.length}</div>
    <div class="card-sub">ce cycle</div>
  </div>
  <div class="card">
    <div class="card-label">À valider</div>
    <div class="card-value ${actionsToValidate.length > 0 ? 'yellow' : ''}">${actionsToValidate.length}</div>
    <div class="card-sub">actions humaines requises</div>
  </div>
</div>

<p class="section-title">Scores du cycle ${cycleNumber}</p>
<div class="list">
${scoresAfter?.length
  ? scoresAfter.map(s => {
      const g = s.score?.global ?? 0;
      const cls = g >= 75 ? 'badge-good' : g >= 60 ? 'badge-medium' : 'badge-weak';
      return `<div class="list-item"><span class="badge-score ${cls}">${g}/100</span> &nbsp; ${s.page}</div>`;
    }).join('')
  : '<div class="list-item" style="color:#555">Aucune donnée</div>'}
</div>

<p class="section-title">Dernières corrections appliquées</p>
<div class="list">
${recentActions.length
  ? recentActions.map(a => `<div class="list-item"><span class="tag tag-auto">AUTO</span> &nbsp; <strong>${a.page}</strong> — ${a.description}</div>`).join('')
  : '<div class="list-item" style="color:#555">Aucune correction ce cycle</div>'}
</div>

${actionsToValidate.length > 0 ? `
<p class="section-title">Actions en attente de validation</p>
<div class="list">
${actionsToValidate.map(a => `<div class="list-item"><span class="tag tag-validate">HUMAIN</span> &nbsp; <strong>${a.page}</strong> — ${a.action}</div>`).join('')}
</div>` : ''}

<footer>Boucle SEO / Audit · Groupe LCH · Rafraîchissement auto toutes les 30s</footer>
</body>
</html>`;

  await writeFile(join(seoDir, 'dashboard.html'), html, 'utf-8');
}
