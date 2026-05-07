import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, MapPin } from "lucide-react";
import { quartiers } from "@/data/quartiers";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { buildMetadata } from "@/lib/seo";
import { formatPricePerM2 } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Estimation immobilière par quartier à Clermont-Ferrand 2026",
  description:
    "Estimation gratuite de votre bien par quartier à Clermont-Ferrand. Prix m² actualisés, méthode CBF Conseils, réponse sous 48h. Sélectionnez votre quartier.",
  path: "/estimation-quartier",
});

export default function EstimationQuartierPage() {
  const quartiersCF = quartiers.filter((q) => q.type === "quartier");
  const communes = quartiers.filter((q) => q.type === "commune");

  return (
    <div className="bg-cbf-ivory min-h-screen pt-10 pb-20">
      <div className="container max-w-6xl">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Estimation par quartier" },
          ]}
        />

        <header className="mt-8 mb-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30 mb-4">
            <Calculator className="h-3 w-3" /> Estimation
          </span>
          <h1 className="font-playfair text-display-lg text-cbf-black font-bold mb-5 leading-tight">
            Estimation immobilière par quartier
          </h1>
          <p className="text-lg text-cbf-gray">
            Chaque quartier de Clermont-Ferrand a sa propre dynamique de prix.
            Sélectionnez votre quartier pour une estimation précise basée sur
            les données DVF réelles et l&apos;expertise terrain CBF Conseils.
          </p>
        </header>

        {/* CTA global */}
        <div className="bg-cbf-black text-white rounded-sm p-6 md:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-cbf-gold text-[0.65rem] uppercase tracking-[0.2em] font-bold mb-1">
              Estimation directe
            </p>
            <p className="font-playfair text-xl md:text-2xl font-bold">
              Vous connaissez déjà votre adresse ?
            </p>
            <p className="text-white/70 text-sm mt-1">
              Formulaire complet — réponse sous 48h, sans engagement.
            </p>
          </div>
          <Link
            href="/estimation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cbf-gold text-cbf-black font-bold text-sm rounded-sm hover:bg-cbf-gold/90 transition-colors shrink-0"
          >
            Estimer directement <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quartiers Clermont-Ferrand */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cbf-gold" />
            Quartiers de Clermont-Ferrand
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quartiersCF.map((q) => (
              <Link
                key={q.slug}
                href={`/estimation-quartier/${q.slug}`}
                className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-playfair text-lg font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-tight">
                    Estimer à {q.nom}
                  </h3>
                </div>
                <p className="text-xs text-cbf-gray mb-3">
                  Prix m² moyen :{" "}
                  <span className="font-semibold text-cbf-black">
                    {formatPricePerM2(q.prixAppartement ?? q.prixMaison)}
                  </span>
                </p>
                <p className="text-xs text-cbf-gray-light line-clamp-2 flex-1 mb-4">
                  {q.description?.slice(0, 100)}…
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold mt-auto">
                  Estimer mon bien <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Communes */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cbf-gold" />
            Communes de l&apos;agglomération
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communes.map((q) => (
              <Link
                key={q.slug}
                href={`/estimation-quartier/${q.slug}`}
                className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-playfair text-lg font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-tight">
                    Estimer à {q.nom}
                  </h3>
                </div>
                <p className="text-xs text-cbf-gray mb-3">
                  Prix m² moyen :{" "}
                  <span className="font-semibold text-cbf-black">
                    {formatPricePerM2(q.prixAppartement ?? q.prixMaison)}
                  </span>
                </p>
                <p className="text-xs text-cbf-gray-light line-clamp-2 flex-1 mb-4">
                  {q.description?.slice(0, 100)}…
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold mt-auto">
                  Estimer mon bien <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
