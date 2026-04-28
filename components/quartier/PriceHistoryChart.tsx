"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DvfAnneeStats } from "@/lib/dvf";

interface Props {
  history: DvfAnneeStats[];
  quartierNom: string;
}

const fmtPrice = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} €/m²`;

interface TooltipPayloadEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-cbf-gray-soft rounded-sm p-3 shadow-lg text-xs">
      <p className="font-semibold text-cbf-black mb-1.5">Année {label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-cbf-gray">{p.name} :</span>
          <span className="font-semibold text-cbf-black ml-auto">
            {typeof p.value === "number" ? fmtPrice(p.value) : "—"}
          </span>
        </p>
      ))}
    </div>
  );
}

export function PriceHistoryChart({ history, quartierNom }: Props) {
  const hasApparts = history.some((h) => h.apparts_median !== null);
  const hasMaisons = history.some((h) => h.maisons_median !== null);

  if (!hasApparts && !hasMaisons) {
    return null;
  }

  // Format pour Recharts (null pour gaps)
  const data = history.map((h) => ({
    annee: h.annee,
    Appartements: h.apparts_median,
    Maisons: h.maisons_median,
  }));

  return (
    <section className="py-14 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Évolution historique
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            Prix médian DVF — {quartierNom}
          </h2>
          <p className="text-cbf-gray">
            Médiane des prix au m² calculée sur les transactions DVF officielles
            depuis 2021. Affichage uniquement des années avec au moins 3 ventes.
          </p>
        </div>

        <div className="bg-white border border-cbf-gray-soft rounded-sm p-4 md:p-6">
          <div className="h-[320px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
              >
                <CartesianGrid
                  stroke="#E8E5DD"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="annee"
                  stroke="#8A8A8A"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#E8E5DD" }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#8A8A8A"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    `${(v / 1000).toFixed(1)}k`
                  }
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                  iconType="circle"
                />
                {hasApparts && (
                  <Line
                    type="monotone"
                    dataKey="Appartements"
                    stroke="#B8860B"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#B8860B" }}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />
                )}
                {hasMaisons && (
                  <Line
                    type="monotone"
                    dataKey="Maisons"
                    stroke="#0a0a0a"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#0a0a0a" }}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="mt-4 text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
          Source&nbsp;:{" "}
          <a
            href="https://files.data.gouv.fr/geo-dvf/latest/csv/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cbf-gold transition-colors"
          >
            DGFiP — Demandes de Valeurs Foncières
          </a>
        </p>
      </div>
    </section>
  );
}
