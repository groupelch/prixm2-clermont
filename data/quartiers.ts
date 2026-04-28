export interface FaqItem {
  question: string;
  reponse: string;
}

export interface Quartier {
  slug: string;
  nom: string;
  type: "quartier" | "commune";
  ville: string;
  prixAppartement: number | null;
  prixMaison: number | null;
  prixBas: number;
  prixHaut: number;
  // Évolutions sur plusieurs périodes
  evolution: string;       // alias de evolution12m
  evolution12m: string;
  evolution5ans: string;
  evolution10ans: string;
  delaiVente: number;      // jours — marché long en 2025
  profilAcheteur: string;
  description: string;
  pointsForts: string[];
  pointsFaibles: string[];
  ruesRecherchees: string[];
  quartiersVoisins: string[];
  faq: FaqItem[];
  coordinates: { lat: number; lng: number };
  superficie?: number;
}

const ECART_PCT = 0.18;

function range(prix: number | null): { bas: number; haut: number } {
  if (!prix) return { bas: 0, haut: 0 };
  return {
    bas: Math.round(prix * (1 - ECART_PCT)),
    haut: Math.round(prix * (1 + ECART_PCT)),
  };
}
function priceMin(a: number | null, b: number | null): number {
  const arr = [a, b].filter((v): v is number => v !== null);
  return arr.length ? Math.min(...arr) : 0;
}
function priceMax(a: number | null, b: number | null): number {
  const arr = [a, b].filter((v): v is number => v !== null);
  return arr.length ? Math.max(...arr) : 0;
}

interface Seed {
  slug: string;
  nom: string;
  type: "quartier" | "commune";
  ville: string;
  prixAppartement: number | null;
  prixMaison: number | null;
  evolution12m: string;
  evolution5ans: string;
  evolution10ans: string;
  delaiVente: number;
  profilAcheteur: string;
  description: string;
  pointsForts: string[];
  pointsFaibles: string[];
  ruesRecherchees: string[];
  quartiersVoisins: string[];
  faq: FaqItem[];
  coordinates: { lat: number; lng: number };
  superficie?: number;
}

const seeds: Seed[] = [
  // ===== QUARTIERS CLERMONT-FERRAND =====
  {
    slug: "clermont-ferrand-centre-ville",
    nom: "Centre-Ville",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2400,
    prixMaison: 3200,
    evolution12m: "+2.1%",
    evolution5ans: "+22%",
    evolution10ans: "+38%",
    delaiVente: 95,
    profilAcheteur: "Mixte actif / primo-accédant",
    description:
      "Le Centre-Ville de Clermont-Ferrand concentre l'activité commerciale, administrative et culturelle de la métropole. Marché actif sur les biens lumineux et bien rénovés. La proximité de Jaude, des transports et des équipements publics soutient les prix, particulièrement sur les studios et T2 prisés des investisseurs.",
    pointsForts: [
      "Tram A à pied, gare SNCF à 10 min",
      "Hyper-centre commerçant et restaurants",
      "Forte demande locative (étudiants, jeunes actifs)",
      "Patrimoine architectural en pierre de Volvic",
    ],
    pointsFaibles: [
      "Stationnement difficile, peu de garages",
      "Bruit de la vie urbaine",
      "Peu de biens avec extérieur",
    ],
    ruesRecherchees: ["Rue Blatin", "Boulevard Trudaine", "Rue Pascal", "Place de Jaude"],
    quartiersVoisins: ["clermont-ferrand-jaude", "clermont-ferrand-salins", "clermont-ferrand-delille"],
    faq: [
      {
        question: "Quel est le prix moyen au m² au Centre-Ville ?",
        reponse:
          "Environ 2 400 €/m² pour un appartement, avec une fourchette de 1 970 € à 2 830 €/m² selon l'état, l'étage et la luminosité.",
      },
      {
        question: "Le Centre-Ville est-il un bon secteur pour investir ?",
        reponse:
          "Oui, la demande locative est forte (étudiants UCA, jeunes actifs Michelin, internes CHU). Le rendement brut tourne autour de 5 à 6 % sur des studios bien placés.",
      },
      {
        question: "Combien de temps pour vendre au Centre-Ville en 2025 ?",
        reponse:
          "Comptez 3 à 4 mois en moyenne pour un bien correctement positionné. Le marché clermontois s'est allongé depuis 2023 : les acheteurs prennent plus de temps et multiplient les visites. Un bien surévalué peut rester plus de 6 mois sans offre.",
      },
    ],
    coordinates: { lat: 45.7793, lng: 3.0877 },
  },
  {
    slug: "clermont-ferrand-jaude",
    nom: "Jaude",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2600,
    prixMaison: null,
    evolution12m: "+2.8%",
    evolution5ans: "+26%",
    evolution10ans: "+44%",
    delaiVente: 85,
    profilAcheteur: "Premium CSP+",
    description:
      "Le quartier Jaude est l'épicentre commerçant et premium de Clermont-Ferrand. Adresses recherchées, immeubles haussmanniens rénovés, proximité immédiate du centre Jaude. Marché tendu, peu de rotation, prix parmi les plus élevés du Puy-de-Dôme.",
    pointsForts: [
      "Adresse premium reconnue",
      "Immeubles bourgeois avec hauteur sous plafond",
      "Tram A direct, accès Michelin et Cataroux",
      "Commerces, restaurants, cinémas à pied",
    ],
    pointsFaibles: [
      "Stationnement très limité",
      "Faible volume de biens disponibles",
      "Charges de copropriété parfois élevées",
    ],
    ruesRecherchees: ["Place de Jaude", "Rue Maréchal Foch", "Rue du 11 Novembre"],
    quartiersVoisins: ["clermont-ferrand-centre-ville", "clermont-ferrand-salins", "clermont-ferrand-delille"],
    faq: [
      {
        question: "Combien coûte un appartement à Jaude ?",
        reponse:
          "Le prix moyen est d'environ 2 600 €/m². Comptez 250 000 € pour un T3 de 60 m² rénové dans un immeuble haussmannien.",
      },
      {
        question: "Pourquoi Jaude est-il si cher à Clermont-Ferrand ?",
        reponse:
          "Localisation hyper-centrale, prestige des immeubles bourgeois, proximité immédiate de tous les services et commerces, et offre très rare. C'est un secteur valeur refuge.",
      },
    ],
    coordinates: { lat: 45.7779, lng: 3.0838 },
  },
  {
    slug: "clermont-ferrand-montferrand",
    nom: "Montferrand",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1950,
    prixMaison: 2400,
    evolution12m: "+1.4%",
    evolution5ans: "+16%",
    evolution10ans: "+28%",
    delaiVente: 115,
    profilAcheteur: "Famille / patrimoine",
    description:
      "Montferrand est l'ancienne ville médiévale rattachée à Clermont en 1630, classée secteur sauvegardé. Maisons en pierre, ruelles pavées, ambiance village dans la métropole. Marché stable, en valorisation lente mais régulière, particulièrement adapté aux acheteurs sensibles au cachet et au patrimoine.",
    pointsForts: [
      "Cachet historique unique (secteur sauvegardé)",
      "Maisons de ville avec cour ou jardinet",
      "Proximité directe de l'Aventure Michelin",
      "Tram A jusqu'à La Pardieu",
    ],
    pointsFaibles: [
      "Travaux souvent nécessaires (bâti ancien)",
      "Stationnement contraint dans les rues étroites",
      "Image moins valorisée que Jaude",
    ],
    ruesRecherchees: ["Rue Jules Guesde", "Rue de la Rodade", "Rue des Cordeliers"],
    quartiersVoisins: ["clermont-ferrand-blaise-pascal", "clermont-ferrand-vallieres", "clermont-ferrand-la-pardieu"],
    faq: [
      {
        question: "Montferrand est-il bien desservi ?",
        reponse:
          "Oui, le tram A traverse le quartier et le relie en 15 min au centre. L'A71 est à 5 min en voiture.",
      },
      {
        question: "Combien de temps pour vendre à Montferrand ?",
        reponse:
          "Le délai moyen est de 3 à 4 mois. Le bâti ancien nécessite souvent des travaux et les acquéreurs sont plus prudents — le bon prix dès le départ est essentiel.",
      },
    ],
    coordinates: { lat: 45.7889, lng: 3.1080 },
  },
  {
    slug: "clermont-ferrand-salins",
    nom: "Salins",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2200,
    prixMaison: 2800,
    evolution12m: "+1.8%",
    evolution5ans: "+19%",
    evolution10ans: "+32%",
    delaiVente: 105,
    profilAcheteur: "Famille",
    description:
      "Le quartier des Salins est un secteur résidentiel calme à proximité du centre, apprécié des familles cherchant l'équilibre entre commodités et tranquillité. Mix d'immeubles années 70-80 et de petites maisons de ville.",
    pointsForts: [
      "Calme à 10 min à pied de Jaude",
      "Écoles publiques de qualité à proximité",
      "Espaces verts et square",
    ],
    pointsFaibles: [
      "Architecture parfois datée",
      "Peu de biens neufs",
    ],
    ruesRecherchees: ["Avenue des Salins", "Rue Anatole France"],
    quartiersVoisins: ["clermont-ferrand-jaude", "clermont-ferrand-fontgieve", "clermont-ferrand-centre-ville"],
    faq: [
      {
        question: "Le quartier des Salins est-il familial ?",
        reponse:
          "Oui, c'est un secteur apprécié des familles pour son calme, ses écoles et sa proximité avec le centre.",
      },
    ],
    coordinates: { lat: 45.7868, lng: 3.0738 },
  },
  {
    slug: "clermont-ferrand-chanturgue",
    nom: "Chanturgue",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1800,
    prixMaison: 2100,
    evolution12m: "+0.9%",
    evolution5ans: "+12%",
    evolution10ans: "+22%",
    delaiVente: 130,
    profilAcheteur: "Primo-accédant",
    description:
      "Au pied du puy de Chanturgue, ce quartier offre un cadre aéré et des prix accessibles. Apprécié des primo-accédants et des familles, c'est un secteur en valorisation lente porté par la demande de verdure.",
    pointsForts: [
      "Vue sur la chaîne des Puys",
      "Prix accessibles pour primo-accédants",
      "Proche du parc et des sentiers",
    ],
    pointsFaibles: [
      "Voiture quasi-indispensable",
      "Tram à 15 min en bus",
    ],
    ruesRecherchees: ["Rue de Chanturgue", "Avenue de la République"],
    quartiersVoisins: ["clermont-ferrand-montferrand", "clermont-ferrand-vallieres", "clermont-ferrand-croix-de-neyrat"],
    faq: [
      {
        question: "Chanturgue est-il abordable pour un premier achat ?",
        reponse:
          "Oui, c'est l'un des quartiers les plus accessibles de Clermont intra-muros, idéal pour un T3 ou une petite maison à moins de 200 000 €.",
      },
    ],
    coordinates: { lat: 45.8059, lng: 3.0902 },
  },
  {
    slug: "clermont-ferrand-la-glaciere",
    nom: "La Glacière",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1900,
    prixMaison: 2200,
    evolution12m: "+1.1%",
    evolution5ans: "+13%",
    evolution10ans: "+24%",
    delaiVente: 125,
    profilAcheteur: "Primo-accédant",
    description:
      "Quartier résidentiel de l'ouest clermontois, La Glacière offre un compromis entre prix, transports et cadre de vie. Dominée par les copropriétés des années 70-80, en mutation lente.",
    pointsForts: [
      "Bon rapport qualité-prix",
      "Bus directs vers le centre",
      "Espaces verts familiaux",
    ],
    pointsFaibles: [
      "Image en cours d'évolution",
      "Quelques copropriétés à rénover",
    ],
    ruesRecherchees: ["Boulevard Lavoisier", "Rue Niepce"],
    quartiersVoisins: ["clermont-ferrand-la-plaine", "clermont-ferrand-saint-jacques", "clermont-ferrand-salins"],
    faq: [
      {
        question: "La Glacière est-elle bien desservie ?",
        reponse:
          "Oui, plusieurs lignes T2C et l'accès à la rocade sont à proximité.",
      },
    ],
    coordinates: { lat: 45.7701, lng: 3.0713 },
  },
  {
    slug: "clermont-ferrand-les-cezeaux",
    nom: "Les Cézeaux",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2000,
    prixMaison: null,
    evolution12m: "+1.6%",
    evolution5ans: "+17%",
    evolution10ans: "+30%",
    delaiVente: 100,
    profilAcheteur: "Investisseur / étudiant",
    description:
      "Pôle universitaire majeur de la métropole, Les Cézeaux concentrent les facultés de sciences, l'IUT et les résidences étudiantes. Marché dynamique pour les studios et T2 destinés à la location étudiante. Rentabilité brute parmi les meilleures du département.",
    pointsForts: [
      "Demande locative étudiante quasi-permanente",
      "Extension tramway prévue",
      "Rendement locatif 5,5-6,5 % brut",
    ],
    pointsFaibles: [
      "Quartier moins animé l'été",
      "Marché concentré sur petites surfaces",
    ],
    ruesRecherchees: ["Avenue des Landais", "Rue des Meuniers"],
    quartiersVoisins: ["aubiere", "clermont-ferrand-la-pradelle"],
    faq: [
      {
        question: "Quel rendement pour un investissement aux Cézeaux ?",
        reponse:
          "Sur un studio à 90 000 €, on atteint 460-510 €/mois loyer charges comprises, soit environ 5,8-6,5 % brut.",
      },
    ],
    coordinates: { lat: 45.7592, lng: 3.1093 },
  },
  {
    slug: "clermont-ferrand-saint-jacques",
    nom: "Saint-Jacques",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2100,
    prixMaison: 2600,
    evolution12m: "+1.5%",
    evolution5ans: "+17%",
    evolution10ans: "+29%",
    delaiVente: 108,
    profilAcheteur: "Mixte / médical",
    description:
      "Saint-Jacques est un quartier résidentiel proche du CHU et de la faculté de médecine. Apprécié des internes, médecins et familles. Mix d'immeubles des années 60-70 et de maisons individuelles dans les rues calmes.",
    pointsForts: [
      "Proximité CHU Estaing et faculté de médecine",
      "Tram A direct (station St-Jacques Dolet)",
      "Forte demande locative médicale",
    ],
    pointsFaibles: [
      "Affluence aux heures de garde",
      "Architecture hétérogène",
    ],
    ruesRecherchees: ["Avenue Édouard Michelin", "Rue Étienne Dolet"],
    quartiersVoisins: ["clermont-ferrand-la-glaciere", "clermont-ferrand-cote-blatin"],
    faq: [
      {
        question: "Saint-Jacques est-il intéressant pour les internes médicaux ?",
        reponse:
          "Oui, la demande des internes du CHU est constante. Un T2 de 45 m² se loue facilement 600-650 €.",
      },
    ],
    coordinates: { lat: 45.7695, lng: 3.0955 },
  },
  {
    slug: "clermont-ferrand-la-gare",
    nom: "La Gare",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1850,
    prixMaison: null,
    evolution12m: "+0.8%",
    evolution5ans: "+11%",
    evolution10ans: "+20%",
    delaiVente: 140,
    profilAcheteur: "Investisseur (pari valorisation)",
    description:
      "Le quartier de la Gare est en pleine mutation avec le projet de pôle d'échange multimodal (PEM). Marché aujourd'hui accessible, à fort potentiel pour les investisseurs prêts à attendre la valorisation post-travaux (2027).",
    pointsForts: [
      "Projet PEM 2025-2027",
      "Accès TGV et TER direct Paris / Lyon",
      "Prix d'entrée du marché clermontois",
    ],
    pointsFaibles: [
      "Image perfectible aujourd'hui",
      "Travaux de longue durée autour de la gare",
    ],
    ruesRecherchees: ["Avenue de l'Union Soviétique", "Rue Amouroux"],
    quartiersVoisins: ["clermont-ferrand-trudaine", "clermont-ferrand-fontgieve", "clermont-ferrand-centre-ville"],
    faq: [
      {
        question: "Le quartier Gare va-t-il prendre de la valeur ?",
        reponse:
          "C'est un pari raisonnable : le pôle d'échange multimodal livré en 2027 devrait tirer les prix vers le haut sur 5-7 ans.",
      },
    ],
    coordinates: { lat: 45.7760, lng: 3.0925 },
  },
  {
    slug: "clermont-ferrand-carmes",
    nom: "Carmes",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2300,
    prixMaison: 2900,
    evolution12m: "+2.3%",
    evolution5ans: "+21%",
    evolution10ans: "+36%",
    delaiVente: 90,
    profilAcheteur: "CSP+",
    description:
      "Quartier des Carmes : ambiance bourgeoise, immeubles en pierre de Volvic, rues calmes et résidentielles. Très apprécié des cadres et professions libérales pour son équilibre entre prestige et tranquillité.",
    pointsForts: [
      "Cachet bourgeois en pierre de Volvic",
      "Calme à 5 min de Jaude",
      "Écoles privées de qualité",
    ],
    pointsFaibles: [
      "Stationnement payant",
      "Peu de biens neufs",
    ],
    ruesRecherchees: ["Rue des Carmes", "Avenue Charras"],
    quartiersVoisins: ["clermont-ferrand-jaude", "clermont-ferrand-delille"],
    faq: [
      {
        question: "Les Carmes valent-ils l'investissement ?",
        reponse:
          "Oui pour un achat patrimonial. Les biens en pierre conservent très bien leur valeur, avec une revente fluide.",
      },
    ],
    coordinates: { lat: 45.7815, lng: 3.0814 },
  },
  {
    slug: "clermont-ferrand-blaise-pascal",
    nom: "Blaise-Pascal",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2150,
    prixMaison: 2700,
    evolution12m: "+1.3%",
    evolution5ans: "+15%",
    evolution10ans: "+27%",
    delaiVente: 112,
    profilAcheteur: "Famille",
    description:
      "Quartier résidentiel équilibré entre Montferrand et le centre, Blaise-Pascal séduit les familles par ses écoles, son parc et son tram. Marché stable et liquide.",
    pointsForts: [
      "Tram A à 5 min",
      "Parc Blaise Pascal proche",
      "Écoles primaires réputées",
    ],
    pointsFaibles: [
      "Architecture mixte parfois inégale",
    ],
    ruesRecherchees: ["Avenue de la République", "Rue Blaise Pascal"],
    quartiersVoisins: ["clermont-ferrand-montferrand", "clermont-ferrand-vallieres"],
    faq: [
      {
        question: "Blaise-Pascal est-il bon pour les familles ?",
        reponse:
          "Oui, c'est l'un des quartiers les plus familiaux de Clermont, avec écoles, espaces verts et transports.",
      },
    ],
    coordinates: { lat: 45.7856, lng: 3.1021 },
  },
  {
    slug: "clermont-ferrand-oradou",
    nom: "Oradou",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2500,
    prixMaison: 3100,
    evolution12m: "+2.5%",
    evolution5ans: "+24%",
    evolution10ans: "+40%",
    delaiVente: 95,
    profilAcheteur: "Premium",
    description:
      "Oradou est un secteur résidentiel prisé du sud-est clermontois. Maisons individuelles avec jardin, copropriétés haut de gamme, environnement calme et verdoyant. L'un des secteurs les plus demandés de la rive sud.",
    pointsForts: [
      "Maisons avec jardin recherchées",
      "Calme résidentiel",
      "Proche commerces et écoles",
    ],
    pointsFaibles: [
      "Voiture quasi-indispensable",
      "Peu de tram direct",
    ],
    ruesRecherchees: ["Rue de l'Oradou", "Avenue Léon Blum"],
    quartiersVoisins: ["clermont-ferrand-saint-jacques", "clermont-ferrand-cote-blatin", "beaumont"],
    faq: [
      {
        question: "Quel budget pour une maison à l'Oradou ?",
        reponse:
          "Comptez 380 000 à 500 000 € pour une maison de 100-130 m² avec jardin, selon l'état et la rue.",
      },
    ],
    coordinates: { lat: 45.7651, lng: 3.1155 },
  },
  {
    slug: "clermont-ferrand-fontgieve",
    nom: "Fontgieve",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2050,
    prixMaison: 2550,
    evolution12m: "+1.4%",
    evolution5ans: "+15%",
    evolution10ans: "+26%",
    delaiVente: 110,
    profilAcheteur: "Famille",
    description:
      "Fontgieve est un quartier résidentiel à dominante familiale au nord-ouest de Clermont. Mix de maisons individuelles, copropriétés et petits collectifs, avec bonne desserte bus.",
    pointsForts: [
      "Bon rapport qualité-prix pour familles",
      "Espaces verts et terrains de sport",
      "Écoles à proximité",
    ],
    pointsFaibles: [
      "Pas de tram direct",
      "Architecture hétérogène",
    ],
    ruesRecherchees: ["Boulevard de Fontgieve", "Rue de la Glacière"],
    quartiersVoisins: ["clermont-ferrand-salins", "clermont-ferrand-la-gare", "clermont-ferrand-champratel"],
    faq: [
      {
        question: "Fontgieve est-il bien desservi ?",
        reponse:
          "Oui, plusieurs lignes T2C dont la 8 et la 13 desservent le quartier.",
      },
    ],
    coordinates: { lat: 45.7952, lng: 3.0748 },
  },
  {
    slug: "clermont-ferrand-la-plaine",
    nom: "La Plaine",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1900,
    prixMaison: 2300,
    evolution12m: "+1.0%",
    evolution5ans: "+12%",
    evolution10ans: "+22%",
    delaiVente: 128,
    profilAcheteur: "Primo-accédant",
    description:
      "La Plaine est un quartier sud accessible en termes de prix, idéal pour primo-accédants ou jeunes familles cherchant à entrer sur Clermont. Mix d'immeubles années 70 et de pavillons.",
    pointsForts: [
      "Tarifs accessibles",
      "Accès rapide à la rocade",
      "Proximité du centre commercial",
    ],
    pointsFaibles: [
      "Image perfectible sur certaines copropriétés",
      "Tram à 15 min en bus",
    ],
    ruesRecherchees: ["Avenue de la Plaine", "Rue de l'Aulagne"],
    quartiersVoisins: ["clermont-ferrand-la-pradelle", "clermont-ferrand-la-glaciere"],
    faq: [
      {
        question: "La Plaine est-elle un bon premier achat ?",
        reponse:
          "Oui, c'est l'un des secteurs les plus accessibles intra-muros. Bien rénové, un T3 se trouve sous les 175 000 €.",
      },
    ],
    coordinates: { lat: 45.7571, lng: 3.0845 },
  },
  {
    slug: "clermont-ferrand-la-pradelle",
    nom: "La Pradelle",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1850,
    prixMaison: 2200,
    evolution12m: "+0.9%",
    evolution5ans: "+11%",
    evolution10ans: "+20%",
    delaiVente: 132,
    profilAcheteur: "Primo-accédant",
    description:
      "La Pradelle est un quartier en bordure sud de Clermont, frontalier d'Aubière. Tarifs accessibles, ambiance résidentielle calme, proche pôle universitaire des Cézeaux.",
    pointsForts: [
      "Prix d'entrée du marché clermontois",
      "Proche Cézeaux et Aubière",
      "Calme résidentiel",
    ],
    pointsFaibles: [
      "Voiture indispensable",
      "Image moins valorisante",
    ],
    ruesRecherchees: ["Rue de la Pradelle", "Avenue Roger Quilliot"],
    quartiersVoisins: ["clermont-ferrand-la-plaine", "clermont-ferrand-les-cezeaux", "aubiere"],
    faq: [
      {
        question: "La Pradelle est-elle adaptée à l'investissement étudiant ?",
        reponse:
          "Oui, à proximité immédiate du campus des Cézeaux, on y trouve des studios à 80 000-90 000 € rentables.",
      },
    ],
    coordinates: { lat: 45.7513, lng: 3.0878 },
  },
  {
    slug: "clermont-ferrand-trudaine",
    nom: "Trudaine",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2200,
    prixMaison: 2800,
    evolution12m: "+1.8%",
    evolution5ans: "+19%",
    evolution10ans: "+33%",
    delaiVente: 100,
    profilAcheteur: "Mixte",
    description:
      "Quartier autour du célèbre boulevard Trudaine, secteur dynamique au cœur de Clermont. Prisé pour ses immeubles bourgeois et sa proximité avec le centre et la gare.",
    pointsForts: [
      "Boulevard emblématique",
      "Proximité immédiate Jaude",
      "Beaux volumes haussmanniens",
    ],
    pointsFaibles: [
      "Stationnement très contraint",
      "Charges parfois élevées",
    ],
    ruesRecherchees: ["Boulevard Trudaine", "Rue Bansac"],
    quartiersVoisins: ["clermont-ferrand-centre-ville", "clermont-ferrand-la-gare"],
    faq: [
      {
        question: "Trudaine est-il un quartier sûr ?",
        reponse:
          "Oui, c'est un secteur résidentiel établi, apprécié des familles et cadres.",
      },
    ],
    coordinates: { lat: 45.7843, lng: 3.0859 },
  },
  {
    slug: "clermont-ferrand-delille",
    nom: "Delille",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2350,
    prixMaison: 3000,
    evolution12m: "+2.2%",
    evolution5ans: "+22%",
    evolution10ans: "+37%",
    delaiVente: 92,
    profilAcheteur: "CSP+",
    description:
      "Place Delille et ses alentours : quartier emblématique en renouveau avec la rénovation de la place et l'arrivée du tram. Mix d'immeubles bourgeois et de copropriétés rénovées.",
    pointsForts: [
      "Place Delille rénovée",
      "Tram A direct",
      "Commerces et restaurants à pied",
    ],
    pointsFaibles: [
      "Stationnement difficile",
      "Quelques nuisances sonores proches des axes",
    ],
    ruesRecherchees: ["Place Delille", "Rue Bonnabaud", "Rue Pascal"],
    quartiersVoisins: ["clermont-ferrand-centre-ville", "clermont-ferrand-jaude", "clermont-ferrand-carmes"],
    faq: [
      {
        question: "Delille est-il en valorisation ?",
        reponse:
          "Oui, la rénovation de la place et la dynamique commerçante tirent les prix vers le haut depuis 2022.",
      },
    ],
    coordinates: { lat: 45.7756, lng: 3.0862 },
  },
  {
    slug: "clermont-ferrand-cote-blatin",
    nom: "Côte-Blatin",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2000,
    prixMaison: 2500,
    evolution12m: "+1.3%",
    evolution5ans: "+14%",
    evolution10ans: "+25%",
    delaiVente: 115,
    profilAcheteur: "Famille",
    description:
      "Côte-Blatin est un quartier intermédiaire entre Saint-Jacques et l'Oradou, à dominante résidentielle et familiale. Bon équilibre prix/qualité de vie.",
    pointsForts: [
      "Calme résidentiel",
      "Proche CHU et Cézeaux",
      "Maisons individuelles avec jardins",
    ],
    pointsFaibles: [
      "Pas de tram direct",
      "Voiture utile",
    ],
    ruesRecherchees: ["Rue de la Côte Blatin", "Avenue Albert Elisabeth"],
    quartiersVoisins: ["clermont-ferrand-saint-jacques", "clermont-ferrand-oradou"],
    faq: [
      {
        question: "Côte-Blatin est-il familial ?",
        reponse:
          "Oui, nombreuses maisons individuelles avec jardin, idéales pour les familles.",
      },
    ],
    coordinates: { lat: 45.7699, lng: 3.0989 },
  },
  {
    slug: "clermont-ferrand-vallieres",
    nom: "Vallières",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1900,
    prixMaison: 2300,
    evolution12m: "+1.0%",
    evolution5ans: "+13%",
    evolution10ans: "+22%",
    delaiVente: 122,
    profilAcheteur: "Famille / Michelin",
    description:
      "Quartier nord de Clermont à proximité immédiate de Montferrand et de l'A71. Apprécié des familles et des cadres travaillant à Cataroux ou en zone industrielle.",
    pointsForts: [
      "Accès rapide A71",
      "Proche zones d'emploi nord (Cataroux)",
      "Maisons accessibles",
    ],
    pointsFaibles: [
      "Tram non direct",
      "Image moins prestigieuse",
    ],
    ruesRecherchees: ["Rue de Vallières", "Avenue de Royat"],
    quartiersVoisins: ["clermont-ferrand-montferrand", "clermont-ferrand-blaise-pascal"],
    faq: [
      {
        question: "Vallières est-il pratique pour les salariés Michelin ?",
        reponse:
          "Oui, l'usine Cataroux est à 5 minutes en voiture — secteur très demandé par les Michelin.",
      },
    ],
    coordinates: { lat: 45.7975, lng: 3.0952 },
  },
  {
    slug: "clermont-ferrand-beaumont",
    nom: "Beaumont (quartier sud)",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2450,
    prixMaison: 3050,
    evolution12m: "+2.4%",
    evolution5ans: "+23%",
    evolution10ans: "+39%",
    delaiVente: 98,
    profilAcheteur: "Premium",
    description:
      "Secteur sud de Clermont, frontalier de la commune de Beaumont, réputé pour ses maisons de standing, ses écoles et son cadre verdoyant. Marché tendu, peu de rotation.",
    pointsForts: [
      "Maisons familiales avec jardin",
      "Écoles et collèges réputés",
      "Cadre verdoyant",
    ],
    pointsFaibles: [
      "Marché peu liquide (peu de biens)",
      "Prix élevés",
    ],
    ruesRecherchees: ["Avenue de la Margeride", "Rue de la Paix"],
    quartiersVoisins: ["clermont-ferrand-oradou", "beaumont"],
    faq: [
      {
        question: "Quelle différence entre Beaumont quartier et Beaumont commune ?",
        reponse:
          "Beaumont est une commune limitrophe au sud, mais le 'quartier Beaumont' désigne le secteur sud de Clermont qui la touche. Les marchés sont liés mais distincts.",
      },
    ],
    coordinates: { lat: 45.7619, lng: 3.1049 },
  },

  // ===== NOUVEAUX QUARTIERS =====
  {
    slug: "clermont-ferrand-la-pardieu",
    nom: "La Pardieu",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2100,
    prixMaison: null,
    evolution12m: "+1.7%",
    evolution5ans: "+18%",
    evolution10ans: "+31%",
    delaiVente: 105,
    profilAcheteur: "Investisseur / jeune actif",
    description:
      "La Pardieu est le principal pôle économique de l'agglomération clermontoise, accueillant notamment le centre commercial, des sièges sociaux et les campus Michelin. Le secteur résidentiel attenant monte en puissance, porté par les salariés du pôle et la connexion tram.",
    pointsForts: [
      "Tram A terminus La Pardieu",
      "Proximité immédiate du pôle emploi",
      "Commerces et services à pied",
    ],
    pointsFaibles: [
      "Ambiance moins résidentielle que les quartiers centre",
      "Certaines zones encore en reconversion",
    ],
    ruesRecherchees: ["Avenue de la Pardieu", "Boulevard René Descartes"],
    quartiersVoisins: ["clermont-ferrand-montferrand", "clermont-ferrand-brezet"],
    faq: [
      {
        question: "La Pardieu est-elle bien connectée ?",
        reponse:
          "Oui, terminus du tram A, accès direct à l'A71 et à la rocade — idéale pour les actifs.",
      },
    ],
    coordinates: { lat: 45.7818, lng: 3.1198 },
  },
  {
    slug: "clermont-ferrand-croix-de-neyrat",
    nom: "Croix-de-Neyrat",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1750,
    prixMaison: 2100,
    evolution12m: "+0.8%",
    evolution5ans: "+10%",
    evolution10ans: "+18%",
    delaiVente: 140,
    profilAcheteur: "Primo-accédant / famille modeste",
    description:
      "Quartier nord de Clermont, Croix-de-Neyrat est l'un des plus accessibles de la ville. Dominé par des grandes copropriétés, il bénéficie de rénovations progressives et d'une proximité avec la chaîne des Puys.",
    pointsForts: [
      "Prix d'entrée très accessibles",
      "Parc du Montjuzet et nature proches",
      "Vue sur la chaîne des Puys",
    ],
    pointsFaibles: [
      "Image moins valorisée",
      "Copropriétés parfois vieillissantes",
    ],
    ruesRecherchees: ["Rue des Vergnes", "Avenue de la Croix-de-Neyrat"],
    quartiersVoisins: ["clermont-ferrand-chanturgue", "clermont-ferrand-champratel"],
    faq: [
      {
        question: "Croix-de-Neyrat est-elle une bonne entrée dans l'immobilier clermontois ?",
        reponse:
          "Oui, c'est l'un des quartiers les plus accessibles. Un T2 peut se trouver sous 90 000 €. À surveiller : la qualité des copropriétés et les charges.",
      },
    ],
    coordinates: { lat: 45.8113, lng: 3.0870 },
  },
  {
    slug: "clermont-ferrand-champratel",
    nom: "Champratel",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 2100,
    prixMaison: 2650,
    evolution12m: "+1.5%",
    evolution5ans: "+16%",
    evolution10ans: "+28%",
    delaiVente: 112,
    profilAcheteur: "Famille",
    description:
      "Champratel est un quartier résidentiel calme au nord-ouest de Clermont, apprécié des familles pour ses maisons individuelles et ses espaces verts. Bien desservi par bus.",
    pointsForts: [
      "Calme résidentiel",
      "Maisons individuelles avec jardin",
      "Écoles à proximité",
    ],
    pointsFaibles: [
      "Voiture utile",
      "Peu d'animation",
    ],
    ruesRecherchees: ["Rue de Champratel", "Chemin des Pradeaux"],
    quartiersVoisins: ["clermont-ferrand-fontgieve", "clermont-ferrand-salins"],
    faq: [
      {
        question: "Champratel est-il adapté aux familles ?",
        reponse:
          "Oui, secteur calme avec maisons individuelles, idéal pour les familles avec enfants.",
      },
    ],
    coordinates: { lat: 45.7960, lng: 3.0823 },
  },
  {
    slug: "clermont-ferrand-brezet",
    nom: "Brézet",
    type: "quartier",
    ville: "Clermont-Ferrand",
    prixAppartement: 1950,
    prixMaison: 2350,
    evolution12m: "+1.2%",
    evolution5ans: "+13%",
    evolution10ans: "+22%",
    delaiVente: 120,
    profilAcheteur: "Primo-accédant / actif zone est",
    description:
      "Quartier est de Clermont, Le Brézet est proche de l'aéroport et de la zone commerciale. Secteur en mutation avec des projets de développement liés à la ZAC Est. Bonne accessibilité routière.",
    pointsForts: [
      "Proximité aéroport",
      "Accès rapide à l'A89",
      "Prix accessibles",
    ],
    pointsFaibles: [
      "Ambiance encore industrielle sur certaines zones",
      "Tram non direct",
    ],
    ruesRecherchees: ["Avenue de Brézet", "Rue des Frères Montgolfier"],
    quartiersVoisins: ["clermont-ferrand-la-pardieu", "lempdes"],
    faq: [
      {
        question: "Le Brézet est-il concerné par le bruit de l'aéroport ?",
        reponse:
          "Partiellement. Les zones résidentielles à l'écart des pistes ne sont pas significativement impactées par les nuisances sonores.",
      },
    ],
    coordinates: { lat: 45.7879, lng: 3.1365 },
  },

  // ===== COMMUNES AGGLO =====
  {
    slug: "beaumont",
    nom: "Beaumont",
    type: "commune",
    ville: "Beaumont",
    prixAppartement: 2500,
    prixMaison: 3200,
    evolution12m: "+2.6%",
    evolution5ans: "+26%",
    evolution10ans: "+44%",
    delaiVente: 95,
    profilAcheteur: "Famille premium",
    description:
      "Commune résidentielle premium de l'agglomération clermontoise, Beaumont est plébiscitée par les familles cadres et les professions libérales. Espaces verts omniprésents, tissu pavillonnaire de qualité, sectorisations scolaires très recherchées (collège Lucie Aubrac, lycée Blaise Pascal). À 5 min de l'hypercentre de Clermont, sans en subir les nuisances. Marché des maisons familiales très tendu.",
    pointsForts: [
      "Sectorisation scolaire parmi les meilleures du 63",
      "Maisons familiales avec jardin, lotissements récents et pavillons des années 80-90",
      "Cadre verdoyant : parcs, espaces naturels, calme absolu",
      "Accès direct rocade, A75, centre Clermont en 8 min",
      "Fort taux de propriétaires (>65%) — marché stable",
    ],
    pointsFaibles: [
      "Prix élevés — 2e commune la plus chère après Chamalières",
      "Très peu d'appartements disponibles",
      "Marché peu liquide : 95 jours de délai moyen",
      "Pas de tram direct (bus seulement)",
    ],
    ruesRecherchees: ["Avenue du Mont-Dore", "Rue Jean Jaurès", "Rue de Romagnat", "Allée des Cèdres", "Chemin de la Bergère"],
    quartiersVoisins: ["clermont-ferrand-beaumont", "ceyrat", "romagnat"],
    faq: [
      {
        question: "Pourquoi Beaumont est-elle si prisée ?",
        reponse:
          "Pour ses écoles réputées, son cadre verdoyant, sa proximité immédiate de Clermont (5-8 min) et son tissu pavillonnaire de qualité. C'est l'adresse de référence pour les familles cadres du 63.",
      },
      {
        question: "Quel est le prix d'une maison à Beaumont ?",
        reponse:
          "Comptez 350 000 à 550 000 € pour une maison de 100-150 m² avec jardin selon l'état, la rue et la surface. Le prix moyen oscille autour de 3 200 €/m².",
      },
      {
        question: "Beaumont est-elle bien desservie en transports ?",
        reponse:
          "Pas de tram direct mais plusieurs lignes de bus T2C vers le centre de Clermont. La voiture reste indispensable pour les déplacements quotidiens.",
      },
      {
        question: "Y a-t-il des appartements à Beaumont ?",
        reponse:
          "Très peu. Le parc immobilier est composé à 80% de maisons individuelles. Les rares appartements disponibles (principalement dans quelques résidences) partent très vite.",
      },
    ],
    coordinates: { lat: 45.7521, lng: 3.1214 },
    superficie: 5.2,
  },
  {
    slug: "chamalieres",
    nom: "Chamalières",
    type: "commune",
    ville: "Chamalières",
    prixAppartement: 2700,
    prixMaison: 3500,
    evolution12m: "+3.0%",
    evolution5ans: "+29%",
    evolution10ans: "+48%",
    delaiVente: 85,
    profilAcheteur: "Premium / patrimoine",
    description:
      "Chamalières est la commune la plus chère de l'agglomération clermontoise, et la plus prestigieuse du Puy-de-Dôme. Immeubles bourgeois hausmanniens, villas Belle Époque, résidences haut de gamme des années 70-80. Clientèle de professions libérales, médecins, cadres Michelin et patrimoniaux. Marché très tendu, offre rare, délai de vente parmi les plus courts du département.",
    pointsForts: [
      "Adresse la plus prestigieuse du 63 — valeur patrimoniale solide",
      "Immeubles bourgeois, appartements haussmanniens, villas de caractère",
      "Tram A terminus Royat/Chamalières — connexion directe CLF",
      "Lycées et établissements scolaires renommés",
      "Cadre résidentiel calme, commerces de qualité",
      "Forte plus-value historique (+48% sur 10 ans)",
    ],
    pointsFaibles: [
      "Prix les plus élevés du département (2 700 €/m² appart, 3 500 €/m² maison)",
      "Offre rarissime — moins de 15 biens disponibles en même temps",
      "Stationnement résidentiel contraint",
      "Copropriétés anciennes avec charges élevées",
    ],
    ruesRecherchees: ["Avenue de Royat", "Boulevard Carnot", "Avenue Pasteur", "Rue du Maréchal Joffre", "Boulevard Gambetta"],
    quartiersVoisins: ["royat", "clermont-ferrand-jaude", "durtol"],
    faq: [
      {
        question: "Pourquoi investir à Chamalières ?",
        reponse:
          "Actif valeur refuge avec une revente fluide, une demande locative haut de gamme et une image patrimoniale solide. Les prix n'ont jamais reculé sur 10 ans.",
      },
      {
        question: "Quel rendement locatif à Chamalières ?",
        reponse:
          "Faible en brut (3,5-4%) mais la valorisation compense : +48% sur 10 ans. Profil investisseur patrimoniaux long terme, pas rendementiste court terme.",
      },
      {
        question: "Les prix de Chamalières vont-ils encore monter ?",
        reponse:
          "L'offre est structurellement limitée (commune constituée, peu de foncier libre). La demande reste soutenue. Les prix devraient continuer à progresser à +2-3%/an.",
      },
      {
        question: "Quels types de biens trouve-t-on à Chamalières ?",
        reponse:
          "Mix d'appartements bourgeois (2 à 5 pièces dans immeubles pierre de taille), villas des années 30-50 et quelques résidences des années 70-80. Peu de petites surfaces.",
      },
    ],
    coordinates: { lat: 45.7793, lng: 3.0534 },
    superficie: 4.0,
  },
  {
    slug: "royat",
    nom: "Royat",
    type: "commune",
    ville: "Royat",
    prixAppartement: 2400,
    prixMaison: 3100,
    evolution12m: "+2.5%",
    evolution5ans: "+24%",
    evolution10ans: "+40%",
    delaiVente: 100,
    profilAcheteur: "Famille / investisseur",
    description:
      "Commune thermale historique aux portes de Clermont, Royat séduit par son architecture Belle Époque unique, ses thermes renommés et sa nature préservée aux portes des puys. Les vacanciers découvrent Royat, les clermontois y vivent toute l'année. Terminus du tram A, marché stable et qualitatif, forte identité de village dans un écrin verdoyant.",
    pointsForts: [
      "Cachet unique : architecture thermale Belle Époque, villas 1900",
      "Nature et puys à 5 min à pied — Puy de Dôme, Puy de Côme visibles",
      "Tram A terminus Royat/Chamalières — 15 min pour rejoindre le centre CLF",
      "Thermes et bien-être — cadre de vie exceptionnel",
      "Marché stable, peu de vacance locative",
    ],
    pointsFaibles: [
      "Stationnement très contraint dans le bas du village",
      "Saisonnalité : affluence touristique estivale",
      "Moins de commerces quotidiens que Chamalières",
      "Relief marqué — certaines rues peu accessibles en hiver",
    ],
    ruesRecherchees: ["Avenue de la Vallée", "Boulevard Vaquez", "Rue du Sanctuaire", "Avenue de Chamalières"],
    quartiersVoisins: ["chamalieres", "clermont-ferrand-jaude"],
    faq: [
      {
        question: "Royat est-elle bien desservie ?",
        reponse:
          "Oui, tram A terminus + plusieurs lignes T2C. Centre de Clermont en 15 min en tram, 8 min en voiture.",
      },
      {
        question: "Quel type de biens à Royat ?",
        reponse:
          "Mix unique : villas Belle Époque et maisons de ville (très prisées), appartements dans des résidences des années 70 (correct rapport qualité-prix), quelques biens atypiques dans l'ancien thermal.",
      },
      {
        question: "Vaut-il mieux habiter à Royat ou Chamalières ?",
        reponse:
          "Chamalières pour le standing et la proximité immédiate, Royat pour le cadre de vie exceptionnel et un prix légèrement plus accessible. Les deux communes se valorisent de concert.",
      },
      {
        question: "Peut-on investir à Royat ?",
        reponse:
          "Oui, avec un bon rendement (4-4,5% brut) et une vacance faible. La clientèle locative est mixte : actifs qui travaillent à Clermont + curistes pour les meublés saisonniers.",
      },
    ],
    coordinates: { lat: 45.7614, lng: 3.0395 },
    superficie: 6.6,
  },
  {
    slug: "aubiere",
    nom: "Aubière",
    type: "commune",
    ville: "Aubière",
    prixAppartement: 2200,
    prixMaison: 2900,
    evolution12m: "+2.0%",
    evolution5ans: "+20%",
    evolution10ans: "+34%",
    delaiVente: 105,
    profilAcheteur: "Famille / étudiant",
    description:
      "Aubière accueille le campus universitaire des Cézeaux, l'INRA et le pôle technologique. Marché dynamique, mix entre familles, étudiants et investisseurs. Bonne valorisation portée par la proximité universitaire.",
    pointsForts: [
      "Campus universitaire et grandes écoles",
      "Accès rocade et A75",
      "Forte demande locative étudiante",
    ],
    pointsFaibles: [
      "Quartiers très différents (campus vs résidentiel)",
      "Stationnement saturé près du campus",
    ],
    ruesRecherchees: ["Avenue Jean Jaurès", "Rue des Liondards"],
    quartiersVoisins: ["clermont-ferrand-les-cezeaux", "clermont-ferrand-la-pradelle", "romagnat"],
    faq: [
      {
        question: "Quel rendement pour un studio à Aubière ?",
        reponse:
          "Sur le secteur Cézeaux, un studio à 90 000 € se loue 460-510 € : rendement brut autour de 6 %.",
      },
    ],
    coordinates: { lat: 45.7399, lng: 3.1045 },
    superficie: 8.7,
  },
  {
    slug: "ceyrat",
    nom: "Ceyrat",
    type: "commune",
    ville: "Ceyrat",
    prixAppartement: 2300,
    prixMaison: 3000,
    evolution12m: "+2.2%",
    evolution5ans: "+22%",
    evolution10ans: "+37%",
    delaiVente: 105,
    profilAcheteur: "Famille premium",
    description:
      "Ceyrat est une commune résidentielle au pied du puy de Charade, prisée pour son cadre verduyant et ses maisons individuelles. Population aisée, écoles de qualité, proximité Clermont (10 min).",
    pointsForts: [
      "Cadre verdoyant au pied des puys",
      "Maisons familiales avec jardin",
      "Écoles réputées",
    ],
    pointsFaibles: [
      "Voiture indispensable",
      "Prix en hausse régulière",
    ],
    ruesRecherchees: ["Avenue Wallon", "Rue de Boisséjour"],
    quartiersVoisins: ["beaumont", "royat"],
    faq: [
      {
        question: "Ceyrat est-elle bien desservie ?",
        reponse:
          "Bus T2C, mais la voiture reste très utile (15 min de Clermont).",
      },
    ],
    coordinates: { lat: 45.7388, lng: 3.0672 },
    superficie: 11.6,
  },
  {
    slug: "lempdes",
    nom: "Lempdes",
    type: "commune",
    ville: "Lempdes",
    prixAppartement: 2000,
    prixMaison: 2600,
    evolution12m: "+1.5%",
    evolution5ans: "+16%",
    evolution10ans: "+27%",
    delaiVente: 118,
    profilAcheteur: "Famille / actif",
    description:
      "Lempdes, à l'est de Clermont, accueille VetAgro Sup et de nombreux pavillons familiaux. Bon rapport qualité-prix, accès direct A71/A89. En valorisation lente mais constante.",
    pointsForts: [
      "Accès A71/A89",
      "Cadre pavillonnaire",
      "Proche aéroport et zone d'emploi",
    ],
    pointsFaibles: [
      "Tram non direct",
      "Image moins prestigieuse",
    ],
    ruesRecherchees: ["Avenue de la République", "Rue des Acacias"],
    quartiersVoisins: ["clermont-ferrand-brezet", "gerzat"],
    faq: [
      {
        question: "Lempdes est-elle adaptée aux salariés Michelin ?",
        reponse:
          "Oui, l'usine Cataroux est à 10 min par l'A71. Bon compromis prix/transport.",
      },
    ],
    coordinates: { lat: 45.7706, lng: 3.1471 },
    superficie: 11.6,
  },
  {
    slug: "romagnat",
    nom: "Romagnat",
    type: "commune",
    ville: "Romagnat",
    prixAppartement: 2100,
    prixMaison: 2750,
    evolution12m: "+1.8%",
    evolution5ans: "+18%",
    evolution10ans: "+30%",
    delaiVente: 112,
    profilAcheteur: "Famille",
    description:
      "Romagnat est une commune résidentielle au sud de Clermont, prisée pour son cadre verdoyant et ses écoles. Maisons individuelles dominantes.",
    pointsForts: [
      "Cadre verdoyant et calme",
      "Écoles et associations dynamiques",
      "Bus directs Clermont",
    ],
    pointsFaibles: [
      "Voiture utile",
      "Prix en hausse",
    ],
    ruesRecherchees: ["Rue de la Mairie", "Avenue Jean Jaurès"],
    quartiersVoisins: ["aubiere", "beaumont", "perignat-les-sarlieves"],
    faq: [
      {
        question: "Romagnat est-elle pratique pour les familles ?",
        reponse:
          "Oui, l'une des communes les plus familiales de l'agglo, avec écoles, sport et calme.",
      },
    ],
    coordinates: { lat: 45.7266, lng: 3.0990 },
    superficie: 13.7,
  },
  {
    slug: "cebazat",
    nom: "Cébazat",
    type: "commune",
    ville: "Cébazat",
    prixAppartement: 1950,
    prixMaison: 2500,
    evolution12m: "+1.2%",
    evolution5ans: "+14%",
    evolution10ans: "+24%",
    delaiVente: 125,
    profilAcheteur: "Famille / primo",
    description:
      "Cébazat est une commune au nord de Clermont, accessible et familiale. Maisons individuelles avec jardin, copropriétés récentes, bon rapport qualité-prix.",
    pointsForts: [
      "Prix accessibles pour familles",
      "Maisons avec jardin",
      "Accès A71",
    ],
    pointsFaibles: [
      "Pas de tram",
      "Voiture indispensable",
    ],
    ruesRecherchees: ["Avenue de la République", "Rue de Lubières"],
    quartiersVoisins: ["gerzat", "clermont-ferrand-vallieres"],
    faq: [
      {
        question: "Cébazat est-elle un bon choix primo-accédant ?",
        reponse:
          "Oui, bon compromis maison/prix pour une famille débutante.",
      },
    ],
    coordinates: { lat: 45.8218, lng: 3.0894 },
    superficie: 11.3,
  },
  {
    slug: "gerzat",
    nom: "Gerzat",
    type: "commune",
    ville: "Gerzat",
    prixAppartement: 1850,
    prixMaison: 2400,
    evolution12m: "+1.0%",
    evolution5ans: "+12%",
    evolution10ans: "+21%",
    delaiVente: 130,
    profilAcheteur: "Famille / primo",
    description:
      "Gerzat est une commune nord de l'agglo, accessible et résidentielle. Marché stable, dominé par les pavillons familiaux des années 80-2000.",
    pointsForts: [
      "Tarifs accessibles",
      "Accès rapide A71",
      "Vie associative dense",
    ],
    pointsFaibles: [
      "Pas de tram",
      "Image moins valorisante",
    ],
    ruesRecherchees: ["Avenue de la République", "Rue du Pont"],
    quartiersVoisins: ["cebazat"],
    faq: [
      {
        question: "Quel budget maison à Gerzat ?",
        reponse:
          "Une maison de 100 m² avec jardin se trouve autour de 230 000 à 280 000 €.",
      },
    ],
    coordinates: { lat: 45.8162, lng: 3.1072 },
    superficie: 9.5,
  },
  {
    slug: "riom",
    nom: "Riom",
    type: "commune",
    ville: "Riom",
    prixAppartement: 1700,
    prixMaison: 2200,
    evolution12m: "+0.8%",
    evolution5ans: "+10%",
    evolution10ans: "+18%",
    delaiVente: 155,
    profilAcheteur: "Famille / patrimoine",
    description:
      "Sous-préfecture du Puy-de-Dôme, Riom est une ville d'art et d'histoire à 15 km de Clermont. Centre historique en pierre de Volvic, bassin d'emploi propre, marché plus accessible que la métropole.",
    pointsForts: [
      "Centre historique classé",
      "Train direct Clermont (15 min)",
      "Tarifs très accessibles",
    ],
    pointsFaibles: [
      "Plus éloigné de Clermont",
      "Centre ancien souvent à rénover",
    ],
    ruesRecherchees: ["Rue du Commerce", "Boulevard Desaix"],
    quartiersVoisins: ["chatel-guyon"],
    faq: [
      {
        question: "Riom est-elle un bon choix patrimonial ?",
        reponse:
          "Oui, le centre historique offre des hôtels particuliers en pierre de Volvic à des prix bien inférieurs à Clermont.",
      },
    ],
    coordinates: { lat: 45.8938, lng: 3.1132 },
    superficie: 31.5,
  },
  {
    slug: "chatel-guyon",
    nom: "Châtel-Guyon",
    type: "commune",
    ville: "Châtel-Guyon",
    prixAppartement: 1800,
    prixMaison: 2350,
    evolution12m: "+1.2%",
    evolution5ans: "+13%",
    evolution10ans: "+22%",
    delaiVente: 145,
    profilAcheteur: "Famille / résidence secondaire",
    description:
      "Commune thermale et touristique au nord-ouest de Clermont, Châtel-Guyon mise sur la rénovation de ses thermes. Marché en valorisation, biens de caractère et résidences secondaires.",
    pointsForts: [
      "Cadre thermal rénové",
      "Nature et thermes",
      "Tarifs accessibles",
    ],
    pointsFaibles: [
      "Éloignement de Clermont (20 min)",
      "Saisonnalité touristique",
    ],
    ruesRecherchees: ["Avenue Baraduc", "Rue Punett"],
    quartiersVoisins: ["riom"],
    faq: [
      {
        question: "Châtel-Guyon est-elle adaptée à une résidence secondaire ?",
        reponse:
          "Oui, le cadre thermal et la proximité Clermont/Vichy en font un secteur attractif pour les résidences secondaires.",
      },
    ],
    coordinates: { lat: 45.9163, lng: 3.0635 },
    superficie: 25.8,
  },
  {
    slug: "perignat-les-sarlieves",
    nom: "Pérignat-lès-Sarliève",
    type: "commune",
    ville: "Pérignat-lès-Sarliève",
    prixAppartement: null,
    prixMaison: 2500,
    evolution12m: "+1.5%",
    evolution5ans: "+16%",
    evolution10ans: "+27%",
    delaiVente: 120,
    profilAcheteur: "Famille",
    description:
      "Commune résidentielle au sud de l'agglomération, Pérignat-lès-Sarliève offre un cadre calme et verdoyant avec des maisons individuelles. Bonne accessibilité à la rocade et à Aubière.",
    pointsForts: [
      "Cadre calme et verdoyant",
      "Maisons individuelles avec jardin",
      "Accès rapide à la rocade",
    ],
    pointsFaibles: [
      "Voiture indispensable",
      "Pas de commerces de proximité",
    ],
    ruesRecherchees: ["Rue des Combes", "Avenue du Lac"],
    quartiersVoisins: ["romagnat", "aubiere", "beaumont"],
    faq: [
      {
        question: "Pérignat est-elle bien positionnée dans l'agglo ?",
        reponse:
          "Oui, commune calme au sud avec accès direct à la rocade, idéale pour les familles cherchant le calme à 10 min de Clermont.",
      },
    ],
    coordinates: { lat: 45.7255, lng: 3.1182 },
    superficie: 12.4,
  },
  {
    slug: "durtol",
    nom: "Durtol",
    type: "commune",
    ville: "Durtol",
    prixAppartement: null,
    prixMaison: 2800,
    evolution12m: "+2.0%",
    evolution5ans: "+20%",
    evolution10ans: "+34%",
    delaiVente: 115,
    profilAcheteur: "Famille premium",
    description:
      "Commune résidentielle à l'ouest immédiat de Chamalières, Durtol est prisée pour ses villas et maisons de caractère, son calme et sa vue sur le plateau de Gergovie. Marché discret mais valorisé.",
    pointsForts: [
      "Calme et standing résidentiel",
      "Proximité immédiate de Chamalières",
      "Vue dégagée et verdure",
    ],
    pointsFaibles: [
      "Voiture indispensable",
      "Faible volume de biens",
    ],
    ruesRecherchees: ["Rue de Durtol", "Chemin des Crêtes"],
    quartiersVoisins: ["chamalieres", "royat"],
    faq: [
      {
        question: "Durtol est-il une bonne alternative à Chamalières ?",
        reponse:
          "Oui, le standing est similaire pour des prix souvent légèrement inférieurs. Idéal pour les maisons avec jardin.",
      },
    ],
    coordinates: { lat: 45.7808, lng: 3.0419 },
    superficie: 3.8,
  },
  {
    slug: "pont-du-chateau",
    nom: "Pont-du-Château",
    type: "commune",
    ville: "Pont-du-Château",
    prixAppartement: 1700,
    prixMaison: 2200,
    evolution12m: "+0.9%",
    evolution5ans: "+11%",
    evolution10ans: "+19%",
    delaiVente: 150,
    profilAcheteur: "Famille / primo",
    description:
      "Pont-du-Château est une commune à l'est de Clermont, à bord de l'Allier. Marché accessible, dominé par les maisons individuelles. Bonne qualité de vie, train direct Clermont.",
    pointsForts: [
      "Bords de l'Allier",
      "Train direct Clermont (20 min)",
      "Tarifs très accessibles",
    ],
    pointsFaibles: [
      "Éloignement (20 km de Clermont)",
      "Moins de dynamisme commercial",
    ],
    ruesRecherchees: ["Avenue de la Gare", "Rue de la République"],
    quartiersVoisins: ["lempdes"],
    faq: [
      {
        question: "Pont-du-Château est-il adapté aux pendulaires Clermont ?",
        reponse:
          "Oui, le train direct Clermont (20 min) en fait une option sérieuse pour les actifs souhaitant plus d'espace pour moins cher.",
      },
    ],
    coordinates: { lat: 45.7950, lng: 3.2490 },
    superficie: 22.5,
  },
];

export const quartiers: Quartier[] = seeds.map((s) => {
  const refPrix = s.prixAppartement ?? s.prixMaison ?? 2000;
  const minPrix = priceMin(s.prixAppartement, s.prixMaison) || refPrix;
  const maxPrix = priceMax(s.prixAppartement, s.prixMaison) || refPrix;
  return {
    ...s,
    evolution: s.evolution12m,
    prixBas: Math.round(minPrix * (1 - ECART_PCT)),
    prixHaut: Math.round(maxPrix * (1 + ECART_PCT)),
  } satisfies Quartier;
});

export function getQuartierBySlug(slug: string): Quartier | undefined {
  return quartiers.find((q) => q.slug === slug);
}

export function getQuartiersByType(type: "quartier" | "commune"): Quartier[] {
  return quartiers.filter((q) => q.type === type);
}

export function getTopQuartiers(n = 6): Quartier[] {
  return [...quartiers]
    .filter((q) => q.type === "quartier")
    .sort((a, b) => (b.prixAppartement ?? 0) - (a.prixAppartement ?? 0))
    .slice(0, n);
}

export function getPriceTier(prix: number): "low" | "mid" | "high" {
  if (prix < 2000) return "low";
  if (prix < 2400) return "mid";
  return "high";
}

export function getPrixMoyenAppartement(): number {
  const prices = quartiers
    .filter((q) => q.type === "quartier" && q.prixAppartement)
    .map((q) => q.prixAppartement as number);
  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
}

export function getPrixMoyenMaison(): number {
  const prices = quartiers
    .filter((q) => q.type === "quartier" && q.prixMaison)
    .map((q) => q.prixMaison as number);
  return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
}
