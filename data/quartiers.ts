export interface FaqItem {
  question: string;
  reponse: string;
}

export interface ContenuVendre {
  intro: string;
  profil_vendeur: string;
  timing_conseil: string;
  argument_cle: string;
  piege_local: string;
}

export interface ContenuEstimation {
  intro: string;
  methode_locale: string;
  cas_concret: string;
  facteur_prix: string;
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
  /** Contenu unique pour la page /vendre/[slug] */
  contenu_vendre?: ContenuVendre;
  /** Contenu unique pour la page /estimation-quartier/[slug] */
  contenu_estimation?: ContenuEstimation;
  /** Point factuel essentiel (1-2 phrases, vrai et vérifiable) à afficher dans le hero */
  point_essentiel?: string;
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
  contenu_vendre?: ContenuVendre;
  contenu_estimation?: ContenuEstimation;
  point_essentiel?: string;
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
        question: "Combien de temps pour vendre au Centre-Ville en 2026 ?",
        reponse:
          "Comptez 3 à 4 mois en moyenne pour un bien correctement positionné. Le marché clermontois s'est allongé depuis 2023 : les acheteurs prennent plus de temps et multiplient les visites. Un bien surévalué peut rester plus de 6 mois sans offre.",
      },
    ],
    coordinates: { lat: 45.7793, lng: 3.0877 },
    contenu_vendre: {
      intro:
        "Vendre au Centre-Ville de Clermont, c'est composer avec un patchwork de micro-marchés qui ne se ressemblent pas : une vente rue Pascal n'a rien à voir avec une vente avenue de la Libération. La rue, l'étage, et surtout l'orientation pèsent davantage que le m² brut. Le centre attire les acheteurs les plus divers — investisseurs, primo-accédants, retraites mutées — chacun avec ses critères propres. Conséquence : un même bien peut séduire trois profils très différents, et l'agent doit savoir lequel cibler en priorité selon les caractéristiques précises du logement.",
      profil_vendeur:
        "Profils mixtes : retraites qui quittent un grand T4 devenu trop encombrant, mutations professionnelles vers Lyon ou Paris, héritiers en succession (hôtels particuliers du XIXe). Chaque profil a son urgence — succession = délai serré, mutation = négociation rapide, retraite = patience.",
      timing_conseil:
        "Privilégier la mise en marché entre fin février et juin : les acheteurs centre-ville sont surtout actifs au printemps. Éviter juillet-août (centre vidé par les vacances) et décembre. Les locations courte durée étant désormais encadrées par la mairie, vérifier le règlement de copropriété AVANT mise en ligne.",
      argument_cle:
        "Pouvoir tout faire à pied — courses, transports, restaurants, services. À l'heure où le coût de la voiture explose, ce critère pèse lourd, surtout pour les retraites et jeunes actifs sans permis. À mettre en avant photos à l'appui (rue commerçante à 2 min, tram à 4 min).",
      piege_local:
        "Confondre Centre-Ville et Jaude. Un bien rue Blatin (pourtant à 200 m de Jaude) se négocie 200 €/m² de moins qu'un bien avenue Maréchal Foch. Annoncer 'Jaude' un bien qui n'y est pas crée une déception en visite et tue la négociation. Restez précis sur la rue.",
    },
    contenu_estimation: {
      intro:
        "L'estimation au Centre-Ville exige une lecture rue par rue plus qu'au m². Trois facteurs font basculer le prix de 15-20 % : l'étage (un 5e sans ascenseur perd 8-12 % vs un 2e), l'exposition (côté cour calme vs avenue passante = +/- 200 €/m²), et l'état de la copropriété. Sur les biens récemment refaits, attention à ne pas surestimer la plus-value des travaux : un acheteur centre-ville achète d'abord une adresse, ensuite un état.",
      methode_locale:
        "La complexité tient au mille-feuille du bâti : immeubles haussmanniens 1880-1910 mêlés à des reconstructions années 60. Un appartement de 70 m² dans un immeuble en pierre vaut mécaniquement 250 €/m² de plus qu'un même 70 m² dans une copropriété béton 1965. La hauteur sous plafond change tout — 3,20 m vs 2,50 m = écart de 10-15 %.",
      cas_concret:
        "T3 de 68 m², 3e étage avec ascenseur, immeuble 1900 rénové en 2018, balcon côté rue Pascal, DPE D, charges 165 €/mois. Estimation : 175 000 € à 192 000 €. Prix probable de signature : 182 000 €, après une négociation de 4-5 % depuis l'annonce à 192 000 €.",
      facteur_prix:
        "L'ascenseur. Sur les immeubles centre-ville (souvent 5-6 étages), un appartement aux étages élevés sans ascenseur perd jusqu'à 18 % de sa valeur par rapport au même bien avec. C'est le facteur n°1 de variation, devant l'état et le DPE.",
    },
    point_essentiel: `À 300 m de la cathédrale Notre-Dame-de-l'Assomption et de la place de Jaude. Tramway ligne A à 150 m. Immeubles haussmanniens des XIXe-XXe siècles, commerces de proximité à pied.`,
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
    contenu_vendre: {
      intro:
        "Sur Jaude, le marché est mécanique : la demande dépasse structurellement l'offre, les acheteurs sont solvables, peu de négociation aboutit en dessous de 4 % du prix annoncé. Mais ce confort vendeur a une contrepartie. Le moindre faux pas — prix trop ambitieux, photos médiocres, mandat dispersé — paralyse le bien. À Jaude, on ne récupère pas un mauvais lancement : les acquéreurs premium repèrent les biens qui traînent et concluent qu'il y a un problème caché. Le bien doit être lancé parfaitement positionné dès la première semaine.",
      profil_vendeur:
        "Cadres dirigeants mutés en région parisienne, professions libérales qui agrandissent (du T3 vers le T5 dans le même immeuble), héritages d'appartements bourgeois transmis par des grands-parents. Profil rare : l'investisseur — Jaude se vend en résidence principale.",
      timing_conseil:
        "Deux fenêtres optimales : mars-mai (acheteurs en préparation rentrée scolaire pour leurs enfants) et septembre-octobre (mutations Michelin/CHU). Éviter absolument fin novembre à mi-janvier — le marché s'évapore et un bien lancé en décembre traîne jusqu'au printemps.",
      argument_cle:
        "L'adresse comme valeur refuge. Un appartement Jaude n'a jamais reculé sur 10 ans, +44 % cumulés. À expliquer aux acheteurs avec les chiffres précis — c'est ce qui transforme un visiteur en acquéreur sérieux.",
      piege_local:
        "Surestimer au-delà de 3 200 €/m². Au-dessus de ce plafond psychologique, même un haussmannien rénové à neuf reste sans visite pendant 6-8 semaines. La fourchette 2 600-3 100 €/m² couvre 90 % des transactions réelles ; au-delà, le bien doit avoir une vraie singularité (terrasse, atypique, vue exceptionnelle).",
    },
    contenu_estimation: {
      intro:
        "Estimer à Jaude, ce n'est pas appliquer un prix au m² mais ajuster un prix de référence selon une dizaine de critères. Le m² 'standard' est de 2 600 €, mais l'écart entre un T2 mansardé au 6e et un T3 bourgeois au 2e dépasse 800 €/m². L'enjeu est de hiérarchiser ce qui fait grimper (hauteur sous plafond > 3 m, parquet point de Hongrie, cheminées d'origine) et ce qui plafonne (DPE F, charges > 200 €/mois, copropriété en travaux non votés).",
      methode_locale:
        "La spécificité Jaude : les biens haussmanniens dont le DPE médiocre n'effraie pas les acheteurs CSP+. Sur d'autres quartiers, un DPE F bloque ; ici il décote seulement 5-8 %. Inversement, un parquet d'origine ou une cheminée Belle Époque ajoute 100-150 €/m². Les critères de valorisation suivent une logique patrimoniale, pas thermique.",
      cas_concret:
        "T3 de 75 m², 2e étage immeuble 1895, parquet d'origine, deux cheminées non fonctionnelles, hauteur sous plafond 3,40 m, DPE E, charges 195 €/mois, balcon filant rue du 11 Novembre. Estimation : 215 000 € à 245 000 €. Prix probable signature : 232 000 €.",
      facteur_prix:
        "L'authenticité du bâti. Plus les éléments d'origine sont préservés (moulures, parquet, cheminées, ferronneries), plus le prix grimpe. Une rénovation moderne uniformisée, même soignée, peut paradoxalement faire perdre 5-10 % par rapport à un bien 'dans son jus' bien entretenu.",
    },
    point_essentiel: `Sur la place de Jaude, cœur commercial de Clermont-Ferrand. Desserte directe tramway ligne A et B. Marché le plus liquide de l'agglomération (délai médian < 80 jours).`,
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
    contenu_vendre: {
      intro:
        "Montferrand est le quartier qui mute le plus discrètement de Clermont. Pendant trente ans il fut sous-évalué — image de cité ouvrière vieillissante, façades grises, ruelles oubliées. Depuis 2020, des familles parisiennes achètent ici des hôtels particuliers du XVe pour y vivre toute l'année, et la mairie restaure le secteur sauvegardé pierre par pierre. Vendre à Montferrand en 2026, c'est raconter une histoire : celle d'un bourg médiéval qui se réveille, à dix minutes de Place de Jaude. Les acheteurs qui comprennent cette histoire signent. Les autres pensent encore que c'est l'ancienne banlieue ouvrière.",
      profil_vendeur:
        "Propriétaires de très longue date — souvent 25-40 ans dans le même bien — qui réalisent une plus-value historique. Aussi : héritages, et quelques familles franciliennes arrivées en 2020-2022 qui repartent après un essai concluant mais courte durée.",
      timing_conseil:
        "Le marché Montferrand est moins saisonnier que le centre. Les acheteurs viennent de loin (Paris, Lyon, Bordeaux) pour des biens de caractère, sans calendrier scolaire serré. Un beau bien se lance toute l'année, sauf décembre-janvier. Compter 3 à 4 mois minimum sur les biens > 300 000 €.",
      argument_cle:
        "Le secteur sauvegardé. Statut administratif rare en Auvergne, qui garantit que la rue ne sera jamais défigurée. Argument peu valorisé par les vendeurs amateurs, alors qu'il rassure énormément les acheteurs venus de grandes villes habitués au patrimoine protégé.",
      piege_local:
        "Négliger la question du parking. Les ruelles médiévales rendent le stationnement quasi impossible. Vendre une maison à 350 000 € sans solution garage/cour fermée, c'est exclure 60 % des acheteurs potentiels. Si le bien n'a pas de parking, il faut documenter dès l'annonce les solutions d'abonnement résidentiel ou les places privées louables à proximité.",
    },
    contenu_estimation: {
      intro:
        "Montferrand est le quartier le plus difficile à estimer de Clermont, car la base DVF y est trompeuse : trois ventes du même mois peuvent afficher 1 600, 2 200 et 3 100 €/m² selon l'état réel du bien. Une maison médiévale 'dans son jus' ne se compare pas à une maison voisine refaite à neuf en pierre apparente, et pourtant DVF les met côte à côte. Il faut absolument visiter avant d'annoncer un prix, ou s'appuyer sur un connaisseur du bâti ancien.",
      methode_locale:
        "Trois variables explosent l'écart de prix : (1) état des charpentes et planchers anciens (les vrais coûts cachés), (2) présence d'une cour intérieure ou jardinet (rare = +20 % minimum), (3) qualité de la rénovation (une rénovation respectueuse du bâti vaut 30 % de plus qu'une rénovation 'standard'). Le m² annoncé n'a aucun sens sans ces trois infos.",
      cas_concret:
        "Maison de ville 1610 (façade classée), 110 m² sur 3 niveaux, refaite intégralement en 2019 dans les règles ABF (architecte bâtiments de France), petite cour pavée 12 m², DPE D, rue piétonne secteur sauvegardé. Estimation : 285 000 € à 320 000 €. Prix probable signature : 305 000 €.",
      facteur_prix:
        "Les travaux à venir. Sur un bien non rénové, un acheteur intelligent fait chiffrer charpente + couverture + isolation par un artisan AVANT signature, et déduit ce montant. Un vendeur qui n'anticipe pas ce calcul (en fournissant ses propres devis) subit toute la décote du diagnostic acheteur.",
    },
    point_essentiel: `Quartier médiéval classé, maisons à pans de bois des XVe-XVIe siècles. À 4 km du centre-ville. Marché de plein air hebdomadaire sur la place Louis-Deteix.`,
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
    contenu_vendre: {
      intro: `Les Salins occupent une position est intermédiaire entre le centre de Clermont et La Pardieu. Le marché y est discret — peu de mises en vente simultanées, acheteurs de proximité. La base nautique du lac des Salins à 400 m attire les familles avec enfants, un argument vendeur sous-exploité sur ce secteur.`,
      profil_vendeur: `Propriétaires d'appartements des années 1970-1990 qui arbitrent au profit d'une maison en périphérie ou d'un déménagement en dehors du département.`,
      timing_conseil: `Privilégier mars-avril et septembre-octobre. Le quartier souffre des vacances scolaires — les familles (cible principale) ne visitent pas en juillet-août.`,
      argument_cle: `Calme résidentiel avec accès rapide à la zone tertiaire La Pardieu et au tramway ligne A. Rapport qualité-prix solide sans la décote des quartiers nord.`,
      piege_local: `Éviter de confondre Les Salins avec La Pardieu dans le pitch vendeur — les acheteurs ciblant la zone tertiaire iront directement sur La Pardieu. Ici on vend la résidence, pas la proximité bureau.`,
    },
    contenu_estimation: {
      intro: `Estimer aux Salins demande de distinguer les deux générations de bâti : les tours des années 1970 (prix tirés vers le bas par les charges et le DPE) et les petits collectifs des années 1990-2000 (plus valorisés). L'écart peut atteindre 15 % pour une surface identique.`,
      methode_locale: `Le vrai référentiel est le sous-quartier : les rues proches du parc des Salins se négocient significativement au-dessus des rues longeant la rocade. Notre analyse distingue ces micro-marchés.`,
      cas_concret: `T3 de 68 m², 2e étage sans ascenseur, DPE D, vue parc — fourchette estimée entre 148 000 et 162 000 € selon état général et qualité des parties communes.`,
      facteur_prix: `La proximité immédiate du parc des Salins (vue directe depuis les étages supérieurs) constitue la prime la plus déterminante sur ce secteur — jusqu'à 8 % d'écart.`,
    },
    point_essentiel: `Quartier résidentiel est, à 2 km de la place de Jaude. Parc des Salins et base nautique à 400 m. Tramway ligne A (arrêt Triozon) à 600 m.`,
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
    contenu_vendre: {
      intro: `Chanturgue occupe les hauteurs nord de Clermont avec une vue dégagée sur la chaîne des Puys que peu de quartiers urbains peuvent revendiquer. Ce positionnement attire une clientèle spécifique — cadres retraités, familles avec voiture, personnes cherchant le calme à 15 minutes du centre. Mais cette même spécificité restreint le bassin d'acheteurs.`,
      profil_vendeur: `Propriétaires de longue date (20+ ans) qui ont acheté pour la vue et la tranquillité, souvent en fin de vie professionnelle.`,
      timing_conseil: `Le printemps est décisif à Chanturgue : la vue sur les Puys sans feuillage obstructeur, les journées longues — les visites sont meilleures d'avril à juin.`,
      argument_cle: `Vue panoramique sur la chaîne des Puys classée UNESCO et la plaine de Limagne — un attribut rare en secteur urbain clermontois, impossible à reproduire dans les quartiers bas.`,
      piege_local: `L'absence de ligne de tramway est le point de friction no.1 des acheteurs. Anticipez-le dans l'argumentaire plutôt que d'espérer que l'acheteur ne le soulève pas.`,
    },
    contenu_estimation: {
      intro: `L'estimation à Chanturgue repose presque entièrement sur deux variables : l'orientation (vue Puys ou vue plaine vs vue bâtiments) et le type de bien. Les appartements avec terrasse orientée ouest se négocient 12 à 18 % au-dessus des équivalents sans vue. C'est le facteur dominant, devant le DPE.`,
      methode_locale: `Les références DVF locales sont rares — peu de transactions par an. Nos estimations croisent les données Chanturgue avec les ventes des quartiers en hauteur comparables (La Pradelle, partie haute de Fontgiève).`,
      cas_concret: `T4 de 82 m², dernier étage, terrasse 18 m² vue Puys, DPE E (chauffage électrique), parking : fourchette estimée entre 172 000 et 192 000 € selon état des finitions.`,
      facteur_prix: `L'orientation et la vue constituent le facteur no.1 à Chanturgue. Un appartement identique face à la plaine ou face aux bâtiments voisins peut se vendre 15 % moins cher.`,
    },
    point_essentiel: `Quartier sur les hauteurs nord, vue panoramique sur la chaîne des Puys et la plaine de la Limagne. À 2,5 km du centre. Parc des Vergnes à 700 m.`,
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
    contenu_vendre: {
      intro:
        "À La Glacière, on ne vend pas un coup de cœur, on vend une feuille de calcul. Les acheteurs qui s'intéressent à ce secteur sont quasi-exclusivement des investisseurs locatifs prudents : ils achètent au rendement, négocient au rendement, signent au rendement. Si le bien affiche 5,5 % brut, il part vite ; à 4,5 %, il reste. Toute la stratégie tient là. L'erreur du vendeur amateur, c'est d'attirer des acheteurs résidence principale séduits par le prix d'entrée, qui finissent par se rétracter au moment de la promesse — perte de 6 semaines minimum.",
      profil_vendeur:
        "Bailleurs vieillissants qui sortent du locatif (fatigue de gestion, fin de défiscalisation), arbitrages de portefeuille SCI, ventes contraintes après divorce. Très rares résidences principales — la plupart des biens sont déjà loués au moment de la vente.",
      timing_conseil:
        "Hors saisons fiscales. Éviter mai-juin (déclaration revenus, investisseurs distraits) et décembre (clôture comptable des SCI). Privilégier septembre-octobre et février-avril : les investisseurs ont leur trésorerie disponible et leurs comptables actifs.",
      argument_cle:
        "Le rendement brut chiffré et démontré. Pas un 'rendement potentiel' théorique, mais le loyer réel encaissé sur les 12 derniers mois, justifié par les avis d'imposition fonciers. Un investisseur achète des chiffres prouvés, pas des promesses.",
      piege_local:
        "Cibler les acheteurs résidence principale parce que les prix sont bas. Ils visitent, signent une offre, puis se rétractent face aux charges de copropriété élevées (300-400 €/mois sur certains immeubles), aux DPE F-G fréquents et à l'image perçue du quartier. Restez sur la cible investisseur du début à la fin.",
    },
    contenu_estimation: {
      intro:
        "L'estimation à La Glacière fonctionne à l'envers des autres quartiers : on ne part pas du prix au m² pour calculer le loyer, on part du loyer pour calculer le prix maximum acceptable par un investisseur rationnel. Si le bien se loue 550 €/mois charges comprises, un investisseur visant 6 % brut paiera maximum 110 000 €. Tout prix au-dessus rend le bien invendable, peu importe son état. C'est l'unique secteur de Clermont où la logique locative dicte la valeur, pas la logique résidentielle.",
      methode_locale:
        "Les charges de copropriété sont le piège n°1. Sur des immeubles années 70-80 souvent fragiles (ravalement non voté, ascenseur en fin de vie, chauffage collectif énergivore), les charges peuvent atteindre 50 % du loyer. Un bien à 600 € de loyer avec 280 € de charges = revenu net 320 €, qui ne justifie plus le prix annoncé. Vérifier obligatoirement les 3 derniers PV d'AG.",
      cas_concret:
        "T2 de 48 m², 4e étage avec ascenseur, copropriété années 75, DPE E, charges 165 €/mois, loyer encaissé 545 € HC, taxe foncière 720 €. Estimation : 89 000 € à 96 000 €. Prix probable signature : 92 000 €, soit un rendement brut de 7,1 % qui rassure l'investisseur.",
      facteur_prix:
        "Le DPE. Avec l'interdiction progressive de location des passoires thermiques (G en 2025, F en 2028, E en 2034), un bien noté F ou G perd 15-25 % de sa valeur — pas par esthétique, mais par contrainte légale future. C'est le facteur qui décale le plus le prix entre deux biens jumeaux.",
    },
    point_essentiel: `Quartier ouest à 1 km de la place de Jaude, limitrophe de Chamalières. Piscine municipale Camille-Claudel à 400 m. Bus ligne 3 et 14 desservant le centre directement.`,
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
    contenu_vendre: {
      intro:
        "Les Cézeaux, c'est un marché à un seul moteur : la rentrée universitaire. Tout l'écosystème immobilier ici tourne autour de septembre. Un bien lancé en mars trouve preneur en juin auprès d'un parent qui anticipe la rentrée de son enfant ; un bien lancé en novembre attend juin de l'année suivante. Cette saisonnalité brutale est ignorée par les vendeurs amateurs qui mettent en ligne au mauvais moment et finissent par baisser leur prix par lassitude. Ce n'est pas une question de prix, c'est une question de calendrier.",
      profil_vendeur:
        "Anciens étudiants devenus parents qui revendent le studio acheté à leur enfant il y a dix ans. Investisseurs en transmission patrimoniale (départ à la retraite, donation aux enfants). Quelques arbitrages SCI familiales.",
      timing_conseil:
        "Lancer entre février et mai pour profiter du pic d'activité parents/futurs étudiants (visites + inscription Parcoursup en parallèle). Éviter juin-août (acheteurs en vacances, étudiants partis), et surtout octobre à janvier — le marché est mort pendant 4 mois.",
      argument_cle:
        "Le rendement chiffré et la liquidité locative. Donner un loyer médian (460-510 € pour un studio), un taux d'occupation prouvé (95 % minimum aux Cézeaux), et le coût de gestion réel (gestion locative à 7-8 %, ou en direct via plateforme étudiante).",
      piege_local:
        "Vendre pendant les vacances scolaires ou pendant les périodes de partiels. La rotation acheteurs s'effondre. Pire : les biens visibles trop longtemps en ligne sans offre voient leur prix décoter mécaniquement aux yeux des investisseurs, qui flairent un problème.",
    },
    contenu_estimation: {
      intro:
        "Aux Cézeaux, l'estimation ne raisonne ni en m² ni en pièces, mais en 'rapport loyer mensuel/prix de vente'. Un bon studio doit afficher un loyer = 1 % du prix d'achat (ex : 90 000 € = 900 € impossible, donc rendement plus modeste 5,5-6,5 %). Au-delà du rendement, deux facteurs spécifiques pèsent : l'état de la copropriété (les résidences étudiantes des années 80 ont souvent des ravalements à voter) et la distance pied-à-fac (chaque 100 m supplémentaire = -50 €/m²).",
      methode_locale:
        "L'extension prévue du tram va recomposer la valorisation. Les biens situés sur le tracé futur prennent déjà 5-8 % d'avance, ceux situés à plus de 400 m perdent en attractivité. Vérifier le tracé exact sur le site SMTC avant d'estimer.",
      cas_concret:
        "Studio de 22 m², 2e étage sans ascenseur, résidence étudiante 1985, à 250 m de la fac de sciences, DPE D, charges 95 €/mois, loyer encaissé 470 € meublé. Estimation : 78 000 € à 86 000 €. Prix probable signature : 82 000 €, soit 6,9 % brut — argument décisif.",
      facteur_prix:
        "La distance à pied jusqu'à l'amphi principal. Un studio à 5 minutes à pied vaut 12-15 % de plus qu'un studio jumeau à 12 minutes. Les parents acheteurs visitent toujours en faisant le trajet : si l'enfant arrive essoufflé, l'offre tombe.",
    },
    point_essentiel: `Campus universitaire Paul-Sabatier (UCA) et IUT à 200 m. Tramway ligne B direct vers le centre-ville (arrêt Cézeaux-Pellez). Forte demande locative étudiante toute l'année.`,
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
    contenu_vendre: {
      intro:
        "Saint-Jacques fonctionne comme deux marchés superposés. D'un côté, les studios et T2 captés par les internes en médecine, les infirmiers et les jeunes praticiens du CHU — rotation rapide, demande permanente. De l'autre, les T3, T4 et maisons familiales achetées par les médecins installés et les familles cherchant la proximité hôpital pour des raisons personnelles. Les deux mondes ne se chevauchent pas et n'utilisent pas les mêmes critères. Vendre ici, c'est d'abord choisir lequel des deux marchés on cible, puis adapter prix, photos, argumentaire en conséquence.",
      profil_vendeur:
        "Investisseurs qui arbitrent leur portefeuille (rotation studios), médecins partis en libéral dans une autre région, familles qui agrandissent et quittent le T3 pour acheter une maison à Beaumont ou Ceyrat.",
      timing_conseil:
        "Pour les studios/T2 cible internes : viser avril-juin (avant la rentrée des choix de stage en novembre). Pour les biens familiaux : printemps classique. Spécificité : la rentrée des internes en novembre crée un mini-pic de demande sur les petites surfaces.",
      argument_cle:
        "La proximité CHU mesurée à pied. Pas en voiture : les jeunes médecins en garde n'ont souvent pas de place de parking et préfèrent rentrer à pied à 3 h du matin. Donner le temps de marche jusqu'à l'entrée principale CHU Estaing.",
      piege_local:
        "Sous-estimer l'impact du DPE F-G sur les T3-T4. Sur les grandes surfaces, les acheteurs familles font systématiquement chiffrer les travaux d'isolation. Un T4 de 90 m² classé F décote de 20 000 à 30 000 € face à un même T4 classé D. Refaire le DPE après isolation simple (combles, fenêtres) peut récupérer 80 % de cette décote.",
    },
    contenu_estimation: {
      intro:
        "À Saint-Jacques, l'estimation se fait en deux temps : on définit d'abord la cible acheteur (investisseur petit logement vs famille grand logement), ensuite on applique la grille de référence. Un T2 de 45 m² destiné à un interne se valorise sur le rendement (6,5 % brut atteignable). Un T4 de 95 m² destiné à une famille se valorise sur la sectorisation scolaire et l'état du bien. Les deux grilles donnent des écarts pouvant aller jusqu'à 400 €/m² sur des biens dans le même immeuble.",
      methode_locale:
        "Spécificité : la rotation CHU crée une 'prime garde'. Les biens à moins de 400 m de l'entrée des urgences se louent 8-12 % plus cher que les biens à 800 m, ce qui se répercute mécaniquement sur le prix d'achat investisseur. Cette prime n'existe pas ailleurs à Clermont — elle est unique à Saint-Jacques.",
      cas_concret:
        "T3 de 68 m², 1er étage sans ascenseur, immeuble années 60 ravalé en 2020, DPE D, charges 145 €/mois, à 350 m du CHU Estaing. Estimation : 142 000 € à 158 000 €. Prix probable signature : 152 000 €. Profil acheteur attendu : couple jeunes médecins en CDI hospitalier.",
      facteur_prix:
        "L'étage et l'ascenseur. Sur les biens cible internes (rotation rapide, gardes nocturnes), un appartement au 4e sans ascenseur perd 15-20 % vs le même bien en RDC ou avec ascenseur. Pour les familles, c'est l'inverse : le RDC sur rue passante perd 10 %.",
    },
    point_essentiel: `À 600 m du CHU Gabriel-Montpied. Tramway ligne B (arrêt Saint-Jacques) et bus nombreux. Marché de niche porté par les internes, soignants et personnels hospitaliers.`,
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
    contenu_vendre: {
      intro: `Le quartier de la Gare concentre une demande locative et d'achat portée par la mobilité professionnelle. Les cadres qui font régulièrement Paris ou Lyon en train, les soignants du CHU, les professionnels détachés en mission à Clermont : tous cherchent cette accessibilité. Le marché répond bien aux biens bien entretenus dans des copropriétés saines.`,
      profil_vendeur: `Investisseurs qui arbitrent leur portefeuille locatif, propriétaires occupants mutés dans d'autres villes, parfois successions.`,
      timing_conseil: `Pas de saisonnalité marquée — la demande est continue. La rentrée de septembre génère un pic locatif qui peut booster les acquéreurs-investisseurs.`,
      argument_cle: `Accès direct Lyon en 1h45 et Paris en 3h sans voiture — un argument massif pour les profils bi-résidents et les couples dont un conjoint travaille ailleurs.`,
      piege_local: `Ne pas négliger le bruit : les appartements côté voies ferrées subissent une décote réelle (5 à 10 %). Être transparent sur l'exposition avant la visite, pas après.`,
    },
    contenu_estimation: {
      intro: `Estimer un bien à La Gare nécessite d'évaluer précisément l'impact du bruit ferroviaire. Côté voies : décote structurelle de 7 à 12 %. Côté rue perpendiculaire ou en retrait : prix standards du secteur. Cette distinction est souvent mal anticipée par les propriétaires.`,
      methode_locale: `Notre méthode intègre systématiquement l'exposition sonore dans la grille d'analyse. Nous consultons le classement préfectoral des infrastructures bruyantes avant toute estimation dans ce périmètre.`,
      cas_concret: `T2 de 42 m², 3e étage côté cour, DPE D, ascenseur, pas de parking : fourchette estimée entre 82 000 et 92 000 €. Même bien côté voies : 75 000 à 83 000 €.`,
      facteur_prix: `L'orientation par rapport aux voies ferrées est le facteur différenciateur principal à La Gare — plus que le DPE ou l'étage.`,
    },
    point_essentiel: `Quartier structuré autour de la gare SNCF Clermont-Ferrand — liaison Lyon (1h45), Paris (3h). À 1,2 km de la place de Jaude. Bus lignes 5, 6, 10 et navettes gare.`,
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
    contenu_vendre: {
      intro: `Les Carmes forment avec le quartier Saint-Pierre le cœur historique le plus authentique de Clermont. Ruelles pavées, architecture des XVIIIe-XIXe siècles, quelques maisons de ville à cachet exceptionnel — le potentiel est réel mais le marché reste confidentiel. Les biens y changent peu de mains, et chaque vente fait référence durablement.`,
      profil_vendeur: `Succession, transmission intergénérationnelle, ou propriétaires qui avaient acheté pour le cachet mais découvrent que les travaux de rénovation d'un bâti ancien sont lourds.`,
      timing_conseil: `Profiter du printemps et des journées longues — les ruelles étroites, sombres en hiver, sont bien plus attrayantes sous le soleil de mai-juin.`,
      argument_cle: `Adresse historique irremplaçable à 400 m de la place de Jaude et 100 m de la cathédrale. Biens rares, qui ne se trouvent nulle part ailleurs dans l'agglomération.`,
      piege_local: `Les immeubles anciens ont souvent des parties communes vieillissantes et des copropriétés avec peu de fonds de travaux. Un audit complet (AG, carnet d'entretien, charges) est indispensable avant mise en marché.`,
    },
    contenu_estimation: {
      intro: `Estimer aux Carmes est un exercice complexe pour une raison simple : les ventes sont rares et les biens sont souvent atypiques (duplex, maisons de ville, appartements dans des hôtels particuliers). Les références DVF sont limitées. Notre méthode combine analyse DVF sur un périmètre élargi et expertise de biens similaires dans d'autres villes universitaires françaises.`,
      methode_locale: `Nous analysons systématiquement l'état des parties communes, le ravalement, la chaudière collective. À surface égale, une copropriété bien entretenue se vend 15 à 20 % au-dessus d'une copropriété en difficulté.`,
      cas_concret: `Appartement de 65 m² dans un immeuble XVIIIe rénové, 2e étage, poutres apparentes, DPE C après rénovation énergétique, sans parking : fourchette estimée entre 155 000 et 178 000 €.`,
      facteur_prix: `L'état de la copropriété (et non du seul appartement) est le facteur n°1 d'écart de prix aux Carmes. Un immeuble rénové vs un immeuble dégradé peut représenter 20 % d'écart sur la même rue.`,
    },
    point_essentiel: `Adossé à la cathédrale et au quartier Saint-Pierre. Place des Carmes à 100 m. Ruelles piétonnes historiques, architecture des XVIIIe-XIXe siècles. À 400 m de la place de Jaude.`,
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
    contenu_vendre: {
      intro:
        "Blaise-Pascal a un visage double que les vendeurs sous-estiment souvent. Le long de l'avenue Blaise Pascal et de la République, le bâti est commercial et passant — bruyant, animé, avec une décote sensible pour les RDC et étages bas. À deux rues de là, dans les ruelles résidentielles, le calme est total et les biens se vendent au prix d'un secteur familial premium. L'écart entre 'rue passante' et 'rue calme' atteint 18-22 % sur Blaise-Pascal, un des plus élevés de Clermont. Le vendeur qui n'identifie pas dans quelle catégorie tombe son bien part avec un prix à côté.",
      profil_vendeur:
        "Population vieillissante qui transmet ou part en EHPAD : plus d'un tiers des biens en vente proviennent de successions ou de déménagements en maison médicalisée. Quelques familles qui ont agrandi et partent vers Beaumont ou Romagnat.",
      timing_conseil:
        "Mars-mai pour profiter de la dynamique familiale (visites avec enfants, projection rentrée scolaire). Sur les biens issus de succession, anticiper 60 jours minimum pour finaliser les actes notariaux avant la mise en vente — annoncer un bien encore en succession ouverte casse la confiance acheteur.",
      argument_cle:
        "Le tram à pied et le parc Blaise Pascal. Combinaison rare à Clermont : transport rapide centre-ville + espace vert pour enfants + écoles primaires réputées. Argument central pour les familles avec un ou deux enfants en bas âge.",
      piege_local:
        "Vendre un RDC sur voie passante au prix des étages élevés. Sur l'avenue Blaise Pascal, un RDC ou 1er étage subit -15 à -20 % de décote vs le même bien aux étages supérieurs. Inversement, un 4e étage sans ascenseur côté cour calme peut surprendre par son attractivité auprès de jeunes familles.",
    },
    contenu_estimation: {
      intro:
        "Estimer à Blaise-Pascal demande de cartographier la rue précisément. L'algorithme grille les yeux sur ce quartier car deux biens à 80 mètres de distance, dans le même type d'immeuble, peuvent valoir 200 €/m² d'écart à cause d'un simple changement de rue. Notre méthode : visiter d'abord, mesurer le niveau sonore à 18 h en semaine, repérer le flux piétonnier, et seulement après appliquer une grille de prix. Trop de vendeurs s'appuient sur la moyenne quartier (2 150 €/m²) qui n'a aucun sens local.",
      methode_locale:
        "Le diagnostic acoustique informel : si on entend distinctement une conversation à 5 mètres dans la rue à 19 h, c'est rue calme. Si le bruit de la circulation couvre les conversations, c'est rue passante. Les acheteurs font ce test sans le dire, et adaptent leur offre.",
      cas_concret:
        "T3 de 72 m², 2e étage avec ascenseur, immeuble 1985, dans une rue résidentielle perpendiculaire à l'avenue Blaise Pascal, balcon plein sud, DPE D, charges 130 €/mois. Estimation : 158 000 € à 172 000 €. Prix probable signature : 165 000 €.",
      facteur_prix:
        "Le bruit. Plus que le DPE, plus que l'étage, c'est l'exposition sonore qui fait varier le prix de 15-20 % entre deux biens jumeaux. Un acheteur famille refuse souvent les rues passantes même à prix décoté — il préfère monter le budget pour le calme.",
    },
    point_essentiel: `Rue Blaise-Pascal commerçante, entre le centre et la gare. À 500 m de la place de Jaude. Bus lignes 4 et 16. Lycée Sidoine-Apollinaire à 300 m.`,
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
    contenu_vendre: {
      intro: `L'Oradou est le quartier "village dans la ville" de Clermont : résidentiel, légèrement en hauteur sur le rebord du plateau, avec vue dégagée et peu de trafic. Le Stade Gabriel-Montpied (Clermont Foot 63) à 500 m est connu des sportifs. Le marché est stable, porté par des familles qui ne veulent pas partir en communes mais cherchent la tranquillité.`,
      profil_vendeur: `Propriétaires retraités qui libèrent de grands appartements ou pavillons, parfois des familles qui grandissent vers les communes sud.`,
      timing_conseil: `Mars à juin — la luminosité et les espaces verts de l'Oradou sont mis en valeur. Éviter les jours de match (affluence et stationnement difficile proche du stade).`,
      argument_cle: `Calme résidentiel et vue dégagée à 10 minutes du centre à pied — une combinaison rare à ce prix sur Clermont.`,
      piege_local: `Les matchs du Clermont Foot génèrent des week-ends difficiles en termes de stationnement et de bruit sur les rues voisines du stade. À mentionner proactivement pour éviter une découverte post-compromis.`,
    },
    contenu_estimation: {
      intro: `L'Oradou présente une segmentation forte entre les petits collectifs des années 1960-1970 (à rénover, DPE souvent F-G) et les constructions plus récentes bien isolées. L'écart peut atteindre 20 % pour une surface identique. Une estimation sérieuse ici ne peut pas ignorer le millésime de la construction.`,
      methode_locale: `Nous analysons le millésime du bâtiment, l'isolation (plancher, combles, fenêtres), le mode de chauffage. Un immeuble des années 1990 avec double vitrage se compare très différemment d'une tour de 1968.`,
      cas_concret: `T3 de 72 m², 4e étage avec ascenseur, vue dégagée, DPE D (isolation 2015), parking en sous-sol : fourchette estimée entre 148 000 et 165 000 €.`,
      facteur_prix: `Le millésime et l'isolation du bâtiment constituent le premier facteur de prix à l'Oradou, avant l'étage ou l'exposition.`,
    },
    point_essentiel: `Quartier résidentiel au sud-est, à 2,7 km du centre. Stade Gabriel-Montpied (Clermont Foot 63) à 500 m. Vue dégagée sur le plateau, pavillons et petits collectifs des années 1960-1980.`,
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
    contenu_vendre: {
      intro:
        "Fontgieve est en train de basculer. Ancien quartier ouvrier, il bénéficie depuis 2020 d'un effet de capillarité depuis Ballainvilliers et le centre — les acheteurs primo qui ne peuvent plus se payer l'hyper-centre découvrent Fontgieve à 15 minutes à pied. Cette dynamique fait monter les prix d'environ 1,5 % par an, mais elle est inégale : certaines rues (proches du parc, du tram, des écoles) suivent le mouvement, d'autres restent à la traîne. Vendre à Fontgieve, c'est positionner son bien dans le bon segment de cette gentrification progressive — ni trop bas (sous-vente regrettable), ni trop haut (paralysie sur le marché).",
      profil_vendeur:
        "Propriétaires depuis 20-30 ans qui réalisent enfin une plus-value substantielle après des années de stagnation. Quelques investisseurs petits portefeuilles qui sortent (rendement insuffisant face aux nouveaux prix). Très peu de jeunes vendeurs.",
      timing_conseil:
        "Mai-juin et septembre. La cible primo-accédants jeunes actifs visite les week-ends de printemps et démarre les démarches bancaires en septembre pour acheter avant fin d'année (PTZ, primes employeur). Mettre en ligne en avril maximum pour profiter de cette fenêtre.",
      argument_cle:
        "La trajectoire de quartier. À Fontgieve, le bien acheté en 2026 vaudra mécaniquement plus en 2030 : la dynamique est lancée, le tram potentiel à venir, le parc rénové. Un argument que les jeunes acheteurs entendent volontiers.",
      piege_local:
        "Estimation à la moyenne quartier. La rue change tout : rue Niepce calme = 2 150 €/m², avenue principale bruyante = 1 850 €/m². Faire des comparables précis sur la rue exacte, pas sur le quartier global. Demander à un négociateur les 5 dernières ventes dans un rayon de 200 m, pas dans Fontgieve entier.",
    },
    contenu_estimation: {
      intro:
        "Le challenge à Fontgieve, c'est l'instabilité du marché. Les prix montent, mais inégalement, et la base DVF retarde de 12-18 mois sur la réalité des prix de signature. Une estimation basée sur des transactions de 2024 sous-évalue souvent le bien de 5-8 % par rapport au marché 2026. Inversement, projeter la hausse récente sur les rues à la traîne survalorise. Méthode : croiser DVF récente + offres en cours sur les portails + retours des notaires sur les actes des 60 derniers jours.",
      methode_locale:
        "L'écart entre prix d'annonce et prix de signature reste marqué (-7 à -10 %), supérieur à la moyenne clermontoise (-4 à -6 %). Conséquence : les prix annoncés sur Leboncoin/SeLoger ne sont pas un bon repère. Travailler sur la base DVF actualisée seulement.",
      cas_concret:
        "T3 de 65 m², 3e étage sans ascenseur, immeuble 1975 ravalé en 2019, balcon plein ouest, DPE E, à 8 minutes à pied du tram. Estimation : 122 000 € à 138 000 €. Prix probable signature : 130 000 €. Argument vendeur : possibilité de PTZ pour primo-accédant.",
      facteur_prix:
        "La rue elle-même. À Fontgieve plus qu'ailleurs, la grille de prix doit être faite rue par rue, pas quartier par quartier. Écart possible : jusqu'à 18 % entre deux rues parallèles distantes de 150 mètres. Une estimation 'à la louche quartier' est mécaniquement fausse de 10-15 %.",
    },
    point_essentiel: `Rue Fontgieve commerçante, marché hebdomadaire. À 900 m de la place de Jaude, limitrophe de Chamalières. Bus ligne 3 direct centre-ville. Gentrification progressive depuis 2015.`,
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
    contenu_vendre: {
      intro: `La Plaine est l'un des quartiers les plus calmes du sud clermontois. Son bâti mêle petits collectifs des années 1980 et maisons de ville. La proximité de Beaumont et Aubière en fait un quartier de passage pour les familles qui hésite entre Clermont (prix) et les communes (espace). Ce profil intermédiaire joue en faveur du vendeur bien positionné.`,
      profil_vendeur: `Primo-propriétaires qui revendent 5 à 8 ans après achat pour accéder à une maison en commune, parfois des retraités qui se rapprochent du centre.`,
      timing_conseil: `La rentrée de septembre active les familles avec enfants. C'est la meilleure fenêtre pour ce quartier familial.`,
      argument_cle: `Prix inférieurs de 10 à 15 % à Beaumont pour une qualité de vie similaire — argument percutant pour les primo-accédants.`,
      piege_local: `Le manque de transports collectifs directs vers le centre est le frein no.1. Préparer un argumentaire sur les alternatives (bus, vélo, proximité voie rapide) avant les visites.`,
    },
    contenu_estimation: {
      intro: `La Plaine est un marché de compromis — ni le prestige de Beaumont, ni la décote des quartiers nord. Les estimations doivent intégrer la concurrence directe des communes limitrophes : un acheteur qui regarde La Plaine regarde aussi Beaumont et Aubière.`,
      methode_locale: `Nous croisent les données DVF de La Plaine avec celles de Beaumont et Aubière pour valider la cohérence de prix. L'écart structurel entre ces zones (10-15 %) est notre repère.`,
      cas_concret: `Maison de 95 m² avec garage et jardin 250 m², DPE C, 3 chambres : fourchette estimée entre 242 000 et 268 000 €.`,
      facteur_prix: `La présence d'un jardin ou d'une terrasse privative est le facteur prix no.1 à La Plaine — plus que la surface intérieure ou l'étage.`,
    },
    point_essentiel: `Zone résidentielle tranquille au sud-ouest, 1,4 km du centre. Bus ligne 9. École primaire dans le secteur. Limitrophe de Beaumont et Aubière.`,
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
    contenu_vendre: {
      intro: `La Pradelle est le quartier résidentiel tranquille du sud clermontois, souvent confondu avec La Plaine. Son bâti des années 1970-1980 — correct mais vieillissant — demande une présentation soignée et un prix ajusté. L'avantage : peu de concurrence simultanée, et une demande constante de familles cherchant calme et écoles de proximité.`,
      profil_vendeur: `Propriétaires de la génération des années 1980-1990 qui ont acheté jeunes et revendent au moment de la retraite ou d'une succession.`,
      timing_conseil: `Eviter l'été — très peu de visites juillet-août. Préférer septembre-novembre ou février-mars pour capter les familles.`,
      argument_cle: `Calme absolu, école élémentaire à 300 m, bus vers les Cézeaux — un bon package pour les familles avec enfants et les étudiants-parents.`,
      piege_local: `Les biens des années 1975-1985 avec chauffage électrique ont souvent un DPE E ou F. Préparer un devis de rénovation avant la mise en vente permet de justifier le prix et d'éviter les renégociations.`,
    },
    contenu_estimation: {
      intro: `À La Pradelle, le DPE est devenu le premier sujet d'estimation. La proportion de biens classés E et F est supérieure à la moyenne clermontoise (construction des années 1970-1980 avec chauffage tout-électrique). Chaque dossier doit intégrer l'impact DVF des passoires énergétiques sur ce secteur.`,
      methode_locale: `Nous calculons systématiquement la décote DPE selon les données ADEME locales. Un F sur ce secteur peut représenter une décote de 8 à 12 % par rapport à un C équivalent.`,
      cas_concret: `T4 de 85 m², rez-de-chaussée avec jardin privatif 80 m², DPE E, chauffage électrique, garage : fourchette 158 000 à 176 000 €.`,
      facteur_prix: `Le DPE est le facteur no.1 d'écart de prix à La Pradelle — plus que l'étage ou la surface.`,
    },
    point_essentiel: `Quartier calme au sud, 1,2 km du centre. Bus lignes 8 et 9 vers les Cézeaux (campus) et le centre. École élémentaire à 300 m.`,
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
    contenu_vendre: {
      intro: `Trudaine se situe dans l'angle mort des quartiers clermontois — ni assez central pour capter les acheteurs premium de Jaude, ni assez abordable pour attirer les primo-accédants qui regardent les quartiers nord. Son positionnement juste entre les deux en fait un marché équilibré, avec des délais de vente raisonnables pour les biens bien présentés.`,
      profil_vendeur: `Propriétaires en fin de vie active qui libèrent de grands appartements pour se rapprocher de leur famille ou intégrer une résidence services.`,
      timing_conseil: `Pas de saisonnalité marquée. La proximité du lycée Blaise-Pascal génère une demande de familles en avance sur la rentrée scolaire (mars-mai).`,
      argument_cle: `À 500 m de la place de Jaude, square Louis-Ducher à 200 m, lycée Blaise-Pascal à 400 m — un triptyque qui intéresse les familles avec lycéens.`,
      piege_local: `Le quartier est peu connu par son nom chez les acheteurs — ils diront "proche Jaude" ou "côté Fontgiève". Utiliser cette géographie dans les annonces plutôt que le nom de quartier officiel.`,
    },
    contenu_estimation: {
      intro: `Estimer à Trudaine implique de bien situer le bien dans la micro-géographie : les rues proches du square et du lycée se négocient mieux que les rues sur axes passants. L'amplitude peut atteindre 10 % pour des biens de même surface.`,
      methode_locale: `Nous travaillons rue par rue pour ce secteur. La tranquillité de la rue est un argument vendeur mesurable — nos références DVF le confirment.`,
      cas_concret: `T3 de 66 m², 3e étage avec ascenseur, DPE D, cave, pas de parking : fourchette entre 138 000 et 152 000 €.`,
      facteur_prix: `La situation précise dans la rue (côté quiet vs côté passant) est le premier facteur de prix à Trudaine.`,
    },
    point_essentiel: `Entre centre et Fontgiève, 500 m de la place de Jaude. Lycée Blaise-Pascal à 400 m. Square Louis-Ducher à 200 m. Bus lignes 4 et 14.`,
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
    contenu_vendre: {
      intro:
        "Delille est l'illustration parfaite d'un quartier 'tier 1.5' à Clermont : pas tout à fait Jaude (qui plafonne à 3 200 €/m²), mais clairement au-dessus de la moyenne ville. Les acheteurs sont des familles aisées et des cadres supérieurs qui ont calculé qu'un appartement à Delille leur offre 80 % du prestige Jaude pour 75 % du prix. C'est un calcul rationnel qu'il faut savoir confirmer dans la mise en marché : photos premium, descriptif sérieux, mise en avant du parquet, des moulures, de la place Delille rénovée comme atout patrimonial.",
      profil_vendeur:
        "Couples cadres CSP+ qui agrandissent et passent du T3 au T5 dans un autre secteur (souvent Beaumont ou Chamalières), retraites qui downsizent vers les communes thermales (Royat), héritages d'appartements bourgeois.",
      timing_conseil:
        "Le marché Delille est saisonnalisé : pic février-mai et second pic septembre-octobre. Hors ces deux fenêtres, le délai s'allonge de 30 jours minimum. La rénovation récente de la place a aussi attiré une clientèle parisienne en quête de pied-à-terre — bien visible aux dimanches de visite.",
      argument_cle:
        "La place Delille rénovée comme nouvel atout. Avant 2022, Delille était 'le quartier à côté de Jaude'. Depuis la rénovation, c'est un lieu de vie, avec terrasses, événements, marché. Les acheteurs qui visitent un dimanche tombent sous le charme — proposer des visites le week-end.",
      piege_local:
        "Charges de copropriété élevées sur les beaux immeubles. Les bâtiments fin XIXe ont souvent des ascenseurs anciens, des chauffages collectifs énergivores, des ravalements à voter. Anticiper en obtenant les 3 derniers PV d'AG et le carnet d'entretien dès la mise en vente. Un acheteur qui découvre 280 €/mois de charges au compromis tente de renégocier 8-10 %.",
    },
    contenu_estimation: {
      intro:
        "À Delille, le prix dépend moins de la rue (toutes correctes) que de l'immeuble lui-même. Trois immeubles voisins peuvent afficher des écarts de 15-20 % selon leur état, leurs charges, et la qualité de leur copropriété. La méthode CBF passe systématiquement par l'analyse du carnet d'entretien et des résolutions d'AG des 5 dernières années — un immeuble qui a tout voté (ravalement, ascenseur, chaudière) vaut 8-12 % de plus qu'un immeuble qui repousse les travaux.",
      methode_locale:
        "Tous les biens ne sont pas égaux face à la place rénovée. Les biens donnant directement sur la place ont pris 8-12 % en deux ans. Ceux des rues adjacentes ont pris 4-6 %. Au-delà de 200 m, la valorisation 'effet place' s'estompe.",
      cas_concret:
        "T4 de 92 m², 3e étage avec ascenseur, immeuble 1905 ravalé en 2021, deux chambres sur cour, salon double sur place Delille, parquet d'origine, DPE D, charges 215 €/mois. Estimation : 215 000 € à 240 000 €. Prix probable signature : 228 000 €.",
      facteur_prix:
        "L'orientation. Un appartement plein sud à Delille vaut 200 €/m² de plus qu'un même appartement plein nord. La luminosité dans les immeubles haussmanniens (souvent 4 m de hauteur sous plafond) change radicalement l'expérience visite, et donc le prix de signature.",
    },
    point_essentiel: `Quartier bourgeois résidentiel, rues arborées. Parc Vercingétorix à 300 m. À 650 m de la place de Jaude. Clientèle familiale CSP+, quasi absence de maisons.`,
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
    contenu_vendre: {
      intro: `Côte-Blatin est en cours de transformation profonde — requalification du boulevard, nouveaux programmes mixtes, amélioration de l'espace public. Vendre ici aujourd'hui, c'est anticiper une revalorisation sur 3 à 5 ans. Les acheteurs avisés le savent. Le positionnement est donc à double lecture : prix présents modérés + potentiel futur tangible.`,
      profil_vendeur: `Investisseurs locatifs qui ont réalisé leur plus-value sur d'autres secteurs et arbitrent ici, ou propriétaires occupants qui anticipent les travaux de copropriété liés à la rénovation du quartier.`,
      timing_conseil: `Le tramway A à 200 m est un argument de vente à valoriser dans les annonces. Présenter la carte de la ligne dans les photos.`,
      argument_cle: `Tramway ligne A à 200 m, 550 m de la place de Jaude, et un quartier dont la valeur patrimoniale progresse avec la requalification urbaine en cours.`,
      piege_local: `Certaines copropriétés du boulevard ont des travaux importants à voter (ravalement, isolation). Vérifier le carnet d'entretien et les PV d'AG avant de fixer un prix — un immeuble avec gros travaux à venir se négocie différemment.`,
    },
    contenu_estimation: {
      intro: `Côte-Blatin est difficile à estimer précisément car deux dynamiques coexistent : la décote liée aux copropriétés vieillissantes non rénovées, et la prime liée à la proximité du tramway et du centre. Le bon estimation intègre les deux.`,
      methode_locale: `Nous comparons systématiquement les DVF du boulevard avec ceux des rues parallèles plus calmes. L'écart boulevard/rues peut atteindre 8 % selon l'exposition au bruit.`,
      cas_concret: `T2 de 48 m², 2e étage, DPE E, vue sur rue calme perpendiculaire, pas de parking : fourchette entre 88 000 et 98 000 €.`,
      facteur_prix: `L'état de la copropriété et la présence ou non de travaux votés est le facteur le plus déterminant à Côte-Blatin — avant l'étage ou le DPE.`,
    },
    point_essentiel: `Boulevard Côte-Blatin en requalification urbaine. À 550 m de la place de Jaude. Tramway ligne A à 200 m. Mixité commerciale et résidentielle en mutation.`,
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
    contenu_vendre: {
      intro:
        "Vallières est un quartier de propriétaires fidèles. Les acheteurs s'y installent pour 15-20 ans en moyenne, attirés par le pavillonnaire calme, l'accès rapide à l'A71 et la proximité Cataroux. Le marché est donc structurellement peu liquide : peu de biens en vente simultanée, peu de comparables récents, peu de pression à la baisse mais peu de bouche-à-oreille pour faire monter les prix. Vendre à Vallières demande de la patience et un ciblage précis : familles d'ingénieurs Michelin, retraites qui downsizent depuis Beaumont, jeunes couples qui privilégient surface vs centralité.",
      profil_vendeur:
        "Retraites qui partent en commune plus calme ou en EHPAD, déménagements professionnels (mutation Michelin, gendarmerie, fonction publique), succession de la génération qui a acheté dans les années 70-80.",
      timing_conseil:
        "Le marché Vallières s'active particulièrement en fin d'année scolaire (mai-juillet) — les familles ingénieurs Michelin organisent leurs mutations sur le calendrier scolaire. Sept-oct fonctionne aussi. Les acheteurs se déplacent peu en plein hiver.",
      argument_cle:
        "Les transports oubliés : l'A71 directe est à 4 minutes en voiture, et les bus T2C desservent l'avenue de Royat fréquemment. Aussi, accès Cataroux en 8 minutes hors heures de pointe — argument décisif pour les acheteurs Michelin qui font 220 trajets/an vers l'usine.",
      piege_local:
        "Vendre sans plaquette des temps de trajet. Les acheteurs jugent Vallières 'loin de tout' sur la carte, alors que c'est faux. Documenter avec un graphique précis : Cataroux 8 min, Jaude 12 min, A71 4 min, école primaire à pied, supermarché 5 min. Cette dataviz transforme l'image du quartier en visite.",
    },
    contenu_estimation: {
      intro:
        "Estimer à Vallières est difficile par défaut de comparables : le quartier voit 25-35 transactions par an seulement, contre 150+ pour Centre-Ville. Les estimations algorithmiques (DVF + portails) donnent ici des résultats peu fiables. La méthode CBF passe par croisement avec Montferrand voisin (similaire en bâti, plus liquide) et application d'un coefficient correctif spécifique Vallières (-5 à -8 % vs Montferrand selon la rue).",
      methode_locale:
        "Spécificité : la majorité des biens ont un terrain (jardin ou cour). Le m² habitable vu seul ne reflète pas la valeur — il faut intégrer la surface terrain, l'orientation du jardin, et la présence d'un garage. Un pavillon 100 m² avec jardin 400 m² + garage vaut 80 000 € de plus que le même 100 m² en appartement.",
      cas_concret:
        "Pavillon de 105 m² sur terrain 380 m², construit en 1982, garage 18 m², jardin sud, chaudière 2018, fenêtres double vitrage 2020, DPE D, à 8 minutes de Cataroux en voiture. Estimation : 245 000 € à 270 000 €. Prix probable signature : 258 000 €.",
      facteur_prix:
        "La présence d'un garage fermé. À Vallières, un pavillon avec garage vaut 18 000 à 25 000 € de plus qu'un pavillon identique sans garage. C'est le critère n°1 pour les familles ingénieurs avec deux voitures, beaucoup plus différenciant que la surface ou l'état général.",
    },
    point_essentiel: `Quartier résidentiel entre Saint-Jacques et La Gare. Parc de Vallières (aire de jeux, terrain de boules) à 200 m. À 800 m du centre. Bus lignes 5 et 16.`,
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
    contenu_vendre: {
      intro: `Ce secteur clermontois limitrophe de la commune de Beaumont bénéficie d'une adresse hybride : les prix de Clermont-Ferrand avec la qualité de vie proche des communes. Les acheteurs qui ne peuvent pas s'offrir Beaumont commune se rabattent ici. C'est un marché de recours qui fonctionne bien quand les prix sont cohérents.`,
      profil_vendeur: `Familles qui agrandissent vers les communes du sud.`,
      timing_conseil: `Eviter les périodes de fortes baisses de marché communes — ici la liquidité est étroitement liée aux prix de Beaumont. Si Beaumont baisse, ce secteur suit.`,
      argument_cle: `Accès tramway ligne B à 700 m, lycée Blaise-Pascal proche, calme résidentiel — au prix de Clermont et non de Beaumont.`,
      piege_local: `Les acheteurs testent systématiquement les prix commune de Beaumont avant de visiter ici. Si l'écart est trop faible, ils iront sur la commune.`,
    },
    contenu_estimation: {
      intro: `Ce secteur est évalué en permanence en regard de Beaumont commune. Notre estimation intègre toujours la comparaison avec les biens équivalents côté commune — c'est ce que font les acheteurs.`,
      methode_locale: `Nous appliquons une décote structurelle de 8 à 12 % par rapport à Beaumont commune (code postal 63110) pour les biens de type et état comparables.`,
      cas_concret: `Maison de 90 m² avec jardin 200 m², DPE D, 3 chambres, garage : fourchette 225 000 à 248 000 € (vs 245 000-275 000 € côté commune).`,
      facteur_prix: `Le différentiel avec la commune de Beaumont est le premier repère de prix — c'est la logique de l'acheteur sur ce secteur.`,
    },
    point_essentiel: `Limitrophe de la commune de Beaumont, au sud. Lycée Blaise-Pascal à 600 m. Tramway ligne B (arrêt Les Gravanches) à 700 m. Quartier pavillonnaire à faible densité.`,
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
    contenu_vendre: {
      intro:
        "La Pardieu est le quartier où le marché se transforme le plus vite à Clermont. Pôle économique majeur (Michelin R&D, Limagrain, sièges sociaux, centre commercial), il attire en flux constant des cadres mutés du grand Ouest et du grand Est. Ces acheteurs ne connaissent pas Clermont — ils achètent sur dossier, en visite éclair de 48 h. La conséquence : à La Pardieu, plus que partout ailleurs, l'annonce doit être professionnelle, photographiée par un pro, virtuellement visitable. Un mauvais shooting et le cadre relocalisé qui décide en 2 jours passe son chemin.",
      profil_vendeur:
        "Primo-accédants 30-35 ans qui revendent 3-5 ans après l'achat (PTZ remboursé, agrandissement famille, mutation), investisseurs qui sortent suite à fin de défiscalisation Pinel, propriétaires retraites qui suivent leurs enfants à Lyon ou Bordeaux.",
      timing_conseil:
        "Caler la mise en marché sur les vagues de mutations Michelin (mars et septembre) et Limagrain (mai et octobre). Les groupes annoncent leurs mouvements 60 jours à l'avance — un bien lancé au bon moment trouve preneur en 4-6 semaines. Hors ces fenêtres : compter 90-120 jours.",
      argument_cle:
        "Le 'travail à pied'. Pour un cadre Michelin ou Limagrain habitant La Pardieu, le trajet domicile-bureau peut être réduit à 10 minutes à pied. À l'heure où les politiques RH valorisent ce critère, c'est un argument concret pour les jeunes cadres qui calculent aussi leur empreinte carbone.",
      piege_local:
        "Sous-estimer le DPE sur les biens des années 1990-2000. Beaucoup d'immeubles La Pardieu construits dans cette période affichent des DPE D-E médiocres avec des chaudières individuelles vieillissantes. Faire faire un diagnostic complet AVANT mise en vente, et anticiper devis isolation/chauffage à fournir aux acheteurs.",
    },
    contenu_estimation: {
      intro:
        "Estimer à La Pardieu, c'est arbitrer entre deux logiques : la valeur résidentielle (sectorisation, calme, transports) et la valeur 'employeur' (proximité Michelin/Limagrain). Selon le profil de l'acheteur potentiel, le même bien peut justifier deux fourchettes différentes. La méthode CBF passe par identification du segment dominant sur la rue précise — certaines rues attirent surtout des cadres entreprises (prime employeur), d'autres surtout des familles classiques (prime sectorisation).",
      methode_locale:
        "L'extension du tram A est déjà capitalisée dans les prix. La hausse de +18 % sur 5 ans est en grande partie due à l'arrivée du terminus tram. Aujourd'hui, le bonus 'à venir' n'existe plus — les nouveaux acheteurs paient déjà le prix du tram livré.",
      cas_concret:
        "T3 de 70 m², 4e étage avec ascenseur, immeuble 1998, balcon plein sud, parking en sous-sol, DPE D, charges 145 €/mois, à 6 minutes à pied du tram et 10 minutes du Michelin Centre Recherche. Estimation : 142 000 € à 158 000 €. Prix probable signature : 152 000 €.",
      facteur_prix:
        "La place de parking. À La Pardieu, où la concentration de cadres deux voitures est élevée, un appartement avec une place de parking sécurisée vaut 12 000 à 18 000 € de plus que le même bien sans parking. Plus discriminant qu'à Jaude ou Centre-Ville où on accepte plus volontiers de stationner dans la rue.",
    },
    point_essentiel: `Zone tertiaire de Clermont — siège social Michelin à 800 m, Limagrain et Groupama présents. Tramway ligne A (arrêt La Pardieu) à 200 m. Forte demande de cadres en résidence principale.`,
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
    contenu_vendre: {
      intro: `Croix-de-Neyrat est en mutation. Le quartier bénéficie de programmes ANRU de rénovation urbaine, d'investissements publics dans les espaces communs, et d'une dynamique démographique qui change lentement le profil des habitants. Vendre ici demande de cibler les acheteurs investisseurs (rendement) plutôt que les résidents premium.`,
      profil_vendeur: `Bailleurs privés qui sortent du locatif social, propriétaires occupants qui partent suite à un changement de situation.`,
      timing_conseil: `Ce marché est moins saisonnier — les acquéreurs investisseurs actifs toute l'année. La fin d'année (octobre-décembre) peut être opportune pour les ventes rapides.`,
      argument_cle: `Tramway ligne A (arrêt Croix-de-Neyrat) à 500 m. Rénovation ANRU en cours qui améliore l'image et la valeur à terme. Prix d'entrée les plus bas sur des produits en bon état.`,
      piege_local: `L'image du quartier reste un frein psychologique pour les acheteurs résidents. Cibler explicitement les investisseurs dans les annonces — ne pas "vendre du rêve" à des résidents qui visiteront et déchanteront.`,
    },
    contenu_estimation: {
      intro: `L'estimation à Croix-de-Neyrat est complexifiée par la coexistence d'immeubles rénovés ANRU et d'immeubles non rénovés aux charges lourdes. Un T3 rénové avec DPE C peut valoir deux fois plus qu'un T3 des années 1970 non rénové sur la même rue.`,
      methode_locale: `Nous classifions chaque bien selon son programme de rénovation (avant/après ANRU) avant toute estimation. Les références de prix doivent impérativement distinguer ces deux catégories.`,
      cas_concret: `T3 de 65 m², programme rénové post-ANRU, DPE C, 4e étage avec ascenseur : fourchette entre 98 000 et 112 000 €. Même bien non rénové, DPE E : 72 000 à 85 000 €.`,
      facteur_prix: `L'appartenance à un immeuble rénové (programme ANRU ou non) est le facteur prix no.1 à Croix-de-Neyrat.`,
    },
    point_essentiel: `Quartier nord en politique de la ville (ANRU). Tramway ligne A terminus nord (Champratel) à 800 m. Marché alimentaire hebdomadaire. À 2,7 km du centre, bus lignes 2 et 30.`,
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
    contenu_vendre: {
      intro: `Champratel est la porte nord de Clermont, terminus de la ligne A du tramway. Ce positionnement lui confère une liquidité relative — les utilisateurs du tram qui cherchent à se loger en bout de ligne. Mais le marché reste calme, avec peu de transactions annuelles et une clientèle de propriétaires occupants.`,
      profil_vendeur: `Propriétaires de longue date, souvent retraités, qui ont acheté quand le tramway était en projet.`,
      timing_conseil: `Le tramway est l'argument no.1. Mettre en avant l'arrêt Champratel dans le titre de l'annonce.`,
      argument_cle: `Terminus tramway ligne A à 200 m — connexion directe centre-ville en 20 minutes. Parc des Vergnes à 300 m pour les familles.`,
      piege_local: `Le terminus de tramway génère des nuisances sonores en heures de pointe pour les immeubles les plus proches. À vérifier et à mentionner pour les lots exposés.`,
    },
    contenu_estimation: {
      intro: `L'estimation à Champratel repose sur l'accessibilité tramway comme principal déterminant — sans cette infrastructure, les prix rejoindraient ceux de Croix-de-Neyrat. La distance précise à l'arrêt conditionne directement la valeur.`,
      methode_locale: `Nous calculons systématiquement la distance à l'arrêt Champratel. Entre 0 et 300 m : prime de 5 %. Au-delà de 600 m : alignement sur Croix-de-Neyrat.`,
      cas_concret: `T3 de 68 m², 3e étage, DPE D, 200 m tramway, vue parc : fourchette entre 118 000 et 132 000 €.`,
      facteur_prix: `La distance à l'arrêt tramway est le facteur no.1 à Champratel — avant le DPE, l'étage ou la vue.`,
    },
    point_essentiel: `Terminus tramway ligne A (arrêt Champratel) sur le quartier. Parc des Vergnes à 300 m. Vue sur la plaine de Limagne. À 3,3 km du centre, marché calme et propriétaires-occupants.`,
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
    contenu_vendre: {
      intro:
        "Au Brézet, la franchise paie. Les acheteurs viennent en sachant qu'ils achètent dans un quartier mixte résidentiel/logistique, à proximité aéroport. Ce qui les agace, c'est quand un vendeur essaie de masquer ces réalités — une ligne 'cadre verdoyant' sur une annonce alors qu'on entend un avion toutes les 18 minutes ruine la confiance dès la visite. Inversement, un vendeur qui annonce sans détour 'classement sonore aéroport zone C, plan d'exposition au bruit consultable dès la visite, accès aéroport en 4 min' rassure et accélère la décision.",
      profil_vendeur:
        "Propriétaires de pavillons construits dans les années 70-80, qui partent à la retraite ou en EHPAD. Quelques investisseurs locatifs qui revendent après fin de défiscalisation. Très rares jeunes vendeurs.",
      timing_conseil:
        "Marché plat toute l'année, sans pic saisonnier marqué. Mais éviter mi-juin à mi-août : les nuisances aéroport sont plus perceptibles l'été (fenêtres ouvertes), les visites du week-end coïncident avec les rotations charters. Privilégier visites en semaine 11h-12h, heures creuses aéroport.",
      argument_cle:
        "Les 4 minutes pour rejoindre l'aéroport — argument paradoxalement oublié. Pour un acheteur qui voyage 2 fois/mois (commercial, consultant, cadre groupe international), gagner 30 minutes de trajet sur chaque voyage = 12 h/an récupérées. Calcul concret à mettre en visite.",
      piege_local:
        "Ne pas fournir le PEB (Plan d'Exposition au Bruit) avant la visite. Document obligatoire, mais surtout argument décisif : sortir le PEB avec la zone du bien clairement identifiée transforme le bruit perçu en information maîtrisée. À l'inverse, l'acheteur qui découvre la classe sonore au compromis recule de 8-10 % de prix.",
    },
    contenu_estimation: {
      intro:
        "Le Brézet souffre d'estimations algorithmiques systématiquement faussées. La base DVF mélange biens en zone PEB A (très exposés) et biens à l'écart (peu exposés), créant une moyenne de 1 950 €/m² qui ne correspond à aucune réalité concrète. Sur le terrain, l'écart entre un pavillon zone C et un pavillon hors zone PEB peut atteindre 500 €/m². L'estimation sérieuse exige obligatoirement le repérage cartographique précis et la classe sonore exacte.",
      methode_locale:
        "Le PEB segmente le quartier en zones A (>74 dB), B, C (>56 dB) et D. Décote moyenne : -25 % en A, -15 % en B, -5 % en C, 0 en D. Le diagnostic acoustique est aussi structurant qu'un DPE — ignorer le PEB dans l'estimation, c'est annoncer un prix faux à 15-25 %.",
      cas_concret:
        "Pavillon de 95 m² sur 350 m² de terrain, construit en 1978, garage et sous-sol, hors zone PEB stricte (zone D), refait toiture 2015 et chaudière 2021, DPE E. Estimation : 178 000 € à 198 000 €. Prix probable signature : 188 000 €. Note : le même bien en zone PEB B se vendrait 20 000 € de moins.",
      facteur_prix:
        "Le Plan d'Exposition au Bruit. Aucun autre facteur ne fait varier le prix de cette amplitude au Brézet. Deux pavillons jumeaux distants de 600 m peuvent valoir 50 000 € d'écart selon leur classe PEB, indépendamment de l'état ou de la surface. À documenter dès la première étape de l'estimation.",
    },
    point_essentiel: `À 1,5 km de l'aéroport Clermont-Ferrand Auvergne. Zone de servitudes aéronautiques à vérifier lors de la vente. Bus ligne 16 direct centre-ville. Marché mixte industriel-résidentiel.`,
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
    contenu_vendre: {
      intro:
        "Beaumont est la commune où le délai de vente est le plus dépendant du prix de départ. Ici, le marché est à la fois solvable (familles cadres CSP+) et patient (peu d'urgence acheteur). Conséquence : un prix de départ ambitieux ne provoque pas une décote rapide, il provoque un silence radio de 8-12 semaines avant la première vraie offre. Beaucoup de propriétaires interprètent ce silence comme un manque de demande et baissent leur prix au mauvais moment, alors qu'il aurait suffi de bien positionner dès le lancement. La courbe d'opportunité à Beaumont est très plate — pas le droit à l'erreur initiale.",
      profil_vendeur:
        "Familles cadres dont les enfants quittent la maison (passage du 150 m² au 110 m² à Chamalières), retraites qui downsizent vers Royat ou centre Clermont, mutations professionnelles vers Lyon (cadres Michelin / Limagrain).",
      timing_conseil:
        "Pic absolu mars-mai. Les familles acheteuses calent leurs visites et signatures sur la rentrée scolaire de septembre. Un bien lancé en mars peut signer en juin pour livraison août — calendrier idéal. Lancement en septembre = fenêtre 4 mois jusqu'au gel hivernal.",
      argument_cle:
        "La sectorisation scolaire. Collège Lucie Aubrac et lycée Blaise Pascal sont des arguments concrets que les familles vérifient en mairie avant offre. Documenter précisément l'adresse du bien dans les cartes scolaires actuelles (les zones changent) et fournir le contact du service scolarité.",
      piege_local:
        "Le 'prix d'oreiller' inspiré du voisin. Beaucoup de propriétaires basent leur prix sur la rumeur de la rue ('mon voisin a vendu 580 000 € l'an dernier'), sans connaître les détails du bien voisin (état, surface, jardin, garage). C'est l'erreur n°1 — produit des départs trop hauts qui paralysent la vente pour 2-3 mois minimum.",
    },
    contenu_estimation: {
      intro:
        "L'estimation à Beaumont demande une grille très fine basée sur la rue, la sectorisation scolaire et les caractéristiques précises du jardin. Les écarts entre deux maisons jumelles distantes de 200 mètres peuvent atteindre 80 000 € selon le collège de rattachement et la qualité du terrain. La base DVF est utile mais insuffisante : Beaumont étant une commune relativement homogène, les comparables algorithmiques sont vite trompeurs si on ne corrige pas finement la sectorisation, l'orientation et la pente du terrain.",
      methode_locale:
        "Trois facteurs propres à Beaumont multiplient ou réduisent le prix : (1) collège de rattachement (Lucie Aubrac vs autres), (2) orientation et pente du jardin (terrain plat ensoleillé vs terrain en pente nord), (3) qualité de la rue (impasse calme vs avenue passante). Chaque facteur peut décaler le prix de 5-10 %.",
      cas_concret:
        "Maison familiale de 130 m² sur 700 m² de terrain plat, construite en 1985, refaite en 2020 (cuisine, sdb, fenêtres), 4 chambres, garage 2 voitures, secteur Lucie Aubrac, rue calme. Estimation : 445 000 € à 485 000 €. Prix probable signature : 465 000 €.",
      facteur_prix:
        "Le terrain. À Beaumont, ce n'est pas la maison qui valorise le bien mais le terrain (taille, orientation, plat ou en pente). Une maison récente sur 400 m² de terrain en pente vaut moins qu'une maison plus ancienne sur 800 m² de terrain plat. Les acheteurs familles projettent piscine, jardin enfants, terrasse — sans terrain adéquat, l'offre tombe.",
    },
    point_essentiel: `Commune résidentielle de 10 000 habitants au sud immédiat de Clermont. Tramway ligne B (arrêt Les Gravanches, limite nord) à 800 m. Lycée Blaise-Pascal sur la commune. Quasi absence d'appartements.`,
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
    contenu_vendre: {
      intro:
        "À Chamalières, l'adresse vend toute seule — c'est presque vrai. La demande structurelle est telle que même un bien moyennement présenté trouve preneur. Mais 'preneur' ne signifie pas 'au bon prix'. Le piège classique : un vendeur sur-confiant en l'adresse Chamalières fixe un prix élevé, attend, finit par baisser, et signe à un prix qu'il aurait pu obtenir 3 mois plus tôt avec une mise en marché professionnelle. La règle locale : la prime Chamalières existe (+15 % vs Clermont), mais elle est plafonnée. Au-delà de 4 000 €/m² sur des appartements et 3 800 €/m² sur des maisons, même la magie de l'adresse ne fonctionne plus.",
      profil_vendeur:
        "Successions de notables locaux (médecins, avocats, dirigeants) générant des hôtels particuliers et villas Belle Époque, départs en retraite vers la côte ou la résidence secondaire, déménagements professionnels de cadres dirigeants Michelin vers Paris ou international.",
      timing_conseil:
        "Le marché Chamalières est moins saisonnier que Clermont ville — les acheteurs viennent de loin (Paris, Lyon, Bordeaux, Suisse) toute l'année. Néanmoins, mai-juin est optimal pour les biens familiaux. Pour les pied-à-terre / résidences secondaires, septembre-novembre fonctionne très bien (curistes, retraites en réflexion).",
      argument_cle:
        "L'effet 'jamais reculé'. Les prix Chamalières n'ont pas baissé en 2008 ni en 2023. Sur 10 ans : +48 %. Cet argument transforme un acheteur hésitant en acheteur convaincu — Chamalières n'est pas qu'un lieu de vie, c'est un placement patrimonial dont la performance est documentée.",
      piege_local:
        "Sous-estimer l'importance du parc/jardin sur les villas. À Chamalières, un acheteur villa demande SYSTÉMATIQUEMENT à voir le jardin avant la maison. Une villa avec 50 m² de cour cimentée vaut 200 000 € de moins qu'une villa avec 600 m² de jardin paysagé arboré. Investir 5 000 € dans un paysagiste avant photos peut justifier 30 000 € de plus à la signature.",
    },
    contenu_estimation: {
      intro:
        "L'estimation à Chamalières exige de distinguer trois sous-marchés très différents : (1) les villas Belle Époque et hôtels particuliers (3 800-4 500 €/m², peu de comparables), (2) les appartements bourgeois en immeubles pierre de taille (2 800-3 200 €/m²), (3) les résidences années 70-80 modernisées (2 200-2 600 €/m²). Mélanger ces trois marchés dans une moyenne donne une estimation totalement fausse. La méthode CBF segmente d'abord, estime ensuite.",
      methode_locale:
        "L'offre rarissime fausse la base DVF — il y a parfois 2-3 ventes par an sur les biens premium, insuffisant pour faire des moyennes statistiques. La méthode locale s'appuie sur les ventes des 24 derniers mois sur Chamalières + Royat + Durtol (3 communes voisines homogènes), pour obtenir une base de 30-40 transactions exploitables.",
      cas_concret:
        "Villa de 1925, 200 m² habitables sur 850 m² de terrain paysagé, 3 niveaux, refaite cuisine et 2 sdb en 2018, parquets et moulures d'origine conservés, garage 2 voitures, DPE D. Estimation : 720 000 € à 810 000 €. Prix probable signature : 765 000 €. Acheteur attendu : profession libérale ou cadre dirigeant Michelin.",
      facteur_prix:
        "L'année et le style de construction. Une villa Belle Époque (1900-1930) en bon état est valorisée 30-40 % de plus qu'une villa de qualité comparable des années 60-70. Le cachet patrimonial est l'argument central de Chamalières — les biens sans charme architectural plafonnent rapidement, même bien rénovés.",
    },
    point_essentiel: `Commune la plus chère du Puy-de-Dôme — 16 000 habitants. Tramway ligne A traversant la commune (arrêts Royat-Chamalières et Fontgiève). Parc Bargoin (7 ha, animaux en liberté) au cœur de la commune.`,
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
    contenu_vendre: {
      intro:
        "Royat se vend à deux clientèles très différentes : les Auvergnats qui en font leur résidence principale (familles, retraites, professions libérales) et les vacanciers nationaux qui ont découvert la commune en cure ou en week-end et achètent un pied-à-terre. Cette double cible est une force commerciale, à condition d'orienter la communication selon le bien. Une villa Belle Époque familiale s'adresse aux uns ; un appartement de plain-pied dans un immeuble thermal s'adresse aux autres. Le vendeur qui mélange les codes (photos amateur sur un bien Belle Époque, descriptif chaleureux sur un investissement) perd les deux marchés à la fois.",
      profil_vendeur:
        "Héritages familiaux multigénérationnels (les villas restent souvent 50+ ans dans la même famille), retraites parisiennes qui revendent leur résidence secondaire pour rentrer en famille, investisseurs courte durée fatigués de la gestion saisonnière.",
      timing_conseil:
        "Mars-juin pour cibler les acheteurs résidence principale (calendrier scolaire), août-octobre pour cibler les vacanciers ayant découvert Royat pendant l'été (effet coup de cœur post-vacances). Les hivers sont plus calmes, sauf pour les biens proches des thermes qui restent demandés toute l'année.",
      argument_cle:
        "Le cadre photogénique. Royat se vend en photos plus que par descriptif — l'architecture Belle Époque, la nature, le panorama puys. Un shooting professionnel par drone, en lumière dorée fin d'après-midi, transforme une annonce ordinaire en coup de cœur. Investissement 600-1 200 € qui rapporte 15 000-30 000 € à la signature.",
      piege_local:
        "Vendre un bien classé ABF sans documenter les contraintes de travaux. Royat compte de nombreux biens en zone protégée Bâtiments de France — toute modification de façade nécessite autorisation préalable. Un acheteur qui découvre les contraintes au compromis peut se rétracter ou exiger -10 %. À documenter clairement dès l'annonce.",
    },
    contenu_estimation: {
      intro:
        "Royat est l'une des communes les plus complexes à estimer du département parce qu'elle mélange dans un périmètre de 6 km² des biens à vocations très différentes : résidences principales familiales, pied-à-terre de retraites, investissements meublés saisonniers, biens de caractère atypiques. Chaque sous-marché a ses propres prix de référence. Une grille unique 'Royat 2 400 €/m²' est mécaniquement fausse à 15-20 % selon le bien estimé.",
      methode_locale:
        "Le relief joue un rôle inattendu. Les biens situés dans le bas (proches des thermes) valent 5-8 % de plus que les biens en hauteur (rues du Sanctuaire, Vaquez), même de qualité comparable. La raison : accessibilité piétonne, services, et parking plus simple. Les acheteurs retraites, fortement représentés, refusent les rues à fort dénivelé.",
      cas_concret:
        "Appartement T3 de 78 m² dans une ancienne villa Belle Époque divisée en copropriété, 1er étage, parquet d'origine, terrasse 14 m² vue puys, DPE D, charges 165 €/mois, à 5 minutes à pied du tram terminus. Estimation : 195 000 € à 218 000 €. Prix probable signature : 207 000 €.",
      facteur_prix:
        "L'accessibilité piétonne. À Royat, plus que partout ailleurs, l'absence de relief et la proximité services se paient cher. Un même bien dans le bas de Royat (relief plat, services à 3 min à pied) vaut 8-12 % de plus que le même bien dans le haut (relief marqué, voiture indispensable).",
    },
    point_essentiel: `Station thermale classée, thermes de Royat-Chamalières à 200 m. Tramway ligne A (arrêt Royat-Chamalières). Architecture Belle Époque des villas de la fin XIXe siècle. À 6 km de Clermont.`,
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
    contenu_vendre: {
      intro: `Aubière est la commune universitaire par excellence de l'agglomération — tramway ligne B terminus sur la commune, Polytech' Clermont et IUT à 300 m du centre. Ce positionnement génère une demande locative étudiante permanente, mais aussi une demande d'achat de cadres et d'enseignants-chercheurs. Les studios et T2 s'y vendent vite, les grandes surfaces moins.`,
      profil_vendeur: `Investisseurs locatifs qui arbitrent leur portefeuille, salariés des grandes entreprises de la ZA des Béalières qui déménagent.`,
      timing_conseil: `Janvier-mars est la fenêtre idéale : les parents d'étudiants commencent à chercher pour la rentrée suivante, les acquéreurs investisseurs préparent leurs achats.`,
      argument_cle: `Tramway ligne B terminus, campus universitaire à pied — rendement locatif parmi les plus stables de l'agglomération (demande étudiante continue 9 mois/an).`,
      piege_local: `Les vacances d'été créent une vacance locative de 2 à 3 mois sur les petites surfaces étudiantes. Intégrer ce point dans le calcul de rentabilité pour les acheteurs investisseurs.`,
    },
    contenu_estimation: {
      intro: `Estimer à Aubière demande de distinguer deux marchés dans la même commune : le locatif étudiant (T1/T2 proches du tram et du campus) et le résidentiel familial (T3/T4 en retrait). Les prix au m² y sont significativement différents — jusqu'à 20 % d'écart.`,
      methode_locale: `Nos références DVF distinguent systématiquement les deux segments. Un T1 de 25 m² proche tram n'a pas la même valeur au m² qu'un T4 de 90 m² en pavillon.`,
      cas_concret: `T2 de 38 m², 2e étage, DPE D, 200 m du tramway, cuisine équipée : fourchette entre 72 000 et 82 000 €.`,
      facteur_prix: `La distance à l'arrêt de tramway est le facteur no.1 sur les petites surfaces à Aubière — chaque 100 m supplémentaire représente environ 2 % de valeur en moins.`,
    },
    point_essentiel: `Tramway ligne B terminus (arrêt Université). Campus Polytech' Clermont et IUT à 300 m. 10 000 habitants. Zone d'activités Les Béalières. Bon rapport qualité-prix pour les investisseurs locatifs.`,
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
    contenu_vendre: {
      intro: `Ceyrat est la commune de la "carte postale" de Clermont : vue sur le puy de Dôme, paysage volcanique préservé, calme absolu, maisons avec terrain. L'acheteur type est un cadre supérieur ou chef d'entreprise qui assume de faire 15 minutes de voiture vers Clermont. Ce marché fonctionne bien sur les biens de qualité et médiocrement sur les produits standard.`,
      profil_vendeur: `Propriétaires retraités qui partent vers le centre ou les services, ou couples dont les enfants ont grandi.`,
      timing_conseil: `Printemps indispensable — la vue sur les Puys sans brume est l'argument no.1. Une vente en hiver brumeux sous-valorise systématiquement les biens avec vue.`,
      argument_cle: `Vue sur la chaîne des Puys classée UNESCO, tranquillité absolue, terrain arboré — attributs impossibles à trouver en milieu urbain.`,
      piege_local: `L'absence totale de transport collectif est rédhibitoire pour les non-automobilistes. Cibler exclusivement les acquéreurs avec deux voitures — pas la peine de faire visiter à des personnes dépendantes des transports.`,
    },
    contenu_estimation: {
      intro: `La vue détermine tout à Ceyrat. Deux maisons identiques en surface et état peuvent varier de 20 à 35 % selon que l'on voit le puy de Dôme ou le bâtiment voisin. Aucune estimation sérieuse ne peut faire l'impasse sur cet audit visuel préalable.`,
      methode_locale: `Nous visitons systématiquement en journée, par beau temps, pour évaluer la qualité de la vue depuis chaque pièce principale. C'est le premier poste de notre grille d'analyse à Ceyrat.`,
      cas_concret: `Maison de 125 m², terrain 600 m², vue Puys dégagée, DPE D, garage double : fourchette entre 368 000 et 415 000 €.`,
      facteur_prix: `La vue sur la chaîne des Puys est le facteur no.1 absolu à Ceyrat — avant la surface, l'état ou le DPE.`,
    },
    point_essentiel: `Village résidentiel perché dans les Puys, à 8 km de Clermont. Vue sur la chaîne des volcans et la plaine. Pas de transport en commun — voiture indispensable. Maisons avec terrain uniquement.`,
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
    contenu_vendre: {
      intro: `Lempdes offre le meilleur ratio prix/accès de l'est clermontois. À 8 km de Clermont-Ferrand, avec la zone d'activités Les Portes de Thiers et un tissu résidentiel principalement pavillonnaire, la commune attire des familles à budget contraint qui refusent les quartiers nord de Clermont. Vendre ici, c'est vendre de l'espace à prix raisonnable.`,
      profil_vendeur: `Propriétaires qui partent vers Clermont (rapprochement du travail) ou qui "montent" vers une maison plus grande en commune plus verte.`,
      timing_conseil: `Pas de saisonnalité marquée. Les mutations professionnelles vers la zone d'activités alimentent une demande continue.`,
      argument_cle: `Prix 20 à 30 % inférieurs à Clermont pour des maisons avec terrain — rapport espace/prix imbattable dans l'agglomération.`,
      piege_local: `L'absence de tramway est perçue comme un handicap. Préparer un calcul du temps de trajet domicile-travail en voiture pour relativiser ce point.`,
    },
    contenu_estimation: {
      intro: `Lempdes est un marché pavillonnaire où le jardin et le garage font la différence. Les appartements (rares) se valorisent peu — c'est un marché de maisons.`,
      methode_locale: `Nous croisons les DVF lempdinois avec ceux de Pont-du-Château (comparable proche) pour valider les fourchettes.`,
      cas_concret: `Maison de 100 m², terrain 400 m², DPE D, 4 pièces, garage : fourchette entre 198 000 et 222 000 €.`,
      facteur_prix: `La surface du terrain est le premier facteur de prix à Lempdes — un jardin de 600 m² vs 200 m² peut valoir 15 000 à 25 000 € de différence.`,
    },
    point_essentiel: `Commune de 9 000 habitants à l'est, bords de l'Allier. Zone d'activités Les Portes de Thiers. Bus lignes vers Clermont. Pas de tramway. Prix inférieurs de 20-30% à Clermont pour qualité équivalente.`,
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
    contenu_vendre: {
      intro: `Romagnat est le village "verdure" du sud clermontois. Ses 4 000 habitants ont choisi la campagne à 10 minutes de Clermont. Maisons avec terrain, quelques lotissements récents, vue sur les Puys pour les orientations ouest. Un marché calme, avec des acheteurs qui ont fait le choix conscient du véhicule quotidien.`,
      profil_vendeur: `Familles qui grandissent et cherchent plus d'espace, retraités qui quittent le village pour se rapprocher des services.`,
      timing_conseil: `Printemps-été — le cadre verdoyant est mis en valeur. Les photos de jardin en avril-mai sont décisives.`,
      argument_cle: `Calme de village à 10 km du centre de Clermont, maisons avec terrain, école primaire et maternelle sur la commune.`,
      piege_local: `Voiture indispensable — à signaler clairement dans les annonces pour éviter les visites non qualifiées.`,
    },
    contenu_estimation: {
      intro: `À Romagnat, le terrain fait le prix bien plus que la maison elle-même. Un bungalow sur 800 m² peut valoir plus qu'une villa sans jardin.`,
      methode_locale: `Nos DVF locaux sont peu nombreux (village de 4 000 habitants). Nous croisons avec les communes comparables du même secteur (Pérignat-les-Sarliève, La Roche-Blanche).`,
      cas_concret: `Maison de 110 m², terrain 500 m², DPE D, 4 chambres, vue dégagée : fourchette entre 248 000 et 278 000 €.`,
      facteur_prix: `La taille et l'orientation du terrain sont les premiers facteurs de valorisation à Romagnat.`,
    },
    point_essentiel: `Village de 4 000 habitants au sud verdoyant. Accès route de la Baraque (D978). Écoles primaire et maternelle dans le village. Maisons avec terrain, vue sur la plaine de Limagne.`,
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
    contenu_vendre: {
      intro: `Cébazat est la commune pavillonnaire du nord clermontois — 6 000 habitants, tissu résidentiel dense, peu de faste mais beaucoup de pragmatisme. Son marché est stable et alimenté par les salariés de la zone nord (logistique, industrie) et les familles qui veulent leur jardin à prix accessible.`,
      profil_vendeur: `Primo-propriétaires qui revendent après 8 à 12 ans pour accéder à une maison plus grande, retraités qui libèrent du foncier.`,
      timing_conseil: `Mars-mai pour les familles. L'accès bus ligne 2 vers Clermont est un argument à faire figurer dans l'annonce.`,
      argument_cle: `Prix parmi les plus abordables de l'agglomération pour une maison avec jardin, à 15 minutes de voiture du centre de Clermont.`,
      piege_local: `Les maisons des années 1970-1980 ont souvent un DPE E ou F (chauffage fuel ou électrique). Anticiper le sujet avec un devis de rénovation avant mise en vente.`,
    },
    contenu_estimation: {
      intro: `Cébazat est un marché homogène — peu de biens d'exception, peu de biens catastrophiques. Les estimations sont relativement stables et les délais de vente raisonnables sur les biens bien pricés.`,
      methode_locale: `Les références DVF de Cébazat sont suffisantes pour valider une fourchette précise. La commune a assez de transactions annuelles pour des comparables fiables.`,
      cas_concret: `Maison de 95 m², terrain 350 m², DPE E, 3 chambres, garage : fourchette entre 188 000 et 210 000 €.`,
      facteur_prix: `Le DPE est le premier facteur de valorisation à Cébazat — le bâti homogène des années 1970-1990 concentre beaucoup de passoires énergétiques qui pèsent sur les prix.`,
    },
    point_essentiel: `Commune pavillonnaire nord de 6 000 habitants. À 5 km du centre de Clermont. Bus ligne 2 vers le centre. Marché calme majoritairement propriétaires-occupants. Pas de tramway.`,
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
    contenu_vendre: {
      intro: `Gerzat bénéficie depuis 2023 du terminus tramway ligne A (arrêt Gerzat), ce qui a modifié le profil des acheteurs. La commune mixte industrie-résidentiel attire désormais des actifs cherchant un accès direct au centre de Clermont sans voiture. L'impact sur les prix a été sensible : +6 à +9 % sur les biens proches du terminus entre 2021 et 2024.`,
      profil_vendeur: `Propriétaires de longue date qui profitent de la revalorisation post-tramway pour arbitrer.`,
      timing_conseil: `L'argument tramway est neuf — l'utiliser systématiquement en premier dans les annonces et les visites.`,
      argument_cle: `Tramway ligne A terminus Gerzat — connexion directe centre-ville de Clermont en 25 minutes. Plus besoin de voiture pour le quotidien.`,
      piege_local: `Les biens éloignés du terminus (plus de 800 m) ne bénéficient pas de la prime tramway et restent sur les prix pré-tramway. Ne pas les sur-valoriser par amalgame.`,
    },
    contenu_estimation: {
      intro: `L'arrivée du tramway à Gerzat crée deux marchés dans la même commune : les biens proches du terminus (prime de 6 à 9 %) et les biens en retrait (valorisation habituelle). Toute estimation doit situer précisément le bien par rapport à l'arrêt.`,
      methode_locale: `Nous calculons la distance exacte à l'arrêt Gerzat et appliquons une grille de prime décroissante selon la distance.`,
      cas_concret: `T3 de 70 m², 300 m du terminus tramway, DPE D, parking : fourchette entre 138 000 et 152 000 €.`,
      facteur_prix: `La proximité du terminus tramway est le premier facteur de valorisation à Gerzat depuis 2023.`,
    },
    point_essentiel: `Commune nord-est de 8 000 habitants. Zone d'activités, présence industrielle. Bus lignes directes Clermont. Tramway ligne A (arrêt terminus Gerzat) sur la commune depuis 2023.`,
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
    contenu_vendre: {
      intro: `Riom est une ville à part dans l'agglomération : sous-préfecture de 20 000 habitants avec un centre-ville en pierre noire de Volvic d'une richesse architecturale rare, gare SNCF en centre avec ligne directe vers Clermont-Ferrand (15 à 20 minutes). Les acheteurs qui découvrent Riom après avoir cherché à Clermont sont souvent séduits par les prix et le cachet.`,
      profil_vendeur: `Propriétaires de bâtiment ancien qui n'ont plus les moyens d'entretenir, successions, ou actifs qui se rapprochent de Clermont.`,
      timing_conseil: `Le patrimoine architectural de Riom est mis en valeur par beau temps — éviter les visites en période brumeuse ou pluvieuse.`,
      argument_cle: `Centre historique classé en pierre de Volvic, gare SNCF directe Clermont (15-20 min), prix 35 à 45 % inférieurs à Clermont-Ferrand pour surface et état comparables.`,
      piege_local: `Le bâti ancien (XVe-XVIIIe siècles) en centre-ville cache souvent des travaux importants : charpente, humidité, électricité ancienne. Un audit technique avant estimation est fortement recommandé.`,
    },
    contenu_estimation: {
      intro: `Estimer à Riom demande de distinguer le centre ancien (bâti en pierre noire, cachet exceptionnel mais travaux lourds potentiels) de la périphérie pavillonnaire (constructions récentes, état courant). Les prix au m² peuvent varier du simple au double entre ces deux segments.`,
      methode_locale: `Nous distinguons systématiquement les deux segments. Pour le centre ancien, nous appliquons une grille travaux spécifique basée sur les coûts de rénovation de bâti en pierre de Volvic.`,
      cas_concret: `Maison de ville de 130 m² en centre ancien, pierre noire, à rénover (DPE F), jardin 80 m² : fourchette entre 142 000 et 168 000 €.`,
      facteur_prix: `L'état structurel du bâti est le facteur no.1 à Riom pour le centre ancien — avant la surface ou l'emplacement.`,
    },
    point_essentiel: `Sous-préfecture du Puy-de-Dôme, 20 000 habitants à 15 km nord de Clermont. Gare SNCF en centre-ville (ligne Clermont-Vichy). Patrimoine architectural exceptionnel en pierre noire de Volvic.`,
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
    contenu_vendre: {
      intro: `Châtel-Guyon est une station thermale à double visage : les résidents permanents (6 000 habitants) et les curistes-résidents secondaires. Ces deux marchés coexistent et l'acheteur peut être très différent d'une vente à l'autre. Les biens d'architecte de la Belle Époque proches des thermes se vendent à des budgets parisiens ou lyonnais — les pavillons périphériques restent sur un marché local.`,
      profil_vendeur: `Retraités qui quittent la station pour des raisons de santé ou de famille, ou propriétaires de résidences secondaires qui arbitrent.`,
      timing_conseil: `Printemps et été — la saison thermale (mai-septembre) active la demande de résidences secondaires. La clientèle extra-locale est présente à cette période.`,
      argument_cle: `Route nationale D2009 directe Clermont-Ferrand (30 min), thermes réputés, architecture Belle Époque — pour les retraités cherchant qualité de vie et santé.`,
      piege_local: `Hors saison thermale, la vie commerciale est réduite. Certains commerces ferment l'hiver. À mentionner proactivement aux acheteurs résidents permanents.`,
    },
    contenu_estimation: {
      intro: `Deux marchés à Châtel-Guyon : les villas Belle Époque (marché atypique, acheteurs patrimoniaux) et le résidentiel courant (marché local comparable à Riom). L'estimation d'une villa de caractère exige une méthodologie spécifique.`,
      methode_locale: `Pour les villas Belle Époque, nous utilisons une approche hédoniste qui valorise séparément le foncier, le bâti et le cachet architectural. Pour le résidentiel courant, référentiel DVF standard.`,
      cas_concret: `Villa Belle Époque de 180 m², terrain 800 m², rénovée, vue thermes : fourchette entre 285 000 et 335 000 €.`,
      facteur_prix: `Le cachet architectural (Belle Époque vs courant) est le premier déterminant de valeur pour les villas de Châtel-Guyon.`,
    },
    point_essentiel: `Station thermale à 20 km de Clermont. Thermes de Châtel-Guyon (groupe Valvital). Route nationale D2009 directe vers Clermont (30 min). Architecture Belle Époque, résidences secondaires fréquentes.`,
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
    contenu_vendre: {
      intro: `Pérignat-lès-Sarliève est la commune premium discrète du sud-est clermontois. Ses 2 500 habitants ont une adresse résidentielle de qualité, avec vue sur les volcans, accès autoroute A75 à 2 km, et calme absolu. Une clientèle de cadres et de professions libérales en fait sa clientèle type. Les biens de qualité partent vite et bien.`,
      profil_vendeur: `Cadres qui déménagent suite à mutation professionnelle, couples dont les enfants ont quitté le foyer.`,
      timing_conseil: `Printemps — les jardins et la vue sur les Puys sont en pleine forme. Les acheteurs de ce profil visitent surtout le samedi matin.`,
      argument_cle: `Accès autoroute A75 à 2 km, vue sur les volcans, calme absolu, maisons avec terrain — le profil idéal pour les cadres avec famille.`,
      piege_local: `Pas de transports collectifs — à mentionner dès le premier contact pour qualifier les acheteurs réellement autonomes en voiture.`,
    },
    contenu_estimation: {
      intro: `Pérignat-lès-Sarliève est un marché premium de niche. Les DVF locaux sont rares (peu de transactions par an) et peuvent mal représenter la fourchette réelle. Nous élargissons nos références à Ceyrat et Romagnat pour valider les estimations.`,
      methode_locale: `Nous appliquons une prime "vue volcans" et une prime "autoroute proche" dans notre grille. Ces deux attributs sont mesurables et vérifiables.`,
      cas_concret: `Maison de 140 m², terrain 700 m², DPE C (construction 2008), vue volcans, garage double : fourchette entre 348 000 et 395 000 €.`,
      facteur_prix: `La qualité et l'ampleur de la vue sur les volcans est le premier facteur de valorisation à Pérignat — un bien sans vue se valorise comme Romagnat.`,
    },
    point_essentiel: `Commune de 2 500 habitants au sud-est. Site archéologique gaulois du Puy de Sarliève. Accès autoroute A75 à 2 km. Environnement calme, maisons avec jardin, vue sur les volcans.`,
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
    contenu_vendre: {
      intro: `Durtol est le village "perché et panoramique" de l'ouest clermontois. Ses 2 000 habitants ont fait le choix radical du calme et de la vue — sur la plaine de Limagne et les Puys — en échange d'une dépendance totale à la voiture. Le marché est confidentiel, les mutations rares, et chaque vente est un événement. Les biens avec vue se valorisent exceptionnellement.`,
      profil_vendeur: `Retraités qui descendent vers la plaine pour se rapprocher des services médicaux, ou propriétaires de résidences secondaires.`,
      timing_conseil: `Été indispensable — la vue panoramique sur la plaine par beau temps est l'argument no.1. Ne jamais faire visiter par temps de brouillard.`,
      argument_cle: `Vue panoramique exceptionnelle sur la plaine de Limagne et les Puys. Forêt domaniale à 500 m. Calme absolu — le village le plus tranquille de l'agglomération.`,
      piege_local: `La route d'accès est en lacets — non accessible pour des personnes à mobilité réduite. Un acheteur senior doit être prévenu de cette contrainte physique avant de faire le déplacement.`,
    },
    contenu_estimation: {
      intro: `Estimer à Durtol est particulièrement complexe : les transactions sont rares (moins de 10 par an), les biens tous différents, et la vue fait une différence abyssale. Nous utilisons des références comparatives nationales (villages perchés avec vue, Cantal, Puy-de-Dôme voisin) quand les DVF locaux sont insuffisants.`,
      methode_locale: `La vue est évaluée sur 3 niveaux : vue totale Puys + plaine (prime max), vue partielle (prime modérée), vue obstruée (prix standard). Ce seul critère peut représenter 40 000 à 80 000 € d'écart.`,
      cas_concret: `Maison de 120 m², terrain 900 m², vue panoramique totale, DPE D, garage : fourchette entre 295 000 et 345 000 €.`,
      facteur_prix: `La vue panoramique est le facteur de valorisation absolu à Durtol — sans vue, le bien se valorise comme un bien rural ordinaire.`,
    },
    point_essentiel: `Village perché à l'ouest de Clermont (2 000 habitants). Vue panoramique sur la plaine et les Puys. Forêt domaniale à 500 m. Pas de transport collectif — voiture obligatoire.`,
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
    contenu_vendre: {
      intro: `Pont-du-Château bénéficie d'une double attractivité : la gare SNCF en centre-ville (ligne Clermont-Thiers, 15 minutes pour Clermont) et les bords de l'Allier pour les amateurs de nature et de loisirs nautiques. Ses 11 000 habitants font de la commune un marché intermédiaire dynamique, ni trop calme ni trop dense. Les maisons avec jardin partent bien.`,
      profil_vendeur: `Actifs qui se rapprochent de Clermont suite à une mutation ou un changement de situation familiale.`,
      timing_conseil: `Mars-juin — les bords de l'Allier et les jardins sont à leur avantage. La gare est un argument toute l'année.`,
      argument_cle: `Gare SNCF en centre-ville — 15 minutes pour Clermont en train. Marché hebdomadaire le vendredi. Bords de l'Allier pour les loisirs.`,
      piege_local: `Le risque inondation sur les bords de l'Allier est une contrainte réglementaire (PPRI) pour certains biens. Vérifier le zonage avant de positionner le prix.`,
    },
    contenu_estimation: {
      intro: `L'estimation à Pont-du-Château intègre deux variables importantes : la proximité de la gare (prime de 5 à 8 % dans un rayon de 500 m) et le zonage PPRI pour les biens proches de l'Allier (décote potentielle de 8 à 15 % en zone rouge).`,
      methode_locale: `Nous consultons le Plan de Prévention du Risque Inondation (PPRI) systématiquement pour les biens à moins de 800 m de l'Allier.`,
      cas_concret: `Maison de 105 m², terrain 350 m², hors PPRI, DPE D, 500 m gare : fourchette entre 218 000 et 242 000 €.`,
      facteur_prix: `La distance à la gare SNCF et le zonage PPRI sont les deux premiers facteurs de valorisation à Pont-du-Château.`,
    },
    point_essentiel: `Commune de 11 000 habitants sur les bords de l'Allier, à 10 km est de Clermont. Gare SNCF (ligne Clermont-Thiers, 15 min en train). Centre historique, marché hebdomadaire le vendredi.`,
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
