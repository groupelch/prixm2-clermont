// data/articles.ts — Source de vérité du blog prixm² Clermont-Ferrand
// Chaque article : ~800-1500 mots, ton expert, factuel, CTA discret en fin de contenu.

export type ArticleTheme =
  | "vendeur"
  | "acheteur"
  | "investissement"
  | "location"
  | "marche";

export type AuteurId = "equipe" | "louis" | "expert";

export interface Auteur {
  id: AuteurId;
  nom: string;
  titre: string;
  initiales: string;
}

export const AUTEURS: Record<AuteurId, Auteur> = {
  equipe: {
    id: "equipe",
    nom: "L'équipe CBF Conseils",
    titre: "Experts immobiliers Clermont-Ferrand",
    initiales: "CBF",
  },
  louis: {
    id: "louis",
    nom: "Louis Combret",
    titre: "Directeur CBF Conseils",
    initiales: "LC",
  },
  expert: {
    id: "expert",
    nom: "Équipe Data prixm²",
    titre: "Analyse des données DVF & marché",
    initiales: "PM",
  },
};

export interface Article {
  slug: string;
  title: string;
  description: string; // 130-160 caractères
  theme: ArticleTheme;
  datePublished: string; // ISO YYYY-MM-DD
  readTime: number; // minutes
  featured: boolean;
  /** Auteur de l'article — si non précisé, fallback selon le thème. */
  auteur?: AuteurId;
  /**
   * Slugs des quartiers spécifiquement couverts par cet article.
   * Utilisé pour le maillage interne (getArticlesForQuartier).
   * Si vide/absent, l'article est généraliste.
   */
  quartiers?: string[];
  /** HTML riche : h2/h3, p, ul/li, strong, em. Pas de <html>/<body>. */
  content: string;
}

/**
 * Renvoie l'auteur d'un article. Si pas explicite, fallback selon le thème :
 * - marche / investissement → Équipe Data prixm²
 * - vendeur / location / acheteur → L'équipe CBF Conseils
 * - articles featured "stratégiques" → Louis Combret
 */
export function getArticleAuteur(article: Article): Auteur {
  if (article.auteur) return AUTEURS[article.auteur];
  if (article.theme === "marche" || article.theme === "investissement") {
    return AUTEURS.expert;
  }
  return AUTEURS.equipe;
}

const CTA = (qOuLien: string) => `
<div class="article-cta">
  <p>Pour une estimation précise ${qOuLien}, <strong>CBF Conseils analyse votre bien gratuitement</strong>, en croisant les données DVF, l'expertise terrain et les ventes récentes — réponse sous 48 h.</p>
  <p><a href="/estimation">Obtenir mon estimation gratuite →</a></p>
</div>`;

export const articles: Article[] = [
  // ---------------------------------------------------------------------------
  // 1. Marché global
  // ---------------------------------------------------------------------------
  {
    slug: "prix-immobilier-clermont-ferrand-2025-analyse-quartier",
    title: "Prix immobilier Clermont-Ferrand 2026 : analyse complète par quartier",
    description:
      "Le panorama complet des prix m² par quartier à Clermont-Ferrand en 2026 : Jaude, Montferrand, Cézeaux, Beaumont, Chamalières. Données, écarts, dynamique.",
    theme: "marche",
    datePublished: "2025-04-12",
    readTime: 9,
    featured: true,
    auteur: "louis",
    content: `
<p>Le marché immobilier clermontois sort d'une année 2024 de correction. Après les hausses fortes de 2021-2022, les prix se sont stabilisés sur la majorité des quartiers, avec une légère décote (-2 à -4 %) sur les biens énergivores. Tour d'horizon des grandes lignes 2025.</p>

<h2>Le prix médian à Clermont-Ferrand en 2025</h2>
<p>Le prix moyen au mètre carré toutes catégories confondues s'établit autour de <strong>2 280 €/m²</strong> pour un appartement, dans une fourchette qui va de 1 650 €/m² (quartiers nord, biens à rénover) à 3 200 €/m² (Jaude, Delille, Montferrand cœur historique pour les biens d'exception). Pour les maisons, on observe une dispersion encore plus large : de 2 100 €/m² dans les quartiers populaires à plus de 3 800 €/m² dans les villas haut de gamme de Chamalières ou Royat.</p>

<h2>Les quartiers premium : Jaude, Delille, Montferrand</h2>
<p><strong>Jaude</strong> reste la référence : 2 950 €/m² en moyenne, avec des transactions au-delà de 3 500 €/m² pour les biens haussmanniens parfaitement rénovés rue Blatin ou avenue Julien. La proximité immédiate des commerces, la rareté de l'offre et le prestige adresse maintiennent les prix.</p>
<p><strong>Delille</strong>, prolongement bourgeois de Jaude, oscille entre 2 700 et 3 100 €/m². Le marché y est particulièrement liquide : moins de 90 jours de délai moyen de vente sur les biens correctement positionnés.</p>
<p><strong>Montferrand</strong> bénéficie d'une dynamique inédite. La rénovation du centre historique, les ventes médiévales restaurées, le tram, et l'attrait des familles séduites par le cachet : on observe une revalorisation progressive (+12 % sur 5 ans) qui met le secteur autour de 2 500 €/m².</p>

<h2>Les quartiers étudiants et hospitaliers : Cézeaux, Saint-Jacques</h2>
<p>Les <strong>Cézeaux</strong> (campus universitaire) tirent leur valeur de la demande locative continue. Les studios s'y vendent autour de 2 200-2 400 €/m², avec un rendement brut moyen de 5,5 à 6 %. <strong>Saint-Jacques</strong>, dominé par le CHU et la fac de médecine, offre un profil similaire : 2 300 €/m² en moyenne, demande locative très soutenue (internes, soignants).</p>

<h2>La périphérie résidentielle : Beaumont, Chamalières, Aubière</h2>
<p><strong>Chamalières</strong> reste la commune la plus chère de l'agglomération : 3 200 à 3 600 €/m² dans le secteur du parc Bargoin, avec des transactions de villas dépassant 800 000 € en 2024. <strong>Royat</strong> suit la même dynamique. <strong>Beaumont</strong> et <strong>Aubière</strong>, plus accessibles, oscillent entre 2 500 et 2 800 €/m² — le rapport qualité/prix y reste excellent pour des familles cherchant calme, écoles et proximité Clermont.</p>

<h2>Les quartiers en transition : La Pardieu, Brézet, Croix-de-Neyrat</h2>
<p>Ces secteurs concentrent les opportunités. <strong>La Pardieu</strong> profite du tram et de la zone tertiaire (Michelin, Limagrain) : prix moyen 2 100 €/m² avec un potentiel de revalorisation. <strong>Brézet</strong> et <strong>Croix-de-Neyrat</strong> restent en dessous de 1 900 €/m² — ces secteurs intéressent les investisseurs aguerris, mais demandent une analyse fine du voisinage rue par rue.</p>

<h2>Les tendances 2025 à surveiller</h2>
<ul>
  <li><strong>L'écart DPE</strong> se creuse : un bien classé F ou G subit aujourd'hui une décote de 8 à 15 % par rapport à un équivalent classé C.</li>
  <li><strong>Le délai de vente</strong> s'allonge sur les biens mal pricés : la médiane est de 95 jours sur les biens bien positionnés, mais grimpe à 180-220 jours sur les biens surévalués.</li>
  <li><strong>Le marché des maisons</strong> avec extérieur reste tendu : pénurie d'offre dans les communes recherchées, plusieurs offres dès la mise en vente.</li>
  <li><strong>Le neuf</strong> souffre : la production a chuté, les programmes restants se vendent à des prix élevés (3 500-4 200 €/m²) qui peinent à trouver preneur.</li>
</ul>

<h2>Acheter, vendre, attendre ?</h2>
<p>Pour un vendeur, la fenêtre 2025 est correcte si le bien est correctement valorisé et bien diagnostiqué (DPE). Pour un acheteur, c'est un retour de marge de négociation après plusieurs années de tension : 3 à 7 % en moyenne. Les investisseurs locatifs trouveront du rendement dans les secteurs étudiants et hospitaliers, à condition de bien sélectionner l'adresse et la copropriété.</p>

${CTA("dans votre quartier")}
`,
  },

  // 2. Estimation
  {
    slug: "estimer-appartement-clermont-ferrand-5-criteres",
    title: "Comment estimer son appartement à Clermont-Ferrand : les 5 critères qui font la différence",
    description:
      "Surface, étage, DPE, exposition, copropriété : les 5 critères qui font varier de 20 % le prix de votre appartement à Clermont-Ferrand. Méthode d'expert.",
    theme: "vendeur",
    datePublished: "2025-04-08",
    readTime: 7,
    featured: true,
    content: `
<p>Estimer un appartement à Clermont-Ferrand ne se résume pas à multiplier la surface par un prix moyen au mètre carré. Entre deux biens identiques sur le papier, on peut observer 20 à 25 % d'écart de prix réel, simplement parce qu'un critère a été sous-évalué ou ignoré. Voici les 5 critères qui font la différence.</p>

<h2>1. La surface utile (et pas seulement la surface Carrez)</h2>
<p>La loi Carrez exige le mesurage des surfaces de plancher au-delà de 1,80 m de hauteur sous plafond. Mais à Clermont, particulièrement dans les immeubles anciens du centre, la surface "utile" effective compte autant que la surface Carrez : un balcon de 6 m² couvert et exposé sud peut valoriser un appartement de 5 à 8 %, une terrasse de 12 m² peut représenter 12 à 18 %.</p>
<p>De même, la "surface annexe" (cave, parking, grenier) est déterminante. À Jaude, une cave saine et sèche se monétise autour de 6 000 à 9 000 €. Un parking en sous-sol vaut 12 000 à 18 000 € selon le secteur — Delille étant le plus cher.</p>

<h2>2. L'étage et son couple ascenseur</h2>
<p>C'est le critère le plus souvent sous-estimé. Un T3 au 3e sans ascenseur dans un immeuble haussmannien de la rue Pascal vaut significativement moins qu'un T3 équivalent au 2e avec ascenseur : -5 à -8 %. À l'inverse, un dernier étage avec ascenseur, lumineux, exposé sud, peut bénéficier d'une prime de +6 à +10 %.</p>
<p>La règle clermontoise : à partir du 3e étage, l'absence d'ascenseur devient pénalisante (acheteurs seniors écartés, jeunes parents poussette, etc.). La présence d'un ascenseur sur un dernier étage déclenche au contraire une plus-value claire.</p>

<h2>3. Le DPE — le critère qui a le plus changé en 5 ans</h2>
<p>Aujourd'hui, le DPE n'est plus un détail : c'est un critère structurant. Sur le marché clermontois 2025 :</p>
<ul>
  <li>Un bien classé <strong>A ou B</strong> se vend en moyenne 3 à 5 % au-dessus du prix médian.</li>
  <li>Un bien <strong>C ou D</strong> est dans la médiane.</li>
  <li>Un bien <strong>E</strong> subit une décote de 4 à 7 %.</li>
  <li>Un bien <strong>F ou G</strong> est décoté de 8 à 15 %, avec en plus un risque d'interdiction progressive de location.</li>
</ul>
<p>L'audit énergétique obligatoire (depuis 2023 pour les F et G) chiffre les travaux nécessaires. Beaucoup d'acheteurs négocient en intégrant directement ce montant.</p>

<h2>4. L'exposition et la luminosité</h2>
<p>Sur des immeubles anciens du centre clermontois, l'exposition est un facteur lourd. Un appartement traversant Est-Ouest ou Sud peut valoir 4 à 7 % de plus qu'un mono-orienté Nord. La vue (sur le parc Lecoq, sur la cathédrale, sur le puy de Dôme) ajoute encore : une vue dégagée vaut +3 à +5 %, une vue bouchée par un mur à 4 m peut faire perdre autant.</p>
<p>Astuce : si le bien est mal exposé, ne pas trop chercher à compenser sur le prix — préférer un argumentaire honnête et un prix raisonnable. Les acheteurs visitent en plein jour, ils voient.</p>

<h2>5. La santé de la copropriété</h2>
<p>Souvent ignoré dans l'estimation, c'est pourtant un sujet majeur en 2025. Les acheteurs demandent désormais systématiquement :</p>
<ul>
  <li>Le carnet d'entretien et le PV des 3 dernières AG.</li>
  <li>Le montant des charges annuelles (au-delà de 35 €/m²/an, c'est un signal).</li>
  <li>Les travaux votés ou à voter (ravalement, ascenseur, isolation).</li>
  <li>L'existence de procédures (impayés, sinistres).</li>
</ul>
<p>Une copropriété bien tenue (DPE collectif correct, fonds travaux abondé, charges raisonnables) ajoute une vraie valeur. À l'inverse, une copro avec procédure en cours peut amputer le prix de 5 à 10 %.</p>

<h2>Synthèse : la méthode CBF Conseils</h2>
<p>Notre méthode d'estimation croise toujours trois sources : la base DVF (prix de vente réels notariés), nos propres ventes récentes dans le micro-secteur, et l'expertise terrain. Une estimation sérieuse à Clermont demande en moyenne 60 à 90 minutes de visite, suivies d'une analyse documentaire (titre, règlement de copropriété, dernières AG, diagnostics).</p>
<p>Les estimations en ligne instantanées peuvent donner un ordre de grandeur. Mais pour un bien que vous voulez vraiment vendre au juste prix, sans perdre de temps ni d'argent, l'expertise humaine reste irremplaçable.</p>

${CTA("à Clermont-Ferrand")}
`,
  },

  // 3. Jaude vs Delille
  {
    slug: "vendre-jaude-delille-comparaison-2025",
    title: "Vendre à Jaude vs Delille : quel secteur prime en 2026 ?",
    description:
      "Jaude ou Delille à Clermont-Ferrand : quel quartier valorise le mieux votre bien en 2026 ? Comparatif prix, délai, profil acheteur.",
    theme: "vendeur",
    datePublished: "2025-04-04",
    readTime: 6,
    featured: false,
    quartiers: ["clermont-ferrand-jaude", "clermont-ferrand-delille"],
    content: `
<p>Pour beaucoup, Jaude et Delille forment un seul "centre haut de gamme" clermontois. À l'analyse, ce sont pourtant deux marchés bien distincts, avec des dynamiques de prix, des typologies d'acheteurs et des durées de vente différentes. Si vous vendez l'un de vos biens dans cette zone en 2025, voici ce qu'il faut savoir.</p>

<h2>Jaude : la centralité commerciale</h2>
<p>Le secteur Jaude (place de Jaude, rue Blatin haute, rue Ballainvilliers, rue Pascal) est le cœur commerçant et tertiaire. Les prix y restent les plus élevés : <strong>2 950 €/m² en moyenne</strong>, jusqu'à 3 500 €/m² pour les biens haussmanniens parfaitement rénovés.</p>
<p>Profil acheteur : actifs CSP+, dirigeants, investisseurs cherchant un bien locatif premium (location courte durée pour les loueurs, mais à surveiller en termes de réglementation locale). Le délai moyen de vente est court : <strong>75 à 90 jours</strong> sur les biens bien positionnés.</p>

<h2>Delille : le bourgeois résidentiel</h2>
<p>Delille (place Delille, rue Sainte-Rose, avenue Carnot, rue de l'Hôtel-Dieu) est résidentiel, plus calme, prisé des familles établies. Prix moyen : <strong>2 750 à 3 100 €/m²</strong>, avec une dispersion plus faible qu'à Jaude — le marché est ici plus "lisse".</p>
<p>Profil acheteur : familles de cadres, professions libérales (médecins notamment, vu la proximité du CHU), retraités aisés cherchant à rapprocher leur résidence du centre. Délai de vente : <strong>85 à 110 jours</strong>.</p>

<h2>Le critère qui tranche : la nature du bien</h2>
<ul>
  <li>Un <strong>T2 ou T3 lumineux, étage élevé, refait</strong> : Jaude valorise mieux. Demande forte des actifs et investisseurs.</li>
  <li>Un <strong>T4 ou T5 familial avec balcon ou terrasse</strong> : Delille valorise mieux. Les familles paient la prime résidentielle.</li>
  <li>Un <strong>plateau brut à rénover</strong> : Jaude reste plus facile à vendre — le profil "investisseur restaurateur" y est plus présent.</li>
</ul>

<h2>Le piège classique : afficher le même prix</h2>
<p>Beaucoup de vendeurs (et certaines agences) appliquent le même prix au m² entre Jaude et Delille. C'est une erreur. À surface, étage et état équivalents, on observe en réalité 5 à 10 % d'écart selon le micro-secteur. Vendre un T3 familial à Jaude au prix d'un T3 équivalent à Delille, c'est se priver d'une partie de la prime familiale.</p>

<h2>Conclusion</h2>
<p>Jaude et Delille sont deux marchés frères mais distincts. La valorisation optimale d'un bien dépend de la cible : qui peut payer le mieux pour ce type de bien dans ce micro-secteur ? Une analyse rue par rue, avec les ventes réelles des 12 derniers mois, est indispensable pour ne pas se tromper de prix.</p>

${CTA("à Jaude ou Delille")}
`,
  },

  // 4. DPE
  {
    slug: "dpe-immobilier-clermont-decote-bien-classe-f",
    title: "DPE et immobilier à Clermont : combien perd-on sur un bien classé F ?",
    description:
      "DPE F ou G à Clermont-Ferrand : décote, interdiction de louer, négociation. Les chiffres réels du marché clermontois 2026.",
    theme: "vendeur",
    datePublished: "2025-04-02",
    readTime: 7,
    featured: false,
    content: `
<p>Depuis 2023, le DPE n'est plus une simple étiquette : c'est devenu un facteur structurant du prix. À Clermont-Ferrand, la décote sur les biens énergivores s'est accentuée en 2024-2025. Combien perd-on réellement avec un F ou un G ? Et surtout : que faire pour limiter la casse si vous êtes propriétaire de l'un de ces biens ?</p>

<h2>Le calendrier réglementaire : ce que vous devez savoir</h2>
<ul>
  <li><strong>1er janvier 2023</strong> : interdiction de louer les G+ (consommation > 450 kWh/m²/an).</li>
  <li><strong>1er janvier 2025</strong> : interdiction de mettre en location les biens G.</li>
  <li><strong>1er janvier 2028</strong> : interdiction d'étendre aux biens F.</li>
  <li><strong>1er janvier 2034</strong> : interdiction d'étendre aux biens E.</li>
</ul>
<p>Ces dates ne concernent que la location, mais elles influencent fortement le marché de la vente : un investisseur qui ne pourra plus louer un bien dans 3 ans le paie nettement moins cher aujourd'hui.</p>

<h2>La décote réelle observée à Clermont en 2025</h2>
<p>Sur la base de nos observations terrain et des données DVF :</p>
<ul>
  <li><strong>Bien E</strong> : décote de 4 à 7 % par rapport à un équivalent classé C.</li>
  <li><strong>Bien F</strong> : décote de 8 à 12 %.</li>
  <li><strong>Bien G</strong> : décote de 12 à 18 %, voire plus si le bien est en location et que l'acheteur doit gérer la sortie de bail.</li>
</ul>
<p>Concrètement, sur un appartement T3 estimé 220 000 € en classe C, la même configuration en classe F se vend autour de 195 000 €, soit 25 000 € de moins. La même en G : 185 000 €, soit 35 000 € de différence.</p>

<h2>Le coût des travaux : le vrai sujet de négociation</h2>
<p>L'audit énergétique obligatoire chiffre les travaux pour atteindre une classe E (et idéalement C ou mieux). À Clermont, sur un T3 typique des années 60-70, on est généralement sur :</p>
<ul>
  <li>Isolation extérieure (si copro l'autorise) : 15 000 à 30 000 € (quote-part).</li>
  <li>Changement chaudière fioul → pompe à chaleur : 12 000 à 18 000 €.</li>
  <li>Remplacement double vitrage : 5 000 à 10 000 €.</li>
  <li>VMC double flux : 4 000 à 7 000 €.</li>
</ul>
<p>Total moyen pour passer un F en C : <strong>30 000 à 60 000 €</strong>, dont une partie peut être couverte par MaPrimeRénov' et les CEE selon les revenus du nouveau propriétaire.</p>

<h2>Vendre F ou G : trois stratégies</h2>
<h3>Stratégie 1 — Vendre en l'état avec décote assumée</h3>
<p>La plus simple. On affiche un prix qui intègre la décote (idéalement légèrement plus haute que la décote moyenne, pour offrir une marge de négociation). On cible les acheteurs qui ont les ressources pour faire les travaux ou qui rénovent eux-mêmes.</p>

<h3>Stratégie 2 — Faire les travaux avant vente</h3>
<p>Si vos travaux passent le bien en classe C ou mieux, vous récupérez la valeur perdue, voire une prime. Mais attention : compter 4 à 8 mois de chantier en copro, sans certitude que la plus-value couvre les travaux à 100 %. Cette stratégie est rentable surtout si le coût travaux est inférieur à 60 % de la décote théorique.</p>

<h3>Stratégie 3 — Devis travaux remis à l'acheteur</h3>
<p>Astuce souvent gagnante : faire chiffrer précisément les travaux avant la mise en vente, et présenter ce chiffrage à l'acheteur. Cela sécurise sa décision (pas de mauvaise surprise), permet de négocier au juste prix, et raccourcit le délai de vente.</p>

<h2>Conclusion</h2>
<p>À Clermont en 2025, le DPE est devenu un critère de prix aussi lourd que l'étage ou l'exposition. Vendre un bien F ou G demande une stratégie réfléchie. Une mauvaise décision peut coûter 10 à 25 000 € — bien plus que le coût d'une expertise sérieuse en amont.</p>

${CTA("avec un DPE difficile")}
`,
  },

  // 5. Délai de vente
  {
    slug: "duree-vente-clermont-ferrand-quartier-2025",
    title: "Durée de vente à Clermont-Ferrand par quartier : les chiffres réels 2026",
    description:
      "Combien de jours pour vendre un appartement à Clermont en 2026 ? Délais réels par quartier — Jaude, Cézeaux, Aubière, Beaumont. Méthode CBF.",
    theme: "vendeur",
    datePublished: "2025-03-28",
    readTime: 6,
    featured: false,
    content: `
<p>Avant de mettre votre bien en vente à Clermont-Ferrand, savoir combien de temps il faudra pour signer change la stratégie. Tarif d'agence, négociation à venir, anticipation du déménagement : tout dépend de cette durée. Voici les chiffres réels par quartier en 2025.</p>

<h2>La médiane Clermont en 2025 : 95 jours</h2>
<p>Sur l'ensemble de Clermont-Ferrand, la durée médiane entre la mise en vente et le compromis est de <strong>95 jours</strong> en 2025, soit environ 3 mois et 5 jours. Cette médiane masque des écarts importants entre quartiers et entre typologies.</p>

<h2>Les quartiers les plus liquides (vente rapide)</h2>
<ul>
  <li><strong>Jaude</strong> : 75-85 jours médians. Marché tendu sur les T2-T3 lumineux.</li>
  <li><strong>Delille</strong> : 80-95 jours. T4 familial = parfois moins de 60 jours sur de très bons biens.</li>
  <li><strong>Chamalières</strong> : 85-100 jours. Maisons familiales avec extérieur s'arrachent.</li>
  <li><strong>Cézeaux</strong> : 90 jours sur les studios investisseurs.</li>
</ul>

<h2>Les quartiers à délais moyens</h2>
<ul>
  <li><strong>Beaumont, Aubière, Royat</strong> : 100-130 jours. Marché stable, équilibré.</li>
  <li><strong>Montferrand</strong> : 110-140 jours. Cible plus étroite (amateurs de cachet).</li>
  <li><strong>La Pardieu, Brézet</strong> : 120-160 jours selon profil.</li>
</ul>

<h2>Les quartiers où la vente prend du temps</h2>
<ul>
  <li><strong>Croix-de-Neyrat, Champratel</strong> : 150-220 jours. Marché plus discriminant, beaucoup de biens à diagnostics énergétiques difficiles.</li>
  <li><strong>Saint-Jacques (haut)</strong> : 130-170 jours sur les grands appartements à rénover.</li>
</ul>

<h2>Ce qui rallonge un délai au-delà du normal</h2>
<p>Trois facteurs expliquent 80 % des biens "qui n'avancent pas" :</p>
<ol>
  <li><strong>Surévaluation initiale</strong>. Un bien affiché 10 % au-dessus du marché reçoit beaucoup de visites… qui ne débouchent pas. Au bout de 2 mois sans offre, le bien est "brûlé" et on ne récupère plus jamais le prix de départ.</li>
  <li><strong>DPE difficile</strong>. Sur un F ou G, les acheteurs intègrent désormais le coût travaux. Sans préparation, la négociation traîne.</li>
  <li><strong>Photos et présentation faibles</strong>. 90 % des acheteurs filtrent en ligne. Mauvaises photos = pas de visite.</li>
</ol>

<h2>Réduire le délai : la bonne méthode</h2>
<p>Un bien correctement pricé dès le départ, photographié professionnellement, avec dossier diagnostics complet et négociation préparée se vend en 60 à 90 jours sur la majorité des quartiers clermontois. C'est notre méthode chez CBF Conseils, et c'est aussi celle qui maximise le prix final : un bien qui se vend vite se vend cher.</p>

${CTA("dans votre quartier")}
`,
  },

  // 6. Surévaluation
  {
    slug: "surestimer-bien-piege-vendeurs-clermont",
    title: "Surestimer son bien : le piège n°1 des vendeurs clermontois",
    description:
      "Pourquoi surévaluer son bien à Clermont-Ferrand fait perdre 5 à 15 % au prix final, et comment éviter ce piège classique du marché 2026.",
    theme: "vendeur",
    datePublished: "2025-03-22",
    readTime: 5,
    featured: false,
    content: `
<p>"On commence haut, on baisse si ça ne part pas." C'est probablement la phrase la plus coûteuse qu'un vendeur clermontois puisse prononcer. La surévaluation reste, en 2025, le piège n°1 — devant le DPE, devant les photos médiocres, devant la mauvaise saison de mise en vente.</p>

<h2>Le mécanisme : pourquoi ça ne marche pas</h2>
<p>L'idée intuitive est simple : "si j'affiche 10 % de plus, j'aurai une marge de négo". En pratique, voici ce qui se passe sur le marché clermontois 2025 :</p>
<ol>
  <li><strong>Semaines 1-3 (la fenêtre d'or)</strong> : votre bien apparaît en tête des nouvelles annonces. Tous les acheteurs actifs du secteur le voient. Les meilleurs (ceux qui cherchent depuis 2-3 mois, ont leur dossier, savent ce qu'ils veulent) le filtrent par prix. Si vous êtes 10 % au-dessus du marché, ils sautent votre annonce sans la cliquer.</li>
  <li><strong>Mois 1-2</strong> : seuls les "indécis" et les "curieux" visitent. Pas d'offre.</li>
  <li><strong>Mois 3</strong> : votre bien est connu de tous les acheteurs et les agences locales. Il est étiqueté "à problème" — sinon il aurait déjà été vendu.</li>
  <li><strong>Mois 4-6</strong> : vous baissez le prix. Mais maintenant, les nouveaux acheteurs se demandent "pourquoi il ne s'est pas vendu" et vous proposent des offres encore plus basses.</li>
</ol>

<h2>Le chiffre choc : -5 à -15 %</h2>
<p>Sur les biens clermontois mis en vente avec une surévaluation de 10 % en début 2024 et vendus en fin 2024, nous observons un prix final moyen <strong>5 à 15 % en dessous de l'estimation marché initiale</strong>. Pas 5 à 15 % en dessous du prix affiché — en dessous de ce qu'aurait été un prix juste dès le départ.</p>
<p>Concrètement, sur un appartement à 250 000 €, c'est entre 12 500 € et 37 500 € qui partent en fumée. Sans compter les 6 mois de charges, taxes et opportunités perdues.</p>

<h2>Pourquoi c'est si tentant</h2>
<p>Trois raisons psychologiques rendent la surévaluation séduisante :</p>
<ul>
  <li><strong>L'effet d'ancrage</strong>. Le vendeur a une "valeur sentimentale" pour son bien. Il a entendu un voisin parler d'une vente à un certain prix. Il fait monter mentalement.</li>
  <li><strong>La concurrence des agences</strong>. Pour gagner le mandat, certaines agences proposent un prix plus haut que la valeur réelle. Le vendeur choisit l'agence "qui croit le plus en son bien" — alors qu'elle se trompe ou ment volontairement.</li>
  <li><strong>L'idée de la marge de négo</strong>. "Si je veux 250, je mets 270." En réalité, sur un marché où l'acheteur compare 30 annonces, il filtre par prix avant même de voir les photos.</li>
</ul>

<h2>La méthode pour bien fixer le prix</h2>
<ol>
  <li>Faire estimer par <strong>2 experts indépendants</strong> avec accès aux ventes réelles DVF.</li>
  <li>Croiser avec les ventes réelles dans le micro-secteur (rue, immeuble, ascenseur, étage équivalents).</li>
  <li>Intégrer les particularités du bien (DPE, exposition, copropriété) avec un coefficient honnête.</li>
  <li>Définir un prix "marché" et un prix "plancher" (le prix en dessous duquel vous refusez l'offre).</li>
  <li>Afficher le prix marché. Pas plus.</li>
</ol>

<h2>Conclusion</h2>
<p>Vendre vite, c'est vendre cher. Surévaluer, c'est l'inverse : vous transformez votre bien en boulet sur le marché, et vous payez la facture en prix final ET en délai. La meilleure protection : faire faire une estimation sérieuse, et faire confiance aux chiffres, pas aux flatteurs.</p>

${CTA("au juste prix")}
`,
  },

  // 7. Exclu vs multi-mandat
  {
    slug: "vendre-exclusivite-multi-mandat-clermont",
    title: "Vendre en exclusivité ou multi-mandat à Clermont : que choisir ?",
    description:
      "Mandat exclusif ou simple à Clermont-Ferrand : avantages, inconvénients, statistiques de vente. Le choix qui maximise votre prix et raccourcit le délai.",
    theme: "vendeur",
    datePublished: "2025-03-18",
    readTime: 6,
    featured: false,
    content: `
<p>"Si je signe avec plusieurs agences, mon bien est plus visible." C'est l'idée reçue la plus tenace en immobilier — et c'est généralement faux. Voici ce que montrent les données réelles sur le marché clermontois en 2025.</p>

<h2>Les trois types de mandats</h2>
<ul>
  <li><strong>Mandat simple</strong> : vous signez avec plusieurs agences en parallèle. Vous pouvez aussi vendre vous-même.</li>
  <li><strong>Mandat exclusif</strong> : une seule agence est mandatée. Vous ne pouvez pas non plus vendre vous-même.</li>
  <li><strong>Mandat semi-exclusif</strong> : une seule agence, mais vous gardez le droit de vendre vous-même à un acheteur direct.</li>
</ul>

<h2>Les chiffres de l'exclusivité</h2>
<p>Selon les statistiques de la profession (FNAIM, agences locales), à Clermont en 2024-2025 :</p>
<ul>
  <li>Un bien en mandat exclusif se vend en moyenne <strong>20 % plus vite</strong> qu'en mandat simple.</li>
  <li>Le prix de vente final est en moyenne <strong>3 à 5 % plus élevé</strong> en exclusif qu'en multi-mandat équivalent.</li>
  <li>Le taux de signature dans les 6 mois est de 75-80 % en exclusif, contre 55-60 % en simple.</li>
</ul>

<h2>Pourquoi le multi-mandat sous-performe</h2>
<p>Trois raisons, factuelles :</p>
<ol>
  <li><strong>Aucune agence ne s'investit pleinement</strong>. Si l'agence A sait que B et C ont aussi votre mandat, elle priorise ses biens exclusifs. Photos pro reportées, communication minimale, pas de campagne dédiée.</li>
  <li><strong>Risque de prix incohérents</strong>. Si une agence "casse" le prix pour vendre vite, votre bien apparaît à plusieurs prix sur les portails. Les acheteurs y voient un signal d'urgence ou de désorganisation. Décote.</li>
  <li><strong>Pas de stratégie</strong>. Une agence en exclusivité construit un dossier de vente : argumentaire, photos pro, vidéo, plan, diagnostics. En simple, c'est rarement le cas.</li>
</ol>

<h2>Quand le multi-mandat peut faire sens</h2>
<ul>
  <li>Bien très atypique avec une cible géographique très large (rare).</li>
  <li>Vous testez deux agences avec une durée courte (8 semaines) avant de basculer vers la meilleure en exclusivité.</li>
</ul>

<h2>Le bon mandat exclusif : ce qu'il doit contenir</h2>
<p>Si vous signez en exclusif, exigez :</p>
<ul>
  <li>Une <strong>durée de 3 mois maximum</strong>, renouvelable tacitement à votre demande.</li>
  <li>Un engagement de l'agence sur le plan de communication (photos pro, mise en avant portails, mailing acheteurs).</li>
  <li>Des points d'étape réguliers (compte rendu mensuel chiffré).</li>
  <li>Une clause de sortie en cas de manquement (pas de visites au bout de X jours par exemple).</li>
</ul>

<h2>Conclusion</h2>
<p>L'exclusivité n'est pas une faveur faite à l'agence : c'est un contrat où elle s'engage à investir réellement pour vendre votre bien au juste prix dans un délai court. Bien négocié, c'est presque toujours la meilleure option. À Clermont, les vendeurs avisés signent en exclusivité 3 mois, avec une agence qui a une connaissance fine du quartier — pas la première qui passe.</p>

${CTA("dans le bon cadre")}
`,
  },

  // 8. Montferrand vs Jaude
  {
    slug: "prix-m2-montferrand-vs-jaude-decryptage-ecart",
    title: "Prix m² Montferrand vs Jaude : décryptage de l'écart",
    description:
      "Pourquoi Montferrand coûte 15 % de moins que Jaude alors que les biens y sont parfois plus beaux. Analyse de l'écart de prix Clermont 2026.",
    theme: "marche",
    datePublished: "2025-03-12",
    readTime: 6,
    featured: false,
    quartiers: ["clermont-ferrand-montferrand", "clermont-ferrand-jaude"],
    content: `
<p>Quand on visite des immeubles médiévaux entièrement restaurés à Montferrand, et qu'on compare avec des appartements haussmanniens à Jaude, on s'étonne souvent : pourquoi le m² de Montferrand est-il 15 % moins cher ? Décryptage.</p>

<h2>Les chiffres 2025</h2>
<ul>
  <li><strong>Jaude</strong> : 2 950 €/m² médian, jusqu'à 3 500 €/m² sur les biens d'exception.</li>
  <li><strong>Montferrand</strong> : 2 500 €/m² médian, jusqu'à 2 900 €/m² sur les biens médiévaux restaurés.</li>
</ul>
<p>L'écart médian est donc d'environ <strong>15 %</strong> en faveur de Jaude, malgré une qualité architecturale parfois supérieure à Montferrand (immeubles du XVe-XVIe, patrimoine classé).</p>

<h2>Pourquoi cet écart ?</h2>
<h3>1. La centralité commerciale</h3>
<p>Jaude, c'est la place marchande. Le m² intègre la valeur d'usage : être à 5 minutes de tout, sans voiture. Montferrand, plus excentrée, demande tram ou voiture pour rejoindre le centre commerçant. Cette commodité vaut 200 à 400 €/m² aux yeux des acheteurs urbains.</p>

<h3>2. La perception ancienne du quartier</h3>
<p>Montferrand a longtemps été perçu comme "un quartier en difficulté" dans les années 90-2000. La rénovation profonde du quartier dans les années 2010, le passage du tram, la restauration de centaines d'immeubles ont changé la donne. Mais la "prime de marque Jaude" reste plus forte sur le marché — il faut une dizaine d'années pour rattraper une réputation.</p>

<h3>3. La typologie des acheteurs</h3>
<p>Jaude attire des actifs CSP+, des investisseurs locatifs courte durée, des cadres. Montferrand attire plutôt des amateurs de patrimoine, des familles cherchant le cachet, des architectes. Ces deux profils ne sont pas en concurrence — et le profil "actif urbain" est plus nombreux à Clermont.</p>

<h3>4. La rareté ciblée</h3>
<p>À Jaude, il y a très peu de biens en vente : 30-40 par an. À Montferrand, l'offre est plus large (150-200/an), avec une dispersion de qualité. Cette rareté à Jaude pousse mécaniquement les prix.</p>

<h2>L'investissement intelligent : Montferrand</h2>
<p>Pour un acheteur attentif, Montferrand offre un rapport qualité/prix souvent meilleur. Sur 5 ans (2020-2025), les prix Montferrand ont progressé de +12 % vs +6 % à Jaude. La dynamique est claire : Montferrand rattrape progressivement.</p>
<p>Pour un investisseur locatif, Montferrand offre un rendement supérieur (4,5-5 % brut) avec un public locataire stable (familles, jeunes actifs).</p>

<h2>Le piège : confondre les deux</h2>
<p>Vendre un bien Montferrand au prix Jaude, c'est s'assurer un délai de vente très long. Inversement, brader un bien Jaude au prix Montferrand, c'est laisser de l'argent sur la table. Une estimation précise tient compte du quartier réel — pas du quartier rêvé.</p>

${CTA("à Montferrand ou Jaude")}
`,
  },

  // 9. Acheter par profil
  {
    slug: "acheter-clermont-ferrand-2025-quel-quartier-pour-quel-profil",
    title: "Acheter à Clermont-Ferrand en 2026 : quel quartier pour quel profil ?",
    description:
      "Famille, jeune actif, retraité, investisseur : quel quartier de Clermont-Ferrand vous correspond ? Guide expert par profil acheteur 2026.",
    theme: "acheteur",
    datePublished: "2025-04-10",
    readTime: 8,
    featured: true,
    auteur: "louis",
    content: `
<p>Acheter à Clermont-Ferrand, c'est arbitrer entre plus de 30 quartiers et communes — chacun avec son profil, son prix, son mode de vie. Voici notre guide d'orientation par profil acheteur, basé sur les données 2025.</p>

<h2>Le jeune actif (25-35 ans, premier achat)</h2>
<p><strong>Ce que vous cherchez</strong> : un T2-T3 lumineux, proche du tram, avec un budget 150-220 K€.</p>
<p><strong>Quartiers cibles</strong> :</p>
<ul>
  <li><strong>Salins / La Glacière / Carmes</strong> : 2 000-2 300 €/m², proximité tram, vie animée. T2 60 m² autour de 130-150 K€.</li>
  <li><strong>Saint-Jacques (bas)</strong> : 2 200 €/m², proche fac et CHU, idéal pour internes et jeunes professionnels.</li>
  <li><strong>Fontgieve / La Plaine</strong> : 2 100-2 400 €/m², plus calme, bon compromis.</li>
</ul>

<h2>La famille (30-45 ans, 2-3 enfants)</h2>
<p><strong>Ce que vous cherchez</strong> : T4-T5 ou maison, écoles, calme, parking. Budget 280-450 K€.</p>
<p><strong>Quartiers cibles</strong> :</p>
<ul>
  <li><strong>Beaumont</strong> : 2 600-2 800 €/m², écoles réputées, proximité Clermont, marché familial actif.</li>
  <li><strong>Aubière</strong> : 2 400-2 700 €/m², esprit village, bon réseau scolaire, proximité Cézeaux.</li>
  <li><strong>Romagnat / Ceyrat</strong> : 2 400-2 700 €/m², plus résidentiel, idéal pour familles établies.</li>
  <li><strong>Chamalières</strong> : 3 200-3 600 €/m², le haut de gamme familial, environnement verdoyant.</li>
</ul>

<h2>Le cadre / dirigeant (40-55 ans, exigeant)</h2>
<p><strong>Ce que vous cherchez</strong> : centre, prestige, services, parking. Budget 400-700 K€.</p>
<p><strong>Quartiers cibles</strong> :</p>
<ul>
  <li><strong>Delille</strong> : référence bourgeoise, plateau familial 120-150 m² autour de 400-500 K€.</li>
  <li><strong>Jaude</strong> : pour les amateurs de centralité absolue.</li>
  <li><strong>Royat / Chamalières secteur Bargoin</strong> : maisons d'exception 600-1 000 K€.</li>
</ul>

<h2>Le retraité (60+ ans, downsize ou rapprochement)</h2>
<p><strong>Ce que vous cherchez</strong> : T3-T4, ascenseur, commerces à pied, médecin proche.</p>
<p><strong>Quartiers cibles</strong> :</p>
<ul>
  <li><strong>Delille</strong> : commerces, hôpital, calme, immeubles bien tenus.</li>
  <li><strong>Jaude</strong> : pour les actifs encore mobiles.</li>
  <li><strong>Chamalières</strong> : services premium, parc Bargoin.</li>
  <li><strong>Cournon-d'Auvergne, Aubière, Beaumont</strong> : appartements neufs avec ascenseur, parking, à des prix raisonnables.</li>
</ul>

<h2>L'investisseur locatif</h2>
<p><strong>Ce que vous cherchez</strong> : rendement brut 5,5-7 %, demande locative continue.</p>
<p><strong>Quartiers cibles</strong> :</p>
<ul>
  <li><strong>Cézeaux</strong> : campus, demande étudiante, studios à 60-90 K€, loyer 380-450 €.</li>
  <li><strong>Saint-Jacques</strong> : proximité CHU, demande continue (internes, soignants).</li>
  <li><strong>La Pardieu</strong> : tertiaire (Michelin, Limagrain), demande jeune actif.</li>
</ul>

<h2>Le primo-accédant à petit budget (-150 K€)</h2>
<ul>
  <li><strong>Croix-de-Neyrat / Champratel</strong> : T3 70 m² autour de 100-130 K€. Travaux à prévoir, mais rapport surface/prix le meilleur de Clermont.</li>
  <li><strong>Brézet</strong> : 1 700-1 900 €/m², en transformation progressive.</li>
  <li><strong>Communes éloignées (Pont-du-Château, Cournon)</strong> : maisons 90-130 K€ à rénover.</li>
</ul>

<h2>Le bon réflexe avant d'acheter</h2>
<p>Visiter le quartier à plusieurs heures (matin, fin d'aprèm, soir, week-end). Tester le trajet domicile-travail. Vérifier la couverture commerciale, les écoles, les transports. Et surtout : ne pas se fier à une seule source de prix — croiser DVF, agences locales, et conseils d'un expert qui connaît la rue.</p>

${CTA("dans le bon quartier")}
`,
  },

  // 10. Quartiers qui montent
  {
    slug: "5-quartiers-qui-montent-clermont-ferrand-2025",
    title: "Les 5 quartiers qui montent à Clermont-Ferrand (et ceux à éviter)",
    description:
      "Les 5 quartiers qui prennent de la valeur à Clermont-Ferrand en 2026, et 3 secteurs à manier avec précaution. Analyse marché.",
    theme: "acheteur",
    datePublished: "2025-04-06",
    readTime: 7,
    featured: true,
    quartiers: ["clermont-ferrand-la-pardieu", "clermont-ferrand-montferrand", "clermont-ferrand-gare", "chamalieres", "aubiere"],
    content: `
<p>Acheter, c'est aussi parier sur la valeur future. À Clermont-Ferrand, certains quartiers gagnent 2-3 % par an depuis 5 ans, d'autres stagnent. Voici nos 5 secteurs à dynamique forte et 3 à surveiller, fin avril 2025.</p>

<h2>Top 5 : les quartiers en montée</h2>

<h3>1. Montferrand</h3>
<p>+12 % sur 5 ans. La rénovation du quartier médiéval, le tram, l'attrait grandissant des familles cherchant cachet + budget mesuré. Médiane 2 500 €/m² aujourd'hui, encore en marge de Jaude — mais l'écart se réduit chaque année.</p>

<h3>2. La Pardieu</h3>
<p>+9 % sur 5 ans. Tram, zone tertiaire (Michelin, Limagrain), nouveaux programmes immobiliers, école supérieure. La proximité campus Cézeaux + emplois cadres en fait un secteur attractif pour jeunes ménages CSP+.</p>

<h3>3. Salins / Saint-Jacques bas</h3>
<p>+8 % sur 5 ans. Repositionnement du secteur autour de la fac de médecine et du CHU. Beaucoup de rénovations, prix encore raisonnables (2 100-2 300 €/m²).</p>

<h3>4. Côté Blatin / Vallières</h3>
<p>+7 % sur 5 ans. Quartiers résidentiels en bordure de centre, prisés des familles et professionnels. Marché stable, demande continue, prix médians 2 600-2 800 €/m².</p>

<h3>5. Beaumont (haut)</h3>
<p>+6 % sur 5 ans. Ecoles, calme, proximité Clermont. La pression sur les biens familiaux ne faiblit pas — peu d'offre, beaucoup de demande.</p>

<h2>3 secteurs à manier avec précaution</h2>

<h3>1. Croix-de-Neyrat</h3>
<p>Prix bas (1 700 €/m²), mais marché peu liquide. Délais de vente longs, décote DPE forte. Investisseur seulement, et avec analyse rue par rue.</p>

<h3>2. Champratel</h3>
<p>Profil similaire. Le quartier connaît une rénovation urbaine, mais la transformation prendra une décennie. À éviter en premier achat sauf opportunité ciblée.</p>

<h3>3. Brézet</h3>
<p>Marché disparate. Certaines micro-zones sont en montée, d'autres stagnent. Demande absolument une expertise terrain — ne pas se fier au prix moyen.</p>

<h2>Le piège : les "bonnes affaires" trop belles</h2>
<p>Sur les zones à prix bas, méfiance avec les biens annoncés "très bonne affaire". Souvent, on découvre un DPE G, des charges de copro élevées, un voisinage difficile, un règlement de copro restrictif. Le bas prix masque souvent un problème — qui se traduira en décote à la revente.</p>

<h2>Conclusion</h2>
<p>Les meilleures opportunités à Clermont en 2025 ne sont pas les quartiers les moins chers. Ce sont les quartiers en transition (Montferrand, La Pardieu) où le prix actuel ne reflète pas encore la dynamique de fond. Mais comme toujours en immobilier : la rue compte autant que le quartier.</p>

${CTA("dans un quartier d'avenir")}
`,
  },

  // 11. Neuf vs ancien
  {
    slug: "investir-neuf-ancien-clermont-comparatif",
    title: "Investir dans le neuf ou l'ancien à Clermont ? Comparatif complet",
    description:
      "Neuf vs ancien à Clermont-Ferrand : prix, fiscalité, frais, rendement, plus-value. Le comparatif factuel pour décider en 2026.",
    theme: "acheteur",
    datePublished: "2025-03-30",
    readTime: 8,
    featured: false,
    content: `
<p>Acheter à Clermont, c'est presque toujours arbitrer entre du neuf (rare et cher) et de l'ancien (abondant et négociable). Voici un comparatif factuel sur les 5 critères qui comptent vraiment.</p>

<h2>1. Le prix au m²</h2>
<ul>
  <li><strong>Neuf</strong> : 3 600-4 200 €/m² selon programme et secteur. La Pardieu, La Pradelle, Cournon : 3 600-3 900 €/m². Centre Clermont (rare) : 4 200 €/m²+.</li>
  <li><strong>Ancien</strong> : 1 700-3 200 €/m² selon quartier. Médiane 2 280 €/m².</li>
</ul>
<p>Écart : le neuf est 35 à 60 % plus cher que l'ancien équivalent. Mais ce prix intègre les performances énergétiques, les normes RT2020, les garanties.</p>

<h2>2. Les frais d'acquisition</h2>
<ul>
  <li><strong>Neuf</strong> : frais de notaire réduits (2,5-3 % du prix).</li>
  <li><strong>Ancien</strong> : frais de notaire pleins (7-8 %).</li>
</ul>
<p>Sur un bien à 250 000 €, l'écart est de 12 000 €. À ne pas négliger dans le calcul total.</p>

<h2>3. Les charges et travaux à venir</h2>
<ul>
  <li><strong>Neuf</strong> : pas de travaux à prévoir avant 10-15 ans. Charges copro modérées les premières années (puis hausse).</li>
  <li><strong>Ancien</strong> : travaux fréquents (DPE, ravalement, ascenseur). Charges souvent plus élevées (35-50 €/m²/an vs 20-30 dans le neuf).</li>
</ul>

<h2>4. La fiscalité</h2>
<ul>
  <li><strong>Neuf en investissement locatif</strong> : Pinel (sur les programmes éligibles, fin progressive 2024-2025), Loueur Meublé Non Professionnel (LMNP) très avantageux fiscalement.</li>
  <li><strong>Ancien</strong> : Denormandie (sur centre-ville avec travaux), déficit foncier (jusqu'à 21 400 €/an si gros travaux), LMNP également possible.</li>
</ul>
<p>Pour un investisseur, le déficit foncier dans l'ancien à rénover est souvent plus puissant que le Pinel dans le neuf.</p>

<h2>5. La revente et la plus-value</h2>
<p>C'est le point le plus important.</p>
<ul>
  <li><strong>Neuf</strong> : décote de 10-15 % à la revente (le bien devient "ancien"). Sur 10 ans, la plus-value moyenne reste positive mais modérée.</li>
  <li><strong>Ancien bien situé</strong> : plus-value moyenne 2-3 %/an sur les bons quartiers de Clermont (Jaude, Delille, Chamalières). Sur 10 ans, +25 à +35 %.</li>
</ul>

<h2>Conclusion : qui doit choisir quoi ?</h2>
<p><strong>Le neuf est pertinent si</strong> : vous voulez du clé en main, sans souci, avec la fiscalité Pinel/LMNP — et si vous comptez garder 15 ans+. Cible : investisseurs passifs, primo-investisseurs.</p>
<p><strong>L'ancien est pertinent si</strong> : vous cherchez la plus-value, vous savez piloter (ou faire piloter) des travaux, vous visez un bien dans un quartier établi (Jaude, Delille, Chamalières, Beaumont). Cible : investisseurs actifs, résidents principaux.</p>
<p>À Clermont, l'ancien bien situé reste statistiquement plus rentable sur 10 ans. Mais le neuf reste pertinent dans des cas précis (LMNP en résidence services, programme de qualité bien situé).</p>

${CTA("neuf ou ancien")}
`,
  },

  // 12. Chamalières vs Clermont
  {
    slug: "vivre-chamalieres-vs-clermont-analyse",
    title: "Vivre à Chamalières vs rester à Clermont : analyse prix/qualité de vie",
    description:
      "Chamalières ou Clermont-Ferrand centre : où vivre en 2026 ? Comparaison prix m², écoles, services, mobilité, fiscalité.",
    theme: "acheteur",
    datePublished: "2025-03-25",
    readTime: 6,
    featured: false,
    quartiers: ["chamalieres", "clermont-ferrand-jaude", "beaumont"],
    content: `
<p>Chamalières et Clermont sont géographiquement collées, mais sociologiquement différentes. Pour les familles aisées de l'agglomération, le choix entre les deux n'est pas anodin. Voici les éléments factuels pour décider.</p>

<h2>Le prix au m²</h2>
<ul>
  <li><strong>Chamalières</strong> : 3 200-3 600 €/m² médian sur les bons secteurs. 4 000+ €/m² pour les villas exceptionnelles secteur Bargoin.</li>
  <li><strong>Clermont centre haut de gamme (Delille, Jaude)</strong> : 2 750-3 100 €/m².</li>
</ul>
<p>Écart : Chamalières est environ 15-20 % plus cher en moyenne. Sur une maison familiale 130 m², la différence dépasse souvent 80 000 €.</p>

<h2>Les écoles</h2>
<p>Chamalières dispose de plusieurs écoles primaires réputées et du collège-lycée Massillon (privé), parmi les meilleurs établissements de l'agglomération. Clermont a aussi de très bons collèges-lycées (Massillon-Clermont, Jeanne d'Arc, Sidoine Apollinaire), mais la concurrence est plus dispersée.</p>

<h2>La fiscalité locale</h2>
<p>La taxe foncière est sensiblement plus élevée à Clermont qu'à Chamalières (différence pouvant atteindre 200-400 € par an sur une maison équivalente). Sur 20 ans, ce n'est pas anodin.</p>

<h2>Les services et commerces</h2>
<p>Chamalières offre une vie de centre-bourg (boulangeries, restaurants, marché) avec un cachet bourgeois. Clermont centre offre une amplitude commerciale bien plus large (Jaude, rue Pascal, rue Blatin). Pour les retraités ou familles cherchant le quotidien à pied, les deux fonctionnent.</p>

<h2>La mobilité</h2>
<p>Chamalières est connectée à Clermont par le tram (ligne A) et plusieurs bus. L'accès voiture vers Clermont centre est facile (10 minutes hors heures de pointe), 20-25 minutes en heure de pointe. Aux Cézeaux ou à La Pardieu (employeurs cadres), Chamalières est moins bien placée que Beaumont ou Aubière.</p>

<h2>Le profil sociologique</h2>
<p>Chamalières concentre une population aisée, vieillissante en moyenne, avec une forte proportion de cadres supérieurs et professions libérales. Clermont est plus mixte : jeunes actifs, étudiants, familles, retraités.</p>

<h2>Le verdict par profil</h2>
<ul>
  <li><strong>Famille avec enfants en âge scolaire</strong> : Chamalières si budget. Sinon Beaumont (plus économique, écoles très correctes).</li>
  <li><strong>Cadre actif jeune</strong> : centre Clermont (Delille, Jaude). Plus vivant, plus connecté.</li>
  <li><strong>Retraité</strong> : Chamalières (calme, services, médecins) ou Delille (commerces à pied).</li>
  <li><strong>Investisseur locatif</strong> : ni l'un ni l'autre — préférer Cézeaux, La Pardieu, Saint-Jacques.</li>
</ul>

${CTA("à Chamalières ou Clermont centre")}
`,
  },

  // 13. Rendement locatif
  {
    slug: "rendement-locatif-quartier-clermont-classement-2025",
    title: "Rendement locatif par quartier à Clermont-Ferrand : classement 2026",
    description:
      "Le top 10 des quartiers les plus rentables à Clermont-Ferrand pour un investissement locatif. Rendement brut, net, vacance.",
    theme: "investissement",
    datePublished: "2025-04-14",
    readTime: 7,
    featured: true,
    content: `
<p>Investir à Clermont, c'est arbitrer entre prix d'achat, niveau de loyer, et risque de vacance. Voici le classement 2025 des 10 secteurs les plus rentables, avec les rendements bruts et nets observés.</p>

<h2>Méthodologie</h2>
<p>Rendement brut = (loyer mensuel × 12) / prix d'achat × 100. Rendement net = rendement brut - charges (taxe foncière, copro non récupérable, vacance, gestion, entretien). En général, le rendement net est inférieur de 1,5 à 2 points au rendement brut.</p>

<h2>Top 10 — rendements bruts moyens</h2>

<h3>1. Croix-de-Neyrat — 7,2 %</h3>
<p>Studio 30 m² acheté 55 000 €, loué 350 €/mois. Attention : forte vacance possible, voisinage à analyser, DPE souvent difficile.</p>

<h3>2. Champratel — 7,0 %</h3>
<p>Profil similaire à Croix-de-Neyrat. Investisseur expérimenté seulement.</p>

<h3>3. Cézeaux — 6,3 %</h3>
<p>Studios étudiants, 65-90 K€, loyers 380-450 €. Demande continue, faible vacance (1-2 mois sur 12 si bien géré). Le couple risque/rendement le plus équilibré pour un investisseur locatif à Clermont.</p>

<h3>4. Saint-Jacques bas — 6,0 %</h3>
<p>Demande médicale (CHU, fac de médecine), internes en stage. Studios et T2 idéaux.</p>

<h3>5. Brézet — 5,9 %</h3>
<p>Variable selon micro-secteur. À analyser rue par rue.</p>

<h3>6. La Pardieu — 5,7 %</h3>
<p>Tertiaire (Michelin, Limagrain), jeunes cadres. Bon rendement avec un risque locataire correct.</p>

<h3>7. Salins / Carmes — 5,5 %</h3>
<p>Centre Clermont accessible, demande de jeunes actifs et étudiants.</p>

<h3>8. La Glacière — 5,3 %</h3>
<p>Profil similaire à Salins.</p>

<h3>9. Centre-Ville hors Jaude — 5,0 %</h3>
<p>Carmes, La Plaine, Trudaine. Demande variée.</p>

<h3>10. Aubière (étudiant Cézeaux) — 4,8 %</h3>
<p>Studios proches campus, valorisation patrimoniale supérieure à Cézeaux pure.</p>

<h2>Les quartiers à éviter pour le rendement</h2>
<ul>
  <li><strong>Jaude, Delille</strong> : 3,5-4,2 % brut. La valorisation est patrimoniale, pas locative.</li>
  <li><strong>Chamalières</strong> : 3,3-3,8 % brut. Idem.</li>
  <li><strong>Royat</strong> : 3,2 % brut. Très bel investissement patrimonial, mauvais rendement.</li>
</ul>

<h2>Le rendement net : retrancher quoi ?</h2>
<ul>
  <li>Taxe foncière : 700-1 200 € sur un studio, 1 100-1 800 € sur un T2.</li>
  <li>Charges copro non récupérables : 200-500 €/an.</li>
  <li>Assurance PNO + GLI : 250-400 €/an.</li>
  <li>Gestion locative (si déléguée) : 6-8 % des loyers HT.</li>
  <li>Vacance + impayés (moyenne) : équivalent 1 mois de loyer.</li>
  <li>Entretien-réparations : 1 % de la valeur du bien par an.</li>
</ul>

<h2>Conclusion</h2>
<p>Pour un investisseur Clermont 2025, les meilleurs couples rendement/risque sont aux <strong>Cézeaux</strong>, à <strong>Saint-Jacques bas</strong>, et à <strong>La Pardieu</strong>. Les rendements supérieurs (Croix-de-Neyrat, Champratel) viennent avec un risque locataire et patrimonial bien plus élevé — réservés aux investisseurs expérimentés.</p>

${CTA("pour un investissement locatif")}
`,
  },

  // 14. CHU
  {
    slug: "investir-pres-chu-clermont-bon-plan-locatif-medical",
    title: "Investir près du CHU à Clermont : le bon plan locatif étudiant et médical",
    description:
      "Le secteur du CHU à Clermont-Ferrand : pourquoi c'est un des meilleurs spots locatifs de la ville en 2026. Profils, loyers, rendements.",
    theme: "investissement",
    datePublished: "2025-04-01",
    readTime: 6,
    featured: false,
    quartiers: ["clermont-ferrand-saint-jacques", "clermont-ferrand-cezeaux", "clermont-ferrand-blaise-pascal"],
    content: `
<p>Le CHU Estaing et l'Hôpital Gabriel Montpied, couplés à la fac de médecine, génèrent à Clermont-Ferrand une demande locative parmi les plus stables et solvables de France. Voici pourquoi le secteur est un placement durable.</p>

<h2>La carte de la zone</h2>
<p>Le bassin "investissement médical" couvre :</p>
<ul>
  <li><strong>Saint-Jacques (bas)</strong> : autour de la fac de médecine. T1-T2.</li>
  <li><strong>La Glacière</strong> : étudiants en médecine, internes.</li>
  <li><strong>Vallières / Côté Blatin</strong> : médecins installés, professions libérales.</li>
  <li><strong>Cézeaux</strong> : étudiants en sciences médicales et paramédicales.</li>
</ul>

<h2>Les profils locataires</h2>
<ul>
  <li><strong>Étudiants en médecine</strong> : 6 ans + spécialisation (3-5 ans). Locataires 8-11 ans. Garants parents solvables.</li>
  <li><strong>Internes en stage</strong> : rotations de 6 mois, demande continue, garant CHU possible.</li>
  <li><strong>Soignants débutants</strong> : infirmiers, aides-soignants, jeunes médecins.</li>
  <li><strong>Médecins seniors</strong> : pour les T3-T4 du secteur Vallières/Côté Blatin.</li>
</ul>

<h2>Les loyers 2025</h2>
<ul>
  <li>Studio 25-30 m² meublé : 410-470 €/mois.</li>
  <li>T2 40-50 m² meublé : 550-620 €/mois.</li>
  <li>T2 40-50 m² nu : 470-540 €/mois.</li>
  <li>T3 60-70 m² nu : 650-770 €/mois.</li>
</ul>
<p>Les biens meublés se louent vite (sous 15 jours en septembre), les biens nus en 30-45 jours.</p>

<h2>Les rendements</h2>
<p>Sur Saint-Jacques bas, un studio acheté 75 K€ et loué 420 €/mois meublé donne un rendement brut de 6,7 %. En LMNP réel, l'amortissement absorbe le revenu fiscal pendant 10-12 ans.</p>

<h2>Les pièges à éviter</h2>
<ul>
  <li><strong>Acheter trop loin du CHU à pied</strong>. Au-delà de 15-20 minutes de marche, la prime locative chute. Vérifier sur Google Maps avant d'acheter.</li>
  <li><strong>Sous-estimer le bruit</strong>. Le secteur est à proximité de grands axes — une chambre côté avenue d'Italie, c'est moins louable.</li>
  <li><strong>Sous-évaluer les charges copro</strong>. Beaucoup d'immeubles années 70 avec ascenseur et charges 35-45 €/m²/an.</li>
  <li><strong>Sous-évaluer le DPE</strong>. Plusieurs résidences sont en F-G : interdiction progressive de location à anticiper.</li>
</ul>

<h2>Conclusion</h2>
<p>Le secteur CHU est un des plus rentables et stables de Clermont, mais il demande une analyse fine micro-secteur. Une expertise en amont peut éviter d'acheter le mauvais immeuble dans la bonne rue.</p>

${CTA("près du CHU")}
`,
  },

  // 15. Studio vs T2
  {
    slug: "studio-t2-clermont-investissement-locatif-rentable",
    title: "Studio vs T2 à Clermont : quel investissement locatif est plus rentable ?",
    description:
      "Studio ou T2 à Clermont-Ferrand pour de l'investissement locatif ? Le comparatif rendement, vacance, gestion, fiscalité 2026.",
    theme: "investissement",
    datePublished: "2025-03-26",
    readTime: 6,
    featured: false,
    quartiers: ["clermont-ferrand-cezeaux", "clermont-ferrand-saint-jacques", "clermont-ferrand-gare"],
    content: `
<p>Pour un premier investissement locatif à Clermont-Ferrand, deux options dominent : le studio et le T2. Voici les chiffres réels pour décider.</p>

<h2>Le prix d'achat</h2>
<ul>
  <li><strong>Studio 25 m²</strong> Cézeaux : 65-80 K€. Saint-Jacques : 70-85 K€. La Pardieu : 75-90 K€.</li>
  <li><strong>T2 40 m²</strong> Cézeaux : 95-115 K€. Saint-Jacques : 105-125 K€. La Pardieu : 110-135 K€.</li>
</ul>

<h2>Le loyer 2025</h2>
<ul>
  <li>Studio meublé : 380-470 €/mois selon secteur.</li>
  <li>T2 meublé : 530-620 €/mois.</li>
  <li>Différence loyer : ≈ +40 % pour un T2.</li>
  <li>Différence prix : ≈ +50 %.</li>
</ul>
<p>Conséquence : le rendement brut au m² est légèrement supérieur sur le studio.</p>

<h2>Le rendement brut comparé</h2>
<ul>
  <li>Studio : 6,2-6,8 % brut.</li>
  <li>T2 : 5,5-6,0 % brut.</li>
</ul>

<h2>La vacance</h2>
<ul>
  <li>Studio : forte rotation (1-2 ans en moyenne), vacance moyenne 1 mois/an.</li>
  <li>T2 : rotation plus lente (2-4 ans), vacance plus faible (15-20 jours/an en moyenne).</li>
</ul>

<h2>La gestion</h2>
<ul>
  <li>Studio : plus de turn-over = plus d'états des lieux, plus d'annonces, plus de gestion.</li>
  <li>T2 : locataires plus stables (jeune couple, étudiants en colocation, jeunes actifs).</li>
</ul>

<h2>La fiscalité (LMNP réel)</h2>
<p>Identique en méthode. L'amortissement absorbe le revenu fiscal sur 10-12 ans dans les deux cas.</p>

<h2>La revente</h2>
<ul>
  <li>Studio : marché liquide en zone CHU/Cézeaux. Mais valorisation patrimoniale modeste.</li>
  <li>T2 : marché plus large (couples, célibataires CSP+, investisseurs). Valorisation patrimoniale supérieure.</li>
</ul>

<h2>Notre verdict</h2>
<ul>
  <li><strong>Pour un premier investissement, à budget limité (≤ 100 K€)</strong> : studio à Cézeaux ou Saint-Jacques. Rendement maximisé, demande continue.</li>
  <li><strong>Pour un investissement plus posé, vision long terme</strong> : T2 à La Pardieu, Saint-Jacques. Rendement légèrement inférieur mais vacance moindre, valorisation supérieure.</li>
  <li><strong>Pour un patrimoine à transmettre</strong> : T2-T3 dans un quartier établi (Côté Blatin, Vallières).</li>
</ul>

${CTA("studio ou T2")}
`,
  },

  // 16. La Pardieu
  {
    slug: "investir-la-pardieu-opportunite-piege",
    title: "Investir à La Pardieu : opportunité ou piège ?",
    description:
      "La Pardieu à Clermont-Ferrand : analyse complète d'un quartier en transformation. Prix, loyers, rendement, points d'attention pour investir en 2026.",
    theme: "investissement",
    datePublished: "2025-03-20",
    readTime: 6,
    featured: false,
    quartiers: ["clermont-ferrand-la-pardieu"],
    content: `
<p>La Pardieu fascine et inquiète à la fois les investisseurs clermontois. Tertiaire en croissance (Michelin, Limagrain, école d'ingénieurs SIGMA), tram, programmes neufs récents… mais aussi quelques poches résidentielles plus difficiles. Décryptage.</p>

<h2>Le contexte du quartier</h2>
<p>La Pardieu s'étend du sud-est de Clermont jusqu'aux Cézeaux. C'est un mix entre :</p>
<ul>
  <li>Zone tertiaire Michelin (siège), Limagrain, Aubrac, Banque de France.</li>
  <li>Campus universitaire et école d'ingénieurs.</li>
  <li>Programmes immobiliers neufs (2010-2020) à dominante T2-T3.</li>
  <li>Quelques poches résidentielles plus anciennes.</li>
</ul>

<h2>Les prix</h2>
<ul>
  <li>Ancien : 1 950-2 250 €/m² selon micro-secteur.</li>
  <li>Neuf : 3 600-3 900 €/m².</li>
</ul>

<h2>Les loyers</h2>
<ul>
  <li>Studio 25 m² : 400-450 €/mois.</li>
  <li>T2 45 m² : 550-620 €/mois.</li>
  <li>T3 65 m² : 720-800 €/mois.</li>
</ul>

<h2>Le rendement</h2>
<p>Sur l'ancien bien situé, on observe 5,5-5,8 % brut. Sur le neuf, 4,2-4,8 % (frais de notaire moindres compensent partiellement, mais le prix d'entrée plus élevé tire le rendement vers le bas).</p>

<h2>Les points forts</h2>
<ul>
  <li>Demande locative continue (jeunes cadres Michelin/Limagrain, étudiants ingénieurs).</li>
  <li>Tram : connexion centre Clermont en 12 minutes.</li>
  <li>Vacance faible (15-25 jours par an sur les biens bien gérés).</li>
  <li>Valorisation tendancielle : +9 % sur 5 ans.</li>
</ul>

<h2>Les points d'attention</h2>
<ul>
  <li><strong>Hétérogénéité du quartier</strong>. Certains immeubles 70-80 sont à fuir (charges élevées, DPE F-G, voisinage difficile). D'autres sont excellents.</li>
  <li><strong>Concurrence du neuf</strong>. Les programmes neufs proches tirent les loyers à la baisse sur l'ancien rénové.</li>
  <li><strong>Saisonnalité</strong>. La demande locative est très concentrée en septembre. Une vacance en cours d'année peut être longue.</li>
</ul>

<h2>Notre recommandation</h2>
<p>La Pardieu est une bonne option d'investissement, à condition de bien sélectionner :</p>
<ul>
  <li>Bien <strong>à 5-10 minutes à pied du tram</strong>.</li>
  <li>Bien <strong>DPE C ou D minimum</strong> — au-delà, anticiper rénovation.</li>
  <li><strong>Charges raisonnables</strong> (≤ 30 €/m²/an).</li>
  <li>T2 ou T3 plutôt que studio (vacance moindre).</li>
</ul>

${CTA("à La Pardieu")}
`,
  },

  // 17. Combien louer
  {
    slug: "combien-louer-appartement-clermont-ferrand-quartier",
    title: "Combien louer son appartement à Clermont-Ferrand par quartier ?",
    description:
      "Loyers médians par quartier à Clermont-Ferrand : studio, T2, T3, maison. Données 2026 et tendances pour bien fixer votre loyer.",
    theme: "location",
    datePublished: "2025-04-15",
    readTime: 7,
    featured: true,
    content: `
<p>Trop bas, vous laissez de l'argent sur la table chaque mois. Trop haut, votre bien reste vacant et finit par être loué au rabais. Voici les loyers médians 2025 par quartier à Clermont-Ferrand, et la méthode pour bien fixer le vôtre.</p>

<h2>Les loyers médians 2025 — appartements nus</h2>

<h3>Centre & quartiers premium</h3>
<ul>
  <li><strong>Jaude</strong> : Studio 470 €, T2 640 €, T3 850 €, T4 1 050 €.</li>
  <li><strong>Delille</strong> : Studio 450 €, T2 620 €, T3 820 €, T4 1 020 €.</li>
  <li><strong>Montferrand</strong> : Studio 410 €, T2 560 €, T3 720 €, T4 880 €.</li>
</ul>

<h3>Quartiers étudiants/médicaux</h3>
<ul>
  <li><strong>Cézeaux</strong> : Studio 380 €, T2 520 €, T3 660 €.</li>
  <li><strong>Saint-Jacques</strong> : Studio 390 €, T2 530 €, T3 680 €.</li>
  <li><strong>La Pardieu</strong> : Studio 400 €, T2 550 €, T3 700 €.</li>
</ul>

<h3>Communes périphériques</h3>
<ul>
  <li><strong>Chamalières</strong> : Studio 460 €, T2 620 €, T3 820 €, T4 1 050 €.</li>
  <li><strong>Beaumont</strong> : Studio 410 €, T2 560 €, T3 720 €, T4 900 €.</li>
  <li><strong>Aubière</strong> : Studio 400 €, T2 550 €, T3 690 €.</li>
  <li><strong>Royat</strong> : Studio 440 €, T2 600 €, T3 780 €, T4 970 €.</li>
</ul>

<h2>Loyers maisons</h2>
<ul>
  <li>Maison 100 m² Beaumont : 1 050-1 250 €/mois.</li>
  <li>Maison 130 m² Chamalières : 1 400-1 700 €/mois.</li>
  <li>Maison 110 m² Aubière : 1 100-1 350 €/mois.</li>
</ul>

<h2>La prime du meublé</h2>
<p>Sur Clermont en 2025, le meublé apporte une prime de loyer de :</p>
<ul>
  <li>+15-20 % sur un studio (cible étudiants, internes).</li>
  <li>+10-15 % sur un T2 (jeunes actifs).</li>
  <li>+5-10 % sur un T3 (familles moins demandeuses).</li>
</ul>

<h2>La méthode pour fixer son loyer</h2>
<ol>
  <li>Identifier les loyers médians de votre quartier (cf. ci-dessus).</li>
  <li>Ajuster selon les caractéristiques :
    <ul>
      <li>Étage haut + ascenseur : +30-50 €.</li>
      <li>Balcon ou terrasse : +30-80 €.</li>
      <li>Parking inclus : +50-100 €.</li>
      <li>DPE A-B : +20-40 €.</li>
      <li>DPE F-G : -30-50 € (et bientôt interdiction).</li>
    </ul>
  </li>
  <li>Appliquer un loyer "marché", pas un loyer "ambition".</li>
  <li>Bien choisir le moment de mise en location (septembre = pic de demande étudiante).</li>
</ol>

<h2>Erreurs à éviter</h2>
<ul>
  <li>Surévaluer "parce qu'on a fait des travaux" : les locataires payent un loyer marché, pas un coût travaux.</li>
  <li>Sous-évaluer en panique en cas de premier mois sans candidat. Patience.</li>
  <li>Oublier la révision annuelle de loyer (IRL).</li>
</ul>

${CTA("dans votre quartier")}
`,
  },

  // 18. Gestion locative
  {
    slug: "gestion-locative-clermont-soi-meme-professionnel",
    title: "Gestion locative à Clermont : faire soi-même ou confier à un professionnel ?",
    description:
      "Gestion locative en propre ou via une agence à Clermont-Ferrand : coûts, gain de temps, sécurité juridique. Le comparatif 2026.",
    theme: "location",
    datePublished: "2025-04-09",
    readTime: 6,
    featured: false,
    content: `
<p>Quand on devient bailleur, deux options : gérer en direct ou déléguer. À Clermont, environ 60 % des bailleurs particuliers gèrent eux-mêmes. Est-ce le bon choix pour vous ? Voici les éléments factuels.</p>

<h2>Gérer soi-même : le vrai coût</h2>
<p>L'auto-gestion semble gratuite. Elle ne l'est jamais. À Clermont, sur un T2 loué 600 €/mois, comptez en moyenne :</p>
<ul>
  <li>10-15 heures/an : recherche locataire, visites, dossier, baux.</li>
  <li>5-10 heures/an : encaissement, relances, comptabilité, déclaration fiscale.</li>
  <li>Variable : gestion des sinistres, des travaux, des changements de locataires.</li>
  <li>Coût en cas d'impayé : 6-15 mois de loyer perdus si la procédure n'est pas bien menée.</li>
</ul>
<p>Soit ~20-30 heures/an et un risque réel de plusieurs milliers d'euros sur un dossier mal géré.</p>

<h2>Déléguer : combien ça coûte ?</h2>
<p>Une agence de gestion locative à Clermont prend en général :</p>
<ul>
  <li>6-8 % HT des loyers encaissés (mandat de gestion mensuelle).</li>
  <li>Forfait "honoraires location" pour la mise en location : ~1 mois de loyer (partagé loi Alur entre bailleur et locataire).</li>
  <li>Optionnel : GLI (Garantie Loyers Impayés) : 2-3 % des loyers.</li>
</ul>
<p>Sur un T2 à 600 €, gestion mensuelle = 36-48 €/mois soit 430-580 €/an. GLI = 14-18 €/mois.</p>

<h2>Ce qu'inclut une bonne gestion</h2>
<ul>
  <li>Sélection du locataire (vérification dossier, garants, scoring).</li>
  <li>Rédaction du bail (loi Alur, clauses spécifiques).</li>
  <li>État des lieux entrée et sortie.</li>
  <li>Encaissement, quittance, révision IRL annuelle.</li>
  <li>Régularisation des charges.</li>
  <li>Gestion des sinistres et des relations propriétaire-locataire.</li>
  <li>Procédure d'impayé si nécessaire.</li>
  <li>Déclaration fiscale (formulaire 2044 pré-rempli).</li>
</ul>

<h2>Quand déléguer fait clairement sens</h2>
<ul>
  <li>Vous habitez à plus de 50 km de votre bien.</li>
  <li>Vous avez plusieurs biens (3 et plus).</li>
  <li>Vous travaillez beaucoup et n'avez pas envie de gérer les imprévus.</li>
  <li>Vous voulez sécuriser le risque d'impayé (GLI).</li>
  <li>Vous n'aimez pas les conflits.</li>
</ul>

<h2>Quand l'auto-gestion fait sens</h2>
<ul>
  <li>Vous habitez à proximité du bien.</li>
  <li>Vous avez 1 ou 2 biens maximum.</li>
  <li>Vous êtes à l'aise avec les démarches administratives.</li>
  <li>Vous prenez le temps de bien sélectionner le locataire.</li>
</ul>

<h2>L'option intermédiaire : la mise en location seule</h2>
<p>Beaucoup de bailleurs choisissent un compromis : déléguer la mise en location (annonce, visites, dossier, bail, état des lieux) à une agence, puis gérer eux-mêmes mensuellement. Coût : ~1 mois de loyer une seule fois. Gain : sécurité juridique sur le démarrage du bail.</p>

${CTA("pour votre gestion locative")}
`,
  },

  // 19. Assurances bailleurs
  {
    slug: "assurances-bailleur-gli-pno-clermont",
    title: "GLI, loyers impayés, PNO : quelles assurances pour un bailleur clermontois ?",
    description:
      "Les 3 assurances essentielles d'un bailleur à Clermont-Ferrand : PNO, GLI, vacance. Couvertures, prix, conditions 2026.",
    theme: "location",
    datePublished: "2025-04-03",
    readTime: 6,
    featured: false,
    content: `
<p>Bailleur à Clermont-Ferrand, vous êtes exposé à plusieurs risques majeurs : impayés, sinistres, vacance, dégradations. Voici les 3 assurances à connaître pour ne pas se retrouver à découvert.</p>

<h2>1. PNO — Propriétaire Non Occupant</h2>
<p>Beaucoup de bailleurs pensent que l'assurance multirisque habitation du locataire suffit. <strong>C'est faux</strong>. Si le bien est inoccupé entre deux locations, ou si le locataire n'a pas assuré (cas plus fréquent qu'on ne croit), vous êtes exposé.</p>
<p><strong>Couvertures principales</strong> : incendie, dégâts des eaux, vol (limitée), responsabilité civile propriétaire, frais d'expertise.</p>
<p><strong>Prix</strong> : 80-150 €/an pour un appartement standard à Clermont. C'est l'assurance bailleur la moins chère et la plus indispensable.</p>

<h2>2. GLI — Garantie Loyers Impayés</h2>
<p>L'assurance qui couvre le bailleur en cas de défaut de paiement du locataire.</p>
<p><strong>Couvertures principales</strong> :</p>
<ul>
  <li>Loyers impayés (généralement 24-36 mois max selon contrat).</li>
  <li>Dégradations locatives (souvent jusqu'à 7 000-10 000 €).</li>
  <li>Frais de procédure (huissier, avocat).</li>
  <li>Vacance en cas d'expulsion.</li>
</ul>
<p><strong>Prix</strong> : 2,5-3,5 % des loyers (sur un T2 à 600 €/mois, ~180-250 €/an).</p>
<p><strong>Conditions</strong> : le locataire doit présenter un dossier solide (taux d'effort &lt; 33 %, CDI ou équivalent, ou garant solvable). Si le locataire ne passe pas, GLI refusée.</p>
<p><strong>Important</strong> : GLI et caution solidaire ne se cumulent pas (interdit par la loi sauf cas étudiant/apprenti). Il faut choisir.</p>

<h2>3. Assurance vacance locative</h2>
<p>Moins connue. Couvre la perte de revenus en cas de vacance prolongée non couverte par la GLI (ex : entre deux locations, recherche difficile).</p>
<p><strong>Prix</strong> : 1-1,5 % des loyers.</p>
<p><strong>Notre avis</strong> : à Clermont, sauf bien atypique ou très haut de gamme à demande limitée, la vacance est généralement courte (15-45 jours sur les biens correctement loués). Cette assurance est plutôt secondaire.</p>

<h2>4. Assurances optionnelles utiles</h2>
<ul>
  <li><strong>Protection juridique propriétaire</strong> : 30-60 €/an. Très utile en cas de conflit.</li>
  <li><strong>Garantie travaux</strong> en complément PNO : pour gros sinistres.</li>
</ul>

<h2>Le cas particulier des copropriétés</h2>
<p>L'assurance copro couvre les parties communes. Vous restez responsable des parties privatives — d'où l'utilité de la PNO. En cas de sinistre origine voisine, c'est l'assurance copro qui prime, mais des frais peuvent rester à votre charge.</p>

<h2>Récap : le pack minimal d'un bailleur clermontois</h2>
<ul>
  <li>✅ <strong>PNO</strong> : indispensable. ~100 €/an.</li>
  <li>✅ <strong>GLI</strong> : très fortement recommandée. ~2,5-3 % des loyers.</li>
  <li>⏺ <strong>Vacance</strong> : optionnelle.</li>
  <li>✅ <strong>Protection juridique</strong> : recommandée. ~50 €/an.</li>
</ul>

<p style="font-size:0.9em;font-style:italic">Pour un audit complet de vos contrats bailleurs, MonAssureur (groupe LCH) propose un comparatif gratuit sur les principales compagnies du marché. <a href="https://mon-assureur.com">Voir MonAssureur →</a></p>

${CTA("avec l'assurance adaptée")}
`,
  },

  // 20. Type de location
  {
    slug: "bail-mobilite-meuble-nu-quel-type-location-clermont",
    title: "Bail mobilité, meublé, nu : quel type de location choisir à Clermont ?",
    description:
      "Bail nu, meublé, mobilité, étudiant à Clermont-Ferrand : durée, fiscalité, profil locataire, rentabilité. Le guide bailleur 2026.",
    theme: "location",
    datePublished: "2025-03-29",
    readTime: 7,
    featured: false,
    content: `
<p>Le choix du type de bail conditionne le rendement, la fiscalité, le profil de locataire et le niveau d'encadrement. Voici le panorama des 4 grands types de location à Clermont-Ferrand en 2025.</p>

<h2>1. Bail nu (location vide)</h2>
<p><strong>Durée</strong> : 3 ans renouvelables tacitement.</p>
<p><strong>Préavis bailleur</strong> : 6 mois, motivé (vente, reprise, motif légitime).</p>
<p><strong>Préavis locataire</strong> : 3 mois (1 mois en zone tendue — Clermont n'est pas en zone tendue).</p>
<p><strong>Fiscalité</strong> : Revenus fonciers. Régime micro-foncier (abattement 30 %) si loyers &lt; 15 000 €. Sinon réel (déficit foncier possible).</p>
<p><strong>Profil locataire</strong> : familles, couples établis, retraités. Rotation faible.</p>
<p><strong>Avantage</strong> : stabilité, peu de gestion.</p>
<p><strong>Inconvénient</strong> : loyer 10-15 % inférieur au meublé.</p>

<h2>2. Bail meublé classique</h2>
<p><strong>Durée</strong> : 1 an renouvelable, 9 mois pour étudiant non renouvelable.</p>
<p><strong>Préavis bailleur</strong> : 3 mois motivé.</p>
<p><strong>Préavis locataire</strong> : 1 mois.</p>
<p><strong>Fiscalité</strong> : LMNP. Régime micro-BIC (abattement 50 %) ou réel (amortissements).</p>
<p><strong>Profil locataire</strong> : jeunes actifs, célibataires, mutations.</p>
<p><strong>Avantage</strong> : loyer +10-20 %, fiscalité LMNP très avantageuse, déductions des amortissements.</p>
<p><strong>Inconvénient</strong> : rotation plus élevée, gestion meubles.</p>
<p><strong>Liste meubles obligatoires</strong> : décret du 31 juillet 2015 (literie, cuisson, vaisselle, table, chaises, rangements, luminaires, etc.).</p>

<h2>3. Bail mobilité</h2>
<p><strong>Durée</strong> : 1 à 10 mois, non renouvelable, non reconductible.</p>
<p><strong>Locataire ciblé</strong> : étudiant, mission temporaire, formation, stage. Doit justifier d'un motif.</p>
<p><strong>Pas de dépôt de garantie</strong>.</p>
<p><strong>Fiscalité</strong> : LMNP comme le meublé.</p>
<p><strong>Avantage</strong> : flexibilité, idéal en zone CHU/Cézeaux pour internes en stage 6 mois.</p>
<p><strong>Inconvénient</strong> : pas de stabilité, gestion plus active.</p>

<h2>4. Bail étudiant 9 mois</h2>
<p><strong>Durée</strong> : 9 mois fermes (octobre-juin classiquement).</p>
<p><strong>Locataire</strong> : étudiant uniquement.</p>
<p><strong>Avantage</strong> : permet au bailleur de récupérer le bien pendant l'été (location courte durée saisonnière possible).</p>
<p><strong>Inconvénient</strong> : marché clermontois pas toujours adapté à la location courte durée d'été (peu de tourisme estival).</p>

<h2>Le bon choix par profil de bien</h2>
<ul>
  <li><strong>Studio Cézeaux</strong> : meublé classique 1 an, ou bail mobilité si CHU.</li>
  <li><strong>T2 Saint-Jacques bas</strong> : meublé classique. Profil interne CHU, jeune cadre.</li>
  <li><strong>T3 Beaumont</strong> : nu 3 ans. Profil famille.</li>
  <li><strong>T4 Chamalières</strong> : nu 3 ans. Profil famille établie ou retraités.</li>
  <li><strong>Maison Aubière</strong> : nu 3 ans.</li>
</ul>

<h2>Conclusion</h2>
<p>Le meublé est devenu la norme sur les petites surfaces (studio, T2) à Clermont, à la fois pour la fiscalité LMNP et pour la prime de loyer. Le nu reste pertinent sur les T3+, où le profil locataire (famille) demande de la stabilité.</p>

${CTA("bail adapté")}
`,
  },

  // 21. Encadrement loyer
  {
    slug: "encadrement-loyers-clermont-ferrand-2025",
    title: "Encadrement des loyers à Clermont-Ferrand : ce que dit la loi en 2026",
    description:
      "Clermont-Ferrand est-elle concernée par l'encadrement des loyers ? IRL, plafonds, zones tendues. Le point réglementaire 2026.",
    theme: "location",
    datePublished: "2025-03-15",
    readTime: 5,
    featured: false,
    content: `
<p>L'encadrement des loyers fait régulièrement débat. À Clermont-Ferrand, la situation est-elle similaire à Paris ou Lyon ? Voici le point précis sur le cadre réglementaire 2025 applicable aux bailleurs clermontois.</p>

<h2>1. Clermont est-elle en "zone tendue" ?</h2>
<p>La zone tendue est définie par décret. Les communes y sont listées. <strong>Clermont-Ferrand n'est PAS en zone tendue</strong> en 2025. Conséquences :</p>
<ul>
  <li>Pas de préavis réduit à 1 mois pour le locataire (préavis nu = 3 mois).</li>
  <li>Pas de taxe sur les logements vacants (TLV).</li>
  <li>Pas d'encadrement des loyers à la relocation.</li>
</ul>

<h2>2. L'encadrement strict des loyers (Paris, Lyon, Lille…)</h2>
<p>L'encadrement strict (loyer plafonné selon référence préfectorale) ne s'applique <strong>pas à Clermont-Ferrand</strong> en 2025. Il concerne actuellement Paris, Lille, Lyon-Villeurbanne, Bordeaux, Montpellier, Plaine-Commune, Est-Ensemble, et quelques autres.</p>

<h2>3. La révision annuelle de loyer (IRL)</h2>
<p>Tout bail en cours peut être révisé une fois par an, à la date anniversaire (ou date prévue au bail), selon l'IRL (Indice de Référence des Loyers) publié par l'INSEE.</p>
<p><strong>IRL 2024-2025</strong> : la hausse a été plafonnée à 3,5 % depuis 2022 (loi pouvoir d'achat), puis 2,5-3 % selon trimestre. Cap probablement maintenu en 2025.</p>
<p><strong>Calcul</strong> : nouveau loyer = ancien loyer × (IRL nouveau / IRL ancien).</p>

<h2>4. Le complément de loyer en meublé</h2>
<p>Pas applicable à Clermont (lié à l'encadrement strict).</p>

<h2>5. Le loyer libre à la relocation</h2>
<p>À Clermont, vous pouvez fixer librement le loyer lors d'une nouvelle mise en location. Aucun plafond à respecter (hors interdiction location DPE F-G à venir 2025/2028).</p>

<h2>6. Et le DPE ?</h2>
<p>Différent de l'encadrement. À Clermont comme partout en France :</p>
<ul>
  <li>Depuis 2025 : interdiction de mise en location d'un bien classé G.</li>
  <li>Depuis 2023 : interdiction d'augmenter le loyer d'un bien F ou G.</li>
  <li>Dès 2028 : interdiction de mise en location des F.</li>
  <li>Dès 2034 : interdiction de mise en location des E.</li>
</ul>

<h2>7. Synthèse : ce qui s'applique à Clermont</h2>
<ul>
  <li>✅ Liberté de fixation du loyer à la mise en location.</li>
  <li>✅ Révision annuelle limitée à l'IRL.</li>
  <li>✅ Préavis locataire = 3 mois (nu) / 1 mois (meublé).</li>
  <li>✅ Préavis bailleur = 6 mois (nu) / 3 mois (meublé).</li>
  <li>❌ Pas de plafonnement strict.</li>
  <li>❌ Pas de complément de loyer encadré.</li>
  <li>⚠️ Interdiction progressive louer DPE F-G.</li>
</ul>

<h2>Évolutions à surveiller</h2>
<p>Le débat national sur l'extension de l'encadrement des loyers existe. Si Clermont devait basculer un jour, l'INSEE publierait des loyers de référence par typologie. Aucun signal politique en ce sens en 2025.</p>

${CTA("dans le cadre légal 2025")}
`,
  },

  // ---------------------------------------------------------------------------
  // 22. Vichy — marché immobilier 2026
  // ---------------------------------------------------------------------------
  {
    slug: "prix-m2-vichy-2026-marche-immobilier",
    title: "Prix m² Vichy 2026 : marché immobilier, spa, investissement",
    description:
      "Vichy 2026 : prix m² 700-1400 € appart, 900-1600 € maisons, thermalisme, clientèle parisienne, rendement 5-7%. Analyse complète du marché.",
    theme: "marche",
    datePublished: "2025-04-22",
    readTime: 7,
    featured: false,
    quartiers: ["vichy"],
    content: `
<p>Vichy intrigue. À 1h15 de Clermont-Ferrand par l'A719, la cité thermale de l'Allier affiche en 2026 des prix m² qui restent bien en dessous de la moyenne auvergnate, tout en proposant un patrimoine architectural Belle Époque unique en France. Pour un acheteur clermontois ou un investisseur parisien, le marché vichyssois mérite un regard attentif.</p>

<h2>Les prix m² à Vichy en 2026</h2>
<p>Le marché vichyssois se situe sur une fourchette large : <strong>700 à 1 400 €/m²</strong> pour un appartement selon l'emplacement et l'état, et <strong>900 à 1 600 €/m²</strong> pour les maisons. La médiane appartement tourne autour de <strong>1 050 €/m²</strong>, soit moins de la moitié du prix médian clermontois (~2 280 €/m²).</p>
<ul>
  <li><strong>Quartier thermal et Parc des Sources</strong> : 1 200 à 1 400 €/m², les biens Belle Époque rénovés peuvent atteindre 1 600 €/m².</li>
  <li><strong>Centre-ville (rue Clemenceau, place de l'Hôtel de Ville)</strong> : 950 à 1 200 €/m².</li>
  <li><strong>Bords d'Allier et quartier Russie</strong> : 1 100 à 1 350 €/m².</li>
  <li><strong>Quartiers périphériques (Les Garets, Vernet)</strong> : 700 à 950 €/m².</li>
</ul>

<h2>Le patrimoine Belle Époque, un marché à part</h2>
<p>Vichy, ville thermale impériale, classée au patrimoine mondial de l'UNESCO depuis 2021 (au titre des Grandes villes thermales d'Europe), conserve un parc immobilier exceptionnel : immeubles haussmanniens, villas Belle Époque, opéra, galeries couvertes. Les biens d'exception (appartements de 100 m²+ avec moulures, parquets d'origine, vue sur le parc) trouvent une clientèle internationale : Parisiens, Lyonnais, retraités du Nord, voire investisseurs anglo-saxons attirés par le rapport prix/cachet.</p>

<h2>Pourquoi les prix sont si bas</h2>
<p>Trois raisons structurelles expliquent la décote vichyssoise par rapport à Clermont :</p>
<ul>
  <li><strong>Démographie en stagnation</strong> : ~24 800 habitants, population vieillissante, pas de bassin d'emploi tertiaire dynamique.</li>
  <li><strong>Saisonnalité</strong> : l'économie repose largement sur le thermalisme et le tourisme. Hors saison, la ville s'endort.</li>
  <li><strong>Liquidité plus faible</strong> : <strong>délai moyen de vente ~120 jours</strong> contre 90 jours à Clermont, avec des pointes à 180-200 jours sur les biens mal positionnés.</li>
</ul>

<h2>Le profil acheteur 2026</h2>
<p>Trois grandes typologies se partagent le marché vichyssois :</p>
<ol>
  <li><strong>Retraités résidentiels</strong> : recherchent un T3-T4 en centre-ville, ascenseur, services à proximité. Budget 130-200 k€.</li>
  <li><strong>Résidence secondaire</strong> : Parisiens, Lyonnais, voire dirigeants clermontois cherchant un pied-à-terre Belle Époque. Budget 150-300 k€ pour un T3 de caractère.</li>
  <li><strong>Investisseurs locatifs</strong> : T2 à 80-110 k€ avec rendement brut 5 à 7 %.</li>
</ol>

<h2>Investir à Vichy : la mécanique du rendement</h2>
<p>Les loyers vichyssois sont faibles en valeur absolue mais cohérents avec les prix d'achat. Un T2 de 45 m² acheté <strong>85 k€</strong> se loue entre <strong>380 et 480 €/mois</strong> hors charges (350-450 € sur les meublés courte durée saisonnière). Le rendement brut s'établit donc autour de <strong>5,5 à 6,8 %</strong>, mieux que dans la plupart des quartiers clermontois.</p>
<p>Attention cependant : la vacance locative est plus marquée qu'à Clermont. Hors centre thermal, certains biens restent vides 6-8 semaines entre deux locataires. La cible la plus sûre reste l'étudiant (école d'ingénieurs Sigma Clermont a une antenne, plus IUT) ou le curiste de moyenne durée.</p>

<h2>Comparaison Vichy / Clermont-Ferrand 2026</h2>
<ul>
  <li><strong>Prix d'entrée</strong> : Vichy ~1 050 €/m² vs Clermont ~2 280 €/m² → effet ×2,2.</li>
  <li><strong>Rendement brut moyen T2</strong> : Vichy 6 % vs Clermont 4,5 %.</li>
  <li><strong>Liquidité</strong> : Clermont nettement plus liquide (délai 90 j vs 120 j).</li>
  <li><strong>Plus-value 5 ans</strong> : Clermont +12 % vs Vichy +4 %.</li>
</ul>

<h2>Notre conseil pour 2026</h2>
<p>Vichy convient à deux profils précis : l'investisseur qui privilégie le rendement courant et qui assume une revente plus longue, et l'acheteur résidentiel qui cherche un cachet Belle Époque introuvable ailleurs à ce prix. Pour un projet patrimonial pur (plus-value à 10 ans), Clermont reste plus sûr.</p>

${CTA("à Vichy et dans le bassin thermal")}
`,
  },

  // ---------------------------------------------------------------------------
  // 23. Acheter Riom vs Clermont — comparatif 2026
  // ---------------------------------------------------------------------------
  {
    slug: "acheter-riom-vs-clermont-ferrand-comparatif-2026",
    title: "Acheter à Riom ou Clermont-Ferrand : comparatif 2026",
    description:
      "Riom 1700-2200 €/m² vs Clermont 2280 €/m² : qui choisit quoi en 2026 ? TER, écoles, jardin, vie nocturne. Comparatif complet pour décider.",
    theme: "acheteur",
    datePublished: "2025-04-18",
    readTime: 6,
    featured: false,
    quartiers: ["riom"],
    content: `
<p>15 km au nord de Clermont-Ferrand, Riom est devenue en cinq ans une alternative crédible pour les acheteurs qui ne trouvent plus leur compte dans la métropole. Vieille ville médiévale classée, gare TER à 12 minutes de Clermont, prix moyens 20 à 25 % en dessous : l'équation séduit, mais elle n'est pas sans contreparties. Comparatif honnête pour 2026.</p>

<h2>Les prix m² 2026</h2>
<p>Riom affiche un prix moyen de <strong>1 700 à 2 200 €/m²</strong> pour un appartement, contre <strong>2 280 €/m²</strong> à Clermont (médiane toutes catégories). Pour les maisons, l'écart est encore plus net :</p>
<ul>
  <li>Riom : maison T4-T5 avec jardin de 300-500 m² = <strong>180 à 250 k€</strong> selon état.</li>
  <li>Clermont équivalent (Beaumont, Chamalières, Aubière) : <strong>320 à 480 k€</strong>.</li>
</ul>
<p>L'écart est tel que beaucoup de primo-accédants familiaux qui visaient Beaumont ou Aubière finissent par acheter à Riom — souvent un bien plus grand, plus récent, ou avec plus de terrain.</p>

<h2>La vieille ville : le cachet introuvable à Clermont</h2>
<p>Riom conserve un centre historique médiéval classé : hôtels particuliers du XVe-XVIe, beffroi, Sainte-Chapelle, ruelles pavées. Les T3-T4 dans la pierre rénovée se vendent autour de <strong>1 900 à 2 300 €/m²</strong>, soit le prix d'un bien moyen à Clermont mais avec un cachet patrimonial bien supérieur. C'est le segment qui plaît aux Clermontois en quête d'authenticité.</p>

<h2>Le TER : l'argument qui change tout</h2>
<p>La gare de Riom-Châtel-Guyon est à <strong>12 minutes</strong> en TER de Clermont (départs toutes les 30 min en heure de pointe). En voiture, comptez 25-40 minutes selon le trafic et la sortie périphérique visée. Pour un actif travaillant à Clermont, le trajet quotidien reste réaliste, à condition d'habiter à 5 minutes maxi de la gare.</p>
<p>Important : <strong>l'abonnement TER mensuel</strong> Riom-Clermont coûte autour de 80-90 €/mois en 2026, à intégrer dans le budget total. Pour deux actifs, on parle vite de 2 000 €/an supplémentaires.</p>

<h2>Qui choisit Riom en 2026</h2>
<ul>
  <li><strong>Familles primo-accédantes budget serré</strong> : viser une maison avec jardin sous 250 k€ est possible à Riom, impossible à Clermont sauf en grande périphérie.</li>
  <li><strong>Retraités</strong> : services médicaux complets (hôpital, cliniques), commerces de centre-ville, calme.</li>
  <li><strong>Familles cherchant écoles et cadre de vie</strong> : les écoles riomoises sont bien notées, les enfants peuvent aller au collège à pied.</li>
  <li><strong>Investisseurs longue durée</strong> : T2 à 90-120 k€, loyer 480-560 €/mois, rendement brut autour de 5 %.</li>
</ul>

<h2>Les inconvénients à connaître</h2>
<ul>
  <li><strong>Vie nocturne quasi nulle</strong> : 1-2 bars ouverts après 22h, pas de salle de concert, pas de cinéma indépendant.</li>
  <li><strong>Bassin d'emploi limité</strong> : fonction publique, hôpital, quelques PME industrielles. La majorité des actifs travaillent à Clermont.</li>
  <li><strong>Offres culturelles plus limitées</strong> : beaucoup de festivals et expositions sont à Clermont — il faut se déplacer.</li>
  <li><strong>Marché des biens haut de gamme limité</strong> : peu de transactions au-dessus de 400 k€, ce qui peut compliquer une revente future si vous montez en gamme.</li>
</ul>

<h2>Le calcul pratique : trajet domicile-travail</h2>
<p>Pour un couple où les deux conjoints travaillent à Clermont, le surcoût trajet (TER ou carburant) est compensé en moins de deux ans par l'écart de prix d'achat. Pour un seul conjoint actif, l'arbitrage est encore plus net. Pour un foyer où un conjoint travaille au sud de Clermont (Cournon, Aubière), la balance penche en revanche pour rester côté clermontois.</p>

<h2>Notre verdict</h2>
<p>Riom est le bon choix si vous valorisez l'espace, le calme, le cachet historique, et si votre vie ne dépend pas de l'animation nocturne clermontoise. Clermont reste le bon choix si vous voulez tout à pied et un marché immobilier liquide pour la revente. Entre les deux : essayez d'abord la location 6-12 mois pour valider le mode de vie.</p>

${CTA("entre Clermont-Ferrand et Riom")}
`,
  },

  // ---------------------------------------------------------------------------
  // 24. Investir Cournon-d'Auvergne — rendement 2026
  // ---------------------------------------------------------------------------
  {
    slug: "investir-appartement-cournon-dauvergne-rendement",
    title: "Investir à Cournon-d'Auvergne : rendement locatif 2026",
    description:
      "Cournon 2026 : T2 à 120 k€, loyer 500-550 €/mois, rendement brut 5,5 %. Michelin, Limagrain, faible vacance. Analyse complète pour investisseurs.",
    theme: "investissement",
    datePublished: "2025-04-15",
    readTime: 6,
    featured: false,
    quartiers: ["cournon-dauvergne"],
    content: `
<p>Cournon-d'Auvergne, deuxième commune du Puy-de-Dôme avec ~20 000 habitants, est un terrain d'investissement souvent sous-estimé. Située à 8 km au sud-est de Clermont-Ferrand, à proximité immédiate des employeurs majeurs (Michelin, Limagrain, zone tertiaire de la Pardieu), Cournon offre un couple rendement / vacance locative qui mérite l'attention de l'investisseur méthodique.</p>

<h2>Les prix m² à Cournon en 2026</h2>
<p>Le marché cournonnais s'établit autour de <strong>1 900 à 2 100 €/m²</strong> en moyenne pour un appartement, soit légèrement en dessous de la médiane clermontoise (~2 280 €/m²). Les T2 (45-50 m²) se négocient typiquement entre <strong>110 et 130 k€</strong>, frais de notaire inclus pour un bien des années 1990-2010 en bon état.</p>
<ul>
  <li><strong>Centre Cournon</strong> : 2 000 à 2 200 €/m².</li>
  <li><strong>Quartier de la Mairie / République</strong> : 1 950 à 2 100 €/m².</li>
  <li><strong>Sarliève / Plaine</strong> : 1 800 à 2 000 €/m².</li>
</ul>

<h2>Le moteur du marché : Michelin, Limagrain, Pardieu</h2>
<p>Cournon est positionnée à 5 minutes en voiture de la zone industrielle de la Pardieu et de Michelin, et à 10 minutes du siège de Limagrain à Saint-Beauzire. Cette proximité génère une demande locative continue de la part de jeunes actifs (techniciens, ingénieurs débutants, cadres en mobilité) qui ne souhaitent pas habiter en centre-ville clermontois.</p>
<p>La ligne de bus B (réseau T2C) relie Cournon au centre de Clermont en 25-30 minutes, un atout pour les locataires sans véhicule.</p>

<h2>Le calcul de rendement type</h2>
<p>Exemple concret 2026 : T2 de 47 m² acheté <strong>120 000 €</strong> (frais de notaire inclus), travaux 5 000 €, soit revient à 125 k€.</p>
<ul>
  <li>Loyer pratiqué : <strong>520 €/mois hors charges</strong> = 6 240 €/an.</li>
  <li>Charges non récupérables + taxe foncière : ~900 €/an.</li>
  <li>Loyer net avant impôt : ~5 340 €.</li>
  <li><strong>Rendement brut : 5,2 %</strong> / Rendement net : 4,3 %.</li>
</ul>
<p>Sur des T1-studios bien placés, le rendement brut peut monter à <strong>5,8 - 6 %</strong>.</p>

<h2>La vacance locative</h2>
<p>C'est l'argument fort de Cournon : la vacance moyenne tourne autour de <strong>2 à 4 semaines/an</strong>, contre 4 à 8 semaines dans les quartiers étudiants clermontois saturés en été. Le profil locataire (jeunes actifs CDI) reste plus stable, avec une durée moyenne de bail de 18-24 mois.</p>

<h2>Cournon vs Cézeaux : le match investisseur</h2>
<ul>
  <li><strong>Prix d'entrée</strong> : Cournon ~120 k€ pour un T2 vs Cézeaux ~115-130 k€ → similaire.</li>
  <li><strong>Loyer</strong> : Cournon 500-550 € vs Cézeaux 480-530 € (étudiant) → léger avantage Cournon.</li>
  <li><strong>Vacance</strong> : Cournon faible et stable vs Cézeaux pic estival juin-septembre.</li>
  <li><strong>Profil locataire</strong> : Cournon = jeune actif CDI vs Cézeaux = étudiant rotatif.</li>
  <li><strong>Plus-value future</strong> : Cézeaux légèrement supérieur (effet métropolitain).</li>
</ul>
<p>Notre recommandation : Cournon pour l'investisseur qui privilégie le rendement régulier et la sérénité de gestion. Cézeaux si vous acceptez la rotation et visez la plus-value.</p>

<h2>Les points de vigilance</h2>
<ul>
  <li><strong>Copropriétés années 70</strong> : nombreuses à Cournon. Vérifier impérativement l'état des façades, ascenseur, fonds travaux et DPE collectif. Les rénovations énergétiques peuvent atteindre 8 000-15 000 € par lot dans les années à venir.</li>
  <li><strong>Stationnement</strong> : un T2 sans place de parking en sous-sol perd 5 à 8 % de valeur — beaucoup de locataires viennent en voiture pour Michelin / Limagrain.</li>
  <li><strong>DPE</strong> : éviter les biens classés F-G, la décote de revente atteint 10-15 % et la location sera interdite progressivement.</li>
</ul>

<h2>Qui doit investir à Cournon</h2>
<p>Profil idéal : investisseur avec un budget 100-150 k€, qui cherche un premier ou deuxième investissement locatif sécurisé, sans complexité (pas de meublé saisonnier, pas de colocation à monter), avec un rendement régulier de 5-5,5 %. La proximité immédiate de Clermont permet aussi de gérer en direct sans agence.</p>

${CTA("à Cournon-d'Auvergne et dans la métropole clermontoise")}
`,
  },

  // ---------------------------------------------------------------------------
  // 25. Vendre DPE F-G Clermont — stratégie 2026
  // ---------------------------------------------------------------------------
  {
    slug: "vendre-bien-dpe-f-g-clermont-strategie-2026",
    title: "Vendre un bien DPE F ou G à Clermont : stratégie et prix réels 2026",
    description:
      "DPE F ou G à Clermont : décote 10-20%, acheteurs cibles, devis travaux préparés, timing avant interdiction location. Stratégie de vente 2026.",
    theme: "vendeur",
    datePublished: "2025-04-10",
    readTime: 7,
    featured: false,
    content: `
<p>Vendre un bien classé F ou G à Clermont-Ferrand en 2026 n'est pas mission impossible — mais c'est un autre métier que vendre un bien classé C ou D. Les acheteurs sont moins nombreux, plus exigeants, mieux informés, et la fenêtre réglementaire se referme. Voici la stratégie de mise en vente que nous appliquons chez CBF Conseils sur ce type de bien.</p>

<h2>La décote réelle observée à Clermont en 2026</h2>
<p>Sur les ventes que nous avons accompagnées et les données DVF récentes, la décote moyenne d'un bien F-G par rapport à un bien équivalent classé C-D s'établit à :</p>
<ul>
  <li><strong>Quartiers tendus (Jaude, Delille, Chamalières)</strong> : -8 à -12 %. La rareté absorbe une partie du handicap énergétique.</li>
  <li><strong>Quartiers résidentiels moyens (Beaumont, Aubière, Montferrand hors hyper-centre)</strong> : -12 à -16 %.</li>
  <li><strong>Quartiers tendance baissière (Croix-de-Neyrat, Brézet, Champratel)</strong> : -15 à -20 %, jusqu'à -25 % sur les biens grande surface impossibles à rénover sans gros budget.</li>
</ul>
<p>Exemple concret 2026 : un T2 de 48 m² près de la Gare, prix médian classique 110 k€, classé G → vendu <strong>92 000 €</strong>, soit -16 %, soit -18 k€ de moins-value sur le prix de marché.</p>

<h2>Qui sont les acheteurs qui restent sur ce segment</h2>
<p>Trois profils d'acheteurs ne fuient pas un DPE F ou G :</p>
<ol>
  <li><strong>Investisseurs spécialistes "passoires"</strong> : ils savent chiffrer la rénovation, intègrent les aides MaPrimeRénov' et les CEE, et achètent à prix décoté pour récupérer la valeur après travaux.</li>
  <li><strong>SCI rénovation</strong> : structures qui achètent en lot, rénovent, et revendent ou louent. Très actives à Clermont sur les T2-T3 entre 80 et 130 k€.</li>
  <li><strong>Acheteurs résidentiels avec capacité travaux</strong> : couples qui veulent un bien dans un quartier convoité (Jaude, Montferrand) et acceptent d'engager 25-50 k€ de rénovation pour passer en classe C-D.</li>
</ol>

<h2>La stratégie : tout préparer à l'avance</h2>
<p>Le réflexe perdant : mettre le bien en vente brut, "tel quel", sans information complémentaire. Le réflexe gagnant : <strong>fournir d'avance les devis et le scénario de rénovation</strong>.</p>
<p>Concrètement, avant la mise en vente, faire intervenir :</p>
<ul>
  <li>Un <strong>audit énergétique</strong> (obligatoire pour F-G en monopropriété depuis 2023) qui chiffre les travaux pour passer en classe C ou D.</li>
  <li><strong>2-3 devis d'entreprises locales</strong> (isolation combles, murs, fenêtres, chauffage). Demander des entreprises RGE pour que l'acheteur puisse prétendre aux aides.</li>
  <li>Un <strong>simulateur MaPrimeRénov'</strong> rempli pour le profil acheteur médian.</li>
</ul>
<p>Ce dossier transforme le bien : l'acheteur ne voit plus une "passoire à fuir" mais un projet chiffré, finançable, et négociable au juste prix.</p>

<h2>Le timing : la fenêtre réglementaire 2025</h2>
<p>Calendrier en vigueur :</p>
<ul>
  <li><strong>1er janvier 2025</strong> : interdiction de location pour les G les plus énergivores (>450 kWh/m²/an).</li>
  <li><strong>1er janvier 2028</strong> : interdiction de location pour tous les F.</li>
  <li><strong>1er janvier 2034</strong> : interdiction de location pour les E.</li>
</ul>
<p>Pour un bien G investisseur destiné à la location, vendre <strong>avant 2025</strong> permettait d'éviter la décote "interdiction". En 2026, le marché a déjà intégré cette donnée : un G locatif a perdu sa valeur "rendement" et n'a plus que sa valeur "résidentiel après travaux". D'où une décote plus marquée mais désormais stabilisée.</p>

<h2>Le prix d'affichage : ne pas surévaluer</h2>
<p>L'erreur classique consiste à afficher le prix marché plein en pensant "négocier ensuite". Sur un F-G, le bien ne génère aucune visite, perd sa fraîcheur d'annonce, et finira vendu encore plus bas après 4-6 mois. La méthode CBF :</p>
<ul>
  <li>Estimation du prix marché classe C-D (référence DVF).</li>
  <li>Décote 10-18 % selon quartier et travaux.</li>
  <li>Prix d'affichage = prix net visé +3 à 5 % de marge négo, pas plus.</li>
</ul>

<h2>Le rôle de CBF Conseils sur ce type de mandat</h2>
<p>Sur les biens F-G, notre rôle dépasse la simple commercialisation. Nous orchestrons l'audit énergétique, mobilisons notre réseau d'entreprises locales pour les devis, et qualifions les acheteurs en amont (capacité travaux, projet réel). Cela permet de signer plus vite (60-90 jours médian sur nos mandats F-G en 2026) et au bon prix.</p>

${CTA("sur votre bien DPE F ou G à Clermont")}
`,
  },

  // ---------------------------------------------------------------------------
  // 26. Prix m² Puy-de-Dôme hors Clermont — Issoire, Thiers, Brioude
  // ---------------------------------------------------------------------------
  {
    slug: "prix-m2-issoire-thiers-brioude-puy-de-dome",
    title: "Prix m² dans le Puy-de-Dôme hors Clermont : Issoire, Thiers, Brioude",
    description:
      "Issoire 1200-1700 €/m², Thiers 800-1300 €/m², Brioude 900-1400 €/m² : comparatif rendement, liquidité et prix d'entrée pour investir en 2026.",
    theme: "marche",
    datePublished: "2025-04-06",
    readTime: 7,
    featured: false,
    quartiers: ["issoire", "thiers", "brioude"],
    content: `
<p>Au-delà de Clermont-Ferrand et de sa première couronne, le Puy-de-Dôme et la Haute-Loire voisine offrent des marchés immobiliers dont la mécanique diffère radicalement du marché métropolitain. Issoire, Thiers, et Brioude (Haute-Loire mais bassin de vie cohérent avec le sud Puy-de-Dôme) attirent investisseurs et néo-ruraux, mais chacune avec ses propres règles. Tour d'horizon 2026.</p>

<h2>Issoire : la dynamique sud A75</h2>
<p><strong>Prix m² 2026 : 1 200 à 1 700 €/m²</strong> selon emplacement et état.</p>
<p>Issoire (~14 000 habitants) bénéficie d'une position géographique privilégiée : sortie A75, à 30 minutes au sud de Clermont, bassin d'emploi industriel (Constellium, sous-traitants aéronautiques, agroalimentaire), clinique régionale, lycées. Le marché est porté par :</p>
<ul>
  <li>Des familles primo-accédantes qui visent une <strong>maison avec jardin sous 250 k€</strong>.</li>
  <li>Des cadres clermontois travaillant à mi-distance (Issoire ↔ Clermont en 25 min).</li>
  <li>Quelques investisseurs locatifs (T2-T3 autour de 90-130 k€, loyers 480-600 €).</li>
</ul>
<p>La liquidité y est correcte, avec un délai de vente médian autour de <strong>110 jours</strong>. Le centre ancien (place de la République, abbatiale Saint-Austremoine) offre des biens de cachet à des prix très accessibles, mais demande un audit énergétique attentif (DPE souvent E-F).</p>

<h2>Thiers : le grand écart entre rendement et liquidité</h2>
<p><strong>Prix m² 2026 : 800 à 1 300 €/m²</strong>.</p>
<p>Thiers (~10 700 habitants), capitale française de la coutellerie, est un cas particulier. La ville haute, accrochée à la Durolle, offre un patrimoine industriel et urbain unique mais souffre d'une démographie déclinante depuis 30 ans. Conséquence sur le marché immobilier :</p>
<ul>
  <li><strong>Rendements bruts spectaculaires</strong> : T2 acheté 50-70 k€, loyer 380-450 € → rendement brut 6,8 à 8,5 %.</li>
  <li><strong>Mais vacance locative très élevée</strong> : 10 à 20 semaines/an dans certains secteurs.</li>
  <li><strong>Liquidité dégradée à la revente</strong> : délai médian 180-220 jours, certains biens restent 2 ans en vente.</li>
</ul>
<p>Thiers attire deux profils : l'investisseur expérimenté qui sait analyser rue par rue et accepte une vacance importante en échange d'un rendement courant élevé ; et l'acheteur résidentiel séduit par le coutelier patrimoine et le coût de la vie. Pour un primo-investisseur, c'est un marché à éviter sans accompagnement local.</p>

<h2>Brioude : le calme absolu de la Haute-Loire</h2>
<p><strong>Prix m² 2026 : 900 à 1 400 €/m²</strong>.</p>
<p>Brioude (~6 700 habitants), au sud du bassin clermontois mais administrativement en Haute-Loire, est dominée par sa basilique Saint-Julien (l'une des plus grandes églises romanes d'Europe). Le marché y est calme, peu spéculatif :</p>
<ul>
  <li>Maisons de centre-ville en pierre : 80-160 k€ pour 90-120 m².</li>
  <li>Appartements : rares, 100-150 k€ pour un T3.</li>
  <li>Terrains constructibles : 20-40 €/m² selon zone.</li>
</ul>
<p>Brioude convient aux retraités, aux télétravailleurs (fibre déployée, gare TER vers Clermont en 1h30) et aux acheteurs de résidence secondaire. Pas un marché d'investisseur : la liquidité à la revente est faible, les loyers très bas (350-450 € pour un T3), et la demande locative quasi inexistante hors saisonnier.</p>

<h2>Comparatif sur 3 critères clés</h2>
<h3>Prix d'entrée</h3>
<ul>
  <li><strong>Plus accessible</strong> : Thiers (T2 dès 50 k€).</li>
  <li><strong>Médian</strong> : Brioude (~100 k€ T3) et Issoire (~120 k€ T2).</li>
</ul>
<h3>Rendement locatif brut</h3>
<ul>
  <li><strong>Le plus haut</strong> : Thiers (6,8 - 8,5 %).</li>
  <li><strong>Médian</strong> : Issoire (5 - 6 %).</li>
  <li><strong>Faible et risqué</strong> : Brioude (4 - 5 %, vacance forte).</li>
</ul>
<h3>Liquidité à la revente</h3>
<ul>
  <li><strong>Bonne</strong> : Issoire (~110 j).</li>
  <li><strong>Moyenne</strong> : Brioude (~140 j sur biens calibrés).</li>
  <li><strong>Mauvaise</strong> : Thiers (180-220 j, parfois plus).</li>
</ul>

<h2>Notre conseil pour 2026</h2>
<p>Issoire est le bon arbitrage prix/rendement/liquidité pour un investisseur méthodique. Thiers est un terrain de spécialistes — gros rendement, mais ne pas y mettre tout son patrimoine. Brioude est avant tout un projet de vie, pas un projet d'investissement. Pour Clermontois en quête de plus grand, Issoire reste l'option la plus crédible avec une vraie revente possible.</p>

${CTA("à Issoire, Thiers, Brioude et dans le Puy-de-Dôme")}
`,
  },

  // ---------------------------------------------------------------------------
  // 27. Défiscalisation Clermont 2026 — Pinel, Denormandie, nu-propriété
  // ---------------------------------------------------------------------------
  {
    slug: "defiscalisation-immobilier-clermont-ferrand-2026-pinel-denormandie",
    title: "Défiscalisation immobilière à Clermont en 2026 : Pinel, Denormandie, nu-propriété",
    description:
      "Pinel fin de vie, Denormandie Montferrand, nu-propriété : quelle défisc immobilière à Clermont en 2026 ? Exemple chiffré T2 et alertes.",
    theme: "investissement",
    datePublished: "2025-04-02",
    readTime: 8,
    featured: false,
    content: `
<p>Clermont-Ferrand est classée <strong>zone B1</strong> au zonage A/B/C de l'investissement locatif. Cette classification ouvre l'accès à plusieurs dispositifs de défiscalisation immobilière, mais 2026 marque une bascule importante : la fin programmée du Pinel et la montée en puissance des dispositifs alternatifs (Denormandie, nu-propriété, déficit foncier). Tour d'horizon de ce qui marche encore et de ce qu'il faut éviter.</p>

<h2>Pinel : la fin annoncée</h2>
<p>Le dispositif Pinel s'éteint définitivement le <strong>31 décembre 2024</strong> (les acquisitions doivent être engagées avant cette date pour bénéficier des taux 2024). En 2026, on ne peut plus acquérir neuf un bien avec engagement Pinel. Restent les programmes signés en 2024 dont les actes notariés sont en cours.</p>
<p>Pour mémoire, les taux Pinel 2024 sur Clermont (zone B1) étaient :</p>
<ul>
  <li>9 % du prix sur 6 ans.</li>
  <li>12 % sur 9 ans.</li>
  <li>14 % sur 12 ans.</li>
</ul>
<p>Les opérations Pinel signées avant fin 2024 et qui se livrent en 2026-2027 continuent de produire leurs effets fiscaux. Pour les nouveaux investissements en 2026, c'est terminé.</p>

<h2>Denormandie : le dispositif phare 2026 à Clermont</h2>
<p>Le <strong>dispositif Denormandie</strong> est l'équivalent Pinel pour l'<strong>ancien à rénover</strong>. Il est applicable à Clermont-Ferrand qui figure parmi les villes éligibles (programme "Action cœur de ville" et zones similaires).</p>
<p>Conditions principales :</p>
<ul>
  <li>Acheter un bien ancien dans le périmètre éligible de Clermont (cœur historique, Montferrand, Gare, Fontgiève notamment).</li>
  <li>Réaliser des <strong>travaux représentant au moins 25 %</strong> du coût total de l'opération.</li>
  <li>Atteindre une performance énergétique post-travaux (DPE D minimum, deux classes de progrès).</li>
  <li>Louer nu, à titre de résidence principale, pendant 6, 9 ou 12 ans, avec plafonds de loyer et de ressources locataire.</li>
</ul>
<p>Réduction d'impôt identique au Pinel : <strong>9 % / 12 % / 14 %</strong> selon durée, calculée sur le coût total (achat + travaux), plafonné à 300 000 €.</p>

<h3>Exemple chiffré : T2 Montferrand</h3>
<ul>
  <li>Achat : T2 de 45 m² rue de la Rodade, <strong>120 000 €</strong> frais inclus.</li>
  <li>Travaux : isolation, fenêtres, chaudière, salle de bains = <strong>40 000 €</strong> (33 % de l'opération, OK).</li>
  <li>Coût total : 160 000 €.</li>
  <li>Engagement 9 ans → <strong>réduction d'impôt : 19 200 €</strong>, soit ~2 130 €/an pendant 9 ans.</li>
  <li>Loyer plafonné Denormandie zone B1 : ~10,50 €/m² → 470 €/mois.</li>
  <li>Rendement brut sur opération totale : ~3,5 % + économie d'impôt 2 130 €/an.</li>
</ul>
<p>Le Denormandie est intéressant pour un contribuable qui paie 4 000 €+ d'impôt sur le revenu et qui achète un bien dont le projet de rénovation tient debout indépendamment de la fiscalité.</p>

<h2>Nu-propriété : la défisc indirecte</h2>
<p>L'achat en <strong>nu-propriété</strong> consiste à acheter un bien dont l'usufruit (droit de louer / habiter) est cédé à un bailleur institutionnel pour 15-20 ans. L'acheteur paie le bien <strong>30 à 40 % moins cher</strong> que le prix marché. Pendant la durée du démembrement, il ne perçoit rien — mais il ne paie ni IFI sur le bien, ni impôt sur le loyer (puisqu'il n'y en a pas).</p>
<p>Au terme du démembrement, l'investisseur récupère la pleine propriété, sans frais, et le bien est généralement remis en bon état par l'usufruitier. C'est un placement patrimonial pur, particulièrement adapté aux contribuables fortement imposés ou aux investisseurs en recherche de patrimoine sans gestion.</p>
<p>À Clermont, quelques programmes nu-propriété sortent dans les quartiers Cézeaux, Pardieu, Beaumont. Décote moyenne observée 2026 : <strong>32 à 38 %</strong> selon durée.</p>

<h2>Comparaison rendement nu vs Denormandie</h2>
<ul>
  <li><strong>Locatif nu classique (sans dispositif)</strong> à Clermont : rendement brut 4 à 5 %, fiscalité IR + prélèvements sociaux pleine.</li>
  <li><strong>Denormandie</strong> : rendement brut ~3,5 % + 1,3-1,5 % d'économie d'impôt sur la durée.</li>
  <li><strong>Nu-propriété 15 ans</strong> : 0 % de rendement courant mais +30 % de plus-value mécanique au terme.</li>
</ul>
<p>Pour un investisseur jeune en phase de constitution patrimoniale et avec une fiscalité moyenne, le locatif nu classique reste souvent le plus simple et le plus performant. Denormandie et nu-propriété ne deviennent vraiment pertinents qu'au-delà de 5 000 € d'IR annuel.</p>

<h2>L'avertissement essentiel</h2>
<p><strong>Ne jamais acheter un mauvais bien pour la réduction fiscale.</strong> C'est l'erreur que nous corrigeons régulièrement chez CBF Conseils. Un T2 mal placé, dans une copropriété fragile ou un quartier sans demande locative, ne sera pas sauvé par 2 000 € d'économie d'impôt. À l'inverse, un bon bien sans dispositif fiscal vaudra toujours mieux qu'un mauvais bien avec Pinel ou Denormandie.</p>

<h2>La méthode CBF Conseils</h2>
<p>Sur ce type d'investissement, notre approche est fixe : nous sélectionnons d'abord le bien sur ses fondamentaux (emplacement, copropriété, marché locatif réel, état technique), <strong>puis seulement</strong> nous regardons si le dispositif fiscal s'y applique avantageusement. Jamais l'inverse. Cela élimine 80 % des programmes Denormandie qui nous sont présentés et permet à nos clients d'investir sereinement.</p>

${CTA("sur un projet de défiscalisation à Clermont-Ferrand")}
`,
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByTheme(theme: ArticleTheme): Article[] {
  return articles.filter((a) => a.theme === theme);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

/** Renvoie les `n` articles liés au thème, hors slug courant. */
export function getRelatedArticles(currentSlug: string, n = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articles.slice(0, n);
  const sameTheme = articles.filter(
    (a) => a.slug !== currentSlug && a.theme === current.theme
  );
  if (sameTheme.length >= n) return sameTheme.slice(0, n);
  const others = articles.filter(
    (a) => a.slug !== currentSlug && a.theme !== current.theme
  );
  return [...sameTheme, ...others].slice(0, n);
}

/** Renvoie 3 articles pertinents pour une page quartier (heuristique simple). */
/**
 * Mapping slug quartier → slugs articles prioritaires.
 * Permet d'afficher des articles vraiment liés au quartier (pas les mêmes 3 partout).
 */
const QUARTIER_ARTICLES: Record<string, string[]> = {
  // Centre premium
  "clermont-ferrand-jaude": ["vendre-jaude-delille-comparaison-2025", "prix-m2-montferrand-vs-jaude-decryptage-ecart", "surestimer-bien-piege-vendeurs-clermont"],
  "clermont-ferrand-delille": ["vendre-jaude-delille-comparaison-2025", "prix-immobilier-clermont-ferrand-2025-analyse-quartier", "estimer-appartement-clermont-ferrand-5-criteres"],
  // Montferrand / historique
  "clermont-ferrand-montferrand": ["prix-m2-montferrand-vs-jaude-decryptage-ecart", "5-quartiers-qui-montent-clermont-ferrand-2025", "estimer-appartement-clermont-ferrand-5-criteres"],
  // Communes premium
  "chamalieres": ["vivre-chamalieres-vs-clermont-analyse", "prix-immobilier-clermont-ferrand-2025-analyse-quartier", "vendre-exclusivite-multi-mandat-clermont"],
  "beaumont": ["vivre-chamalieres-vs-clermont-analyse", "prix-immobilier-clermont-ferrand-2025-analyse-quartier", "acheter-clermont-ferrand-2025-quel-quartier-pour-quel-profil"],
  "royat": ["vivre-chamalieres-vs-clermont-analyse", "prix-immobilier-clermont-ferrand-2025-analyse-quartier", "investir-neuf-ancien-clermont-comparatif"],
  // Secteurs étudiants / hospitaliers
  "clermont-ferrand-cezeaux": ["studio-t2-clermont-investissement-locatif-rentable", "rendement-locatif-quartier-clermont-classement-2025", "investir-pres-chu-clermont-bon-plan-locatif-medical"],
  "clermont-ferrand-saint-jacques": ["investir-pres-chu-clermont-bon-plan-locatif-medical", "studio-t2-clermont-investissement-locatif-rentable", "combien-louer-appartement-clermont-ferrand-quartier"],
  // Gare / transition
  "clermont-ferrand-gare": ["5-quartiers-qui-montent-clermont-ferrand-2025", "acheter-clermont-ferrand-2025-quel-quartier-pour-quel-profil", "dpe-immobilier-clermont-decote-bien-classe-f"],
  // La Pardieu
  "clermont-ferrand-la-pardieu": ["investir-la-pardieu-opportunite-piege", "5-quartiers-qui-montent-clermont-ferrand-2025", "rendement-locatif-quartier-clermont-classement-2025"],
  // Communes agglo
  "aubiere": ["acheter-clermont-ferrand-2025-quel-quartier-pour-quel-profil", "rendement-locatif-quartier-clermont-classement-2025", "investir-neuf-ancien-clermont-comparatif"],
  "cournon-dauvergne": ["acheter-clermont-ferrand-2025-quel-quartier-pour-quel-profil", "investir-neuf-ancien-clermont-comparatif", "dpe-immobilier-clermont-decote-bien-classe-f"],
  "riom": ["prix-immobilier-clermont-ferrand-2025-analyse-quartier", "acheter-clermont-ferrand-2025-quel-quartier-pour-quel-profil", "investir-neuf-ancien-clermont-comparatif"],
};

export function getArticlesForQuartier(slug: string): Article[] {
  const result: Article[] = [];

  // 1. Articles spécifiques au quartier (mapping direct)
  const prioritySlugsList = QUARTIER_ARTICLES[slug] ?? [];
  for (const articleSlug of prioritySlugsList) {
    const found = articles.find((a) => a.slug === articleSlug);
    if (found && !result.includes(found)) result.push(found);
  }

  // 2. Articles matchant le nom du quartier dans leur slug
  const quartierKeywords = slug.replace("clermont-ferrand-", "").split("-").filter(Boolean);
  for (const a of articles) {
    if (result.length >= 3) break;
    if (result.includes(a)) continue;
    const matches = quartierKeywords.some(
      (kw) => kw.length > 3 && (a.slug.includes(kw) || a.title.toLowerCase().includes(kw))
    );
    if (matches) result.push(a);
  }

  // 3. Fallback généraliste par thème si pas assez de résultats
  const fallbackThemes: ArticleTheme[] = ["marche", "vendeur", "investissement", "acheteur", "location"];
  for (const theme of fallbackThemes) {
    if (result.length >= 3) break;
    const found = articles.find((a) => a.theme === theme && !result.includes(a));
    if (found) result.push(found);
  }

  return result.slice(0, 3);
}

export const ARTICLE_THEMES: { id: ArticleTheme; label: string }[] = [
  { id: "vendeur", label: "Vendeur" },
  { id: "acheteur", label: "Acheteur" },
  { id: "investissement", label: "Investissement" },
  { id: "location", label: "Location & Gestion" },
  { id: "marche", label: "Marché" },
];

/**
 * Image de couverture par thème — photos libres de droit (Unsplash).
 * Utilisée sur les cards blog et l'article featured. Taille optimisée pour
 * un rendu en aspect-video (rapport 16/9).
 */
const ARTICLE_FALLBACK_IMAGES: Record<ArticleTheme, string> = {
  // Vue de nuit (analyse marché)
  marche:
    "https://images.unsplash.com/photo-1639736161901-a3da485ebe59?w=1200&q=80&auto=format&fit=crop",
  // Rue de Clermont (acheteur — pratique du quotidien)
  acheteur:
    "https://images.unsplash.com/photo-1650056221902-3972989f2d19?w=1200&q=80&auto=format&fit=crop",
  // Rue de Clermont (vendeur — pratique du quotidien)
  vendeur:
    "https://images.unsplash.com/photo-1650056221902-3972989f2d19?w=1200&q=80&auto=format&fit=crop",
  // Rue de Clermont (location — pratique du quotidien)
  location:
    "https://images.unsplash.com/photo-1650056221902-3972989f2d19?w=1200&q=80&auto=format&fit=crop",
  // Puy de Dôme (investissement — territoire/horizon long)
  investissement:
    "https://images.unsplash.com/photo-1493339424841-c97be3525f8f?w=1200&q=80&auto=format&fit=crop",
};

const ARTICLE_DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1692098075085-a459c8331df5?w=1200&q=80&auto=format&fit=crop";

/** Renvoie l'URL de la thumbnail pour un article (selon son thème). */
export function getArticleImage(theme: ArticleTheme | string): string {
  return (
    ARTICLE_FALLBACK_IMAGES[theme as ArticleTheme] ?? ARTICLE_DEFAULT_IMAGE
  );
}
