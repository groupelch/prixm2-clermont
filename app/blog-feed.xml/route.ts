import { articles } from "@/data/articles";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE = "https://prixm2clermontferrand.fr";
const TITLE = "PrixM2 Clermont-Ferrand — Blog immobilier";
const DESC = "Analyses de marché, prix au m² par quartier, guides acheteur et vendeur à Clermont-Ferrand. Par CBF Conseils.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sorted = [...articles].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  );

  const items = sorted.map((article) => {
    const url = `${SITE}/blog/${article.slug}`;
    const date = new Date(article.datePublished).toUTCString();
    return `  <item>
    <title>${escapeXml(article.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(article.description)}</description>
    <pubDate>${date}</pubDate>
    <category>${escapeXml(article.theme)}</category>
  </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE}/blog</link>
    <description>${escapeXml(DESC)}</description>
    <language>fr</language>
    <atom:link href="${SITE}/blog-feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
