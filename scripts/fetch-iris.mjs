/**
 * Récupère les zones IRIS (Îlots Regroupés pour l'Information Statistique)
 * de Clermont-Ferrand depuis le portail Opendatasoft public.
 *
 * Usage : node scripts/fetch-iris.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');

const URL =
  'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-france-iris/records' +
  '?where=com_code%3D%2263113%22' +
  '&limit=100' +
  '&select=iris_code,iris_name,iris_type,geo_point_2d';

fs.mkdirSync(OUT_DIR, { recursive: true });

function num(v) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function pickFirst(v) {
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

async function main() {
  console.log('[iris] fetching IRIS zones for Clermont-Ferrand (63113)...');
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const records = json.results ?? [];
  console.log(`  ${records.length} records`);

  const zones = records
    .map((r) => {
      const code = pickFirst(r.iris_code);
      const nom = pickFirst(r.iris_name);
      const type = pickFirst(r.iris_type) || '';
      const geo = r.geo_point_2d || {};
      const lat = num(geo.lat);
      const lng = num(geo.lon);
      if (!code || !nom || lat === null || lng === null) return null;
      return {
        code: String(code),
        nom: String(nom).trim(),
        type: String(type).trim(),
        lat,
        lng,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

  const payload = {
    meta: {
      updated: new Date().toISOString().slice(0, 10),
      source: 'Opendatasoft (georef-france-iris) — INSEE',
      commune: 'Clermont-Ferrand (63113)',
      total: zones.length,
    },
    zones,
  };

  const out = path.join(OUT_DIR, 'iris-clermont.json');
  fs.writeFileSync(out, JSON.stringify(payload, null, 2));
  console.log(`\n  wrote ${out} (${zones.length} zones IRIS)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
