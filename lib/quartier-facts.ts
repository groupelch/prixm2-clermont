import { getAmenitiesForQuartier } from "@/lib/amenities";
import { getTransportForQuartier } from "@/lib/transport";

export interface QuartierFact {
  ecoles_proches: Array<{ nom: string; type: string; distanceM: number }>;
  parcs_proches: Array<{ nom: string; surface?: string; distanceM: number }>;
  creches_proches: Array<{ nom: string; distanceM: number }>;
  nb_arrets_bus: number;
  nb_arrets_tram: number;
  score_transport: number;
}

export function getQuartierFacts(lat: number, lng: number, radiusKm = 1.2): QuartierFact {
  const amenities = getAmenitiesForQuartier(lat, lng, radiusKm);
  const transport = getTransportForQuartier(lat, lng);

  return {
    ecoles_proches: amenities.ecoles.slice(0, 3).map((e) => ({
      nom: e.nom,
      type: e.type,
      distanceM: Math.round((e.distanceKm ?? 0) * 1000),
    })),
    parcs_proches: amenities.parcs.slice(0, 3).map((p) => ({
      nom: p.nom,
      surface: p.extra,
      distanceM: Math.round((p.distanceKm ?? 0) * 1000),
    })),
    creches_proches: amenities.creches.slice(0, 2).map((c) => ({
      nom: c.nom,
      distanceM: Math.round((c.distanceKm ?? 0) * 1000),
    })),
    nb_arrets_bus: transport.arrets_bus.length,
    nb_arrets_tram: transport.arrets_tram.length,
    score_transport: transport.score_accessibilite,
  };
}
