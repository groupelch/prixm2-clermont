import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Blog immobilier Clermont-Ferrand — Guides et conseils 2026",
  description:
    "Guides experts pour vendre, acheter et investir à Clermont-Ferrand en 2026 : prix par quartier, évolution du marché, fixation de loyer, honoraires d'agence.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />
      {children}
    </>
  );
}
