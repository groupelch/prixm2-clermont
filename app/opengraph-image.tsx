import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "prixm² — Prix immobilier Clermont-Ferrand 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#FFFFFF" }}>
            prixm
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#B8860B",
              marginLeft: -6,
              marginTop: -22,
            }}
          >
            2
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B8860B",
              fontWeight: 700,
            }}
          >
            Référentiel 2026
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#FFFFFF",
              maxWidth: 1000,
            }}
          >
            Prix immobilier Clermont-Ferrand 2026
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#D8D8D8",
              marginTop: 8,
            }}
          >
            Données DVF · DPE · Transport — CBF Conseils
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
          <span>prixm2clermontferrand.fr</span>
          <span>40+ quartiers analysés</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
