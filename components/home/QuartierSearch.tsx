"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { quartiers } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

export function QuartierSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!q.trim()) return quartiers.slice(0, 8);
    const needle = q.toLowerCase().trim();
    return quartiers
      .filter(
        (qt) =>
          qt.nom.toLowerCase().includes(needle) ||
          qt.slug.toLowerCase().includes(needle) ||
          qt.ville.toLowerCase().includes(needle)
      )
      .slice(0, 12);
  }, [q]);

  return (
    <section className="bg-white border-y border-cbf-gray-soft">
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-3">
            Trouvez le prix m² de votre quartier
          </h2>
          <p className="text-cbf-gray">
            Tapez le nom d'un quartier de Clermont-Ferrand ou d'une commune de l'agglomération.
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-cbf-gray-light" />
            <input
              type="text"
              placeholder="Ex : Jaude, Beaumont, Centre-Ville…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="w-full h-16 pl-14 pr-6 text-base border border-cbf-gray-soft rounded-sm bg-white focus:outline-none focus:border-cbf-gold focus:ring-2 focus:ring-cbf-gold/20 shadow-sm transition-all"
            />
          </div>

          {open && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-cbf-gray-soft rounded-sm shadow-xl max-h-96 overflow-y-auto z-30">
              {results.map((qt) => {
                const refPrix = qt.prixAppartement ?? qt.prixMaison;
                return (
                  <Link
                    key={qt.slug}
                    href={`/prix-m2/${qt.slug}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-cbf-ivory transition-colors border-b border-cbf-gray-soft last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-cbf-black">{qt.nom}</p>
                      <p className="text-xs text-cbf-gray-light uppercase tracking-wider">
                        {qt.type === "quartier" ? "Quartier" : "Commune"} · {qt.ville}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-cbf-gold font-semibold">
                        {formatPricePerM2(refPrix)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-cbf-gray-light" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
