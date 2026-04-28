import fs from "fs";
import path from "path";

export interface DvfTransaction {
  date: string;
  type: "Appartement" | "Maison" | string;
  prix: number;
  surface: number;
  prix_m2: number;
  pieces: number | null;
  lat: number;
  lng: number;
  annee: number;
}

interface DvfFile {
  meta: { updated: string; total: number; source?: string; commune?: string };
  transactions: DvfTransaction[];
}

export interface DvfTypeStats {
  prix_m2_median: number;
  nb_transactions: number;
  evolution_pct: number;
  prix_m2_min: number;
  prix_m2_max: number;
}

export interface DvfDerniereVente {
  date: string;
  type: string;
  prix: number;
  surface: number;
  prix_m2: number;
}

export interface DvfStatsBySize {
  t1: DvfTypeStats | null; // <35 m²
  t2: DvfTypeStats | null; // 35-55 m²
  t3: DvfTypeStats | null; // 55-80 m²
  t4plus: DvfTypeStats | null; // >80 m²
}

export interface DvfStats {
  appartements: DvfTypeStats | null;
  maisons: DvfTypeStats | null;
  par_taille: DvfStatsBySize;
  dernieres_ventes: DvfDerniereVente[];
  rayon_km: number;
  total: number;
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

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

// Lecture lazy + cache module (le fichier peut faire >1 MB).
let _cache: DvfFile | null = null;
function loadDvf(): DvfFile {
  if (_cache) return _cache;
  const file = path.join(process.cwd(), "public", "data", "dvf-transactions.json");
  const raw = fs.readFileSync(file, "utf-8");
  _cache = JSON.parse(raw) as DvfFile;
  return _cache;
}

function statsForType(rows: DvfTransaction[]): DvfTypeStats | null {
  if (!rows.length) return null;
  const prixM2 = rows.map((r) => r.prix_m2);
  const med = median(prixM2);

  // Evolution : médiane 2024 vs médiane 2022
  const m2022 = rows.filter((r) => r.annee === 2022).map((r) => r.prix_m2);
  const m2024 = rows.filter((r) => r.annee === 2024).map((r) => r.prix_m2);
  const med22 = median(m2022);
  const med24 = median(m2024);
  const evolution =
    med22 > 0 && med24 > 0 ? Number((((med24 - med22) / med22) * 100).toFixed(1)) : 0;

  return {
    prix_m2_median: med,
    nb_transactions: rows.length,
    evolution_pct: evolution,
    prix_m2_min: Math.min(...prixM2),
    prix_m2_max: Math.max(...prixM2),
  };
}

/**
 * Stats DVF agrégées sur toutes les transactions situées dans un rayon
 * autour d'un point (centre de quartier).
 */
export function getDvfStatsForQuartier(
  lat: number,
  lng: number,
  radiusKm = 1.0,
): DvfStats {
  const data = loadDvf();
  const inRadius = data.transactions.filter(
    (t) => haversine(lat, lng, t.lat, t.lng) <= radiusKm,
  );

  const apparts = inRadius.filter((t) => t.type === "Appartement");
  const maisons = inRadius.filter((t) => t.type === "Maison");

  const dernieres = [...inRadius]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5)
    .map((t) => ({
      date: t.date,
      type: t.type,
      prix: t.prix,
      surface: t.surface,
      prix_m2: t.prix_m2,
    }));

  // Stats par taille (uniquement appartements)
  const statsForRows = (rows: DvfTransaction[]): DvfTypeStats | null => {
    if (rows.length < 3) return null; // pas assez de données
    return statsForType(rows);
  };
  const par_taille: DvfStatsBySize = {
    t1: statsForRows(apparts.filter((t) => t.surface < 35)),
    t2: statsForRows(apparts.filter((t) => t.surface >= 35 && t.surface < 55)),
    t3: statsForRows(apparts.filter((t) => t.surface >= 55 && t.surface < 80)),
    t4plus: statsForRows(apparts.filter((t) => t.surface >= 80)),
  };

  return {
    appartements: statsForType(apparts),
    maisons: statsForType(maisons),
    par_taille,
    dernieres_ventes: dernieres,
    rayon_km: radiusKm,
    total: inRadius.length,
    meta: { updated: data.meta.updated },
  };
}

export interface DvfAnneeStats {
  annee: number;
  apparts_median: number | null;
  maisons_median: number | null;
  nb_transactions: number;
}

/**
 * Historique annuel (2021-2024) des prix médians appart/maison sur un rayon
 * autour d'un point. Utilisé pour les graphiques d'évolution.
 */
export function getDvfHistoryForQuartier(
  lat: number,
  lng: number,
  radiusKm = 1.0,
): DvfAnneeStats[] {
  const data = loadDvf();
  const inRadius = data.transactions.filter(
    (t) => haversine(lat, lng, t.lat, t.lng) <= radiusKm,
  );

  const annees = [2021, 2022, 2023, 2024];
  return annees.map((annee) => {
    const ofYear = inRadius.filter((t) => t.annee === annee);
    const apparts = ofYear.filter((t) => t.type === "Appartement").map((t) => t.prix_m2);
    const maisons = ofYear.filter((t) => t.type === "Maison").map((t) => t.prix_m2);
    const apMed = apparts.length >= 3 ? median(apparts) : null;
    const maMed = maisons.length >= 3 ? median(maisons) : null;
    return {
      annee,
      apparts_median: apMed,
      maisons_median: maMed,
      nb_transactions: ofYear.length,
    };
  });
}
