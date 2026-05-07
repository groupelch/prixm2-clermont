import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quartiers, getQuartierBySlug } from "@/data/quartiers";
import { getArticlesForQuartier } from "@/data/articles";
import { guides } from "@/data/guides";
import { QuartierHero } from "@/components/quartier/QuartierHero";
import { QuartierTOC } from "@/components/quartier/QuartierTOC";
import { ChiffresQuartier } from "@/components/quartier/ChiffresQuartier";
import { AnalyseLocale } from "@/components/quartier/AnalyseLocale";
import { PrixParType } from "@/components/quartier/PrixParType";
import { QuartierMap } from "@/components/quartier/QuartierMap";
import { ConseilsVendeur } from "@/components/quartier/ConseilsVendeur";
import { ComparaisonVoisins } from "@/components/quartier/ComparaisonVoisins";
import { PrixJustePedagogie } from "@/components/quartier/PrixJustePedagogie";
import { AmenitiesBlock } from "@/components/quartier/AmenitiesBlock";
import { DpeBlock } from "@/components/quartier/DpeBlock";
import { DvfBlock } from "@/components/quartier/DvfBlock";
import { DvfSurfaceBlock } from "@/components/quartier/DvfSurfaceBlock";
import { PriceHistoryChart } from "@/components/quartier/PriceHistoryChart";
import { IrisBlock } from "@/components/quartier/IrisBlock";
import { TransportBlock } from "@/components/quartier/TransportBlock";
import { getAmenitiesForQuartier } from "@/lib/amenities";
import { getDpeStatsForQuartier } from "@/lib/dpe";
import { getDvfHistoryForQuartier, getDvfStatsForQuartier } from "@/lib/dvf";
import { getIrisStatsForQuartier } from "@/lib/iris";
import { getTransportForQuartier } from "@/lib/transport";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { StickyCtaBar } from "@/components/common/StickyCtaBar";
import { AlertePrixForm } from "@/components/quartier/AlertePrixForm";
import { TousQuartiersFooter } from "@/components/quartier/TousQuartiersFooter";
import {
  FaqPageSchema,
  BreadcrumbSchema,
  PlaceSchema,
  ArticleSchema,
  SpeakableSchema,
} from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { formatPricePerM2, SITE_URL } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return quartiers.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const q = getQuartierBySlug(params.slug);
  if (!q) return { title: "Quartier introuvable" };

  const communesMeta: Record<string, { title: string; description: string }> = {
    beaumont: {
      title: "Prix m² Beaumont (63) — Marché immobilier 2026",
      description:
        "Prix immobiliers à Beaumont : ~3 200 €/m² pour une maison, commune résidentielle premium de l'agglo clermontoise. Données DVF réelles, estimation gratuite CBF Conseils.",
    },
    chamalieres: {
      title: "Prix m² Chamalières — Commune la plus chère du 63 en 2026",
      description:
        "Chamalières : 2 700 €/m² appart · 3 500 €/m² maison. L'adresse la plus prestigieuse du Puy-de-Dôme. Analyse marché complète et estimation gratuite par CBF Conseils.",
    },
    royat: {
      title: "Prix m² Royat — Immobilier thermal Belle Époque 2026",
      description:
        "Prix immobiliers à Royat : ~3 100 €/m² maison, tram A, architecture Belle Époque. Commune thermale de l'agglo clermontoise. Données réelles DVF + estimation CBF Conseils.",
    },
  };
  if (communesMeta[params.slug]) {
    return buildMetadata({
      ...communesMeta[params.slug],
      path: `/prix-m2/${params.slug}`,
    });
  }

  const refPrix = q.prixAppartement ?? q.prixMaison;
  return buildMetadata({
    title: `Prix m² ${q.nom} — ${formatPricePerM2(refPrix)} en 2026`,
    description: `Prix immobiliers à ${q.nom} : ${formatPricePerM2(q.prixAppartement)} pour un appartement, évolution ${q.evolution}, délai de vente ${q.delaiVente} jours. Analyse complète et estimation gratuite par CBF Conseils.`,
    path: `/prix-m2/${q.slug}`,
  });
}

export default function QuartierPage({ params }: { params: Params }) {
  const q = getQuartierBySlug(params.slug);
  if (!q) notFound();
  const articles = getArticlesForQuartier(q.slug).slice(0, 3);
  // 3 guides toujours utiles sur une page quartier (1 vendeur, 1 marche, 1 acheteur)
  const guidesQuartier = [
    guides.find((g) => g.categorie === "vendeur"),
    guides.find((g) => g.categorie === "marche"),
    guides.find((g) => g.categorie === "acheteur"),
  ].filter(Boolean) as typeof guides;
  const amenities = getAmenitiesForQuartier(q.coordinates.lat, q.coordinates.lng);
  const dpeStats = getDpeStatsForQuartier(q.coordinates.lat, q.coordinates.lng);
  const dvfStats = getDvfStatsForQuartier(q.coordinates.lat, q.coordinates.lng);
  const dvfHistory = getDvfHistoryForQuartier(q.coordinates.lat, q.coordinates.lng);
  const irisStats = getIrisStatsForQuartier(q.coordinates.lat, q.coordinates.lng);
  const transportStats = getTransportForQuartier(q.coordinates.lat, q.coordinates.lng);

  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    {
      name: "Prix par quartier",
      url: `${SITE_URL}/prix-immobilier-clermont-ferrand`,
    },
    { name: q.nom, url: `${SITE_URL}/prix-m2/${q.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <ArticleSchema
        title={`Prix m² ${q.nom} — ${formatPricePerM2(q.prixAppartement ?? q.prixMaison)} en 2026`}
        description={`Prix immobiliers à ${q.nom} : ${formatPricePerM2(q.prixAppartement)} pour un appartement, évolution ${q.evolution}, délai de vente ${q.delaiVente} jours. Analyse complète et estimation gratuite par CBF Conseils.`}
        datePublished="2024-01-15"
        dateModified={new Date().toISOString().split("T")[0]}
        url={`${SITE_URL}/prix-m2/${q.slug}`}
        authorName="Louis Combret, Directeur CBF Conseils"
        authorType="Person"
      />
      <FaqPageSchema items={q.faq} />
      <PlaceSchema
        name={q.nom}
        lat={q.coordinates.lat}
        lng={q.coordinates.lng}
        description={q.description}
        slug={q.slug}
      />
      <SpeakableSchema
        url={`${SITE_URL}/prix-m2/${q.slug}`}
        cssSelectors={["h1", ".speakable-intro", ".faq-accordion"]}
      />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Prix par quartier", href: "/prix-immobilier-clermont-ferrand" },
            { name: q.nom },
          ]}
        />
      </div>

      <QuartierHero quartier={q} />
      <ChiffresQuartier quartier={q} />
      <QuartierTOC />
      <div id="historique" className="scroll-mt-24">
        <PriceHistoryChart history={dvfHistory} quartierNom={q.nom} />
      </div>
      <AnalyseLocale quartier={q} />
      <div id="prix" className="scroll-mt-24">
        <PrixParType quartier={q} />
      </div>
      <div id="dpe" className="scroll-mt-24">
        <DpeBlock stats={dpeStats} />
      </div>
      <div id="transactions" className="scroll-mt-24">
        <DvfBlock stats={dvfStats} quartier={q.nom} />
      </div>
      <DvfSurfaceBlock stats={dvfStats.par_taille} quartier={q.nom} />
      <div id="equipements" className="scroll-mt-24">
        <AmenitiesBlock amenities={amenities} quartierNom={q.nom} />
      </div>
      <IrisBlock stats={irisStats} quartierNom={q.nom} />
      <div id="transport" className="scroll-mt-24">
        <TransportBlock stats={transportStats} quartierNom={q.nom} />
      </div>

      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Localisation
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              {q.nom} sur la carte
            </h2>
          </div>
          <QuartierMap
            lat={q.coordinates.lat}
            lng={q.coordinates.lng}
            nom={q.nom}
            prix={q.prixAppartement ?? q.prixMaison}
          />
        </div>
      </section>

      <ConseilsVendeur quartier={q} />
      <PrixJustePedagogie />
      <ComparaisonVoisins quartier={q} />

      {/* Estimation form inline */}
      <section id="estimation" className="scroll-mt-24 py-14 md:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Estimation
              </span>
              <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-4">
                Combien vaut votre bien à {q.nom} ?
              </h2>
              <p className="text-cbf-gray">
                Estimation gratuite et sans engagement par un expert CBF Conseils.
                Analyse précise sous 48 heures.
              </p>
            </div>
            <div className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6 md:p-8">
              <FormEstimationCourt
                sourcePage={`/prix-m2/${q.slug}`}
                sourceQuartier={q.slug}
                defaultQuartier={q.slug}
              />
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        items={q.faq}
        title={`Questions sur ${q.nom}`}
      />

      {/* Maillage interne — estimation, vente, articles */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link
              href={`/estimation-quartier/${q.slug}`}
              className="group block bg-white p-6 md:p-8 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold">
                Estimation
              </span>
              <h3 className="font-playfair text-xl font-bold text-cbf-black mt-2 mb-3 group-hover:text-cbf-gold transition-colors">
                Estimation gratuite à {q.nom}
              </h3>
              <p className="text-sm text-cbf-gray mb-4">
                Document écrit sous 48 h, méthode CBF Conseils, sans engagement.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                Estimer mon bien <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href={`/vendre/${q.slug}`}
              className="group block bg-white p-6 md:p-8 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold">
                Vendre
              </span>
              <h3 className="font-playfair text-xl font-bold text-cbf-black mt-2 mb-3 group-hover:text-cbf-gold transition-colors">
                Vendre à {q.nom} — stratégie 2026
              </h3>
              <p className="text-sm text-cbf-gray mb-4">
                Délais, prix juste, mise en marché, pièges à éviter spécifiques
                au quartier.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                Préparer ma vente <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Guides liés */}
          <div className="pt-12 border-t border-cbf-gray-soft mb-12">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
              Guides pratiques
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {guidesQuartier.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="group block bg-white p-5 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
                >
                  <h3 className="font-playfair text-sm font-bold text-cbf-black mb-2 leading-snug group-hover:text-cbf-gold transition-colors">
                    {g.titre}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                    Lire <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {articles.length > 0 && (
            <div className="pt-12 border-t border-cbf-gray-soft">
              <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6">
                Articles liés
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group block bg-white p-5 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
                  >
                    <h3 className="font-playfair text-base font-bold text-cbf-black mb-2 leading-snug group-hover:text-cbf-gold transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-cbf-gray-light line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 bg-cbf-ivory border-t border-cbf-gray-soft">
        <div className="container max-w-xl">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-1">
            Alerte prix
          </p>
          <p className="text-sm text-cbf-gray mb-3">
            Suivre les prix à {q.nom}
          </p>
          <AlertePrixForm quartierId={q.slug} quartierNom={q.nom} />
        </div>
      </section>

      <TousQuartiersFooter quartierActuelSlug={q.slug} />
      <StickyCtaBar />
      <FinalCta />
    </>
  );
}
