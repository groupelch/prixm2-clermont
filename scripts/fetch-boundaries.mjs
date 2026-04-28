/**
 * Récupère les polygones GeoJSON de chaque quartier/commune
 * depuis l'API Nominatim (OpenStreetMap) et les sauvegarde
 * dans public/data/boundaries.json
 *
 * Usage : node scripts/fetch-boundaries.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Liste des zones à chercher : [slug, terme de recherche, ville]
const ZONES = [
  // Quartiers Clermont-Ferrand
  ["clermont-ferrand-centre-ville",    "Centre-Ville, Clermont-Ferrand"],
  ["clermont-ferrand-jaude",           "Jaude, Clermont-Ferrand"],
  ["clermont-ferrand-montferrand",     "Montferrand, Clermont-Ferrand"],
  ["clermont-ferrand-salins",          "Les Salins, Clermont-Ferrand"],
  ["clermont-ferrand-fontgieve",       "Fontgieve, Clermont-Ferrand"],
  ["clermont-ferrand-chanturgue",      "Chanturgue, Clermont-Ferrand"],
  ["clermont-ferrand-la-glaciere",     "La Glacière, Clermont-Ferrand"],
  ["clermont-ferrand-les-cezeaux",     "Les Cézeaux, Clermont-Ferrand"],
  ["clermont-ferrand-saint-jacques",   "Saint-Jacques, Clermont-Ferrand"],
  ["clermont-ferrand-la-gare",         "La Gare, Clermont-Ferrand"],
  ["clermont-ferrand-carmes",          "Les Carmes, Clermont-Ferrand"],
  ["clermont-ferrand-blaise-pascal",   "Blaise Pascal, Clermont-Ferrand"],
  ["clermont-ferrand-oradou",          "Oradou, Clermont-Ferrand"],
  ["clermont-ferrand-la-plaine",       "La Plaine, Clermont-Ferrand"],
  ["clermont-ferrand-la-pradelle",     "La Pradelle, Clermont-Ferrand"],
  ["clermont-ferrand-trudaine",        "Trudaine, Clermont-Ferrand"],
  ["clermont-ferrand-delille",         "Delille, Clermont-Ferrand"],
  ["clermont-ferrand-cote-blatin",     "Côte-Blatin, Clermont-Ferrand"],
  ["clermont-ferrand-vallieres",       "Vallières, Clermont-Ferrand"],
  ["clermont-ferrand-beaumont",        "Beaumont, Clermont-Ferrand"],
  ["clermont-ferrand-la-pardieu",      "La Pardieu, Clermont-Ferrand"],
  ["clermont-ferrand-croix-de-neyrat", "Croix-de-Neyrat, Clermont-Ferrand"],
  ["clermont-ferrand-champratel",      "Champratel, Clermont-Ferrand"],
  ["clermont-ferrand-brezet",          "Le Brézet, Clermont-Ferrand"],
  // Communes
  ["beaumont",                 "Beaumont, Puy-de-Dôme"],
  ["chamalieres",              "Chamalières"],
  ["royat",                    "Royat"],
  ["aubiere",                  "Aubière"],
  ["ceyrat",                   "Ceyrat"],
  ["lempdes",                  "Lempdes, Puy-de-Dôme"],
  ["romagnat",                 "Romagnat"],
  ["cebazat",                  "Cébazat"],
  ["gerzat",                   "Gerzat"],
  ["riom",                     "Riom"],
  ["chatel-guyon",             "Châtel-Guyon"],
  ["perignat-les-sarlieves",   "Pérignat-lès-Sarliève"],
  ["durtol",                   "Durtol"],
  ["pont-du-chateau",          "Pont-du-Château"],
];

const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'prixm2clermontferrand/1.0 (contact@cbfconseils.com)';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchZone(slug, query) {
  const url = new URL(NOMINATIM);
  url.searchParams.set('q', query);
  url.searchParams.set('format', 'json');
  url.searchParams.set('polygon_geojson', '1');
  url.searchParams.set('limit', '1');
  url.searchParams.set('countrycodes', 'fr');

  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': USER_AGENT }
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} for ${query}`);
  const data = await res.json();

  if (!data.length || !data[0].geojson) {
    console.warn(`  ⚠️  Pas de résultat pour "${query}"`);
    return null;
  }

  const { geojson, display_name } = data[0];
  console.log(`  ✅ ${slug} → ${display_name.split(',')[0]}`);
  return { slug, geojson };
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'data');
  fs.mkdirSync(outDir, { recursive: true });

  const results = {};
  let ok = 0, fail = 0;

  console.log(`\nRécupération de ${ZONES.length} zones depuis Nominatim...\n`);

  for (const [slug, query] of ZONES) {
    try {
      const result = await fetchZone(slug, query);
      if (result) {
        results[slug] = result.geojson;
        ok++;
      } else {
        fail++;
      }
    } catch (err) {
      console.error(`  ❌ ${slug} : ${err.message}`);
      fail++;
    }
    // Respect du rate-limit Nominatim (1 req/s)
    await sleep(1100);
  }

  const outPath = path.join(outDir, 'boundaries.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ ${ok} zones sauvegardées, ${fail} non trouvées`);
  console.log(`📁 ${outPath}`);
}

main().catch(console.error);
