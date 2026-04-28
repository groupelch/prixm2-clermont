import fs from "fs";
import path from "path";

export type TransportType = "bus" | "tram" | "bus+tram";

export interface TransportArret {
  nom: string;
  type: TransportType;
  lat: number;
  lng: number;
}

interface TransportFile {
  meta: {
    updated: string;
    source?: string;
    total: number;
    total_bus: number;
    total_tram: number;
  };
  arrets: TransportArret[];
}

export interface TransportArretProche {
  nom: string;
  lat: number;
  lng: number;
  /** Distance en mètres au point de référence. */
  distance_m: number;
}

export interface TransportStats {
  arrets_bus: TransportArretProche[];
  arrets_tram: TransportArretProche[];
  /** Score 0-100 calculé sur le rayon. */
  score_accessibilite: number;
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

let _cache: TransportFile | null = null;
function load(): TransportFile {
  if (_cache) return _cache;
  const file = path.join(process.cwd(), "public", "data", "transport-t2c.json");
  const raw = fs.readFileSync(file, "utf-8");
  _cache = JSON.parse(raw) as TransportFile;
  return _cache;
}

/**
 * Score d'accessibilité 0-100.
 * Pondère lourdement le tram (3x) qui est structurant à CLF, plafonne pour
 * éviter un score qui sature. 1 tram + 8 bus dans le rayon = score ~70.
 */
function computeScore(nbBus: number, nbTram: number): number {
  const raw = nbTram * 3 + nbBus;
  // Saturation douce : 25 points = score 100
  const score = Math.min(100, Math.round((raw / 25) * 100));
  return score;
}

/**
 * Renvoie les arrêts T2C (bus + tram) dans un rayon autour d'un point,
 * triés par proximité, avec un score d'accessibilité agrégé.
 */
export function getTransportForQuartier(
  lat: number,
  lng: number,
  radiusKm = 1.0,
): TransportStats {
  const data = load();

  const bus: TransportArretProche[] = [];
  const tram: TransportArretProche[] = [];

  for (const a of data.arrets) {
    const dKm = haversine(lat, lng, a.lat, a.lng);
    if (dKm > radiusKm) continue;
    const distance_m = Math.round(dKm * 1000);
    const item: TransportArretProche = { nom: a.nom, lat: a.lat, lng: a.lng, distance_m };
    if (a.type === "tram" || a.type === "bus+tram") tram.push({ ...item });
    if (a.type === "bus" || a.type === "bus+tram") bus.push({ ...item });
  }

  bus.sort((a, b) => a.distance_m - b.distance_m);
  tram.sort((a, b) => a.distance_m - b.distance_m);

  return {
    arrets_bus: bus,
    arrets_tram: tram,
    score_accessibilite: computeScore(bus.length, tram.length),
    rayon_km: radiusKm,
    meta: { updated: data.meta.updated },
  };
}
