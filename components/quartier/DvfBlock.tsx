import { TrendingDown, TrendingUp, Building2, Home, FileCheck2 } from "lucide-react";
import type { DvfStats, DvfTypeStats } from "@/lib/dvf";

interface DvfBlockProps {
  stats: DvfStats;
  quartier: string;
}

const fmtPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const fmtPriceM2 = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} €/m²`;

function formatDateFr(iso: string): string {
  // YYYY-MM-DD → DD/MM/YYYY
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function TypeColumn({
  icon,
  label,
  stats,
}: {
  icon: React.ReactNode;
  label: string;
  stats: DvfTypeStats | null;
}) {
  if (!stats || stats.nb_transactions === 0) {
    return (
      <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
            {icon}
          </div>
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
            {label}
          </p>
        </div>
        <p className="text-sm text-cbf-gray-light">
          Aucune transaction enregistrée dans ce périmètre.
        </p>
      </div>
    );
  }

  const evoPositive = stats.evolution_pct >= 0;
  const EvoIcon = evoPositive ? TrendingUp : TrendingDown;
  const evoClass = evoPositive ? "text-cbf-success" : "text-cbf-warning";

  return (
    <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
          {icon}
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
            {label}
          </p>
          <p className="text-xs text-cbf-gray-light mt-0.5">
            {stats.nb_transactions} transaction{stats.nb_transactions > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gray-light mb-1">
          Prix médian
        </p>
        <p className="font-playfair text-3xl font-bold text-cbf-gold leading-none">
          {fmtPriceM2(stats.prix_m2_median)}
        </p>
      </div>

      {stats.evolution_pct !== 0 && (
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${evoClass} mb-4`}>
          <EvoIcon className="h-4 w-4" />
          <span>
            {evoPositive ? "+" : ""}
            {stats.evolution_pct}% sur 2022-2024
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cbf-gray-soft">
        <div>
          <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">Min</p>
          <p className="text-sm font-semibold text-cbf-black">{fmtPriceM2(stats.prix_m2_min)}</p>
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">Max</p>
          <p className="text-sm font-semibold text-cbf-black">{fmtPriceM2(stats.prix_m2_max)}</p>
        </div>
      </div>
    </div>
  );
}

export function DvfBlock({ stats, quartier }: DvfBlockProps) {
  if (stats.total === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-cbf-ivory border border-cbf-gold/30 rounded-sm">
            <FileCheck2 className="h-3.5 w-3.5 text-cbf-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
              Transactions réelles DVF
            </span>
          </div>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-3">
            Ventes réalisées à {quartier}
          </h2>
          <p className="text-cbf-gray">
            Données issues du fichier officiel des Demandes de Valeurs Foncières
            (DGFiP), agrégées sur un rayon d&apos;environ {stats.rayon_km.toFixed(1)}&nbsp;km
            autour du centre du quartier&nbsp;— {stats.total} transaction
            {stats.total > 1 ? "s" : ""} sur 2021-2024.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 mb-8">
          <TypeColumn
            icon={<Building2 className="h-5 w-5" />}
            label="Appartements"
            stats={stats.appartements}
          />
          <TypeColumn
            icon={<Home className="h-5 w-5" />}
            label="Maisons"
            stats={stats.maisons}
          />
        </div>

        {stats.dernieres_ventes.length > 0 && (
          <div className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6">
            <h3 className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-4">
              Dernières ventes
            </h3>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[0.65rem] uppercase tracking-wider text-cbf-gray-light border-b border-cbf-gray-soft">
                    <th className="px-2 py-2 font-semibold">Date</th>
                    <th className="px-2 py-2 font-semibold">Type</th>
                    <th className="px-2 py-2 font-semibold text-right">Surface</th>
                    <th className="px-2 py-2 font-semibold text-right">Prix</th>
                    <th className="px-2 py-2 font-semibold text-right">Prix m²</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.dernieres_ventes.map((v, i) => (
                    <tr
                      key={`${v.date}-${i}`}
                      className="border-b border-cbf-gray-soft last:border-0"
                    >
                      <td className="px-2 py-2.5 text-cbf-gray">{formatDateFr(v.date)}</td>
                      <td className="px-2 py-2.5 text-cbf-black font-medium">{v.type}</td>
                      <td className="px-2 py-2.5 text-right text-cbf-gray">{v.surface} m²</td>
                      <td className="px-2 py-2.5 text-right text-cbf-black font-semibold">
                        {fmtPrice(v.prix)}
                      </td>
                      <td className="px-2 py-2.5 text-right text-cbf-gold font-semibold">
                        {fmtPriceM2(v.prix_m2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
              Source&nbsp;: DGFiP — DVF (mise à jour {stats.meta.updated})
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
