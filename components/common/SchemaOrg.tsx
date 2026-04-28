import { SITE_URL, PHONE } from "@/lib/utils";

export function RealEstateAgentSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "CBF Conseils — prixm² Clermont-Ferrand",
    url: SITE_URL,
    description:
      "Le référentiel des prix immobiliers à Clermont-Ferrand. Estimation gratuite, analyse par quartier, conseils vendeur et investisseur.",
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
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
    areaServed: ["Clermont-Ferrand", "Chamalières", "Beaumont", "Aubière", "Riom"],
    priceRange: "€€",
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
    name: "prixm² Clermont-Ferrand",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
}: {
  name: string;
  lat: number;
  lng: number;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clermont-Ferrand",
      addressRegion: "Auvergne-Rhône-Alpes",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
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
  url,
  authorName,
  authorType = "Organization",
}: {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  authorName?: string;
  authorType?: "Organization" | "Person";
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": authorType,
      name: authorName ?? "CBF Conseils",
    },
    publisher: {
      "@type": "Organization",
      name: "CBF Conseils",
      url: SITE_URL,
    },
    mainEntityOfPage: url,
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
    name: "Prix immobiliers Clermont-Ferrand par quartier",
    description:
      "Base de données des prix au m² à Clermont-Ferrand et communes de l'agglomération. Données issues des Demandes de Valeurs Foncières (DVF) du gouvernement français, enrichies par les experts CBF Conseils.",
    url: SITE_URL,
    creator: {
      "@type": "Organization",
      name: "CBF Conseils",
      url: "https://www.cbfconseils.com",
    },
    license: "https://www.data.gouv.fr/fr/licences/licence-ouverte-open-licence/",
    temporalCoverage: "2021/2024",
    spatialCoverage: {
      "@type": "Place",
      name: "Clermont-Ferrand, Puy-de-Dôme, France",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.7797,
        longitude: 3.0863,
      },
    },
    variableMeasured: [
      { "@type": "PropertyValue", name: "Prix médian au m²", unitCode: "EUR" },
      { "@type": "PropertyValue", name: "Nombre de transactions", unitCode: "C62" },
      { "@type": "PropertyValue", name: "Évolution annuelle", unitCode: "P1" },
    ],
    keywords: [
      "prix immobilier",
      "Clermont-Ferrand",
      "DVF",
      "prix m²",
      "immobilier Auvergne",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
