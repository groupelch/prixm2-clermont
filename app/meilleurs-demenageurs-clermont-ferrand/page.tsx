import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meilleurs déménageurs Clermont-Ferrand 2026 — Devis & comparatif tarifs",
  description:
    "Top 5 déménageurs à Clermont-Ferrand en 2026 : tarifs 600-3 500 € selon volume, spécialistes centre-ville (accès difficile), garde-meuble, longue distance. Comparez et choisissez le bon prestataire.",
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
  {
    question: "Quelles sont les difficultés spécifiques pour déménager à Clermont-Ferrand ?",
    reponse:
      "Trois points d'attention : 1/ Le stationnement en centre-ville est compliqué, certaines rues nécessitent une demande d'arrêté de voirie en mairie (gratuit, à demander 15 jours avant). 2/ Les immeubles anciens du Rectangle d'or ont souvent des cages d'escalier étroites — vérifiez les dimensions avec le déménageur. 3/ Septembre est la période la plus chargée à cause du retour des 39 000 étudiants : réservez en juillet pour un déménagement de septembre.",
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
      intro="Déménager à Clermont-Ferrand a ses spécificités : le centre-ville compact et ses rues étroites (secteur Jaude, rue du Port, vieux Montferrand), les immeubles sans ascenseur du bâti ancien, les accès difficiles sur les hauteurs de Montjuzet. Sans compter les flux étudiants massifs chaque septembre (39 000 étudiants UCA) qui surchargent les plannings de juin-juillet et début septembre. Nous avons sélectionné 5 déménageurs locaux pour leur fiabilité, leur maîtrise des contraintes clermontoise et la transparence de leurs tarifs."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Vous changez de logement à Clermont-Ferrand ?"
      ctaText="Estimation gratuite de votre bien actuel par CBF Conseils. Méthode comparative DVF, accompagnement vente et achat."
      ctaHref="/estimation"
    />
  );
}
