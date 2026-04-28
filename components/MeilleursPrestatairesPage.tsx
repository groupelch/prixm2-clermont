import Link from "next/link";
import { ArrowRight, BadgeCheck, Star, MapPin, Clock } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  BreadcrumbSchema,
  FaqPageSchema,
} from "@/components/common/SchemaOrg";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { SITE_URL } from "@/lib/utils";

export interface Prestataire {
  nom: string;
  description: string;
  specialites: string[];
  zone: string;
  delai?: string;
  url?: string;
  partenaire?: boolean;
}

export interface FaqEntry {
  question: string;
  reponse: string;
}

export interface MeilleursPrestatairesPageProps {
  /** Slug d'URL (ex: "meilleurs-plombiers-clermont-ferrand") */
  slug: string;
  /** H1 SEO */
  h1: string;
  /** Sous-titre court (badge) */
  badge: string;
  /** Intro 60 mots */
  intro: string;
  /** Catégorie pour LocalBusiness schema (ex: "Plumber") */
  schemaType: string;
  /** Label nav fil d'ariane */
  breadcrumbLabel: string;
  /** Liste des prestataires */
  prestataires: Prestataire[];
  /** FAQ */
  faq: FaqEntry[];
  /** Texte CTA final */
  ctaTitle: string;
  ctaText: string;
  ctaHref?: string;
}

function LocalBusinessJsonLd({
  prestataires,
  schemaType,
  pageUrl,
}: {
  prestataires: Prestataire[];
  schemaType: string;
  pageUrl: string;
}) {
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    itemListElement: prestataires.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": schemaType,
        name: p.nom,
        description: p.description,
        url: p.url,
        areaServed: p.zone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Clermont-Ferrand",
          addressRegion: "Auvergne-Rhône-Alpes",
          postalCode: "63000",
          addressCountry: "FR",
        },
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }}
    />
  );
}

export function MeilleursPrestatairesPage({
  slug,
  h1,
  badge,
  intro,
  schemaType,
  breadcrumbLabel,
  prestataires,
  faq,
  ctaTitle,
  ctaText,
  ctaHref = "/estimation",
}: MeilleursPrestatairesPageProps) {
  const pageUrl = `${SITE_URL}/${slug}`;
  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    { name: breadcrumbLabel, url: pageUrl },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <FaqPageSchema items={faq} />
      <LocalBusinessJsonLd
        prestataires={prestataires}
        schemaType={schemaType}
        pageUrl={pageUrl}
      />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: breadcrumbLabel },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            {badge}
          </span>
          <h1 className="font-playfair text-display-lg md:text-display-xl text-cbf-black font-bold mt-3 mb-5 leading-tight">
            {h1}
          </h1>
          <p className="text-lg text-cbf-gray leading-relaxed">{intro}</p>
        </div>
      </section>

      {/* Liste prestataires */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-8">
            Notre sélection 2026
          </h2>
          <div className="space-y-5">
            {prestataires.map((p, i) => (
              <article
                key={p.nom}
                className={`bg-white border rounded-sm p-6 md:p-7 ${
                  p.partenaire
                    ? "border-cbf-gold shadow-lg"
                    : "border-cbf-gray-soft"
                }`}
              >
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cbf-black text-cbf-gold text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-cbf-black leading-tight">
                      {p.nom}
                    </h3>
                  </div>
                  {p.partenaire && (
                    <span className="inline-flex items-center gap-1.5 bg-cbf-gold text-cbf-black text-[0.65rem] uppercase tracking-wider font-bold px-3 py-1 rounded-sm">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Partenaire recommandé
                    </span>
                  )}
                </div>
                <p className="text-cbf-gray leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.specialites.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-cbf-ivory border border-cbf-gray-soft px-2.5 py-1 rounded-sm text-cbf-gray"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-cbf-gray-light">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.zone}
                  </span>
                  {p.delai && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {p.delai}
                    </span>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cbf-gold font-semibold hover:underline"
                    >
                      Voir le site
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-4xl">
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-6">
            Comparatif rapide
          </h2>
          <div className="overflow-x-auto bg-white border border-cbf-gray-soft rounded-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cbf-ivory text-left text-[0.65rem] uppercase tracking-wider text-cbf-gray font-bold border-b border-cbf-gray-soft">
                  <th className="px-4 py-3">Prestataire</th>
                  <th className="px-4 py-3">Spécialités</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Délai</th>
                </tr>
              </thead>
              <tbody>
                {prestataires.map((p) => (
                  <tr
                    key={p.nom}
                    className="border-b border-cbf-gray-soft last:border-0"
                  >
                    <td className="px-4 py-3 font-semibold text-cbf-black">
                      <span className="flex items-center gap-2">
                        {p.nom}
                        {p.partenaire && (
                          <Star className="h-3.5 w-3.5 text-cbf-gold fill-cbf-gold" />
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-cbf-gray">
                      {p.specialites.slice(0, 2).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-cbf-gray">{p.zone}</td>
                    <td className="px-4 py-3 text-cbf-gray">
                      {p.delai ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqAccordion items={faq} title="Questions fréquentes" />

      {/* CTA */}
      <section className="py-14 md:py-20 bg-cbf-black text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-playfair text-display-md font-bold mb-4">
            {ctaTitle}
          </h2>
          <p className="text-cbf-gray-light mb-8">{ctaText}</p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-cbf-gold text-cbf-black px-6 py-3.5 text-sm font-semibold rounded-sm hover:bg-cbf-gold-light transition-colors"
          >
            En savoir plus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
