import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quartiers, getQuartiersByType, getPrixMoyenAppartement, getPrixMoyenMaison } from "@/data/quartiers";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { QuartierCard } from "@/components/common/QuartierCard";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, FaqPageSchema } from "@/components/common/SchemaOrg";
import { MapWrapper } from "@/components/home/MapWrapper";
import { ChiffresCles } from "@/components/home/ChiffresCles";
import { WhyPricesVary } from "@/components/home/WhyPricesVary";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL, formatPricePerM2 } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Prix immobilier Clermont-Ferrand 2026 — Tous les quartiers & communes",
  description:
    "Prix immobilier Clermont-Ferrand 2026 par quartier : de 1 800 €/m² à Croix-de-Neyrat à 3 200 €/m² à Jaude. 39 quartiers analysés, 16 882 transactions DVF. Carte interactive + estimation gratuite CBF Conseils.",
  path: "/prix-immobilier-clermont-ferrand",
});

const faqPrix = [
  {
    question: "Quel est le prix moyen au m² à Clermont-Ferrand en 2026 ?",
    reponse:
      "Le prix moyen d'un appartement à Clermont-Ferrand est d'environ 2 400 €/m² en 2026. Il varie fortement selon les quartiers : de 1 800 €/m² dans les secteurs périphériques (Croix-de-Neyrat, La Gauthière) à 3 200 €/m² dans le Rectangle d'or (Jaude, Gaillard). Pour les maisons, le prix moyen est de 2 800 à 3 400 €/m² en intra-muros, davantage dans les communes premium comme Chamalières ou Beaumont.",
  },
  {
    question: "Les prix immobiliers à Clermont-Ferrand ont-ils augmenté en 2026 ?",
    reponse:
      "Après une légère correction de −3 à −5 % en 2023-2024, les prix ont retrouvé une trajectoire haussière modérée (+2 à 3 % annualisé en 2026). Le marché est soutenu par la demande structurelle liée au CHU, à l'université Clermont Auvergne (39 000 étudiants) et à Michelin. Aucune tension spéculative : Clermont-Ferrand offre un marché stable et lisible.",
  },
  {
    question: "Quels sont les quartiers les plus chers de Clermont-Ferrand ?",
    reponse:
      "Le Rectangle d'or (Jaude, Gaillard, Delille) concentre les biens les plus chers : 2 800 à 3 200 €/m² pour les appartements. Chamalières, commune voisine du centre, atteint 2 500 à 2 900 €/m² pour un environnement résidentiel calme prisé des familles et des médecins du CHU. Beaumont et Ceyrat se distinguent pour les maisons (3 000 à 3 800 €/m² selon superficie et terrain).",
  },
  {
    question: "Quels quartiers offrent les meilleurs rendements locatifs ?",
    reponse:
      "Cézeaux et Aubière (proche campus UCA) offrent les meilleurs rendements bruts : 5,5 à 6,5 % pour des studios et T2 loués à des étudiants. La Gare présente un rapport qualité/prix intéressant pour les investisseurs en anticipant la revalorisation liée au PEM 2027. Le Centre-Ville offre 4,5 à 5,5 % avec des locataires plus stables (jeunes actifs, cadres).",
  },
  {
    question: "Comment évolueront les prix à Clermont-Ferrand dans les prochaines années ?",
    reponse:
      "Les fondamentaux restent solides : démographie stable grâce aux grandes entreprises (Michelin, Limagrain), flux estudiantins constants, marché pas surcoté. Le projet PEM 2027 et la rénovation du centre-ville devraient soutenir une hausse de 2 à 4 % par an. Les biens classés F/G risquent en revanche une décote croissante avec les nouvelles obligations énergétiques.",
  },
];

export default function PrixImmoPilierPage() {
  const qClermont = getQuartiersByType("quartier");
  const communes = getQuartiersByType("commune");
  const prixApp = getPrixMoyenAppartement();
  const prixMaison = getPrixMoyenMaison();

  // Cluster articles marché (4 plus récents)
  const articlesMarche = articles.filter((a) => a.theme === "marche").slice(0, 4);

  // 1 guide par catégorie
  const guidesCluster = [
    guides.find((g) => g.categorie === "vendeur"),
    guides.find((g) => g.categorie === "acheteur"),
    guides.find((g) => g.categorie === "investisseur"),
    guides.find((g) => g.categorie === "marche"),
  ].filter(Boolean) as typeof guides;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Prix immobilier Clermont-Ferrand", url: `${SITE_URL}/prix-immobilier-clermont-ferrand` },
        ]}
      />
      <FaqPageSchema items={faqPrix} />

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav
            items={[{ name: "Accueil", href: "/" }, { name: "Prix immobilier" }]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Référentiel 2026
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Prix immobilier à Clermont-Ferrand
              <br />
              <span className="text-cbf-gold">Guide complet par quartier</span>
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed">
              Prix moyen appartement : <strong className="text-cbf-black">~2 400 €/m²</strong> — Jaude : <strong className="text-cbf-black">3 200 €/m²</strong> — Maison intra-muros : <strong className="text-cbf-black">~3 400 €/m²</strong>.
              Tout pour comprendre le marché clermontois en 2026 : prix par quartier, communes de l'agglomération, tendances et facteurs de variation. Données croisées DVF + terrain CBF Conseils.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <Stat label="Prix appartement" value={formatPricePerM2(prixApp)} />
            <Stat label="Prix maison" value={formatPricePerM2(prixMaison)} />
            <Stat label="Évolution 12 mois" value="+3,2 %" highlight />
            <Stat label="Délai moyen" value="60 j" />
          </div>
        </div>
      </section>

      <section id="carte" className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Tous les prix sur la carte
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Carte interactive des prix m²
            </h2>
            <p className="text-cbf-gray">
              Cliquez sur un quartier pour voir le prix moyen et l'analyse complète.
            </p>
          </div>
          <MapWrapper />
        </div>
      </section>

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Quartiers Clermont-Ferrand
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              {qClermont.length} quartiers analysés
            </h2>
            <p className="text-cbf-gray">
              Du centre historique aux quartiers résidentiels, retrouvez les prix
              de chaque secteur de Clermont-Ferrand intra-muros.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qClermont.map((q, i) => (
              <QuartierCard key={q.slug} quartier={q} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Communes agglo
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Métropole de Clermont-Ferrand
            </h2>
            <p className="text-cbf-gray">
              Beaumont, Chamalières, Aubière, Riom… Découvrez les prix dans les
              communes de la métropole.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {communes.map((q, i) => (
              <QuartierCard key={q.slug} quartier={q} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ChiffresCles />
      <WhyPricesVary />

      {/* CLUSTER ARTICLES MARCHÉ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Analyses
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Articles sur le marché clermontois
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {articlesMarche.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group block bg-cbf-ivory border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <h3 className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-snug mb-3">
                  {a.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                  Lire <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold hover:underline">
            Voir tous les articles <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CLUSTER GUIDES */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Guides pratiques
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Vendeur, acheteur, investisseur — vos guides complets
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {guidesCluster.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="group block bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold block mb-2">
                  {g.categorie}
                </span>
                <h3 className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-snug mb-3">
                  {g.titre}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                  Lire le guide <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/guide" className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold hover:underline">
            Voir tous les guides <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* OUTILS CONVERSION */}
      <section className="py-14 md:py-16 bg-cbf-black text-white">
        <div className="container max-w-5xl">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-8">
            Vos outils gratuits
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/estimation", label: "Estimation gratuite", desc: "Valeur réelle de votre bien sous 48h par un expert" },
              { href: "/vendre-clermont-ferrand", label: "Vendre à Clermont", desc: "Guide stratégique + méthode CBF Conseils en 5 étapes" },
              { href: "/comparateur-quartiers", label: "Comparer les quartiers", desc: "Prix, rendement, délais côte à côte" },
              { href: "/calculateur-frais-notaire", label: "Calcul frais de notaire", desc: "Simulateur pour achat ancien ou neuf" },
              { href: "/estimation-quartier", label: "Estimer par quartier", desc: "Précision maximale selon la localisation exacte" },
              { href: "/biens-off-market-clermont-ferrand", label: "Biens off-market", desc: "Opportunités exclusives avant mise sur le marché" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-start gap-3 bg-white/5 border border-white/10 hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <div>
                  <p className="font-playfair font-bold text-white text-sm group-hover:text-cbf-gold transition-colors mb-1">
                    {t.label}
                  </p>
                  <p className="text-xs text-white/60">{t.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-cbf-gold shrink-0 mt-0.5 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mb-5">
              Les sources de nos données
            </h2>
            <p className="text-cbf-gray mb-8">
              Les prix indiqués sur prixm² Clermont-Ferrand croisent trois sources :
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: "DVF — Demandes de Valeurs Foncières",
                desc: "La base officielle des transactions immobilières publiée par la DGFiP, mise à jour semestriellement.",
              },
              {
                title: "Marché actif",
                desc: "Annonces actives sur SeLoger, Leboncoin, Bien'ici, MeilleursAgents — analyse des tendances en temps réel.",
              },
              {
                title: "Expertise terrain CBF Conseils",
                desc: "Plus de 10 ans d'expérience à Clermont-Ferrand, retours qualitatifs sur chaque rue, chaque immeuble.",
              },
            ].map((s) => (
              <div key={s.title} className="bg-white border border-cbf-gray-soft p-6 rounded-sm">
                <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-cbf-gray">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion items={faqPrix} title="Questions fréquentes sur les prix à Clermont-Ferrand" />
      <FinalCta />
    </>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white border border-cbf-gray-soft p-4 rounded-sm">
      <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light font-semibold">
        {label}
      </p>
      <p
        className={`font-playfair text-xl md:text-2xl font-bold mt-1 ${
          highlight ? "text-cbf-success" : "text-cbf-black"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
