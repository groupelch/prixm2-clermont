import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { quartiers, getQuartierBySlug } from "@/data/quartiers";
import { getArticlesForQuartier } from "@/data/articles";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  BreadcrumbSchema,
  FaqPageSchema,
  PlaceSchema,
} from "@/components/common/SchemaOrg";
import { FaqAccordion } from "@/components/home/FaqAccordion";
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
  return buildMetadata({
    title: `Estimation immobilière gratuite ${q.nom} — Prix au m² 2026`,
    description: `Estimez votre appartement ou maison à ${q.nom} en 2 minutes. Méthode CBF Conseils basée sur les prix réels (${formatPricePerM2(q.prixAppartement)}). Réponse sous 48h.`,
    path: `/estimation-quartier/${q.slug}`,
  });
}

export default function EstimationQuartierPage({
  params,
}: {
  params: Params;
}) {
  const q = getQuartierBySlug(params.slug);
  if (!q) notFound();

  const articles = getArticlesForQuartier(q.slug).slice(0, 3);
  const refPrix = q.prixAppartement ?? q.prixMaison;

  const faq = [
    {
      question: `Combien coûte une estimation à ${q.nom} ?`,
      reponse: `L'estimation par CBF Conseils est entièrement gratuite et sans engagement. Elle s'appuie sur les ventes récentes du secteur, le prix médian au m² (${formatPricePerM2(refPrix)}) et une visite éventuelle sur place.`,
    },
    {
      question: `En combien de temps obtient-on l'estimation ?`,
      reponse: `Sous 48 heures ouvrées après réception du formulaire. Pour les biens atypiques (maisons, biens d'exception), une visite est généralement programmée dans les jours suivants.`,
    },
    {
      question: `Sur quoi se base l'estimation à ${q.nom} ?`,
      reponse: `Sur trois sources : la base DVF (transactions notariées des 24 derniers mois), notre observatoire interne CBF des biens vendus dans le quartier, et l'analyse fine de votre bien (état, étage, exposition, DPE, travaux récents).`,
    },
    {
      question: `L'estimation est-elle écrite ?`,
      reponse: `Oui. Vous recevez un document PDF avec la fourchette de prix justifiée, les ventes comparables récentes du secteur et nos préconisations de mise en marché. Vous restez libre de vendre, attendre, ou choisir un autre interlocuteur.`,
    },
  ];

  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    { name: "Estimation par quartier", url: `${SITE_URL}/estimation` },
    { name: q.nom, url: `${SITE_URL}/estimation-quartier/${q.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <FaqPageSchema items={faq} />
      <PlaceSchema
        name={q.nom}
        lat={q.coordinates.lat}
        lng={q.coordinates.lng}
        description={q.description}
      />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Estimation", href: "/estimation" },
            { name: q.nom },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative pt-10 pb-14 md:pt-14 md:pb-20 bg-cbf-ivory overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-cbf-gold rounded-full opacity-10 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-cbf-gold/30 rounded-full mb-6">
                <MapPin className="h-3 w-3 text-cbf-gold" />
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cbf-black font-semibold">
                  Estimation gratuite · {q.ville}
                </span>
              </div>

              <h1 className="font-playfair text-display-xl text-cbf-black font-bold mb-5 leading-tight">
                Estimation immobilière gratuite à{" "}
                <span className="text-cbf-gold">{q.nom}</span>
              </h1>
              <p className="text-lg text-cbf-gray mb-8 max-w-xl">
                Découvrez la valeur réelle de votre appartement ou maison à {q.nom}.
                Méthode CBF Conseils — basée sur les ventes récentes du quartier,
                la base DVF et l'expertise terrain. Réponse argumentée sous 48 h.
              </p>

              <ul className="space-y-3 mb-8 max-w-xl">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cbf-gold mt-0.5 shrink-0" />
                  <span className="text-cbf-black">
                    Prix médian {q.nom} :{" "}
                    <strong>{formatPricePerM2(refPrix)}</strong> ({q.evolution} sur 12 mois)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-cbf-gold mt-0.5 shrink-0" />
                  <span className="text-cbf-black">
                    Délai de vente moyen : <strong>{q.delaiVente} jours</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-cbf-gold mt-0.5 shrink-0" />
                  <span className="text-cbf-black">
                    Évolution 5 ans : <strong>{q.evolution5ans}</strong>
                  </span>
                </li>
              </ul>

              <p className="text-sm text-cbf-gray-light">
                Sans engagement. Aucun appel commercial intempestif. Vous gardez
                la main sur votre projet.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-cbf-gray-soft rounded-sm shadow-lg p-6 md:p-8">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                  Formulaire express · 1 minute
                </span>
                <h2 className="font-playfair text-2xl font-bold text-cbf-black mt-2 mb-5">
                  Mon estimation à {q.nom}
                </h2>
                <FormEstimationCourt
                  sourcePage={`/estimation-quartier/${q.slug}`}
                  sourceQuartier={q.slug}
                  defaultQuartier={q.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi confier à CBF */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Notre méthode
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-8">
            Pourquoi notre estimation à {q.nom} fait référence
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-2">
                01 · Données réelles
              </div>
              <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2">
                Base DVF + observatoire CBF
              </h3>
              <p className="text-sm text-cbf-gray leading-relaxed">
                Toutes les ventes notariées des 24 derniers mois sur {q.nom} et
                quartiers limitrophes, complétées par notre suivi interne des
                ventes en cours.
              </p>
            </div>
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-2">
                02 · Expertise terrain
              </div>
              <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2">
                {q.nom} rue par rue
              </h3>
              <p className="text-sm text-cbf-gray leading-relaxed">
                {q.pointsForts[0]}, {q.pointsForts[1]?.toLowerCase() ?? "secteur recherché"}.
                Nos négociateurs connaissent les écarts réels d'une rue à l'autre.
              </p>
            </div>
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-2">
                03 · Document écrit
              </div>
              <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2">
                Estimation argumentée PDF
              </h3>
              <p className="text-sm text-cbf-gray leading-relaxed">
                Fourchette justifiée, biens comparables récents, préconisations
                de mise en marché. Sans engagement de vente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/prix-m2/${q.slug}`}
              className="group block bg-white p-6 md:p-8 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold">
                Marché
              </span>
              <h3 className="font-playfair text-xl font-bold text-cbf-black mt-2 mb-3 group-hover:text-cbf-gold transition-colors">
                Prix m² détaillés à {q.nom}
              </h3>
              <p className="text-sm text-cbf-gray mb-4">
                Analyse complète : prix appartement, prix maison, profil
                acheteur, points forts/faibles, FAQ.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                Voir l'analyse <ArrowRight className="h-4 w-4" />
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
                Vendre votre bien à {q.nom}
              </h3>
              <p className="text-sm text-cbf-gray mb-4">
                Conseils de mise en marché, délais réels, négociation —
                spécifiques au secteur {q.nom}.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                Stratégie de vente <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {articles.length > 0 && (
            <div className="mt-12 pt-12 border-t border-cbf-gray-soft">
              <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6">
                Pour aller plus loin
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

      <FaqAccordion items={faq} title={`Estimation à ${q.nom} — questions fréquentes`} />
    </>
  );
}
