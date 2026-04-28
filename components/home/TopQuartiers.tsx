import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTopQuartiers } from "@/data/quartiers";
import { QuartierCard } from "@/components/common/QuartierCard";

export function TopQuartiers() {
  const items = getTopQuartiers(6);
  return (
    <section className="py-20 md:py-28 bg-cbf-ivory">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Les plus recherchés
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-3 mb-3">
              Quartiers premium de Clermont-Ferrand
            </h2>
            <p className="text-cbf-gray">
              Les six secteurs les plus recherchés et les mieux valorisés de la métropole.
            </p>
          </div>
          <Link
            href="/prix-immobilier-clermont-ferrand"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cbf-black hover:text-cbf-gold transition-colors group"
          >
            Voir tous les quartiers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((q, i) => (
            <QuartierCard key={q.slug} quartier={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
