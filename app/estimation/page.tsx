import type { Metadata } from "next";
import { CheckCircle2, Clock, Shield, MapPin, TrendingUp, Home } from "lucide-react";
import { SimulateurEstimation } from "@/components/forms/SimulateurEstimation";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, FaqPageSchema } from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Estimation immobilière gratuite Clermont-Ferrand — Valeur en 48h",
  description:
    "Obtenez l'estimation précise de votre bien immobilier à Clermont-Ferrand : simulateur en ligne immédiat + analyse experte CBF Conseils sous 48h. Gratuit, sans engagement. Prix moyen 2 400 €/m² (appartement) à 3 200 €/m² (Jaude).",
  path: "/estimation",
});

const benefits = [
  { icon: Clock, label: "Réponse sous 48h" },
  { icon: Shield, label: "Sans engagement" },
  { icon: MapPin, label: "Expertise locale" },
  { icon: CheckCircle2, label: "100 % gratuit" },
];

const faqEstimation = [
  {
    question: "Comment est calculée une estimation immobilière à Clermont-Ferrand ?",
    reponse:
      "L'estimation repose sur trois sources croisées : les données DVF (Demandes de Valeurs Foncières) de la DGFiP qui recensent toutes les transactions officielles, les annonces actives sur le marché (SeLoger, Bien'ici, Leboncoin) et l'expertise terrain de l'agent sur votre quartier. À Clermont-Ferrand, les prix varient fortement : de 2 000 €/m² à Croix-de-Neyrat à 3 200 €/m² secteur Jaude-Gaillard.",
  },
  {
    question: "Quelle est la fourchette de prix au m² à Clermont-Ferrand en 2026 ?",
    reponse:
      "Le prix moyen d'un appartement à Clermont-Ferrand tourne autour de 2 400 €/m². Les zones premium (Jaude, Delille, rectangle d'or) atteignent 3 000 à 3 200 €/m². Les quartiers en développement (La Gare, Montferrand) sont entre 1 800 et 2 200 €/m². Pour une maison, comptez 10 à 15 % de plus selon l'état et la superficie du terrain.",
  },
  {
    question: "Combien de temps prend la vente d'un bien à Clermont-Ferrand ?",
    reponse:
      "Le délai moyen entre la signature du mandat et le compromis est de 45 à 90 jours selon le secteur et le prix. Les biens correctement estimés dans les quartiers CHU et Centre-Ville partent en 30 à 45 jours. Un bien surestimé de 10 % reste facilement 4 à 6 mois sur le marché, ce qui pénalise finalement le prix final.",
  },
  {
    question: "L'estimation en ligne est-elle fiable ?",
    reponse:
      "L'outil en ligne donne une fourchette indicative basée sur les données DVF du secteur. Elle est utile pour se positionner mais ne remplace pas une expertise physique : l'orientation, l'état du bâti, les nuisances sonores, la vue, l'étage ou la qualité des parties communes influencent le prix de ±15 à 20%. L'expert CBF Conseils affine ce résultat lors de sa visite sous 48h.",
  },
  {
    question: "Faut-il estimer avant de mettre en vente ou après ?",
    reponse:
      "Avant, obligatoirement. Une estimation sérieuse avant la mise en vente vous évite de brûler votre bien sur le marché avec un prix trop élevé. À Clermont-Ferrand, les acheteurs comparent les biens en ligne et un prix incohérent génère de la méfiance. L'estimation permet aussi de préparer les diagnostics obligatoires (DPE, plomb, électricité) au bon moment.",
  },
];

export default function EstimationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Estimation", url: `${SITE_URL}/estimation` },
        ]}
      />
      <FaqPageSchema items={faqEstimation} />

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav
            items={[{ name: "Accueil", href: "/" }, { name: "Estimation" }]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Estimation gratuite
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Combien vaut votre bien à Clermont-Ferrand ?
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed">
              Renseignez votre bien en 3 minutes et recevez une estimation
              indicative immédiate — suivie d'une analyse précise par un expert
              sous 48 heures. Gratuit, sans engagement, fondé sur les données
              DVF officielles et la connaissance terrain du marché clermontois.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-cbf-gray-soft rounded-sm"
                  >
                    <Icon className="h-4 w-4 text-cbf-gold flex-shrink-0" />
                    <span className="text-xs text-cbf-black font-semibold">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cbf-ivory pb-20">
        <div className="container max-w-5xl">
          <SimulateurEstimation />
        </div>
      </section>

      {/* Section contexte marché clermontois */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Marché immobilier 2026
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Le marché de Clermont-Ferrand en un coup d'œil
            </h2>
            <p className="text-cbf-gray">
              Comprendre les prix locaux vous aide à positionner votre bien avec précision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                title: "Secteur Jaude — Rectangle d'or",
                prix: "3 000 — 3 200 €/m²",
                detail:
                  "Zone hyper-premium du centre clermontois. Appartements haussmanniens, immeubles de standing, forte demande cadres et investisseurs. Délai de vente : 30 à 45 jours.",
              },
              {
                icon: Home,
                title: "Centre-Ville — Delille — Salins",
                prix: "2 600 — 3 000 €/m²",
                detail:
                  "Quartiers animés prisés des jeunes actifs et cadres du CHU. Bon équilibre rendement/valorisation. Maisons avec terrain au-dessus de 3 400 €/m² dans les secteurs résidentiels de Beaumont.",
              },
              {
                icon: MapPin,
                title: "Montjuzet — Croix-de-Neyrat — La Gare",
                prix: "1 900 — 2 800 €/m²",
                detail:
                  "Secteurs à fort potentiel d'investissement. La proximité du futur Pôle d'Échanges Multimodal (PEM 2027) dynamise la zone Gare. Ticket d'entrée accessible, rendement locatif 5 à 6,5 %.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-cbf-ivory border border-cbf-gray-soft p-6 rounded-sm hover:border-cbf-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2">
                    {s.title}
                  </h3>
                  <p className="text-cbf-gold font-bold text-sm mb-3">{s.prix}</p>
                  <p className="text-sm text-cbf-gray leading-relaxed">{s.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section comment ça marche */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Méthode en 3 étapes
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Comment fonctionne notre estimation ?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Simulateur en ligne",
                desc: "Renseignez le type de bien, la surface, le quartier et quelques caractéristiques. Vous obtenez instantanément une fourchette de prix fondée sur les données DVF officielles.",
              },
              {
                n: "02",
                title: "Analyse experte sous 48h",
                desc: "Un expert CBF Conseils examine votre dossier, croise avec les transactions récentes dans votre rue et les biens similaires actuellement en vente. Il affine l'estimation à ±5 %.",
              },
              {
                n: "03",
                title: "Rapport détaillé gratuit",
                desc: "Vous recevez un rapport complet : prix de marché, comparables, conseils de mise en valeur et stratégie de vente adaptée à votre secteur clermontois. Sans engagement.",
              },
            ].map((s) => (
              <div key={s.n} className="bg-white border border-cbf-gray-soft p-6 rounded-sm">
                <span className="font-playfair text-4xl font-bold text-cbf-gold/30">
                  {s.n}
                </span>
                <h3 className="font-playfair text-lg font-bold text-cbf-black mt-2 mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-cbf-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Vos questions
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Estimation immobilière à Clermont-Ferrand : FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {faqEstimation.map((item) => (
              <div
                key={item.question}
                className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6"
              >
                <h3 className="font-playfair text-base font-bold text-cbf-black mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-cbf-gray leading-relaxed">
                  {item.reponse}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
