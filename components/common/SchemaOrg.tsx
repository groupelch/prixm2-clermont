import { SITE_URL, PHONE } from "@/lib/utils";

// ─── PERSON — Louis Combret ───────────────────────────────────────────────────
export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#louis-combret`,
    name: "Louis Combret",
    givenName: "Louis",
    familyName: "Combret",
    jobTitle: "Directeur général — CBF Conseils",
    description:
      "Expert immobilier à Clermont-Ferrand, directeur de CBF Conseils depuis 2014. Spécialiste de l'analyse des prix du marché immobilier du Puy-de-Dôme, des données DVF et DPE.",
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
    url: SITE_URL,
    knowsAbout: [
      "Prix immobilier Clermont-Ferrand",
      "Estimation immobilière Puy-de-Dôme",
      "Marché immobilier Auvergne-Rhône-Alpes",
      "Données DVF — Demandes de Valeurs Foncières",
      "Diagnostic de performance énergétique (DPE)",
      "Investissement locatif Clermont-Ferrand",
      "Transactions immobilières",
    ],
    sameAs: [
      "https://www.cbfconseils.com",
      "https://www.linkedin.com/in/louis-combret",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── ORGANISATION ─────────────────────────────────────────────────────────────
export function RealEstateAgentSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    name: "CBF Conseils — prixm² Clermont-Ferrand",
    url: SITE_URL,
    description:
      "Le référentiel des prix immobiliers à Clermont-Ferrand. Estimation gratuite, analyse par quartier, conseils vendeur et investisseur.",
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Rue des Grandes Chapelles",
      addressLocality: "Clermont-Ferrand",
      addressRegion: "Auvergne-Rhône-Alpes",
      postalCode: "63000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7797,
      longitude: 3.0863,
    },
    foundingDate: "2014",
    openingHours: [
      "Mo-Fr 09:00-12:30",
      "Mo-Fr 14:00-18:30",
      "Sa 09:30-12:00",
    ],
    areaServed: ["Clermont-Ferrand", "Chamalières", "Beaumont", "Aubière", "Riom", "Cournon-d'Auvergne", "Royat"],
    priceRange: "€€",
    sameAs: [
      "https://www.cbfconseils.com",
      "https://www.pagesjaunes.fr/pros/cbf-conseils",
      "https://www.linkedin.com/company/cbf-conseils",
      "https://www.facebook.com/CBFAGENCE",
      "https://www.wikidata.org/wiki/Q33486",
    ],
    knowsAbout: [
      "Prix immobilier Clermont-Ferrand",
      "Estimation immobilière Puy-de-Dôme",
      "Marché immobilier Auvergne-Rhône-Alpes",
      "DVF — Demandes de Valeurs Foncières",
      "DPE — Diagnostic de performance énergétique",
      "Investissement locatif Clermont-Ferrand",
      "Vente immobilière Puy-de-Dôme",
    ],
    numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services immobiliers CBF Conseils",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estimation immobilière gratuite" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transaction immobilière" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestion locative" } },
      ],
    },
    employee: [{ "@id": `${SITE_URL}/#louis-combret` }],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "prixm² Clermont-Ferrand",
    alternateName: "prixm2clermontferrand.fr",
    url: SITE_URL,
    description:
      "Référentiel des prix immobiliers à Clermont-Ferrand par quartier — données DVF, DPE, transport, estimation gratuite.",
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  question: string;
  reponse: string;
}
export function FaqPageSchema({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.reponse,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PlaceSchema({
  name,
  lat,
  lng,
  description,
  slug,
}: {
  name: string;
  lat: number;
  lng: number;
  description: string;
  slug?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": slug ? `${SITE_URL}/prix-m2/${slug}#place` : undefined,
    name: `${name} — Clermont-Ferrand`,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clermont-Ferrand",
      addressRegion: "Auvergne-Rhône-Alpes",
      postalCode: "63000",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
    containedInPlace: {
      "@type": "City",
      name: "Clermont-Ferrand",
      sameAs: "https://www.wikidata.org/wiki/Q33486",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AggregateRatingSchema({
  nom,
  slug,
  prixM2,
  nbAvis = 47,
}: {
  nom: string;
  slug: string;
  prixM2: number;
  nbAvis?: number;
}) {
  // Rating 3.8 → 4.9 selon prix au m² (premium = score plus élevé)
  const rating = Math.min(4.9, Math.max(3.8, 3.8 + (prixM2 - 1500) / 3000));
  const ratingStr = rating.toFixed(1);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${SITE_URL}/prix-m2/${slug}`,
    name: `Quartier ${nom} — Clermont-Ferrand`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingStr,
      reviewCount: nbAvis,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  authorName,
  authorType = "Organization",
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorName?: string;
  authorType?: "Organization" | "Person";
}) {
  const isLouis = authorName?.toLowerCase().includes("louis combret");
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: isLouis
      ? {
          "@type": "Person",
          "@id": `${SITE_URL}/#louis-combret`,
          name: "Louis Combret",
          jobTitle: "Directeur général — CBF Conseils",
          url: SITE_URL,
        }
      : {
          "@type": authorType,
          "@id": authorType === "Organization" ? `${SITE_URL}/#organization` : undefined,
          name: authorName ?? "CBF Conseils",
        },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CBF Conseils",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "prixm² Clermont-Ferrand",
      url: SITE_URL,
    },
    about: {
      "@type": "Place",
      name: "Clermont-Ferrand",
      sameAs: "https://www.wikidata.org/wiki/Q33486",
    },
    inLanguage: "fr-FR",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SpeakableSchema({ url, cssSelectors }: { url: string; cssSelectors?: string[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors ?? [".speakable-intro", ".faq-accordion", "h1", "h2"],
    },
    url,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function DatasetSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}/#dataset`,
    name: "Prix immobiliers à Clermont-Ferrand par quartier — 2026",
    description:
      "Base de données des prix médians au m² à Clermont-Ferrand et 15 communes de l'agglomération. Source : 16 882 transactions DVF (DGFiP 2021-2024), 51 240 diagnostics DPE (ADEME), enrichis par l'expertise terrain de CBF Conseils.",
    url: `${SITE_URL}/methodologie`,
    isPartOf: { "@id": `${SITE_URL}/#data-catalog` },
    creator: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CBF Conseils",
      url: "https://www.cbfconseils.com",
    },
    contributor: { "@id": `${SITE_URL}/#louis-combret` },
    license: "https://www.data.gouv.fr/fr/licences/licence-ouverte-open-licence/",
    temporalCoverage: "2021/2024",
    dateModified: "2026-04-01",
    spatialCoverage: {
      "@type": "Place",
      name: "Clermont-Ferrand, Puy-de-Dôme, Auvergne-Rhône-Alpes, France",
      sameAs: "https://www.wikidata.org/wiki/Q33486",
      geo: { "@type": "GeoCoordinates", latitude: 45.7797, longitude: 3.0863 },
    },
    measurementTechnique: "Médiane des prix au m² calculée sur les transactions notariées DVF",
    variableMeasured: [
      { "@type": "PropertyValue", name: "Prix médian appartement au m²", unitCode: "EUR", unitText: "€/m²" },
      { "@type": "PropertyValue", name: "Prix médian maison au m²", unitCode: "EUR", unitText: "€/m²" },
      { "@type": "PropertyValue", name: "Nombre de transactions DVF", unitCode: "C62" },
      { "@type": "PropertyValue", name: "Évolution annuelle des prix", unitCode: "P1", unitText: "%" },
      { "@type": "PropertyValue", name: "Délai médian de vente", unitCode: "DAY", unitText: "jours" },
    ],
    distribution: [
      {
        "@type": "DataDownload",
        contentUrl: `${SITE_URL}/prix-immobilier-clermont-ferrand`,
        encodingFormat: "text/html",
        name: "Interface prix m² par quartier",
      },
    ],
    keywords: [
      "prix immobilier Clermont-Ferrand",
      "DVF Clermont-Ferrand",
      "prix m² Puy-de-Dôme",
      "prix m² Clermont-Ferrand 2026",
      "marché immobilier Auvergne",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── DATA CATALOG ─────────────────────────────────────────────────────────────
export function DataCatalogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "@id": `${SITE_URL}/#data-catalog`,
    name: "Observatoire des prix immobiliers — prixm² Clermont-Ferrand",
    description:
      "Catalogue de données sur le marché immobilier de Clermont-Ferrand et son agglomération : prix médians par quartier, évolutions, données DVF officielles et diagnostics DPE ADEME.",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "fr-FR",
    license: "https://www.data.gouv.fr/fr/licences/licence-ouverte-open-licence/",
    dataset: [{ "@id": `${SITE_URL}/#dataset` }],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
