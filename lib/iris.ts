import fs from "fs";
import path from "path";

export type IrisProfil = "populaire" | "intermédiaire" | "aisé" | "premium";

export interface IrisZone {
  code: string;
  nom: string;
  type: string;
  lat: number;
  lng: number;
}

interface IrisFile {
  meta: {
    updated: string;
    source?: string;
    commune?: string;
    total: number;
  };
  zones: IrisZone[];
}

export interface IrisZoneProche {
  code: string;
  nom: string;
  type: string;
  distance_m: number;
}

export interface IrisStats {
  zones: IrisZoneProche[];
  prix_m2_median_iris: number;
  nb_ventes_recentes: number;
  profil: IrisProfil;
  rayon_km: number;
  meta: { updated: string };
}

interface DvfTransaction {
  date: string;
  type: string;
  prix_m2: number;
  lat: number;
  lng: number;
  annee: number;
}

interface DvfFile {
  meta: { updated: string };
  transactions: DvfTransaction[];
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

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

let _irisCache: IrisFile | null = null;
function loadIris(): IrisFile {
  if (_irisCache) return _irisCache;
  const file = path.join(process.cwd(), "public", "data", "iris-clermont.json");
  const raw = fs.readFileSync(file, "utf-8");
  _irisCache = JSON.parse(raw) as IrisFile;
  return _irisCache;
}

let _dvfCache: DvfFile | null = null;
function loadDvf(): DvfFile {
  if (_dvfCache) return _dvfCache;
  const file = path.join(process.cwd(), "public", "data", "dvf-transactions.json");
  const raw = fs.readFileSync(file, "utf-8");
  _dvfCache = JSON.parse(raw) as DvfFile;
  return _dvfCache;
}

function profilFromPrix(prix: number): IrisProfil {
  if (prix < 2000) return "populaire";
  if (prix < 3000) return "intermédiaire";
  if (prix < 4000) return "aisé";
  return "premium";
}

/**
 * Stats agrégées sur les zones IRIS et DVF dans un rayon autour d'un point.
 * - zones : zones IRIS dont le centroïde tombe dans le rayon
 * - prix_m2_median_iris : médiane DVF dans le même rayon
 * - profil : segmentation marché (populaire / intermédiaire / aisé / premium)
 */
export function getIrisStatsForQuartier(
  lat: number,
  lng: number,
  radiusKm = 1.2,
): IrisStats {
  const irisData = loadIris();
  const dvfData = loadDvf();

  const zones: IrisZoneProche[] = irisData.zones
    .map((z) => ({
      code: z.code,
      nom: z.nom,
      type: z.type,
      distance_m: Math.round(haversine(lat, lng, z.lat, z.lng) * 1000),
    }))
    .filter((z) => z.distance_m <= radiusKm * 1000)
    .sort((a, b) => a.distance_m - b.distance_m);

  const inRadius = dvfData.transactions.filter(
    (t) => haversine(lat, lng, t.lat, t.lng) <= radiusKm,
  );
  const prixM2 = inRadius.map((t) => t.prix_m2);
  const med = median(prixM2);
  const recentes = inRadius.filter((t) => t.annee === 2023 || t.annee === 2024).length;

  return {
    zones,
    prix_m2_median_iris: med,
    nb_ventes_recentes: recentes,
    profil: profilFromPrix(med),
    rayon_km: radiusKm,
    meta: { updated: irisData.meta.updated },
  };
}
