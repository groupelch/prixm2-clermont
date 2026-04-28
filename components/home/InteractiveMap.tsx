"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from "react-leaflet";
import type { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { quartiers, getPriceTier } from "@/data/quartiers";
import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

// ─── Gradient de couleur selon le prix ──────────────────────────────────────
// Vert (#22c55e) → Jaune (#eab308) → Rouge (#dc2626)
// Plage : 1 700 €/m² (min) → 2 800 €/m² (max)
const PRICE_MIN = 1700;
const PRICE_MAX = 2800;

function priceToColor(prix: number): string {
  const t = Math.max(0, Math.min(1, (prix - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)));

  let r: number, g: number, b: number;
  if (t < 0.5) {
    // vert → jaune
    const s = t * 2;
    r = Math.round(34  + (234 - 34)  * s);
    g = Math.round(197 + (179 - 197) * s);
    b = Math.round(94  + (8   - 94)  * s);
  } else {
    // jaune → rouge
    const s = (t - 0.5) * 2;
    r = Math.round(234 + (220 - 234) * s);
    g = Math.round(179 + (38  - 179) * s);
    b = Math.round(8   + (38  - 8)   * s);
  }
  return `rgb(${r},${g},${b})`;
}

// ─── Composant utilitaire ────────────────────────────────────────────────────
function MapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

function QuartierPopup({ q }: { q: Quartier }) {
  const refPrix = q.prixAppartement ?? q.prixMaison ?? 2000;
  return (
    <div className="font-inter text-cbf-black min-w-[180px]">
      <p className="font-playfair font-bold text-base mb-1">{q.nom}</p>
      <p className="text-xs text-cbf-gray-light uppercase tracking-wider mb-2">
        {q.type === "quartier" ? "Quartier" : "Commune"}
      </p>
      <p className="text-sm font-semibold text-cbf-gold mb-2">
        {formatPricePerM2(refPrix)}
      </p>
      <Link
        href={`/prix-m2/${q.slug}`}
        className="text-xs text-cbf-black underline hover:text-cbf-gold"
      >
        Voir les détails →
      </Link>
    </div>
  );
}

// ─── Légende ─────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm border border-cbf-gray-soft rounded-sm p-3 shadow-md">
      <p className="font-semibold text-cbf-black mb-2 uppercase tracking-wider text-[0.6rem]">
        Prix au m²
      </p>
      <div className="flex items-center gap-2">
        <div
          className="w-28 h-3 rounded-full"
          style={{
            background: "linear-gradient(to right, rgb(34,197,94), rgb(234,179,8), rgb(220,38,38))",
          }}
        />
      </div>
      <div className="flex justify-between text-[0.6rem] text-cbf-gray-light mt-1 w-28">
        <span>&lt; 1 700 €</span>
        <span>&gt; 2 700 €</span>
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function InteractiveMap() {
  const [boundaries, setBoundaries] = useState<Record<string, GeoJSON.Geometry | null>>({});

  useEffect(() => {
    fetch("/data/boundaries.json")
      .then((r) => r.json())
      .then((data: Record<string, GeoJSON.Geometry>) => {
        // Ne garde que les vrais polygones (Polygon / MultiPolygon)
        const filtered: Record<string, GeoJSON.Geometry | null> = {};
        for (const [slug, geom] of Object.entries(data)) {
          filtered[slug] =
            geom.type === "Polygon" || geom.type === "MultiPolygon" ? geom : null;
        }
        setBoundaries(filtered);
      })
      .catch(() => setBoundaries({}));
  }, []);

  return (
    <div className="relative w-full h-[350px] md:h-[500px] rounded-sm overflow-hidden border border-cbf-gray-soft shadow-lg">
      <MapContainer
        center={[45.774, 3.090]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <MapResize />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {quartiers.map((q) => {
          const refPrix = q.prixAppartement ?? q.prixMaison ?? 2000;
          const color = priceToColor(refPrix);
          const geom = boundaries[q.slug];

          // ── Polygone OSM disponible → on l'affiche
          if (geom) {
            const feature: GeoJSON.Feature = {
              type: "Feature",
              geometry: geom,
              properties: { slug: q.slug },
            };
            const style: PathOptions = {
              color,
              fillColor: color,
              fillOpacity: 0.45,
              weight: 1.5,
              opacity: 0.7,
            };
            return (
              <GeoJSON key={q.slug} data={feature} style={style}>
                <Popup>
                  <QuartierPopup q={q} />
                </Popup>
              </GeoJSON>
            );
          }

          // ── Pas de polygone OSM → on n'affiche rien
          return null;
        })}
      </MapContainer>

      <Legend />
    </div>
  );
}
