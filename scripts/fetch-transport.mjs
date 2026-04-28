/**
 * Récupère les arrêts du réseau T2C (bus + tramway) de Clermont Auvergne
 * Métropole depuis OpenStreetMap via l'API Overpass.
 *
 * Usage : node scripts/fetch-transport.mjs
 *
 * API : https://overpass-api.de/api/interpreter (gratuite, sans clé)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Bounding box englobant Clermont-Ferrand et son agglomération
const BBOX = '45.70,2.95,45.85,3.20';

fs.mkdirSync(OUT_DIR, { recursive: true });

async function overpass(query) {
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'prixm2-clermont/1.0 (CBF Conseils, lc.groupelch@gmail.com)',
      'Accept': 'application/json',
    },
    body: 'data=' + encodeURIComponent(query),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Overpass HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  return json.elements ?? [];
}

function num(v) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalize(s) {
  if (!s) return '';
  return String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

async function main() {
  console.log('[transport] fetching bus stops T2C...');
  // L'opérateur "T2C" est plus stable que le tag network (qui vaut "SMTC-AC" sur la plupart des arrêts).
  // On combine stop_position + highway=bus_stop pour couvrir toutes les conventions de tagging.
  const busQuery = `[out:json][timeout:35];(node["public_transport"="stop_position"]["operator"~"T2C",i](${BBOX});node["highway"="bus_stop"]["operator"~"T2C",i](${BBOX}););out body;`;
  const busElements = await overpass(busQuery);
  console.log(`  ${busElements.length} bus elements`);

  console.log('[transport] fetching tram stops...');
  const tramQuery = `[out:json][timeout:35];node["railway"="tram_stop"](${BBOX});out body;`;
  const tramElements = await overpass(tramQuery);
  console.log(`  ${tramElements.length} tram elements`);

  // Index par nom normalisé pour fusionner bus + tram et déduper
  const map = new Map();

  function add(el, kind) {
    const lat = num(el.lat);
    const lng = num(el.lon);
    if (lat === null || lng === null) return;
    const tags = el.tags || {};
    const nom = (tags.name || tags['name:fr'] || '').trim();
    if (!nom) return;
    const key = normalize(nom);
    if (!key) return;

    const existing = map.get(key);
    if (existing) {
      // Mise à jour du type si nécessaire
      if (existing.type !== kind && existing.type !== 'bus+tram') {
        existing.type = 'bus+tram';
      }
      // Garde le premier point, ignore le doublon
      return;
    }

    // Détection bus + tram via les tags
    let type = kind;
    if (kind === 'bus' && (tags.tram === 'yes' || tags.train === 'yes')) {
      type = 'bus+tram';
    }
    if (kind === 'tram' && tags.bus === 'yes') {
      type = 'bus+tram';
    }

    map.set(key, { nom, type, lat, lng });
  }

  for (const el of busElements) add(el, 'bus');
  for (const el of tramElements) add(el, 'tram');

  const arrets = [...map.values()].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

  const total_bus = arrets.filter((a) => a.type === 'bus' || a.type === 'bus+tram').length;
  const total_tram = arrets.filter((a) => a.type === 'tram' || a.type === 'bus+tram').length;

  const payload = {
    meta: {
      updated: new Date().toISOString().slice(0, 10),
      source: 'OpenStreetMap contributors (Overpass API)',
      total: arrets.length,
      total_bus,
      total_tram,
    },
    arrets,
  };

  const out = path.join(OUT_DIR, 'transport-t2c.json');
  fs.writeFileSync(out, JSON.stringify(payload, null, 2));
  console.log(`\n  wrote ${out}`);
  console.log(`  total: ${arrets.length} arrêts (bus: ${total_bus}, tram: ${total_tram})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
