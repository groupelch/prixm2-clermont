/**
 * Récupère les diagnostics DPE de l'ADEME pour Clermont-Ferrand (INSEE 63113)
 * et produit un JSON consolidé dans public/data/dpe-clermont.json.
 *
 * Source : https://data.ademe.fr/data-fair/api/v1/datasets/meg-83tjwtg8dyz4vv7h1dqe/lines
 *
 * Usage : node scripts/fetch-dpe.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OUT_FILE = path.join(OUT_DIR, 'dpe-clermont.json');

fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://data.ademe.fr/data-fair/api/v1/datasets/meg-83tjwtg8dyz4vv7h1dqe/lines';
const PAGE_SIZE = 10000;
const MAX_PAGES = 20; // garde-fou : 200k entrées max

function num(v) {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function parseGeopoint(gp) {
  if (!gp || typeof gp !== 'string') return [null, null];
  const parts = gp.split(',').map((s) => s.trim());
  return [num(parts[0]), num(parts[1])];
}

async function fetchPage(after) {
  const url = new URL(BASE);
  url.searchParams.set('qs', 'code_insee_ban:63113');
  url.searchParams.set('select', 'etiquette_dpe,type_batiment,periode_construction,_geopoint');
  url.searchParams.set('size', String(PAGE_SIZE));
  if (after) url.searchParams.set('after', after);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url.toString()}`);
  return res.json();
}

async function main() {
  const items = [];
  let after = null;
  let total = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    console.log(`[dpe] page ${page + 1}${after ? ` (after=${after})` : ''}...`);
    const json = await fetchPage(after);
    if (typeof json.total === 'number') total = json.total;
    const results = json.results ?? [];
    if (!results.length) break;

    for (const r of results) {
      const [lat, lng] = parseGeopoint(r._geopoint);
      if (lat === null || lng === null) continue;
      const dpe = r.etiquette_dpe;
      if (!dpe || !'ABCDEFG'.includes(dpe)) continue;
      items.push({
        dpe,
        type: r.type_batiment ?? null,
        periode: r.periode_construction ?? null,
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6)),
      });
    }

    console.log(`  ${results.length} reçus → total accumulé ${items.length}${total !== null ? ` / ${total}` : ''}`);
    after = json.next ? new URL(json.next).searchParams.get('after') : null;
    if (!after) break;
    if (results.length < PAGE_SIZE) break;
  }

  const payload = {
    meta: {
      updated: new Date().toISOString().slice(0, 10),
      source: 'ADEME — DPE (data.ademe.fr)',
      commune: 'Clermont-Ferrand (63113)',
      total: items.length,
    },
    items,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(payload));
  const sizeMb = (fs.statSync(OUT_FILE).size / 1024 / 1024).toFixed(2);
  console.log(`\nDone. ${items.length} DPE → ${OUT_FILE} (${sizeMb} MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
