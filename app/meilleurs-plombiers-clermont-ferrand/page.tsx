import type { Metadata } from "next";
import {
  MeilleursPrestatairesPage,
  type Prestataire,
  type FaqEntry,
} from "@/components/MeilleursPrestatairesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meilleurs plombiers Clermont-Ferrand 2026 — Urgences, devis & tarifs",
  description:
    "Top 5 plombiers à Clermont-Ferrand : urgences 24/7, tarif horaire 50-75 € HT, dépannage fuite, chauffage, rénovation salle de bains. Réseau de bâti ancien, pompes à chaleur, RGE. Comparatif 2026.",
  path: "/meilleurs-plombiers-clermont-ferrand",
});

const PRESTATAIRES: Prestataire[] = [
  {
    nom: "PCR Plomberie Chauffage",
    description:
      "Entreprise de plomberie et chauffage installée à Clermont-Ferrand, partenaire de référence de CBF Conseils pour les diagnostics et travaux des biens en transaction. Interventions d'urgence 24/7, installation de chaudières, rénovation salle de bains, dépannage sanitaire. Devis gratuit, déplacement rapide sur l'agglomération.",
    specialites: ["Plomberie", "Chauffage", "Urgences 24/7", "Rénovation salle de bains"],
    zone: "Clermont-Ferrand & agglomération",
    delai: "Intervention < 2 h en urgence",
    url: "https://www.plombier-chauffagiste.fr",
    partenaire: true,
  },
  {
    nom: "Plomberie Auvergne Service",
    description:
      "Artisan plombier multi-spécialité couvrant l'agglomération clermontoise. Travaille principalement avec les particuliers pour les rénovations partielles et le dépannage. Bonne disponibilité en semaine, devis sous 48 h.",
    specialites: ["Dépannage", "Rénovation", "Sanitaire"],
    zone: "Clermont-Ferrand centre",
    delai: "Intervention 24-48 h",
  },
  {
    nom: "Aqua Pro 63",
    description:
      "Spécialiste de la fuite et du débouchage, équipement vidéo pour inspection de canalisations. Tarif horaire stable, transparence sur les pièces. Intervient en copropriété et en maison individuelle.",
    specialites: ["Recherche de fuite", "Débouchage", "Canalisations"],
    zone: "Métropole clermontoise",
    delai: "Intervention 24-72 h",
  },
  {
    nom: "Chauffeo Plomberie",
    description:
      "Plombier-chauffagiste orienté installations neuves : chaudières gaz et fioul, pompes à chaleur, planchers chauffants. Accompagne les projets de rénovation énergétique avec aide MaPrimeRénov'.",
    specialites: ["Chaudière", "Pompe à chaleur", "Plancher chauffant"],
    zone: "Puy-de-Dôme",
    delai: "Devis sous 5 jours",
  },
  {
    nom: "Volcan Sanitaire",
    description:
      "Petite entreprise familiale, deux compagnons. Travaille en majorité sur recommandation. Spécialisée dans les rénovations complètes de salles de bains et la pose de robinetterie haut de gamme.",
    specialites: ["Salle de bains", "Robinetterie", "Petits travaux"],
    zone: "Clermont-Ferrand & nord 63",
    delai: "Devis sous 7 jours",
  },
];

const FAQ: FaqEntry[] = [
  {
    question: "Quel plombier appeler en urgence à Clermont-Ferrand ?",
    reponse:
      "Pour une fuite ou un dégât des eaux, contactez en priorité un plombier disposant d'une astreinte 24/7. PCR Plomberie Chauffage assure des interventions sous 2 heures sur l'agglomération clermontoise. Pensez aussi à couper l'arrivée d'eau et à prévenir votre assurance habitation dès que possible.",
  },
  {
    question: "Combien coûte un plombier à Clermont-Ferrand en 2026 ?",
    reponse:
      "Le tarif horaire moyen d'un plombier à Clermont-Ferrand se situe entre 50 et 75 € HT, plus le déplacement (30 à 60 €). Une intervention d'urgence de nuit ou le week-end est majorée de 50 à 100%. Pour des travaux planifiés (changement de chaudière, rénovation), demandez toujours plusieurs devis.",
  },
  {
    question: "Faut-il un plombier certifié RGE ?",
    reponse:
      "Pour bénéficier des aides à la rénovation énergétique (MaPrimeRénov', CEE, éco-PTZ), l'artisan doit obligatoirement détenir la qualification RGE (Reconnu Garant de l'Environnement). Pour un dépannage simple, ce n'est pas requis. Vérifiez l'agrément sur le site france-renov.gouv.fr.",
  },
  {
    question: "Comment choisir un bon plombier ?",
    reponse:
      "Quatre critères : ancienneté de l'entreprise (5 ans minimum), assurance décennale valide, devis détaillé écrit, et avis clients vérifiables. Méfiez-vous des prix anormalement bas et des entreprises qui demandent un acompte supérieur à 30%. Une recommandation par un agent immobilier ou un syndic est souvent un bon signal.",
  },
  {
    question: "Quels problèmes de plomberie sont fréquents à Clermont-Ferrand ?",
    reponse:
      "Trois problèmes récurrents dans le parc immobilier clermontois : 1/ Les canalisations en plomb ou en fonte dans les immeubles d'avant 1970 du Centre-Ville, à remplacer progressivement. 2/ Les chaudières collectives au fioul à convertir (prime MaPrimeRénov' disponible). 3/ Les fuites de toiture et infiltrations liées aux fortes pluies du massif auvergnate — identifiables via caméra inspection. Un plombier connaissant le bâti local diagnostique plus vite et propose des solutions adaptées.",
  },
];

export default function Page() {
  return (
    <MeilleursPrestatairesPage
      slug="meilleurs-plombiers-clermont-ferrand"
      h1="Meilleurs plombiers à Clermont-Ferrand : comparatif 2026"
      badge="Sélection 2026"
      breadcrumbLabel="Meilleurs plombiers"
      schemaType="Plumber"
      intro="Le parc immobilier clermontois présente des problèmes récurrents en plomberie : réseaux d'eau vétustes dans les immeubles anciens du Centre-Ville, chauffages collectifs au fioul à convertir, risques de gel sur les propriétés exposées des hauteurs (Montjuzet, Royat). Sans compter la forte densité locative autour des campus (Cézeaux, Aubière) qui génère des interventions fréquentes. Nous avons sélectionné 5 plombiers-chauffagistes locaux reconnus pour leur réactivité et leur expertise du bâti clermontois."
      prestataires={PRESTATAIRES}
      faq={FAQ}
      ctaTitle="Vous vendez ou rénovez à Clermont-Ferrand ?"
      ctaText="Nos partenaires plombiers et artisans accompagnent les projets de nos clients vendeurs. Estimation et conseils gratuits."
      ctaHref="/estimation"
    />
  );
}
