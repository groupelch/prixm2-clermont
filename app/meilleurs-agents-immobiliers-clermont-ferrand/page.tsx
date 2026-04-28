import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meilleures agences immobilières Clermont-Ferrand : classement 2026",
  description:
    "Top 5 agences immobilières à Clermont-Ferrand en 2026. Comparatif honoraires, transactions, spécialités. CBF Conseils, partenaire de référence pour la transaction premium.",
  path: "/meilleurs-agents-immobiliers-clermont-ferrand",
});

const PRESTATAIRES: Prestataire[] = [
  {
    nom: "CBF Conseils",
    description:
      "Agence immobilière clermontoise spécialisée dans la transaction de biens de qualité, du studio investisseur à la maison de famille. 15 ans d'expérience, méthode d'estimation propriétaire fondée sur les données DVF officielles. Honoraires affichés en toute transparence, accompagnement de A à Z, dossier vendeur complet sous 7 jours.",
    specialites: ["Transaction", "Estimation", "Conseil patrimonial", "Premium"],
    zone: "Clermont-Ferrand & agglomération",
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
      "Trois critères clés : la qualité de l'estimation initiale (basée sur des données DVF officielles, pas un avis « au feeling »), la transparence sur les honoraires affichés et le dossier vendeur fourni (photos pro, plan, diagnostics, mise en marché multicanale). Demandez à voir des fiches de biens vendus récemment dans votre quartier.",
  },
  {
    question: "Quels sont les honoraires d'agence à Clermont-Ferrand en 2026 ?",
    reponse:
      "Les honoraires moyens à Clermont-Ferrand se situent entre 4 et 7% TTC du prix de vente, dégressifs selon le montant. Les agences premium affichent souvent un forfait fixe au-dessus de 400 000 €. La majorité des agences sérieuses pratiquent désormais un mandat exclusif à honoraires réduits (3 à 5%).",
  },
  {
    question: "Vaut-il mieux une grande enseigne ou une agence locale ?",
    reponse:
      "Les agences locales connaissent mieux le marché clermontois (prix réels, profil acheteurs, micro-quartiers) et offrent un suivi plus personnalisé. Les enseignes nationales apportent une visibilité internet plus large mais une rotation des conseillers plus élevée. Pour un bien standard, le local est souvent gagnant.",
  },
  {
    question: "Combien de temps pour vendre avec une agence à Clermont-Ferrand ?",
    reponse:
      "Le délai moyen est de 60 jours en 2026 entre la signature du mandat et le compromis, à condition que le prix soit cohérent avec le marché. Les biens correctement positionnés se vendent en 30 à 45 jours. Une agence sérieuse vous remettra une étude de prix DVF avant la mise en vente.",
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
      intro="Choisir la bonne agence immobilière à Clermont-Ferrand est le facteur n°1 de réussite d'une vente. Nous avons sélectionné 5 agences locales reconnues, sur la base des avis clients, du volume de transactions et de la qualité de leur estimation. CBF Conseils ouvre cette sélection en tant que partenaire de référence."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Vous vendez à Clermont-Ferrand ?"
      ctaText="Estimation gratuite sous 48h par un expert CBF Conseils. Méthode comparative DVF, accompagnement de A à Z."
      ctaHref="/estimation"
    />
  );
}
