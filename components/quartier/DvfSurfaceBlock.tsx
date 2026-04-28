import { Ruler } from "lucide-react";
import type { DvfStatsBySize, DvfTypeStats } from "@/lib/dvf";

interface Props {
  stats: DvfStatsBySize;
  quartier: string;
}

const fmtPriceM2 = (n: number) =>
  `${new Intl.NumberFormat("fr-FR").format(n)} €/m²`;

interface SizeColProps {
  label: string;
  hint: string;
  stats: DvfTypeStats | null;
}

function SizeCol({ label, hint, stats }: SizeColProps) {
  return (
    <div className="bg-white border border-cbf-gray-soft rounded-sm p-5">
      <div className="mb-4">
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
          {label}
        </p>
        <p className="text-xs text-cbf-gray-light mt-0.5">{hint}</p>
      </div>
      {stats ? (
        <>
          <p className="font-playfair text-2xl font-bold text-cbf-gold leading-none">
            {fmtPriceM2(stats.prix_m2_median)}
          </p>
          <p className="text-xs text-cbf-gray mt-2">
            {stats.nb_transactions} transaction
            {stats.nb_transactions > 1 ? "s" : ""}
          </p>
        </>
      ) : (
        <>
          <p className="font-playfair text-2xl font-bold text-cbf-gray-light leading-none">
            —
          </p>
          <p className="text-xs text-cbf-gray-light mt-2">
            Pas assez de données
          </p>
        </>
      )}
    </div>
  );
}

export function DvfSurfaceBlock({ stats, quartier }: Props) {
  // Si toutes les catégories sont vides, ne rien afficher
  const hasAny =
    stats.t1 !== null ||
    stats.t2 !== null ||
    stats.t3 !== null ||
    stats.t4plus !== null;
  if (!hasAny) return null;

  return (
    <section className="py-14 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white border border-cbf-gold/30 rounded-sm">
            <Ruler className="h-3.5 w-3.5 text-cbf-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
              DVF par surface
            </span>
          </div>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-3">
            Prix par type d&apos;appartement à {quartier}
          </h2>
          <p className="text-cbf-gray">
            Médiane des prix au m² selon la tranche de surface — utile pour
            comparer un studio à un grand appartement, qui ne se vendent pas au
            même prix au m².
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SizeCol label="T1" hint="< 35 m²" stats={stats.t1} />
          <SizeCol label="T2" hint="35 – 55 m²" stats={stats.t2} />
          <SizeCol label="T3" hint="55 – 80 m²" stats={stats.t3} />
          <SizeCol label="T4 +" hint="≥ 80 m²" stats={stats.t4plus} />
        </div>
      </div>
    </section>
  );
}
