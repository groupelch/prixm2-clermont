import type { Metadata } from "next";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, FaqPageSchema } from "@/components/common/SchemaOrg";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Prix immobilier et estimation à Clermont-Ferrand",
  description:
    "Toutes les réponses sur les prix immobiliers à Clermont-Ferrand, l'estimation d'un bien, les diagnostics, les délais de vente, les frais de notaire.",
  path: "/faq",
});

const faq = [
  // Généralités
  {
    question: "Quel est le prix moyen au m² à Clermont-Ferrand en 2025 ?",
    reponse:
      "2 280 €/m² pour un appartement ancien intra-muros, 2 800 €/m² pour une maison. Fourchette : 1 800 € à 2 700 €/m² selon le quartier.",
  },
  {
    question: "Quel est le quartier le plus cher de Clermont-Ferrand ?",
    reponse:
      "Jaude pour Clermont intra-muros (~2 600 €/m²). Chamalières (commune limitrophe) reste plus chère à ~2 700 €/m².",
  },
  {
    question: "Quel est le quartier le moins cher ?",
    reponse:
      "Chanturgue, La Glacière, La Plaine et La Pradelle sont les secteurs les plus accessibles intra-muros, autour de 1 800-1 900 €/m².",
  },
  // Vente
  {
    question: "Combien de temps pour vendre à Clermont-Ferrand ?",
    reponse:
      "60 jours en moyenne. Les biens premium correctement positionnés se vendent en 45 jours, les biens secondaires demandent 70-80 jours.",
  },
  {
    question: "Combien coûte une estimation chez CBF Conseils ?",
    reponse:
      "100 % gratuite et sans engagement. Visite du bien + analyse comparative + recommandations stratégiques sous 48h.",
  },
  {
    question: "Quelle est la commission d'agence en moyenne ?",
    reponse:
      "Entre 4 et 6 % du prix de vente à Clermont-Ferrand, dégressif selon le montant. Inclut diffusion, visites, négociation, sécurisation juridique.",
  },
  // Achat
  {
    question: "Combien coûtent les frais de notaire à Clermont-Ferrand ?",
    reponse:
      "7 à 8 % du prix d'achat dans l'ancien, 2 à 3 % dans le neuf. Pour un appartement à 200 000 € : ~16 000 € en ancien.",
  },
  // Investissement
  {
    question: "Quel rendement locatif espérer à Clermont-Ferrand ?",
    reponse:
      "Entre 4 % (résidentiel premium) et 6,5 % (studio étudiant Cézeaux). Rendements supérieurs aux grandes métropoles à profil équivalent.",
  },
  {
    question: "Quel quartier choisir pour investir ?",
    reponse:
      "Cézeaux/Aubière pour le rendement étudiant, Centre-Ville/Salins pour la stabilité, La Gare pour le pari sur le PEM 2027.",
  },
  // DPE
  {
    question: "Mon bien est classé F au DPE, vais-je perdre de la valeur ?",
    reponse:
      "Oui, 8 à 12 % vs équivalent classé D. Trois options : vendre tel quel avec décote, faire des travaux ciblés, ou vendre à un investisseur travaux.",
  },
  // Diagnostics
  {
    question: "Quels diagnostics dois-je faire pour vendre ?",
    reponse:
      "DPE, amiante (si avant 1997), plomb (si avant 1949), gaz/élec (si >15 ans), ERP, mesurage Carrez. Pack 250-450 € pour un appartement.",
  },
  // Marché
  {
    question: "Le marché clermontois va-t-il monter en 2025 ?",
    reponse:
      "Scénario central : +2 à 4 % avec une détente des taux à 3,5 %. Le marché redémarre après 18 mois de tension liée à la remontée des taux.",
  },
];

export default function FaqPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "FAQ", url: `${SITE_URL}/faq` },
        ]}
      />
      <FaqPageSchema items={faq} />

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav items={[{ name: "Accueil", href: "/" }, { name: "FAQ" }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Questions fréquentes
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Toutes vos questions sur l'immobilier à Clermont-Ferrand
            </h1>
            <p className="text-lg text-cbf-gray">
              Prix, estimation, diagnostics, frais, marché, investissement : nos
              experts répondent aux questions les plus posées.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordion items={faq} title="" />
      <FinalCta />
    </>
  );
}
