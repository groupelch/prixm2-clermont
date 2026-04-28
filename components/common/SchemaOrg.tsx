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

export function ArticleSchema({
  title,
  description,
  datePublished,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: "CBF Conseils",
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
