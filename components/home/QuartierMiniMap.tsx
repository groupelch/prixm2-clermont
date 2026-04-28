"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { formatPricePerM2 } from "@/lib/utils";

interface QuartierMiniMapProps {
  lat: number;
  lng: number;
  nom: string;
  prix: number | null;
}

function MapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function QuartierMiniMap({ lat, lng, nom, prix }: QuartierMiniMapProps) {
  return (
    <div className="w-full h-[320px] md:h-[400px] rounded-sm overflow-hidden border border-cbf-gray-soft">
      <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} className="w-full h-full">
        <MapResize />
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={[lat, lng]}
          radius={14}
          pathOptions={{ color: "#B8860B", fillColor: "#B8860B", fillOpacity: 0.5, weight: 3 }}
        >
          <Popup>
            <div className="font-inter">
              <p className="font-playfair font-bold">{nom}</p>
              <p className="text-sm text-cbf-gold font-semibold">{formatPricePerM2(prix)}</p>
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
