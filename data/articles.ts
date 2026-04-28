// data/articles.ts — Source de vérité du blog prixm² Clermont-Ferrand
// Chaque article : ~800-1500 mots, ton expert, factuel, CTA discret en fin de contenu.

export type ArticleTheme =
  | "vendeur"
  | "acheteur"
  | "investissement"
  | "location"
  | "marche";

export interface Article {
  slug: string;
  title: string;
  description: string; // 130-160 caractères
  theme: ArticleTheme;
  datePublished: string; // ISO YYYY-MM-DD
  readTime: number; // minutes
  featured: boolean;
  /** HTML riche : h2/h3, p, ul/li, strong, em. Pas de <html>/<body>. */
  content: string;
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
    title: "Prix immobilier Clermont-Ferrand 2025 : analyse complète par quartier",
    description:
      "Le panorama complet des prix m² par quartier à Clermont-Ferrand en 2025 : Jaude, Montferrand, Cézeaux, Beaumont, Chamalières. Données, écarts, dynamique.",
    theme: "marche",
    datePublished: "2025-04-12",
    readTime: 9,
    featured: true,
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
    title: "Vendre à Jaude vs Delille : quel secteur prime en 2025 ?",
    description:
      "Jaude ou Delille à Clermont-Ferrand : quel quartier valorise le mieux votre bien en 2025 ? Comparatif prix, délai, profil acheteur.",
    theme: "vendeur",
    datePublished: "2025-04-04",
    readTime: 6,
    featured: false,
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
      "DPE F ou G à Clermont-Ferrand : décote, interdiction de louer, négociation. Les chiffres réels du marché clermontois 2025.",
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
    title: "Durée de vente à Clermont-Ferrand par quartier : les chiffres réels 2025",
    description:
      "Combien de jours pour vendre un appartement à Clermont en 2025 ? Délais réels par quartier — Jaude, Cézeaux, Aubière, Beaumont. Méthode CBF.",
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
      "Pourquoi surévaluer son bien à Clermont-Ferrand fait perdre 5 à 15 % au prix final, et comment éviter ce piège classique du marché 2025.",
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
      "Pourquoi Montferrand coûte 15 % de moins que Jaude alors que les biens y sont parfois plus beaux. Analyse de l'écart de prix Clermont 2025.",
    theme: "marche",
    datePublished: "2025-03-12",
    readTime: 6,
    featured: false,
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
    title: "Acheter à Clermont-Ferrand en 2025 : quel quartier pour quel profil ?",
    description:
      "Famille, jeune actif, retraité, investisseur : quel quartier de Clermont-Ferrand vous correspond ? Guide expert par profil acheteur 2025.",
    theme: "acheteur",
    datePublished: "2025-04-10",
    readTime: 8,
    featured: true,
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
      "Les 5 quartiers qui prennent de la valeur à Clermont-Ferrand en 2025, et 3 secteurs à manier avec précaution. Analyse marché.",
    theme: "acheteur",
    datePublished: "2025-04-06",
    readTime: 7,
    featured: true,
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
      "Neuf vs ancien à Clermont-Ferrand : prix, fiscalité, frais, rendement, plus-value. Le comparatif factuel pour décider en 2025.",
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
      "Chamalières ou Clermont-Ferrand centre : où vivre en 2025 ? Comparaison prix m², écoles, services, mobilité, fiscalité.",
    theme: "acheteur",
    datePublished: "2025-03-25",
    readTime: 6,
    featured: false,
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
    title: "Rendement locatif par quartier à Clermont-Ferrand : classement 2025",
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
      "Le secteur du CHU à Clermont-Ferrand : pourquoi c'est un des meilleurs spots locatifs de la ville en 2025. Profils, loyers, rendements.",
    theme: "investissement",
    datePublished: "2025-04-01",
    readTime: 6,
    featured: false,
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
      "Studio ou T2 à Clermont-Ferrand pour de l'investissement locatif ? Le comparatif rendement, vacance, gestion, fiscalité 2025.",
    theme: "investissement",
    datePublished: "2025-03-26",
    readTime: 6,
    featured: false,
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
      "La Pardieu à Clermont-Ferrand : analyse complète d'un quartier en transformation. Prix, loyers, rendement, points d'attention pour investir en 2025.",
    theme: "investissement",
    datePublished: "2025-03-20",
    readTime: 6,
    featured: false,
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
      "Loyers médians par quartier à Clermont-Ferrand : studio, T2, T3, maison. Données 2025 et tendances pour bien fixer votre loyer.",
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
      "Gestion locative en propre ou via une agence à Clermont-Ferrand : coûts, gain de temps, sécurité juridique. Le comparatif 2025.",
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
      "Les 3 assurances essentielles d'un bailleur à Clermont-Ferrand : PNO, GLI, vacance. Couvertures, prix, conditions 2025.",
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
      "Bail nu, meublé, mobilité, étudiant à Clermont-Ferrand : durée, fiscalité, profil locataire, rentabilité. Le guide bailleur 2025.",
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
    title: "Encadrement des loyers à Clermont-Ferrand : ce que dit la loi en 2025",
    description:
      "Clermont-Ferrand est-elle concernée par l'encadrement des loyers ? IRL, plafonds, zones tendues. Le point réglementaire 2025.",
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
export function getArticlesForQuartier(slug: string): Article[] {
  // Heuristique : on prend des articles vendeur + marché + investissement.
  const buckets: ArticleTheme[] = ["vendeur", "marche", "investissement"];
  const picks: Article[] = [];
  for (const theme of buckets) {
    const found = articles.find(
      (a) => a.theme === theme && !picks.includes(a)
    );
    if (found) picks.push(found);
  }
  // Si on a moins de 3 articles, complète.
  if (picks.length < 3) {
    for (const a of articles) {
      if (!picks.includes(a)) picks.push(a);
      if (picks.length === 3) break;
    }
  }
  // Note : le `slug` est passé pour permettre une amélioration future
  // (ex : choix d'articles spécifiques selon le quartier).
  void slug;
  return picks;
}

export const ARTICLE_THEMES: { id: ArticleTheme; label: string }[] = [
  { id: "vendeur", label: "Vendeur" },
  { id: "acheteur", label: "Acheteur" },
  { id: "investissement", label: "Investissement" },
  { id: "location", label: "Location & Gestion" },
  { id: "marche", label: "Marché" },
];
