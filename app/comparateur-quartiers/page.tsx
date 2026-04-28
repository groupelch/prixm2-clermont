import type { Metadata } from "next";
import { quartiers } from "@/data/quartiers";
import { getDpeStatsForQuartier } from "@/lib/dpe";
import { getTransportForQuartier } from "@/lib/transport";
import {
  ComparateurTable,
  type ComparateurRow,
} from "@/components/ComparateurTable";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema } from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Comparateur de quartiers Clermont-Ferrand — Prix m² 2026",
  description:
    "Comparez en un coup d'œil 40+ quartiers et communes de l'agglo clermontoise : prix appartement, maison, évolution 12 mois, DPE dominant, transport, délai de vente. Données DVF officielles.",
  path: "/comparateur-quartiers",
});

function parseEvolutionNum(evo: string): number {
  const cleaned = evo.replace(/\s/g, "").replace("%", "").replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function ComparateurPage() {
  const rows: ComparateurRow[] = quartiers.map((q) => {
    const dpe = getDpeStatsForQuartier(q.coordinates.lat, q.coordinates.lng);
    const transport = getTransportForQuartier(q.coordinates.lat, q.coordinates.lng);
    return {
      slug: q.slug,
      nom: q.nom,
      type: q.type,
      prixAppartement: q.prixAppartement,
      prixMaison: q.prixMaison,
      evolution12m: q.evolution12m,
      evolutionNum: parseEvolutionNum(q.evolution12m),
      dpeDominant: dpe.label_dominant,
      transportScore: transport.score_accessibilite,
      delaiVente: q.delaiVente,
    };
  });

  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    {
      name: "Comparateur de quartiers",
      url: `${SITE_URL}/comparateur-quartiers`,
    },
  ];

  // Liste des 8 quartiers les plus chers en intro pour SEO
  const topPrix = [...rows]
    .filter((r) => r.prixAppartement !== null)
    .sort((a, b) => (b.prixAppartement ?? 0) - (a.prixAppartement ?? 0))
    .slice(0, 8)
    .map((r) => r.nom)
    .join(", ");

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Comparateur de quartiers" },
          ]}
        />
      </div>

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Outil interactif
          </span>
          <h1 className="font-playfair text-display-lg md:text-display-xl text-cbf-black font-bold mt-3 mb-5 leading-tight">
            Comparateur de quartiers
            <span className="block text-cbf-gold">Clermont-Ferrand 2026</span>
          </h1>
          <p className="text-lg text-cbf-gray leading-relaxed">
            {rows.length} quartiers et communes de l&apos;agglomération
            clermontoise classés par prix au m², évolution sur 12 mois, DPE
            dominant, score d&apos;accessibilité transport et délai moyen de
            vente. Tri par colonne, filtre par type. Top 8 le plus cher :{" "}
            {topPrix}.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <ComparateurTable rows={rows} />
          <p className="mt-6 text-xs text-cbf-gray-light">
            Sources : prix médians par quartier (DVF + observation marché),
            DPE ADEME, arrêts T2C. Mise à jour 2026.
          </p>
        </div>
      </section>
    </>
  );
}
