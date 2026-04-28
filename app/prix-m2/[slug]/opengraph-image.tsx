import { ImageResponse } from "next/og";
import { getQuartierBySlug, quartiers } from "@/data/quartiers";

export const runtime = "nodejs";
export const alt = "Prix m² Clermont-Ferrand par quartier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const q = getQuartierBySlug(params.slug);
  return [
    {
      id: "main",
      alt: q ? `Prix m² ${q.nom} Clermont-Ferrand` : alt,
      contentType,
      size,
    },
  ];
}

export function generateStaticParams() {
  return quartiers.map((q) => ({ slug: q.slug }));
}

function fmtPriceM2(value: number | null): string {
  if (!value) return "—";
  return `${new Intl.NumberFormat("fr-FR").format(value)} €/m²`;
}

export default async function Image({ params }: { params: { slug: string } }) {
  const q = getQuartierBySlug(params.slug);
  const nom = q?.nom ?? "Clermont-Ferrand";
  const prixRef = q ? q.prixAppartement ?? q.prixMaison : null;
  const evol = q?.evolution ?? "";

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
            Clermont-Ferrand 2026
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#D8D8D8",
              fontWeight: 600,
            }}
          >
            {q?.type === "commune" ? "Commune" : "Quartier"} · {nom}
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 700,
              lineHeight: 1,
              color: "#B8860B",
            }}
          >
            {fmtPriceM2(prixRef)}
          </div>
          {evol && (
            <div
              style={{
                fontSize: 32,
                color: "#FFFFFF",
                marginTop: 12,
              }}
            >
              Évolution 12 mois : {evol}
            </div>
          )}
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
          <span>Données DVF · DPE · Transport</span>
          <span>CBF Conseils</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
