import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./utils";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = input.path ? `${SITE_URL}${input.path}` : SITE_URL;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      locale: "fr_FR",
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
