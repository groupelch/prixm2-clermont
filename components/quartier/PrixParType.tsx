import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

interface Row {
  type: string;
  surface: string;
  prixM2: number | null;
  prixTotal: string;
}

export function PrixParType({ quartier }: { quartier: Quartier }) {
  const refAppt = quartier.prixAppartement;
  const refMaison = quartier.prixMaison;

  const rows: Row[] = [];
  if (refAppt) {
    rows.push(
      { type: "Studio", surface: "20 m²", prixM2: Math.round(refAppt * 1.1), prixTotal: formatPriceTotal(refAppt * 1.1, 20) },
      { type: "T2", surface: "45 m²", prixM2: Math.round(refAppt * 1.05), prixTotal: formatPriceTotal(refAppt * 1.05, 45) },
      { type: "T3", surface: "65 m²", prixM2: refAppt, prixTotal: formatPriceTotal(refAppt, 65) },
      { type: "T4 et plus", surface: "90 m²", prixM2: Math.round(refAppt * 0.97), prixTotal: formatPriceTotal(refAppt * 0.97, 90) }
    );
  }
  if (refMaison) {
    rows.push({
      type: "Maison",
      surface: "110 m²",
      prixM2: refMaison,
      prixTotal: formatPriceTotal(refMaison, 110),
    });
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Prix par typologie
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            Combien selon la taille du bien ?
          </h2>
          <p className="text-cbf-gray text-sm">
            Estimations indicatives basées sur les prix moyens du quartier {quartier.nom}.
          </p>
        </div>

        <div className="overflow-x-auto border border-cbf-gray-soft rounded-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-cbf-black text-white">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Type</th>
                <th className="text-left px-6 py-4 font-semibold">Surface type</th>
                <th className="text-left px-6 py-4 font-semibold">Prix m²</th>
                <th className="text-left px-6 py-4 font-semibold">Prix indicatif</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-cbf-gray-soft hover:bg-cbf-ivory transition-colors">
                  <td className="px-6 py-4 font-playfair font-bold text-cbf-black">{r.type}</td>
                  <td className="px-6 py-4 text-cbf-gray">{r.surface}</td>
                  <td className="px-6 py-4 text-cbf-gold font-semibold">
                    {formatPricePerM2(r.prixM2)}
                  </td>
                  <td className="px-6 py-4 text-cbf-black font-semibold">{r.prixTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-cbf-gray-light italic mt-3">
          Ces fourchettes sont indicatives. Une estimation précise dépend de l'état, l'étage,
          l'exposition et la rue. Demandez un avis CBF Conseils pour une valorisation fine.
        </p>
      </div>
    </section>
  );
}

function formatPriceTotal(prixM2: number, surface: number): string {
  const total = Math.round(prixM2 * surface);
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(total);
}
