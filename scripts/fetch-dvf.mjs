/**
 * Récupère les Demandes de Valeurs Foncières (DVF) pour Clermont-Ferrand
 * (commune INSEE 63113) sur 2021-2024 et produit un JSON consolidé
 * dans public/data/dvf-transactions.json.
 *
 * Source : https://files.data.gouv.fr/geo-dvf/latest/csv/{annee}/communes/63/63113.csv
 *
 * Usage : node scripts/fetch-dvf.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OUT_FILE = path.join(OUT_DIR, 'dvf-transactions.json');
const ANNEES = [2021, 2022, 2023, 2024];
const INSEE = '63113';

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Parse une ligne CSV en gérant les valeurs entre guillemets pouvant
 * contenir des virgules. Implémentation manuelle pour éviter une dépendance.
 */
function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function num(v) {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

async function fetchYear(year) {
  const url = `https://files.data.gouv.fr/geo-dvf/latest/csv/${year}/communes/63/${INSEE}.csv`;
  console.log(`[dvf] ${year} fetching...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  const text = await res.text();
  const lines = text.split('\n').filter((l) => l.length > 0);
  if (!lines.length) return [];

  const header = parseCsvLine(lines[0]);
  const idx = (name) => header.indexOf(name);

  const iDate = idx('date_mutation');
  const iNature = idx('nature_mutation');
  const iValeur = idx('valeur_fonciere');
  const iType = idx('type_local');
  const iSurface = idx('surface_reelle_bati');
  const iPieces = idx('nombre_pieces_principales');
  const iLng = idx('longitude');
  const iLat = idx('latitude');
  const iIdMut = idx('id_mutation');

  const seen = new Set();
  const out = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (cols.length < header.length) continue;

    const nature = cols[iNature];
    const type = cols[iType];
    if (nature !== 'Vente') continue;
    if (type !== 'Appartement' && type !== 'Maison') continue;

    const valeur = num(cols[iValeur]);
    const surface = num(cols[iSurface]);
    if (valeur === null || valeur <= 0) continue;
    if (surface === null || surface <= 9) continue;

    const lat = num(cols[iLat]);
    const lng = num(cols[iLng]);
    if (lat === null || lng === null) continue;

    // déduplication sur id_mutation + type (DVF répète l'id pour multi-lots)
    const key = `${cols[iIdMut]}|${type}|${cols[iDate]}|${valeur}|${surface}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const prixM2 = Math.round(valeur / surface);

    out.push({
      date: cols[iDate],
      type,
      prix: Math.round(valeur),
      surface: Math.round(surface),
      prix_m2: prixM2,
      pieces: num(cols[iPieces]) ?? null,
      lat: Number(lat.toFixed(6)),
      lng: Number(lng.toFixed(6)),
      annee: year,
    });
  }

  console.log(`  ${year} → ${out.length} transactions retenues (${lines.length - 1} brutes)`);
  return out;
}

async function main() {
  const all = [];
  for (const y of ANNEES) {
    const rows = await fetchYear(y);
    all.push(...rows);
  }

  // Filtrer les prix/m² aberrants — souvent ventes en lots, parts indivises, garages
  // ou erreurs de saisie. Bornes raisonnables pour Clermont-Ferrand.
  const cleaned = all.filter((t) => t.prix_m2 >= 500 && t.prix_m2 <= 8000);

  cleaned.sort((a, b) => (a.date < b.date ? 1 : -1));

  const payload = {
    meta: {
      updated: new Date().toISOString().slice(0, 10),
      source: 'data.gouv.fr / DVF',
      commune: 'Clermont-Ferrand (63113)',
      annees: ANNEES,
      total: cleaned.length,
    },
    transactions: cleaned,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(payload));
  console.log(`\nDone. ${cleaned.length} transactions → ${OUT_FILE}`);
  const sizeMb = (fs.statSync(OUT_FILE).size / 1024 / 1024).toFixed(2);
  console.log(`Taille : ${sizeMb} MB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
