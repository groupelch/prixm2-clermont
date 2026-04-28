/**
 * Récupère les équipements publics de Clermont-Ferrand depuis l'API Open Data
 * (écoles, parcs, crèches) et les sauvegarde dans public/data/.
 *
 * Usage : node scripts/fetch-amenities.mjs
 *
 * API : https://opendata.clermont-ferrand.fr/api/explore/v2.1
 * 100% publique, aucune clé requise.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
const BASE = 'https://opendata.clermont-ferrand.fr/api/explore/v2.1';

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Pagination simple : on récupère par pages de 100 jusqu'à épuisement.
 */
async function fetchAll(datasetUrl) {
  const all = [];
  const limit = 100;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const url = new URL(datasetUrl);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} on ${url.toString()}`);
    }
    const json = await res.json();
    if (typeof json.total_count === 'number') total = json.total_count;
    const records = json.results ?? [];
    all.push(...records);
    if (records.length === 0) break;
    offset += records.length;
    if (offset >= 1000) break; // garde-fou
  }
  return all;
}

function writeJson(name, data) {
  const out = path.join(OUT_DIR, name);
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log(`  wrote ${out} (${data.length} items)`);
}

function num(v) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/* ---------- 1. Écoles ---------- */
async function fetchEcoles() {
  console.log('\n[ecoles] fetching...');
  const url = `${BASE}/catalog/datasets/adresse-et-geolocalisation-des-etablissements-d-enseignement-du-premier-et-seco0/records`;
  const records = await fetchAll(url);

  const out = records
    .map((r) => {
      const lat = num(r.latitude);
      const lng = num(r.longitude);
      if (lat === null || lng === null) return null;
      const nom = r.appellation_officielle || r.denomination_principale || 'École';
      const type = r.denomination_principale || 'Établissement scolaire';
      return {
        nom: String(nom).trim(),
        type: String(type).trim(),
        lat,
        lng,
      };
    })
    .filter(Boolean);

  writeJson('amenities-ecoles.json', out);
}

/* ---------- 2. Parcs ---------- */
async function fetchParcs() {
  console.log('\n[parcs] fetching...');
  const url = new URL(`${BASE}/catalog/datasets/parcs-et-jardins-ville-de-clermont-ferrand/records`);
  url.searchParams.set('where', 'commune="Clermont-Ferrand"');
  const records = await fetchAll(url.toString());

  const out = records
    .map((r) => {
      const geo = r.geo_point_2d || {};
      const lat = num(geo.lat);
      const lng = num(geo.lon);
      if (lat === null || lng === null) return null;
      const nom = r.nom || 'Espace vert';
      const type = r.type || 'Parc';
      const surface = r.surface ? `${Math.round(Number(r.surface))} m²` : undefined;
      return {
        nom: String(nom).trim(),
        type: String(type).trim(),
        lat,
        lng,
        ...(surface ? { extra: surface } : {}),
      };
    })
    .filter(Boolean);

  writeJson('amenities-parcs.json', out);
}

/* ---------- 3. Crèches ---------- */
async function fetchCreches() {
  console.log('\n[creches] fetching...');
  const url = `${BASE}/catalog/datasets/structures-d-accueil-petite-enfance-ville-de-clermont-ferrand/records`;
  const records = await fetchAll(url);

  const out = records
    .map((r) => {
      // geo_point peut être une string "lat, lng" ou un objet { lat, lon }
      let lat = null;
      let lng = null;
      const gp = r.geo_point ?? r.geo_point_2d;
      if (typeof gp === 'string') {
        const parts = gp.split(',').map((s) => s.trim());
        lat = num(parts[0]);
        lng = num(parts[1]);
      } else if (gp && typeof gp === 'object') {
        lat = num(gp.lat);
        lng = num(gp.lon);
      }
      if (lat === null || lng === null) return null;
      const nom = r.nomaccueil || 'Structure petite enfance';
      const type = r.type || 'Crèche';
      const cap = r.capaciteaccueil ? `${r.capaciteaccueil} places` : undefined;
      return {
        nom: String(nom).trim(),
        type: String(type).trim(),
        lat,
        lng,
        ...(cap ? { extra: cap } : {}),
      };
    })
    .filter(Boolean);

  writeJson('amenities-creches.json', out);
}

async function main() {
  await fetchEcoles();
  await fetchParcs();
  await fetchCreches();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
