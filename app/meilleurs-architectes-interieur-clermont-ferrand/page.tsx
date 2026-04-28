import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Architectes d'intérieur Clermont-Ferrand : 5 professionnels recommandés 2026",
  description:
    "Top 5 architectes d'intérieur à Clermont-Ferrand : rénovation, optimisation d'espace, décoration, suivi de chantier. Comparatif honoraires et spécialités 2026.",
  path: "/meilleurs-architectes-interieur-clermont-ferrand",
});

const PRESTATAIRES: Prestataire[] = [
  {
    nom: "Atelier Volcan Design",
    description:
      "Studio d'architecture intérieure orienté rénovation haut de gamme : appartements bourgeois, lofts, maisons de caractère. Approche sur mesure, prise en charge complète de la décoration aux travaux. Bonne maîtrise des biens anciens du centre clermontois.",
    specialites: ["Haut de gamme", "Ancien", "Décoration", "Suivi chantier"],
    zone: "Clermont-Ferrand & Chamalières",
    delai: "Première visite 2 semaines",
    partenaire: true,
  },
  {
    nom: "L'Espace Repensé",
    description:
      "Architecte d'intérieur spécialisé dans l'optimisation des petits espaces et la rénovation énergétique combinée à l'esthétique. Travaille beaucoup avec les investisseurs locatifs sur des biens à rénover.",
    specialites: ["Petits espaces", "Locatif", "Optimisation"],
    zone: "Clermont-Ferrand",
    delai: "Première visite 3 semaines",
  },
  {
    nom: "Auvergne Architecture Intérieure",
    description:
      "Cabinet pluridisciplinaire avec architecte DPLG et décoratrice. Capacité à porter des projets complets, du permis de construire à la pose du dernier rideau. Honoraires forfaitaires transparents.",
    specialites: ["Mission complète", "Extension", "Permis"],
    zone: "Puy-de-Dôme",
    delai: "Première visite 4 semaines",
  },
  {
    nom: "Studio Pierre & Lave",
    description:
      "Approche bioclimatique et matériaux régionaux (pierre volcanique, bois local, chaux). Idéal pour les rénovations respectueuses du caractère architectural des biens anciens.",
    specialites: ["Bioclimatique", "Matériaux locaux", "Pierre volcanique"],
    zone: "Auvergne",
    delai: "Première visite 4-6 semaines",
  },
  {
    nom: "Décoration & Co Clermont",
    description:
      "Service d'architecture d'intérieur accessible, missions courtes (conseil couleurs, plan d'aménagement, mood board). Idéal pour rafraîchir un bien avant mise en vente.",
    specialites: ["Home staging", "Conseil", "Petits budgets"],
    zone: "Métropole clermontoise",
    delai: "Première visite 1-2 semaines",
  },
];

const FAQ: FaqEntry[] = [
  {
    question: "Quelle différence entre architecte d'intérieur et décorateur ?",
    reponse:
      "L'architecte d'intérieur peut intervenir sur la structure (cloisons, ouvertures, réseaux) et coordonner les corps de métier. Le décorateur travaille uniquement sur l'aménagement, le mobilier et les finitions. Pour une rénovation complète, choisissez un architecte d'intérieur. Pour rafraîchir un intérieur, un décorateur suffit et coûte moins cher.",
  },
  {
    question: "Combien coûtent les honoraires d'un architecte d'intérieur à Clermont-Ferrand ?",
    reponse:
      "Trois modes de facturation : forfait conseil (300 à 800 € pour quelques visites), tarif horaire (60 à 120 € HT), pourcentage du montant des travaux (8 à 15%). Pour une rénovation complète d'un T3 à Clermont-Ferrand, comptez 4 000 à 12 000 € d'honoraires selon le niveau de prestation.",
  },
  {
    question: "Faut-il un architecte d'intérieur avant de vendre ?",
    reponse:
      "Pour un bien standard, le home staging réalisé par votre agent immobilier suffit. Pour un bien atypique, un coup de cœur potentiel ou un bien classé F/G nécessitant une refonte, l'investissement dans un architecte d'intérieur peut générer une plus-value de 5 à 15% à la revente. Demandez un avis à votre agent.",
  },
  {
    question: "Combien de temps dure une mission ?",
    reponse:
      "Une mission de conseil simple : 2 à 4 semaines. Un projet d'aménagement complet (plans, choix matériaux, suivi entreprises) : 3 à 6 mois pour un appartement, 6 à 12 mois pour une maison avec extension. Prévoyez de signer le contrat 6 mois avant le début souhaité des travaux.",
  },
];

export default function Page() {
  return (
    <MeilleursPrestatairesPage
      slug="meilleurs-architectes-interieur-clermont-ferrand"
      h1="Architectes d'intérieur à Clermont-Ferrand : 5 professionnels recommandés"
      badge="Architecture intérieure"
      breadcrumbLabel="Meilleurs architectes d'intérieur"
      schemaType="ProfessionalService"
      intro="Bien rénover un appartement ou une maison à Clermont-Ferrand exige une vision globale et un suivi rigoureux. Nous avons sélectionné 5 architectes d'intérieur locaux reconnus, du studio haut de gamme au conseil home staging avant vente."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Vendre, acheter ou rénover à Clermont-Ferrand ?"
      ctaText="Estimation gratuite et conseils stratégiques par CBF Conseils. Réseau de partenaires architectes pour valoriser votre bien."
      ctaHref="/estimation"
    />
  );
}
