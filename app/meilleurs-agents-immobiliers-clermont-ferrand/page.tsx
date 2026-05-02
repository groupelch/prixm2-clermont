import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meilleures agences immobilières Clermont-Ferrand — Classement 2026",
  description:
    "Top 5 agences immobilières à Clermont-Ferrand en 2026 : comparatif honoraires (4-7 %), délais de vente (45-90 j), spécialités et zones. Choisir la bonne agence fait gagner 10-20 % sur le prix final.",
  path: "/meilleurs-agents-immobiliers-clermont-ferrand",
});

const PRESTATAIRES: Prestataire[] = [
  {
    nom: "CBF Conseils",
    description:
      "Agence immobilière clermontoise spécialisée dans la transaction de biens de qualité, du studio investisseur Cézeaux à la maison de famille Beaumont-Ceyrat. 15 ans d'expérience sur le marché du Puy-de-Dôme, méthode d'estimation fondée sur les données DVF officielles croisées avec les transactions récentes dans chaque rue. Honoraires affichés en toute transparence, dossier vendeur complet sous 7 jours (photos pro, plan, diagnostics, mise en marché multicanale). Intervient aussi sur Chalon-sur-Saône et Le Creusot.",
    specialites: ["Transaction", "Estimation", "Conseil patrimonial", "Premium"],
    zone: "Clermont-Ferrand & agglomération + Bourgogne",
    delai: "Estimation sous 48 h",
    url: "https://www.cbfconseils.com",
    partenaire: true,
  },
  {
    nom: "Auvergne Immo Conseil",
    description:
      "Agence familiale ancrée à Clermont-Ferrand depuis plus de 20 ans. Forte présence sur les biens anciens du centre-ville et les communes limitrophes. Bonne connaissance du marché des copropriétés.",
    specialites: ["Ancien", "Copropriétés", "Centre-ville"],
    zone: "Clermont-Ferrand intra-muros",
    delai: "Mise en marché 7-10 jours",
  },
  {
    nom: "Dôme Patrimoine",
    description:
      "Cabinet axé investisseur : recherche de biens locatifs, immeubles de rapport, programmes neufs. Travaille en réseau avec gestionnaires et conseillers en gestion de patrimoine.",
    specialites: ["Investissement", "Locatif", "Neuf"],
    zone: "Puy-de-Dôme",
    delai: "Recherche personnalisée",
  },
  {
    nom: "Volcans Immobilier",
    description:
      "Agence multi-mandataire couvrant un large territoire au sud de l'agglomération. Volume important de biens en portefeuille, équipe étoffée, communication digitale soignée.",
    specialites: ["Maisons", "Aubière", "Cournon", "Beaumont"],
    zone: "Sud agglo clermontoise",
    delai: "Mise en marché 5-7 jours",
  },
  {
    nom: "Carré d'Or Immobilier",
    description:
      "Boutique immobilière positionnée sur le segment haut de gamme : belles demeures, appartements bourgeois, biens d'exception. Photographie professionnelle systématique, communication ciblée.",
    specialites: ["Haut de gamme", "Belle demeure", "Architecte"],
    zone: "Chamalières & secteur thermal",
    delai: "Mise en marché 10 jours",
  },
];

const FAQ: FaqEntry[] = [
  {
    question: "Comment choisir une agence immobilière à Clermont-Ferrand ?",
    reponse:
      "Trois critères clés : la qualité de l'estimation initiale (fondée sur les données DVF officielles du secteur, pas un avis au feeling), la transparence sur les honoraires affichés et le dossier vendeur fourni (photos pro, plan, diagnostics, mise en marché multicanale). Demandez à voir des fiches de biens vendus récemment dans votre quartier. À Clermont-Ferrand, les prix variant de 1 800 à 3 200 €/m², une erreur d'estimation de 5 % représente facilement 8 000 à 15 000 € perdus.",
  },
  {
    question: "Quels sont les honoraires d'agence à Clermont-Ferrand en 2026 ?",
    reponse:
      "Les honoraires moyens à Clermont-Ferrand se situent entre 4 et 7 % TTC du prix de vente, dégressifs selon le montant. Pour un appartement standard (150 000 à 250 000 €), comptez 6 000 à 12 000 € d'honoraires. Les agences premium pratiquent souvent un forfait fixe au-dessus de 400 000 €. La majorité des agences sérieuses proposent un mandat exclusif 3 mois à honoraires réduits (3 à 5 %).",
  },
  {
    question: "Vaut-il mieux une grande enseigne ou une agence locale à Clermont-Ferrand ?",
    reponse:
      "Les agences locales connaissent mieux les micro-marchés clermontois (prix réels rue par rue, profil acheteurs par quartier, copropriétés à éviter) et offrent un suivi plus personnalisé. Les enseignes nationales apportent une visibilité internet plus large mais une rotation des conseillers élevée. Pour un bien à Clermont, le local gagne presque toujours sur la connaissance terrain.",
  },
  {
    question: "Combien de temps pour vendre avec une agence à Clermont-Ferrand ?",
    reponse:
      "Le délai moyen est de 60 jours en 2026 entre la signature du mandat et le compromis, à condition que le prix soit cohérent avec le marché. Les biens correctement positionnés secteur CHU ou Centre-Ville se vendent en 30 à 45 jours. Un bien surestimé de 10 % reste souvent 4 à 6 mois sur le marché, signalant sa dépréciation aux acheteurs.",
  },
  {
    question: "Doit-on signer un mandat exclusif ou simple ?",
    reponse:
      "Le mandat exclusif (une seule agence) donne à l'agent une raison de s'investir à fond et de baisser ses honoraires. Le mandat simple (plusieurs agences) peut sembler rassurant mais génère souvent des conflits de visites, des baisses de prix concurrentes et une image dégradée du bien. À Clermont-Ferrand, les experts recommandent le mandat exclusif 3 mois renouvelable avec clause de résiliation.",
  },
];

export default function Page() {
  return (
    <MeilleursPrestatairesPage
      slug="meilleurs-agents-immobiliers-clermont-ferrand"
      h1="Meilleures agences immobilières Clermont-Ferrand : classement 2026"
      badge="Classement 2026"
      breadcrumbLabel="Meilleures agences immobilières"
      schemaType="RealEstateAgent"
      intro="Choisir la bonne agence immobilière à Clermont-Ferrand est le facteur n°1 de réussite d'une vente. Sur un marché où les prix varient de 1 800 à 3 200 €/m² selon le quartier, une estimation rigoureuse fondée sur les données DVF officielles fait souvent la différence entre une vente en 45 jours et un bien qui stagne 6 mois. Nous avons sélectionné 5 agences locales reconnues pour la qualité de leur expertise clermontoise, leur transparence sur les honoraires et leur taux de concrétisation."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Vous vendez à Clermont-Ferrand ?"
      ctaText="Estimation gratuite sous 48h par un expert CBF Conseils. Méthode comparative DVF, accompagnement de A à Z."
      ctaHref="/estimation"
    />
  );
}
