import type { Metadata } from "next";
import Link from "next/link";
import { quartiers, getQuartiersByType, getPrixMoyenAppartement, getPrixMoyenMaison } from "@/data/quartiers";
import { QuartierCard } from "@/components/common/QuartierCard";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema } from "@/components/common/SchemaOrg";
import { MapWrapper } from "@/components/home/MapWrapper";
import { ChiffresCles } from "@/components/home/ChiffresCles";
import { WhyPricesVary } from "@/components/home/WhyPricesVary";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL, formatPricePerM2 } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Prix immobilier à Clermont-Ferrand 2025 — Guide complet par quartier",
  description: `Tous les prix immobiliers à Clermont-Ferrand 2025 : prix moyen ${formatPricePerM2(getPrixMoyenAppartement())} pour un appartement, analyse par quartier, communes de l'agglo. Données CBF Conseils.`,
  path: "/prix-immobilier-clermont-ferrand",
});

export default function PrixImmoPilierPage() {
  const qClermont = getQuartiersByType("quartier");
  const communes = getQuartiersByType("commune");
  const prixApp = getPrixMoyenAppartement();
  const prixMaison = getPrixMoyenMaison();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Prix immobilier Clermont-Ferrand", url: `${SITE_URL}/prix-immobilier-clermont-ferrand` },
        ]}
      />

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav
            items={[{ name: "Accueil", href: "/" }, { name: "Prix immobilier" }]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Référentiel 2025
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Prix immobilier à Clermont-Ferrand
              <br />
              <span className="text-cbf-gold">Guide complet par quartier</span>
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed">
              Tout pour comprendre le marché immobilier de Clermont-Ferrand en 2025 :
              prix moyen au m² par quartier, communes de l'agglomération,
              tendances et facteurs de variation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <Stat label="Prix appartement" value={formatPricePerM2(prixApp)} />
            <Stat label="Prix maison" value={formatPricePerM2(prixMaison)} />
            <Stat label="Évolution 12 mois" value="+3,2 %" highlight />
            <Stat label="Délai moyen" value="60 j" />
          </div>
        </div>
      </section>

      <section id="carte" className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Tous les prix sur la carte
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Carte interactive des prix m²
            </h2>
            <p className="text-cbf-gray">
              Cliquez sur un quartier pour voir le prix moyen et l'analyse complète.
            </p>
          </div>
          <MapWrapper />
        </div>
      </section>

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Quartiers Clermont-Ferrand
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              {qClermont.length} quartiers analysés
            </h2>
            <p className="text-cbf-gray">
              Du centre historique aux quartiers résidentiels, retrouvez les prix
              de chaque secteur de Clermont-Ferrand intra-muros.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qClermont.map((q, i) => (
              <QuartierCard key={q.slug} quartier={q} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Communes agglo
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Métropole de Clermont-Ferrand
            </h2>
            <p className="text-cbf-gray">
              Beaumont, Chamalières, Aubière, Riom… Découvrez les prix dans les
              communes de la métropole.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {communes.map((q, i) => (
              <QuartierCard key={q.slug} quartier={q} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ChiffresCles />
      <WhyPricesVary />

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-5">
              Les sources de nos données
            </h2>
            <p className="text-cbf-gray mb-8">
              Les prix indiqués sur prixm² Clermont-Ferrand croisent trois sources :
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "DVF — Demandes de Valeurs Foncières",
                desc: "La base officielle des transactions immobilières publiée par la DGFiP, mise à jour semestriellement.",
              },
              {
                title: "Marché actif",
                desc: "Annonces actives sur SeLoger, Leboncoin, Bien'ici, MeilleursAgents — analyse des tendances en temps réel.",
              },
              {
                title: "Expertise terrain CBF Conseils",
                desc: "Plus de 10 ans d'expérience à Clermont-Ferrand, retours qualitatifs sur chaque rue, chaque immeuble.",
              },
            ].map((s) => (
              <div key={s.title} className="bg-white border border-cbf-gray-soft p-6 rounded-sm">
                <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-cbf-gray">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white border border-cbf-gray-soft p-4 rounded-sm">
      <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light font-semibold">
        {label}
      </p>
      <p
        className={`font-playfair text-xl md:text-2xl font-bold mt-1 ${
          highlight ? "text-cbf-success" : "text-cbf-black"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
