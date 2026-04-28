import fs from "fs";
import path from "path";

export type DpeLabel = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface DpeItem {
  dpe: DpeLabel;
  type: string | null;
  periode: string | null;
  lat: number;
  lng: number;
}

interface DpeFile {
  meta: { updated: string; total: number; source?: string; commune?: string };
  items: DpeItem[];
}

export interface DpeStats {
  total: number;
  distribution: Record<DpeLabel, number>;
  pct_bon: number;
  pct_mauvais: number;
  label_dominant: DpeLabel | null;
  rayon_km: number;
  meta: { updated: string };
}

const EARTH_RADIUS_KM = 6371;
const toRad = (deg: number) => (deg * Math.PI) / 180;

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

let _cache: DpeFile | null = null;
function loadDpe(): DpeFile {
  if (_cache) return _cache;
  const file = path.join(process.cwd(), "public", "data", "dpe-clermont.json");
  const raw = fs.readFileSync(file, "utf-8");
  _cache = JSON.parse(raw) as DpeFile;
  return _cache;
}

const EMPTY: Record<DpeLabel, number> = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };

export function getDpeStatsForQuartier(
  lat: number,
  lng: number,
  radiusKm = 1.0,
): DpeStats {
  const data = loadDpe();
  const distribution: Record<DpeLabel, number> = { ...EMPTY };
  let total = 0;

  for (const item of data.items) {
    if (haversine(lat, lng, item.lat, item.lng) > radiusKm) continue;
    distribution[item.dpe]++;
    total++;
  }

  let dominant: DpeLabel | null = null;
  let max = 0;
  (Object.keys(distribution) as DpeLabel[]).forEach((k) => {
    if (distribution[k] > max) {
      max = distribution[k];
      dominant = k;
    }
  });

  const pctBon =
    total > 0
      ? Number((((distribution.A + distribution.B + distribution.C) / total) * 100).toFixed(1))
      : 0;
  const pctMauvais =
    total > 0
      ? Number((((distribution.E + distribution.F + distribution.G) / total) * 100).toFixed(1))
      : 0;

  return {
    total,
    distribution,
    pct_bon: pctBon,
    pct_mauvais: pctMauvais,
    label_dominant: dominant,
    rayon_km: radiusKm,
    meta: { updated: data.meta.updated },
  };
}
