import ecolesData from "@/public/data/amenities-ecoles.json";
import parcsData from "@/public/data/amenities-parcs.json";
import crechesData from "@/public/data/amenities-creches.json";

export interface AmenityItem {
  nom: string;
  type: string;
  lat: number;
  lng: number;
  extra?: string;
  /** Distance au point de référence (km), calculée à la volée. */
  distanceKm?: number;
}

export interface QuartierAmenities {
  ecoles: AmenityItem[];
  parcs: AmenityItem[];
  creches: AmenityItem[];
}

const ecoles = ecolesData as AmenityItem[];
const parcs = parcsData as AmenityItem[];
const creches = crechesData as AmenityItem[];

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Distance Haversine entre deux points (km). */
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

function filterWithin(
  items: AmenityItem[],
  lat: number,
  lng: number,
  radiusKm: number,
): AmenityItem[] {
  return items
    .map((item) => ({
      ...item,
      distanceKm: haversine(lat, lng, item.lat, item.lng),
    }))
    .filter((item) => (item.distanceKm ?? Infinity) <= radiusKm)
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

/**
 * Renvoie les équipements (écoles, parcs, crèches) situés dans un rayon donné
 * autour des coordonnées d'un quartier.
 *
 * @param lat       latitude du centre du quartier
 * @param lng       longitude du centre du quartier
 * @param radiusKm  rayon en km (défaut 1.2 km)
 */
export function getAmenitiesForQuartier(
  lat: number,
  lng: number,
  radiusKm = 1.2,
): QuartierAmenities {
  return {
    ecoles: filterWithin(ecoles, lat, lng, radiusKm),
    parcs: filterWithin(parcs, lat, lng, radiusKm),
    creches: filterWithin(creches, lat, lng, radiusKm),
  };
}
