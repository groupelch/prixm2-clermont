import Link from "next/link";
import { quartiers } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

interface Props {
  quartierActuelSlug: string;
}

export function TousQuartiersFooter({ quartierActuelSlug }: Props) {
  const autres = quartiers.filter((q) => q.slug !== quartierActuelSlug);
  const quartiersCF = autres.filter((q) => q.type === "quartier");
  const communes = autres.filter((q) => q.type === "commune");

  return (
    <section className="py-10 bg-cbf-ivory border-t border-cbf-gray-soft">
      <div className="container">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-5">
          Tous les quartiers &amp; communes
        </p>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-cbf-gray-light font-semibold mb-3">
            Quartiers Clermont-Ferrand
          </p>
          <div className="flex flex-wrap gap-2">
            {quartiersCF.map((q) => (
              <Link
                key={q.slug}
                href={`/prix-m2/${q.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-cbf-gray-soft hover:border-cbf-gold hover:text-cbf-gold text-xs text-cbf-gray rounded-sm transition-all"
              >
                <span className="font-medium text-cbf-black">{q.nom}</span>
                <span className="text-cbf-gray-light">
                  {formatPricePerM2(q.prixAppartement ?? q.prixMaison)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-cbf-gray-light font-semibold mb-3 mt-4">
            Communes de l&apos;agglomération
          </p>
          <div className="flex flex-wrap gap-2">
            {communes.map((q) => (
              <Link
                key={q.slug}
                href={`/prix-m2/${q.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-cbf-gray-soft hover:border-cbf-gold hover:text-cbf-gold text-xs text-cbf-gray rounded-sm transition-all"
              >
                <span className="font-medium text-cbf-black">{q.nom}</span>
                <span className="text-cbf-gray-light">
                  {formatPricePerM2(q.prixAppartement ?? q.prixMaison)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
