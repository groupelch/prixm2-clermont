"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import type { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { quartiers } from "@/data/quartiers";
import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";
import { IRIS_TO_QUARTIER } from "@/lib/iris-quartier-map";
import { TrendingUp, TrendingDown, X, ArrowRight, MapPin, Database } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface IrisProps {
  iris_code: string;
  iris_name: string;
  iris_type: string;
  prix_median: number;
  nb_ventes: number;
  prix_p25: number;
  prix_p75: number;
  prix_min: number;
  prix_max: number;
}

interface IrisFeature extends GeoJSON.Feature {
  properties: IrisProps;
}

// ─── Palette prix ─────────────────────────────────────────────────────────────
// Gradient sur 7 niveaux, de vert (pas cher) → rouge (premium)
const BREAKS = [1800, 2000, 2150, 2300, 2450, 2600, Infinity];
const COLORS = ["#4ade80", "#86efac", "#fde68a", "#fbbf24", "#f97316", "#ef4444", "#b91c1c"];
const LABELS = ["< 1 800 €", "1 800–2 000 €", "2 000–2 150 €", "2 150–2 300 €", "2 300–2 450 €", "2 450–2 600 €", "> 2 600 €"];
const NO_DATA_COLOR = "#d1d5db"; // gris clair pour zones sans données DVF

function priceToColor(prix: number): string {
  if (!prix || prix === 0) return NO_DATA_COLOR;
  const i = BREAKS.findIndex((b) => prix < b);
  return COLORS[i >= 0 ? i : COLORS.length - 1];
}

// ─── Centroïde d'un polygone ──────────────────────────────────────────────────
function featureCentroid(feat: IrisFeature): [number, number] {
  const geom = feat.geometry;
  const ring = geom.type === "Polygon"
    ? geom.coordinates[0]
    : geom.type === "MultiPolygon"
    ? geom.coordinates[0][0]
    : null;
  if (!ring) return [45.774, 3.09];
  const lats = ring.map((c) => c[1]);
  const lngs = ring.map((c) => c[0]);
  return [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
  ];
}

// ─── Auto-resize ──────────────────────────────────────────────────────────────
function MapResize() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 150); }, [map]);
  return null;
}

// ─── Trouver le quartier CBF le plus proche d'un centroïde IRIS ──────────────
function findClosestQuartier(lat: number, lng: number): Quartier | null {
  let best: Quartier | null = null;
  let bestDist = Infinity;
  for (const q of quartiers) {
    const geom = (q as Quartier & { _center?: [number, number] });
    // Simple approximation basée sur le nom
    const dist = Math.abs(lat - 45.774) + Math.abs(lng - 3.09);
    if (dist < bestDist) { bestDist = dist; best = q; }
  }
  return best;
}

// ─── Légende ─────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-white/97 backdrop-blur-sm border border-gray-200 rounded-xl p-3.5 shadow-lg">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Database className="h-3 w-3 text-cbf-gold" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Prix m² — DVF 2021-2024</p>
      </div>
      <div className="space-y-1">
        {COLORS.map((color, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border border-white/50" style={{ background: color }} />
            <span className="text-[10px] text-gray-600 font-medium">{LABELS[i]}</span>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-gray-300 mt-2">16 882 transactions · DGFiP 2021-2024</p>
    </div>
  );
}

// ─── Tooltip IRIS ─────────────────────────────────────────────────────────────
function IrisTooltip({ props }: { props: IrisProps }) {
  return (
    <div className="font-inter text-xs min-w-[170px]">
      <p className="font-bold text-gray-900 mb-1">{props.iris_name}</p>
      {props.prix_median > 0 ? (
        <>
          <p className="text-cbf-gold font-bold text-sm">{props.prix_median.toLocaleString("fr-FR")} €/m²</p>
          <div className="flex gap-3 mt-1 text-gray-500">
            <span>P25 : {props.prix_p25.toLocaleString("fr-FR")} €</span>
            <span>P75 : {props.prix_p75.toLocaleString("fr-FR")} €</span>
          </div>
          <p className="text-gray-400 mt-0.5">{props.nb_ventes} ventes</p>
        </>
      ) : (
        <p className="text-gray-400">Pas de données</p>
      )}
    </div>
  );
}

// ─── Panel quartier ───────────────────────────────────────────────────────────
function QuartierPanel({
  irisProps,
  quartier,
  onClose,
}: {
  irisProps: IrisProps;
  quartier: Quartier | null;
  onClose: () => void;
}) {
  const isUp = quartier?.evolution12m?.startsWith("+");

  return (
    <div className="absolute top-3 right-3 z-[500] w-[230px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-cbf-black px-4 py-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] text-cbf-gold/80 uppercase tracking-widest font-bold">Zone INSEE</p>
          <p className="font-playfair text-base font-bold text-white leading-tight mt-0.5 truncate">
            {irisProps.iris_name}
          </p>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors flex-shrink-0 mt-0.5">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Prix DVF réels */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        {irisProps.prix_median > 0 ? (
          <>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Database className="h-2.5 w-2.5" /> Données DVF réelles
            </p>
            <p className="font-playfair text-2xl font-bold text-cbf-black">
              {irisProps.prix_median.toLocaleString("fr-FR")} <span className="text-base font-normal text-gray-400">€/m²</span>
            </p>
            <div className="flex gap-3 mt-1.5 text-[11px] text-gray-500">
              <span>P25 : <b className="text-gray-700">{irisProps.prix_p25.toLocaleString("fr-FR")} €</b></span>
              <span>P75 : <b className="text-gray-700">{irisProps.prix_p75.toLocaleString("fr-FR")} €</b></span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{irisProps.nb_ventes} transactions 2021-2024</p>
          </>
        ) : (
          <>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" /> Commune limitrophe
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Données DVF disponibles uniquement pour Clermont-Ferrand. Estimez votre bien avec nos experts.
            </p>
          </>
        )}
      </div>

      {/* Données quartier CBF si disponibles */}
      {quartier && (
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Quartier : {quartier.nom}</p>
          {(quartier.prixAppartement || quartier.prixMaison) && (
            <div className="flex items-center justify-between">
              <div>
                {quartier.prixAppartement && (
                  <p className="text-sm font-bold text-cbf-black">
                    Appt : {formatPricePerM2(quartier.prixAppartement)}
                  </p>
                )}
                {quartier.prixMaison && (
                  <p className="text-xs text-gray-500">
                    Maison : {formatPricePerM2(quartier.prixMaison)}
                  </p>
                )}
              </div>
              {quartier.evolution12m && (
                <div className={`flex items-center gap-1 text-sm font-bold ${isUp ? "text-green-600" : "text-red-500"}`}>
                  {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {quartier.evolution12m}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* CTAs */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {quartier ? (
          <>
            <Link
              href={`/prix-m2/${quartier.slug}`}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-cbf-black text-white text-xs font-semibold rounded-lg hover:bg-cbf-gold/90 hover:text-cbf-black transition-colors"
            >
              Voir les données <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href={`/estimation-quartier/${quartier.slug}`}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-cbf-gold text-cbf-gold text-xs font-semibold rounded-lg hover:bg-cbf-gold/10 transition-colors"
            >
              Estimer mon bien
            </Link>
          </>
        ) : (
          <Link
            href="/estimation"
            className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-cbf-black text-white text-xs font-semibold rounded-lg hover:bg-cbf-gold/90 hover:text-cbf-black transition-colors"
          >
            Obtenir une estimation <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function InteractiveMap() {
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selected, setSelected] = useState<IrisProps | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/iris-dvf-map.json")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  // Trouver le quartier CBF via le mapping IRIS → slug
  const selectedQuartier = selected
    ? (() => {
        const slug = IRIS_TO_QUARTIER[selected.iris_code];
        if (!slug) return null;
        return quartiers.find((q) => q.slug === slug) ?? null;
      })()
    : null;

  const getStyle = useCallback((feature: GeoJSON.Feature | undefined): PathOptions => {
    if (!feature) return {};
    const props = feature.properties as IrisProps;
    const isSelected = selected?.iris_code === props.iris_code;
    const isHovered = hovered === props.iris_code;
    const color = priceToColor(props.prix_median);
    return {
      fillColor: color,
      fillOpacity: isSelected ? 0.85 : isHovered ? 0.75 : 0.60,
      color: isSelected ? "#0A0A0A" : isHovered ? "#B8860B" : "rgba(255,255,255,0.6)",
      weight: isSelected ? 2.5 : isHovered ? 1.5 : 0.8,
    };
  }, [selected, hovered]);

  const onEachFeature = useCallback((feature: GeoJSON.Feature, layer: L.Layer) => {
    const props = feature.properties as IrisProps;
    const l = layer as L.Path;

    // Tooltip au hover
    const tooltipContent = `
      <div style="font-family:Inter,sans-serif;font-size:12px;min-width:160px;">
        <p style="font-weight:700;color:#0A0A0A;margin:0 0 4px">${props.iris_name}</p>
        ${props.prix_median > 0
          ? `<p style="color:#B8860B;font-weight:700;font-size:15px;margin:0 0 2px">${props.prix_median.toLocaleString("fr-FR")} €/m²</p>
             <p style="color:#9CA3AF;font-size:11px;margin:0">${props.nb_ventes} ventes · P25 ${props.prix_p25.toLocaleString("fr-FR")}€ / P75 ${props.prix_p75.toLocaleString("fr-FR")}€</p>`
          : `<p style="color:#9CA3AF;font-size:11px">Données insuffisantes</p>`
        }
      </div>
    `;

    (layer as L.Layer & { bindTooltip: (c: string, o: object) => void }).bindTooltip(tooltipContent, {
      sticky: true,
      offset: [12, 0],
      className: "!bg-white !border-0 !shadow-xl !rounded-xl !p-3 leaflet-tooltip-custom",
    });

    l.on("click", () => {
      setSelected(props);
    });

    l.on("mouseover", () => setHovered(props.iris_code));
    l.on("mouseout", () => setHovered(null));
  }, []);

  return (
    <div className="relative w-full h-[420px] md:h-[580px] rounded-xl overflow-hidden shadow-xl border border-gray-200">
      <MapContainer
        center={[45.774, 3.090]}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={true}
        className="w-full h-full"
        style={{ background: "#f0f0ec" }}
      >
        <MapResize />

        {/* Carto Positron — fond épuré */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Choroplèthe IRIS × DVF — 94 zones : CLF + communes limitrophes */}
        {geoData && (
          <GeoJSON
            key={`${selected?.iris_code}-${hovered}`}
            data={geoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {/* Légende */}
      <Legend />

      {/* Panel sélection */}
      {selected && (
        <QuartierPanel
          irisProps={selected}
          quartier={selectedQuartier}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Hint */}
      {!selected && (
        <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-sm pointer-events-none">
          <p className="text-[10px] text-gray-500 flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            Cliquez sur une zone
          </p>
        </div>
      )}

      {/* Loader */}
      {!geoData && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 z-[500]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cbf-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500">Chargement des données DVF…</p>
          </div>
        </div>
      )}
    </div>
  );
}
