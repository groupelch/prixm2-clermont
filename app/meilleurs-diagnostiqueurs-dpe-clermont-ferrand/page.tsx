import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Diagnostiqueurs DPE Clermont-Ferrand — trouver un expert certifié 2026",
  description:
    "Top 5 diagnostiqueurs immobiliers à Clermont-Ferrand : DPE, amiante, plomb, électricité, gaz. Tarifs, délais, certifications. Indispensable avant toute vente ou location.",
  path: "/meilleurs-diagnostiqueurs-dpe-clermont-ferrand",
});

const PRESTATAIRES: Prestataire[] = [
  {
    nom: "Diag Auvergne Pro",
    description:
      "Cabinet de diagnostics immobiliers certifié sur l'ensemble des diagnostics obligatoires : DPE, amiante, plomb, gaz, électricité, ERP, termites, loi Carrez. Couverture complète de l'agglomération clermontoise, devis groupé pack vente. Rapport remis sous 48 h.",
    specialites: ["DPE", "Pack vente", "Amiante", "Loi Carrez"],
    zone: "Clermont-Ferrand & 30 km",
    delai: "Rapport sous 48 h",
    partenaire: true,
  },
  {
    nom: "Auvergne Diagnostic",
    description:
      "Diagnostiqueur indépendant, certification COFRAC. Bonne maîtrise des biens anciens du centre-ville clermontois (immeubles haussmanniens, années 30, copropriétés rénovées). Disponibilités larges en semaine.",
    specialites: ["Ancien", "DPE", "Plomb"],
    zone: "Clermont-Ferrand",
    delai: "Rapport sous 5 jours",
  },
  {
    nom: "Cabinet Volcan Diag",
    description:
      "Équipe de 3 diagnostiqueurs, intervient principalement pour les agences immobilières et notaires de la place. Pack vente complet à tarif négocié, urgences possibles.",
    specialites: ["Pack vente", "Pack location", "Pro immo"],
    zone: "Métropole clermontoise",
    delai: "Rapport sous 72 h",
  },
  {
    nom: "Expertise Bâti 63",
    description:
      "Cabinet généraliste avec expertise renforcée en pathologie du bâtiment : recherche de causes d'humidité, contrôle de fissures, audit énergétique poussé pour les biens classés F/G.",
    specialites: ["Audit énergétique", "Pathologie", "F/G"],
    zone: "Puy-de-Dôme",
    delai: "Rapport sous 7 jours",
  },
  {
    nom: "DPE Clermont Express",
    description:
      "Spécialiste du DPE seul, tarif compétitif pour les propriétaires bailleurs et les ventes simples. Prise de rendez-vous en ligne, intervention sous 5 jours ouvrés.",
    specialites: ["DPE express", "Location"],
    zone: "Clermont-Ferrand & 1ère couronne",
    delai: "Rapport sous 3 jours",
  },
];

const FAQ: FaqEntry[] = [
  {
    question: "Combien coûte un DPE à Clermont-Ferrand en 2026 ?",
    reponse:
      "Le prix d'un DPE seul à Clermont-Ferrand se situe entre 110 et 180 € TTC selon la surface du bien. Pour un pack vente complet (DPE + amiante + plomb + électricité + gaz + ERP + Carrez), comptez 350 à 600 €. Les tarifs sont libres : demandez systématiquement deux devis.",
  },
  {
    question: "Combien de temps pour obtenir un DPE ?",
    reponse:
      "Le rapport est généralement remis sous 3 à 7 jours après la visite. La visite elle-même dure environ 1 heure pour un appartement, 1h30 à 2h pour une maison. Pour une vente urgente, certains diagnostiqueurs proposent un rapport sous 48 h moyennant un supplément.",
  },
  {
    question: "Quelle est la durée de validité d'un DPE ?",
    reponse:
      "Un DPE est valable 10 ans. Toutefois, les DPE réalisés entre 2018 et juin 2021 (ancienne méthode) ne sont plus valables depuis le 1er janvier 2025. Un nouveau diagnostic est obligatoire avant toute vente ou nouvelle location si votre DPE date de cette période.",
  },
  {
    question: "Mon bien est classé G : que faire avant de vendre ?",
    reponse:
      "Trois options. 1/ Vendre tel quel en assumant la décote (10 à 15% à Clermont-Ferrand). 2/ Réaliser des travaux ciblés (toiture, fenêtres, chauffage) pour passer à F ou E avant la mise en marché. 3/ Vendre à un investisseur travaux qui valorisera le bien après rénovation. Demandez un audit énergétique pour chiffrer chaque scénario.",
  },
];

export default function Page() {
  return (
    <MeilleursPrestatairesPage
      slug="meilleurs-diagnostiqueurs-dpe-clermont-ferrand"
      h1="Diagnostiqueurs DPE Clermont-Ferrand — trouver un diagnostiqueur certifié 2026"
      badge="Diagnostic immobilier"
      breadcrumbLabel="Meilleurs diagnostiqueurs DPE"
      schemaType="ProfessionalService"
      intro="Avant toute vente ou location à Clermont-Ferrand, les diagnostics immobiliers sont obligatoires : DPE, amiante, plomb, électricité, gaz, ERP. Nous avons sélectionné 5 cabinets locaux certifiés, du généraliste au spécialiste de la pathologie du bâtiment."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Préparez votre vente sereinement"
      ctaText="Estimation gratuite + checklist diagnostics par CBF Conseils. Nous coordonnons la visite des diagnostiqueurs avec vous."
      ctaHref="/estimation"
    />
  );
}
