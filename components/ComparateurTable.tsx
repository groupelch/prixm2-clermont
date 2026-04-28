"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export interface ComparateurRow {
  slug: string;
  nom: string;
  type: "quartier" | "commune";
  prixAppartement: number | null;
  prixMaison: number | null;
  evolution12m: string;
  evolutionNum: number; // valeur numérique pour tri (ex : +3.2 → 3.2)
  dpeDominant: string | null;
  transportScore: number;
  delaiVente: number;
}

type SortKey =
  | "nom"
  | "prixAppartement"
  | "prixMaison"
  | "evolutionNum"
  | "dpeDominant"
  | "transportScore"
  | "delaiVente";

type Filter = "tous" | "quartier" | "commune";

const fmtPrice = (n: number | null) =>
  n ? `${new Intl.NumberFormat("fr-FR").format(n)} €/m²` : "—";

interface Props {
  rows: ComparateurRow[];
}

export function ComparateurTable({ rows }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("prixAppartement");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<Filter>("tous");

  const filtered = useMemo(() => {
    const list = filter === "tous" ? rows : rows.filter((r) => r.type === filter);
    return [...list].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      // null toujours en dernier
      if (va === null && vb === null) return 0;
      if (va === null) return 1;
      if (vb === null) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return sortDir === "asc" ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
  }, [rows, filter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (k !== sortKey) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3 w-3 text-cbf-gold" />
    ) : (
      <ArrowDown className="h-3 w-3 text-cbf-gold" />
    );
  };

  return (
    <div>
      {/* Tabs filtre */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { id: "tous", label: `Tous (${rows.length})` },
            {
              id: "quartier",
              label: `Quartiers (${rows.filter((r) => r.type === "quartier").length})`,
            },
            {
              id: "commune",
              label: `Communes (${rows.filter((r) => r.type === "commune").length})`,
            },
          ] as { id: Filter; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-sm border transition-colors ${
              filter === t.id
                ? "bg-cbf-black text-white border-cbf-black"
                : "bg-white text-cbf-black border-cbf-gray-soft hover:border-cbf-gold"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Desktop : table */}
      <div className="hidden md:block overflow-x-auto bg-white border border-cbf-gray-soft rounded-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cbf-ivory text-left text-[0.65rem] uppercase tracking-wider text-cbf-gray font-bold border-b border-cbf-gray-soft">
              <Th label="Quartier" k="nom" toggle={toggleSort} icon={<SortIcon k="nom" />} />
              <Th label="Prix appart" k="prixAppartement" toggle={toggleSort} icon={<SortIcon k="prixAppartement" />} align="right" />
              <Th label="Prix maison" k="prixMaison" toggle={toggleSort} icon={<SortIcon k="prixMaison" />} align="right" />
              <Th label="Évol. 12m" k="evolutionNum" toggle={toggleSort} icon={<SortIcon k="evolutionNum" />} align="right" />
              <Th label="DPE dom." k="dpeDominant" toggle={toggleSort} icon={<SortIcon k="dpeDominant" />} align="center" />
              <Th label="Transport /100" k="transportScore" toggle={toggleSort} icon={<SortIcon k="transportScore" />} align="right" />
              <Th label="Délai (j)" k="delaiVente" toggle={toggleSort} icon={<SortIcon k="delaiVente" />} align="right" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const evoPos = r.evolutionNum >= 0;
              return (
                <tr
                  key={r.slug}
                  className="border-b border-cbf-gray-soft last:border-0 hover:bg-cbf-ivory/60 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/prix-m2/${r.slug}`}
                      className="font-semibold text-cbf-black hover:text-cbf-gold transition-colors"
                    >
                      {r.nom}
                    </Link>
                    <span className="block text-[0.65rem] uppercase tracking-wider text-cbf-gray-light mt-0.5">
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-cbf-gold font-semibold">
                    {fmtPrice(r.prixAppartement)}
                  </td>
                  <td className="px-4 py-3 text-right text-cbf-black">
                    {fmtPrice(r.prixMaison)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      evoPos ? "text-cbf-success" : "text-cbf-warning"
                    }`}
                  >
                    {r.evolution12m}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-2 py-0.5 bg-cbf-ivory border border-cbf-gray-soft rounded-sm text-xs font-semibold">
                      {r.dpeDominant ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-cbf-black font-medium">
                    {r.transportScore}
                  </td>
                  <td className="px-4 py-3 text-right text-cbf-gray">
                    {r.delaiVente} j
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile : cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((r) => (
          <Link
            key={r.slug}
            href={`/prix-m2/${r.slug}`}
            className="block bg-white border border-cbf-gray-soft rounded-sm p-4 hover:border-cbf-gold transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-playfair text-base font-bold text-cbf-black">
                  {r.nom}
                </h3>
                <span className="text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
                  {r.type}
                </span>
              </div>
              <span className="inline-block px-2 py-0.5 bg-cbf-ivory border border-cbf-gray-soft rounded-sm text-xs font-semibold">
                DPE {r.dpeDominant ?? "—"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">
                  Appart
                </p>
                <p className="font-semibold text-cbf-gold">
                  {fmtPrice(r.prixAppartement)}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">
                  Maison
                </p>
                <p className="font-semibold text-cbf-black">
                  {fmtPrice(r.prixMaison)}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">
                  Évol 12m
                </p>
                <p
                  className={`font-semibold ${
                    r.evolutionNum >= 0 ? "text-cbf-success" : "text-cbf-warning"
                  }`}
                >
                  {r.evolution12m}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">
                  Transport
                </p>
                <p className="font-semibold text-cbf-black">
                  {r.transportScore}/100
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Th({
  label,
  k,
  toggle,
  icon,
  align = "left",
}: {
  label: string;
  k: SortKey;
  toggle: (k: SortKey) => void;
  icon: React.ReactNode;
  align?: "left" | "right" | "center";
}) {
  const alignCls =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  return (
    <th className={`px-4 py-3 ${alignCls}`}>
      <button
        type="button"
        onClick={() => toggle(k)}
        className={`inline-flex items-center gap-1.5 hover:text-cbf-gold transition-colors ${
          align === "right" ? "ml-auto" : ""
        }`}
      >
        {label}
        {icon}
      </button>
    </th>
  );
}
