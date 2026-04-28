import { ImageResponse } from "next/og";
import {
  articles,
  getArticleBySlug,
  ARTICLE_THEMES,
} from "@/data/articles";

export const runtime = "nodejs";
export const alt = "Blog prixm² Clermont-Ferrand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const a = getArticleBySlug(params.slug);
  return [
    {
      id: "main",
      alt: a ? a.title : alt,
      contentType,
      size,
    },
  ];
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? "Article — prixm² Clermont-Ferrand";
  const themeLabel = article
    ? ARTICLE_THEMES.find((t) => t.id === article.theme)?.label ?? article.theme
    : "Marché";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "70px 80px",
          fontFamily: "serif",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 44, fontWeight: 700, color: "#FFFFFF" }}>
              prixm
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#B8860B",
                marginLeft: -4,
              }}
            >
              2
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B8860B",
              fontWeight: 700,
            }}
          >
            Blog · {themeLabel}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B8860B",
              fontWeight: 700,
            }}
          >
            Analyse marché
          </div>
          <div
            style={{
              fontSize: title.length > 70 ? 54 : 64,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#FFFFFF",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #B8860B",
            paddingTop: 24,
            fontSize: 20,
            color: "#B8860B",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>prixm² Clermont-Ferrand</span>
          <span>CBF Conseils</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
