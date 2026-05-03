"use client";

import { useState } from "react";
import { Baby, GraduationCap, Trees, ChevronDown, ChevronUp } from "lucide-react";
import type { AmenityItem, QuartierAmenities } from "@/lib/amenities";

interface ColumnProps {
  icon: React.ReactNode;
  label: string;
  items: AmenityItem[];
}

function Column({ icon, label, items }: ColumnProps) {
  const [expanded, setExpanded] = useState(false);
  if (!items.length) return null;

  const visible = expanded ? items : items.slice(0, 3);
  const remaining = items.length - 3;

  return (
    <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
          {icon}
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
            {label}
          </p>
          <p className="font-playfair text-xl font-bold text-cbf-black leading-none mt-1">
            {items.length}
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {visible.map((item, i) => (
          <li
            key={`${item.nom}-${i}`}
            className="text-sm text-cbf-gray leading-snug flex items-start justify-between gap-2"
          >
            <div>
              <span className="block font-medium text-cbf-black">
                {item.nom}
              </span>
              {(item.type || item.extra) && (
                <span className="block text-xs text-cbf-gray-light">
                  {[item.type, item.extra].filter(Boolean).join(" • ")}
                </span>
              )}
            </div>
            {item.distanceKm !== undefined && (
              <span className="flex-shrink-0 text-xs font-bold text-cbf-gold bg-cbf-ivory px-2 py-0.5 rounded-sm">
                {item.distanceKm < 1
                  ? `${Math.round(item.distanceKm * 1000)} m`
                  : `${item.distanceKm.toFixed(1)} km`}
              </span>
            )}
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 pt-3 border-t border-cbf-gray-soft w-full flex items-center gap-1.5 text-xs font-semibold text-cbf-gold hover:text-cbf-black transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              + {remaining} autre{remaining > 1 ? "s" : ""}
            </>
          )}
        </button>
      )}
    </div>
  );
}

interface AmenitiesBlockProps {
  amenities: QuartierAmenities;
  quartierNom?: string;
}

export function AmenitiesBlock({ amenities, quartierNom }: AmenitiesBlockProps) {
  const { ecoles, parcs, creches } = amenities;
  const total = ecoles.length + parcs.length + creches.length;
  if (total === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Équipements du quartier
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            {quartierNom ? `Vivre à ${quartierNom}` : "Vie de quartier"}
          </h2>
          <p className="text-cbf-gray">
            Écoles, parcs et structures petite enfance situés à proximité
            immédiate (rayon ~1,2&nbsp;km). Source&nbsp;:&nbsp;Open Data
            Clermont&#8209;Ferrand.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Column
            icon={<GraduationCap className="h-5 w-5" />}
            label="Écoles"
            items={ecoles}
          />
          <Column
            icon={<Trees className="h-5 w-5" />}
            label="Espaces verts"
            items={parcs}
          />
          <Column
            icon={<Baby className="h-5 w-5" />}
            label="Petite enfance"
            items={creches}
          />
        </div>
      </div>
    </section>
  );
}
