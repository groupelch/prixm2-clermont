import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { RealEstateAgentSchema, WebSiteSchema } from "@/components/common/SchemaOrg";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Prix m² par quartier et estimation immobilière`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Le référentiel des prix immobiliers à Clermont-Ferrand. Données par quartier, estimation gratuite, conseils d'experts CBF Conseils.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "prix m2 clermont-ferrand",
    "estimation immobilière clermont-ferrand",
    "prix immobilier clermont",
    "vendre appartement clermont",
    "prix par quartier clermont",
    "marché immobilier clermont-ferrand",
    "CBF Conseils",
  ],
  authors: [{ name: "CBF Conseils" }],
  creator: "CBF Conseils",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    title: `${SITE_NAME} — Prix immobiliers par quartier`,
    description:
      "Estimez votre bien et explorez les prix m² par quartier à Clermont-Ferrand.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "cvWDu4CtJE0I9SZliTZLAOQLuzBnWxR3afIY_iJlxgo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <RealEstateAgentSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
