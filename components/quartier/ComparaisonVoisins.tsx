import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { Quartier } from "@/data/quartiers";
import { getQuartierBySlug } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

export function ComparaisonVoisins({ quartier }: { quartier: Quartier }) {
  const voisins = quartier.quartiersVoisins
    .map((slug) => getQuartierBySlug(slug))
    .filter((q): q is Quartier => Boolean(q));

  if (voisins.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Comparaison
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            Quartiers voisins de {quartier.nom}
          </h2>
        </div>

        <div className="overflow-x-auto border border-cbf-gray-soft rounded-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-cbf-black text-white">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Quartier / Commune</th>
                <th className="text-left px-6 py-4 font-semibold">Prix m²</th>
                <th className="text-left px-6 py-4 font-semibold">Évolution</th>
                <th className="text-left px-6 py-4 font-semibold">Délai</th>
                <th className="text-right px-6 py-4 font-semibold">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-cbf-gold/10 border-t border-cbf-gold/30">
                <td className="px-6 py-4 font-playfair font-bold text-cbf-black">
                  {quartier.nom}{" "}
                  <span className="text-[0.65rem] text-cbf-gold uppercase tracking-wider ml-2">Vous êtes ici</span>
                </td>
                <td className="px-6 py-4 text-cbf-gold font-bold">
                  {formatPricePerM2(quartier.prixAppartement ?? quartier.prixMaison)}
                </td>
                <td className="px-6 py-4 text-cbf-success font-semibold">{quartier.evolution}</td>
                <td className="px-6 py-4 text-cbf-gray">{quartier.delaiVente} j</td>
                <td className="px-6 py-4 text-right text-cbf-gray-light">—</td>
              </tr>
              {voisins.map((v) => (
                <tr
                  key={v.slug}
                  className="border-t border-cbf-gray-soft hover:bg-cbf-ivory transition-colors"
                >
                  <td className="px-6 py-4 font-medium">
                    <Link href={`/prix-m2/${v.slug}`} className="text-cbf-black hover:text-cbf-gold transition-colors font-semibold">
                      {v.nom}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-cbf-black">
                    {formatPricePerM2(v.prixAppartement ?? v.prixMaison)}
                  </td>
                  <td className="px-6 py-4 text-cbf-success font-semibold inline-flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {v.evolution}
                  </td>
                  <td className="px-6 py-4 text-cbf-gray">{v.delaiVente} j</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/prix-m2/${v.slug}`}
                      className="inline-flex items-center gap-1 text-cbf-gold hover:underline text-xs font-semibold"
                    >
                      Voir <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
