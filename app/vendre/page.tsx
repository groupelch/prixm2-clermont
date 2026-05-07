import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, MapPin } from "lucide-react";
import { quartiers } from "@/data/quartiers";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { buildMetadata } from "@/lib/seo";
import { formatPricePerM2 } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Vendre à Clermont-Ferrand par quartier — Stratégie & Prix 2026",
  description:
    "Conseils et stratégie pour vendre votre bien à Clermont-Ferrand : prix juste par quartier, délais réels, pièges à éviter. Guide CBF Conseils 2026.",
  path: "/vendre",
});

export default function VendrePage() {
  const quartiersCF = quartiers.filter((q) => q.type === "quartier");
  const communes = quartiers.filter((q) => q.type === "commune");

  return (
    <div className="bg-cbf-ivory min-h-screen pt-10 pb-20">
      <div className="container max-w-6xl">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Vendre à Clermont-Ferrand" },
          ]}
        />

        <header className="mt-8 mb-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30 mb-4">
            <TrendingUp className="h-3 w-3" /> Vendre
          </span>
          <h1 className="font-playfair text-display-lg text-cbf-black font-bold mb-5 leading-tight">
            Vendre à Clermont-Ferrand par quartier
          </h1>
          <p className="text-lg text-cbf-gray">
            Chaque quartier a ses règles : délais, prix juste, acheteurs cibles,
            pièges à éviter. Sélectionnez votre quartier pour une stratégie
            de vente adaptée à votre adresse.
          </p>
        </header>

        {/* CTA global */}
        <div className="bg-cbf-black text-white rounded-sm p-6 md:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-cbf-gold text-[0.65rem] uppercase tracking-[0.2em] font-bold mb-1">
              Estimation gratuite
            </p>
            <p className="font-playfair text-xl md:text-2xl font-bold">
              Vous préférez parler directement à un expert ?
            </p>
            <p className="text-white/70 text-sm mt-1">
              Réponse sous 48h — sans engagement.
            </p>
          </div>
          <Link
            href="/estimation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cbf-gold text-cbf-black font-bold text-sm rounded-sm hover:bg-cbf-gold/90 transition-colors shrink-0"
          >
            Estimer mon bien <ArrowRight className="h-4 w-4" />
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
                href={`/vendre/${q.slug}`}
                className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-playfair text-lg font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-tight">
                    Vendre à {q.nom}
                  </h3>
                  <span
                    className={`text-sm font-bold shrink-0 ml-2 ${
                      q.evolution12m?.startsWith("+")
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {q.evolution12m}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-cbf-gray mb-4">
                  <span className="font-semibold text-cbf-black">
                    {formatPricePerM2(q.prixAppartement ?? q.prixMaison)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {q.delaiVente} j de vente
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold mt-auto">
                  Stratégie de vente <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Communes de l'agglo */}
        <section>
          <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-cbf-gold" />
            Communes de l&apos;agglomération
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communes.map((q) => (
              <Link
                key={q.slug}
                href={`/vendre/${q.slug}`}
                className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-playfair text-lg font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-tight">
                    Vendre à {q.nom}
                  </h3>
                  <span
                    className={`text-sm font-bold shrink-0 ml-2 ${
                      q.evolution12m?.startsWith("+")
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {q.evolution12m}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-cbf-gray mb-4">
                  <span className="font-semibold text-cbf-black">
                    {formatPricePerM2(q.prixAppartement ?? q.prixMaison)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {q.delaiVente} j de vente
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold mt-auto">
                  Stratégie de vente <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
