"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import type { PathOptions, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { quartiers, getPriceTier } from "@/data/quartiers";
import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";
import { TrendingUp, TrendingDown, X, ArrowRight, MapPin } from "lucide-react";

// ─── Palette prix (CBF brand : or → rouge) ──────────────────────────────────
const PRICE_MIN = 1700;
const PRICE_MAX = 2800;

const TIERS = [
  { max: 1900, bg: "#22c55e", label: "< 1 900 €" },
  { max: 2100, bg: "#86efac", label: "1 900–2 100 €" },
  { max: 2300, bg: "#fbbf24", label: "2 100–2 300 €" },
  { max: 2500, bg: "#f97316", label: "2 300–2 500 €" },
  { max: Infinity, bg: "#dc2626", label: "> 2 500 €" },
];

function priceToColor(prix: number): string {
  const tier = TIERS.find((t) => prix < t.max);
  return tier?.bg ?? "#dc2626";
}

// ─── Centroïde d'un polygone ─────────────────────────────────────────────────
function polygonCentroid(coords: number[][][]): [number, number] {
  const ring = coords[0];
  let latSum = 0, lngSum = 0;
  for (const [lng, lat] of ring) {
    latSum += lat;
    lngSum += lng;
  }
  return [latSum / ring.length, lngSum / ring.length];
}

function geometryCentroid(geom: GeoJSON.Geometry): [number, number] | null {
  if (geom.type === "Polygon") return polygonCentroid(geom.coordinates);
  if (geom.type === "MultiPolygon") return polygonCentroid(geom.coordinates[0]);
  if (geom.type === "Point") return [geom.coordinates[1], geom.coordinates[0]];
  return null;
}

// ─── Auto-resize ─────────────────────────────────────────────────────────────
function MapResize() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 150); }, [map]);
  return null;
}

// ─── Label prix SVG sur la carte ─────────────────────────────────────────────
function PriceLabel({ quartier, geom, selected, onClick }: {
  quartier: Quartier;
  geom: GeoJSON.Geometry;
  selected: boolean;
  onClick: () => void;
}) {
  const L = (typeof window !== "undefined") ? require("leaflet") : null;
  if (!L) return null;

  const center = geometryCentroid(geom);
  if (!center) return null;

  const prix = quartier.prixAppartement ?? quartier.prixMaison ?? 0;
  if (!prix) return null;

  const label = `${(prix / 1000).toFixed(1).replace(".", ",")} k€`;

  const icon = L.divIcon({
    className: "",
    html: `<div style="
      background: ${selected ? "#0A0A0A" : "rgba(255,255,255,0.92)"};
      color: ${selected ? "#B8860B" : "#0A0A0A"};
      border: 1.5px solid ${selected ? "#B8860B" : "rgba(0,0,0,0.15)"};
      border-radius: 4px;
      padding: 2px 7px;
      font-size: 11px;
      font-weight: 700;
      font-family: Inter, sans-serif;
      white-space: nowrap;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
      cursor: pointer;
      transform: translate(-50%, -50%);
    ">${label}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

  const { Marker } = require("react-leaflet");

  return (
    <Marker
      position={center}
      icon={icon}
      zIndexOffset={selected ? 1000 : 100}
      eventHandlers={{ click: onClick }}
    />
  );
}

// ─── Légende ─────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Prix / m²</p>
      <div className="space-y-1">
        {TIERS.map((t) => (
          <div key={t.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: t.bg }} />
            <span className="text-[10px] text-gray-600">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Panel latéral quartier ───────────────────────────────────────────────────
function QuartierPanel({ quartier, onClose }: { quartier: Quartier; onClose: () => void }) {
  const prix = quartier.prixAppartement ?? quartier.prixMaison ?? 0;
  const isUp = quartier.evolution12m?.startsWith("+");

  return (
    <div className="absolute top-3 right-3 z-[500] w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-right-2 duration-200">
      {/* Header */}
      <div className="bg-cbf-black px-4 py-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] text-cbf-gold uppercase tracking-widest font-bold">
            {quartier.type === "quartier" ? "Quartier" : "Commune"}
          </p>
          <p className="font-playfair text-base font-bold text-white leading-tight mt-0.5">
            {quartier.nom}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors flex-shrink-0 mt-0.5"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Prix */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
              {quartier.prixAppartement ? "Appartement" : "Maison"}
            </p>
            <p className="font-playfair text-xl font-bold text-cbf-black">
              {formatPricePerM2(prix)}
            </p>
          </div>
          {quartier.evolution12m && (
            <div className={`flex items-center gap-1 text-sm font-bold ${isUp ? "text-green-600" : "text-red-500"}`}>
              {isUp
                ? <TrendingUp className="h-3.5 w-3.5" />
                : <TrendingDown className="h-3.5 w-3.5" />
              }
              {quartier.evolution12m}
            </div>
          )}
        </div>
        {quartier.prixAppartement && quartier.prixMaison && (
          <p className="text-[10px] text-gray-400 mt-1">
            Maison : {formatPricePerM2(quartier.prixMaison)}
          </p>
        )}
      </div>

      {/* Description courte */}
      {quartier.description && (
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">
            {quartier.description}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="px-4 py-3 flex flex-col gap-2">
        <Link
          href={`/prix-m2/${quartier.slug}`}
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-cbf-black text-white text-xs font-semibold rounded-lg hover:bg-cbf-gold/90 transition-colors"
        >
          Voir les données <ArrowRight className="h-3 w-3" />
        </Link>
        <Link
          href={`/estimation-quartier/${quartier.slug}`}
          className="flex items-center justify-center gap-1.5 w-full py-2 border border-cbf-gold text-cbf-gold text-xs font-semibold rounded-lg hover:bg-cbf-gold/10 transition-colors"
        >
          Estimer mon bien
        </Link>
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function InteractiveMap() {
  const [boundaries, setBoundaries] = useState<Record<string, GeoJSON.Geometry | null>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/boundaries.json")
      .then((r) => r.json())
      .then((data: Record<string, GeoJSON.Geometry>) => setBoundaries(data))
      .catch(() => setBoundaries({}));
  }, []);

  const selectedQuartier = selected ? quartiers.find((q) => q.slug === selected) : null;

  const getStyle = useCallback((slug: string, prix: number): PathOptions => {
    const color = priceToColor(prix);
    const isSelected = selected === slug;
    const isHovered = hovered === slug;
    return {
      color: isSelected ? "#0A0A0A" : isHovered ? "#B8860B" : "rgba(255,255,255,0.7)",
      fillColor: color,
      fillOpacity: isSelected ? 0.75 : isHovered ? 0.7 : 0.55,
      weight: isSelected ? 2.5 : isHovered ? 2 : 1,
    };
  }, [selected, hovered]);

  return (
    <div className="relative w-full h-[420px] md:h-[560px] rounded-xl overflow-hidden shadow-xl border border-gray-200">
      <MapContainer
        center={[45.774, 3.090]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
        style={{ background: "#f5f5f0" }}
      >
        <MapResize />

        {/* Tuiles Carto Positron — fond épuré gris clair */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {quartiers.map((q) => {
          const geom = boundaries[q.slug];
          if (!geom) return null;

          const prix = q.prixAppartement ?? q.prixMaison ?? 2000;
          const isPolygon = geom.type === "Polygon" || geom.type === "MultiPolygon";

          if (isPolygon) {
            const feature: GeoJSON.Feature = {
              type: "Feature",
              geometry: geom,
              properties: { slug: q.slug },
            };
            return (
              <GeoJSON
                key={`${q.slug}-${selected}-${hovered}`}
                data={feature}
                style={getStyle(q.slug, prix)}
                eventHandlers={{
                  click: () => setSelected(q.slug),
                  mouseover: () => setHovered(q.slug),
                  mouseout: () => setHovered(null),
                }}
              >
                <Tooltip
                  sticky
                  className="!bg-white !border-0 !shadow-lg !rounded-lg !px-3 !py-2 !text-xs !font-semibold !text-gray-900"
                  offset={[10, 0]}
                >
                  <span>{q.nom}</span>
                  <span className="ml-2 text-cbf-gold font-bold">{formatPricePerM2(prix)}</span>
                </Tooltip>
              </GeoJSON>
            );
          }

          // ── Point → cercle marker
          if (geom.type === "Point") {
            const center: [number, number] = [geom.coordinates[1], geom.coordinates[0]];
            const color = priceToColor(prix);
            const isSelected = selected === q.slug;
            return (
              <CircleMarker
                key={q.slug}
                center={center}
                radius={isSelected ? 12 : 9}
                pathOptions={{
                  color: isSelected ? "#0A0A0A" : "rgba(255,255,255,0.8)",
                  fillColor: color,
                  fillOpacity: 0.85,
                  weight: isSelected ? 2.5 : 1.5,
                }}
                eventHandlers={{
                  click: () => setSelected(q.slug),
                  mouseover: () => setHovered(q.slug),
                  mouseout: () => setHovered(null),
                }}
              >
                <Tooltip
                  className="!bg-white !border-0 !shadow-lg !rounded-lg !px-3 !py-2 !text-xs !font-semibold !text-gray-900"
                  offset={[10, 0]}
                >
                  <span>{q.nom}</span>
                  <span className="ml-2 text-cbf-gold font-bold">{formatPricePerM2(prix)}</span>
                </Tooltip>
              </CircleMarker>
            );
          }

          return null;
        })}

        {/* Labels prix sur les polygones */}
        {Object.keys(boundaries).length > 0 &&
          quartiers.map((q) => {
            const geom = boundaries[q.slug];
            if (!geom) return null;
            return (
              <PriceLabel
                key={`label-${q.slug}`}
                quartier={q}
                geom={geom}
                selected={selected === q.slug}
                onClick={() => setSelected(q.slug)}
              />
            );
          })}
      </MapContainer>

      {/* Légende */}
      <Legend />

      {/* Panel latéral */}
      {selectedQuartier && (
        <QuartierPanel
          quartier={selectedQuartier}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Hint mobile */}
      {!selected && (
        <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-sm pointer-events-none">
          <p className="text-[10px] text-gray-500 flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            Cliquez sur un quartier
          </p>
        </div>
      )}
    </div>
  );
}
