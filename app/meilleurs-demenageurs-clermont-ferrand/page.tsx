import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meilleurs déménageurs Clermont-Ferrand : comparatif tarifs 2026",
  description:
    "Top 5 déménageurs à Clermont-Ferrand : devis, prestations, garde-meuble, longue distance. Comparatif 2026 pour bien préparer votre déménagement local ou national.",
  path: "/meilleurs-demenageurs-clermont-ferrand",
});

const PRESTATAIRES: Prestataire[] = [
  {
    nom: "Auvergne Déménagement",
    description:
      "Entreprise locale historique, intervient sur l'agglomération clermontoise et la France entière. Prestations sur mesure : économique (vous emballez), confort (équipe carton inclus), luxe (clé en main). Garde-meuble en sécurité incluse.",
    specialites: ["Local", "National", "Garde-meuble", "Économique"],
    zone: "Clermont-Ferrand & France",
    delai: "Devis sous 48 h",
    partenaire: true,
  },
  {
    nom: "Volcans Mover",
    description:
      "Spécialiste des déménagements urbains complexes : centre-ville, étages sans ascenseur, biens d'art. Équipe formée à la manutention de pianos et œuvres encadrées.",
    specialites: ["Centre-ville", "Étages élevés", "Biens fragiles"],
    zone: "Clermont-Ferrand intra-muros",
    delai: "Devis sous 5 jours",
  },
  {
    nom: "Express Move 63",
    description:
      "Tarif compétitif pour les petits déménagements (studio, T2). Forfait à la journée, équipe de 2 déménageurs. Idéal étudiant, jeune actif, séparation.",
    specialites: ["Studios", "Forfait", "Petit budget"],
    zone: "Métropole clermontoise",
    delai: "Réservation 7 jours",
  },
  {
    nom: "Trans-Auvergne",
    description:
      "Filiale d'un grand groupe national, capacité importante pour les déménagements famille (T4, maison) et professionnels (bureaux). Assurance bris étendue, prise en charge fiscale possible.",
    specialites: ["Famille", "Pro", "International"],
    zone: "Clermont & national",
    delai: "Devis sous 3 jours",
  },
  {
    nom: "Eco Déménagement",
    description:
      "Démarche éco-responsable : cartons réutilisables, optimisation des trajets, charte basse émission. Tarif légèrement supérieur compensé par la qualité du matériel.",
    specialites: ["Éco-responsable", "Famille"],
    zone: "Auvergne-Rhône-Alpes",
    delai: "Devis sous 5 jours",
  },
];

const FAQ: FaqEntry[] = [
  {
    question: "Combien coûte un déménagement à Clermont-Ferrand en 2026 ?",
    reponse:
      "Pour un déménagement local d'un T2 (10 m³ environ), comptez 600 à 1 200 € en formule économique, 1 200 à 2 000 € en formule confort. Pour un T4 (30 m³), entre 1 800 et 3 500 €. Les déménagements longue distance ajoutent 1 à 2 € par km. Demandez toujours 3 devis détaillés au volume.",
  },
  {
    question: "Combien de temps à l'avance réserver un déménageur ?",
    reponse:
      "Réservez idéalement 4 à 6 semaines avant la date souhaitée, surtout en juin-juillet et fin de mois (périodes les plus chargées). Pour un déménagement d'urgence (sous 7 jours), prévoyez une majoration de 20 à 40%. Les meilleurs créneaux tarifs sont en milieu de mois, hors été.",
  },
  {
    question: "Quelles aides pour un déménagement ?",
    reponse:
      "Plusieurs dispositifs : prime de déménagement CAF (sous conditions, 3e enfant), aide Action Logement Mobili-Pass (mutation pro), exonération fiscale en cas de mutation imposée, réduction d'impôt si reprise d'emploi. La SNCF rembourse aussi le matériel d'emballage pour les agents mutés.",
  },
  {
    question: "Comment vérifier qu'un déménageur est sérieux ?",
    reponse:
      "Vérifiez quatre points : inscription au registre des transporteurs (numéro Lota), assurance professionnelle valide, devis détaillé (m³, prestations, assurance), absence d'acompte excessif (max 30%). Les avis Google datés de moins de 6 mois sont un bon indicateur de la qualité actuelle.",
  },
];

export default function Page() {
  return (
    <MeilleursPrestatairesPage
      slug="meilleurs-demenageurs-clermont-ferrand"
      h1="Meilleurs déménageurs Clermont-Ferrand : comparatif tarifs 2026"
      badge="Déménagement"
      breadcrumbLabel="Meilleurs déménageurs"
      schemaType="MovingCompany"
      intro="Bien choisir son déménageur à Clermont-Ferrand évite stress et mauvaises surprises. Nous avons sélectionné 5 entreprises locales reconnues, du spécialiste centre-ville au transporteur national, pour tous les budgets et toutes les distances."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Vous changez de logement à Clermont-Ferrand ?"
      ctaText="Estimation gratuite de votre bien actuel par CBF Conseils. Méthode comparative DVF, accompagnement vente et achat."
      ctaHref="/estimation"
    />
  );
}
