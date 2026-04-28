import { Leaf, Flame } from "lucide-react";
import type { DpeStats, DpeLabel } from "@/lib/dpe";

interface DpeBlockProps {
  stats: DpeStats;
}

const DPE_COLORS: Record<DpeLabel, string> = {
  A: "#009900",
  B: "#33CC00",
  C: "#CCFF00",
  D: "#FFFF00",
  E: "#FFCC00",
  F: "#FF6600",
  G: "#FF0000",
};

const ORDER: DpeLabel[] = ["A", "B", "C", "D", "E", "F", "G"];

export function DpeBlock({ stats }: DpeBlockProps) {
  if (stats.total === 0) return null;

  const max = Math.max(...ORDER.map((k) => stats.distribution[k]));

  return (
    <section className="py-14 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Performance énergétique
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            DPE du quartier
          </h2>
          <p className="text-cbf-gray">
            Répartition des étiquettes DPE des logements diagnostiqués sur ce
            périmètre&nbsp;({stats.total.toLocaleString("fr-FR")} diagnostics ADEME, rayon ~
            {stats.rayon_km.toFixed(1)}&nbsp;km).
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 mb-6">
          {/* Label dominant */}
          <div className="bg-white border border-cbf-gray-soft rounded-sm p-6 flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-sm font-playfair text-3xl font-bold text-cbf-black flex-shrink-0"
              style={{ backgroundColor: stats.label_dominant ? DPE_COLORS[stats.label_dominant] : "#E5E5E5" }}
            >
              {stats.label_dominant ?? "—"}
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-1">
                Étiquette dominante
              </p>
              <p className="text-sm text-cbf-gray-light">
                Plus fréquente sur ce périmètre
              </p>
            </div>
          </div>

          {/* % bon */}
          <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cbf-success/10 text-cbf-success">
                <Leaf className="h-5 w-5" />
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-success font-bold">
                Logements performants
              </p>
            </div>
            <p className="font-playfair text-3xl font-bold text-cbf-success leading-none">
              {stats.pct_bon}%
            </p>
            <p className="text-xs text-cbf-gray-light mt-2">Étiquettes A, B ou C</p>
          </div>

          {/* % mauvais */}
          <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cbf-danger/10 text-cbf-danger">
                <Flame className="h-5 w-5" />
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-danger font-bold">
                Passoires énergétiques
              </p>
            </div>
            <p className="font-playfair text-3xl font-bold text-cbf-danger leading-none">
              {stats.pct_mauvais}%
            </p>
            <p className="text-xs text-cbf-gray-light mt-2">Étiquettes E, F ou G</p>
          </div>
        </div>

        {/* Distribution */}
        <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
          <h3 className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-5">
            Répartition par étiquette
          </h3>
          <div className="space-y-2.5">
            {ORDER.map((label) => {
              const count = stats.distribution[label];
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
              const widthPct = max > 0 ? (count / max) * 100 : 0;
              return (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-sm font-playfair text-base font-bold text-cbf-black flex-shrink-0"
                    style={{ backgroundColor: DPE_COLORS[label] }}
                  >
                    {label}
                  </div>
                  <div className="flex-1 h-8 bg-cbf-ivory rounded-sm overflow-hidden relative">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: DPE_COLORS[label],
                        opacity: 0.6,
                      }}
                    />
                  </div>
                  <div className="w-32 text-right text-sm">
                    <span className="font-semibold text-cbf-black">
                      {count.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-cbf-gray-light ml-2">
                      ({pct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 pt-4 border-t border-cbf-gray-soft text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
            Source&nbsp;: ADEME (data.ademe.fr) — mise à jour {stats.meta.updated}
          </p>
        </div>
      </div>
    </section>
  );
}
