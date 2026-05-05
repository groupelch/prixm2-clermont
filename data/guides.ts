export interface Guide {
  slug: string;
  titre: string;
  description: string;
  categorie: "vendeur" | "acheteur" | "investisseur" | "marche";
  tempsLecture: string;
  datePublication: string;
  contenu: string; // markdown-like / HTML simplifié
  faq?: { question: string; reponse: string }[];
}

export const guides: Guide[] = [
  {
    slug: "vendre-appartement-clermont-ferrand",
    titre: "Comment vendre son appartement à Clermont-Ferrand en 2025",
    description:
      "Guide complet pour vendre rapidement et au bon prix votre appartement à Clermont-Ferrand : estimation, mise en valeur, négociation et délais.",
    categorie: "vendeur",
    tempsLecture: "8 min",
    datePublication: "2025-01-15",
    contenu: `
## Pourquoi 2025 est une année charnière à Clermont-Ferrand

Le marché clermontois entre dans une phase de stabilisation après deux années de tensions liées à la remontée des taux. Les acheteurs sont de retour, mais ils sont sélectifs : ils privilégient les biens bien positionnés, lumineux, peu énergivores. Vendre vite et bien suppose donc une stratégie précise.

## Étape 1 — Estimer juste, dès le départ

L'erreur la plus coûteuse en 2025 : surestimer son bien. Sur Clermont-Ferrand, un bien affiché 10 % au-dessus du marché met 2 à 3 fois plus de temps à se vendre, et finit souvent par partir sous le prix de marché. À l'inverse, un bien bien positionné dès le départ déclenche plusieurs visites en quelques jours.

Trois sources à croiser : les ventes notariales DVF (open data), les annonces actives sur votre quartier, et l'avis d'un agent local qui connaît le terrain. Notre outil d'estimation gratuite s'appuie sur ces trois leviers.

## Étape 2 — Soigner la mise en valeur

Un appartement vide ou encombré perd 5 à 8 % de sa valeur perçue. Investir 500 à 1 500 € en home staging léger (peinture, désencombrement, photos pro) peut faire gagner 10 000 à 20 000 € à la vente, avec un délai raccourci.

Les photos professionnelles sont devenues incontournables : 9 acheteurs sur 10 trient les annonces sur la qualité visuelle avant même de cliquer.

## Étape 3 — Anticiper les diagnostics

Le DPE est l'élément qui fait fuir le plus rapidement les acheteurs en 2025. Un bien classé F ou G perd souvent 10 à 15 % de valeur, et certains biens classés G ne sont plus louables. Si possible, faire les diagnostics en amont vous permet de connaître votre situation et d'anticiper le discours auprès des acheteurs.

## Étape 4 — Choisir le bon canal de diffusion

Sur Clermont-Ferrand, les portails majeurs restent SeLoger, Leboncoin, Bien'ici. Une diffusion exclusive via une agence locale qui maîtrise ces canaux et son fichier d'acheteurs qualifiés génère souvent des visites plus rapides qu'une vente entre particuliers.

## Étape 5 — Négocier sans se brader

La marge de négociation moyenne à Clermont-Ferrand est de 4 à 6 % en 2025. Plutôt que d'afficher un prix gonflé, mieux vaut afficher un prix juste avec une marge de discussion réaliste. Cela permet de conclure rapidement et d'éviter de voir son bien "vieillir" sur le marché.

## Combien de temps pour vendre ?

Sur Clermont-Ferrand, le délai moyen est de 60 jours en 2025, avec d'importantes disparités par quartier :
- Centre-Ville et Jaude : 45-55 jours
- Beaumont, Oradou : 50-55 jours
- Quartiers secondaires (La Plaine, Chanturgue) : 70-80 jours

## Conclusion

Vendre vite et bien à Clermont-Ferrand en 2025, c'est avant tout estimer juste, soigner sa présentation, anticiper les diagnostics et bien choisir son canal. Demandez votre estimation gratuite : nos experts CBF Conseils analysent votre bien sous 48h.
`,
    faq: [
      {
        question: "Combien de temps pour vendre un appartement à Clermont-Ferrand ?",
        reponse: "60 jours en moyenne, mais cela varie de 45 à 80 jours selon le quartier et la qualité du bien.",
      },
      {
        question: "Faut-il faire les diagnostics avant de mettre en vente ?",
        reponse: "Oui, surtout le DPE : c'est aujourd'hui le critère n°1 de tri des acheteurs.",
      },
    ],
  },
  {
    slug: "estimation-bien-immobilier-clermont",
    titre: "Estimation immobilière à Clermont-Ferrand : la méthode complète",
    description:
      "Comment estimer correctement un bien immobilier à Clermont-Ferrand : méthodes, critères, outils et erreurs à éviter.",
    categorie: "vendeur",
    tempsLecture: "10 min",
    datePublication: "2025-01-22",
    contenu: `
## Pourquoi l'estimation est l'étape décisive

Une estimation juste, c'est 80 % du succès d'une vente. Surévaluer fait fuir les acheteurs, sous-évaluer fait perdre de l'argent. L'enjeu : trouver le prix qui déclenche les visites tout en optimisant la valeur.

## Les 3 méthodes d'estimation

### 1. La méthode comparative

C'est la plus utilisée. Elle consiste à comparer votre bien à des biens similaires (surface, quartier, état) vendus récemment. À Clermont-Ferrand, les notaires publient les ventes via la base DVF, accessible gratuitement.

Limites : sur des biens atypiques ou des micro-quartiers peu actifs, les comparables manquent.

### 2. La méthode par capitalisation (locatif)

Pour un bien à vocation locative : on calcule la rentabilité brute attendue à partir des loyers du marché, et on en déduit un prix cohérent pour un investisseur.

À Clermont-Ferrand en 2025, les rendements bruts cibles sont :
- Studio Cézeaux : 5,5-6,5 %
- T2 Centre-Ville : 5-5,5 %
- T3 quartier résidentiel : 4,5-5 %

### 3. La méthode par le coût de reconstruction

Réservée aux biens neufs ou très atypiques. Le prix est calculé à partir du prix du terrain + coût de construction + marge.

## Les critères qui font varier le prix

À Clermont-Ferrand, voici les principaux leviers de valorisation :

- **Quartier** : écart de 1 à 1,5 entre Beaumont/Chamalières et La Plaine/Riom
- **Étage** : un dernier étage avec ascenseur vaut 5-10 % de plus qu'un RDC
- **Lumière** : exposition sud/ouest valorisée +5 %
- **DPE** : une classe E coûte -5 %, F/G coûte -10 à -15 %
- **Extérieur** : balcon +3 à 5 %, terrasse +8 à 12 %, jardin +15 à 25 %
- **Stationnement** : un garage en centre = +10 à 15 K€

## Les erreurs classiques

1. Comparer avec les prix d'annonces (souvent surévalués) au lieu des prix de vente effectifs
2. Ignorer le DPE
3. Oublier de pondérer la surface (m² loi Carrez vs surface utile)
4. Surestimer la valeur d'une rénovation récente

## Outils et ressources

- **DVF (Demandes de Valeurs Foncières)** : base officielle des ventes
- **Patrim** : outil notarial, accès via fisc
- **Estimation en ligne** : utile en première approche, à compléter par un avis local
- **CBF Conseils** : estimation gratuite par un agent qui visite votre bien

## Conclusion

L'estimation idéale combine méthode comparative DVF + connaissance du terrain par un professionnel local. Évitez les estimations purement automatiques : elles ratent les nuances qui font la différence à Clermont-Ferrand.
`,
  },
  {
    slug: "investir-immobilier-locatif-clermont-ferrand",
    titre: "Investir dans le locatif à Clermont-Ferrand : guide 2025",
    description:
      "Stratégies, quartiers cibles et rendements attendus pour investir dans l'immobilier locatif à Clermont-Ferrand.",
    categorie: "investisseur",
    tempsLecture: "11 min",
    datePublication: "2025-01-29",
    contenu: `
## Pourquoi Clermont-Ferrand attire les investisseurs

Clermont-Ferrand combine plusieurs atouts pour l'investissement locatif :
- Bassin universitaire de 39 000 étudiants (UCA + grandes écoles)
- Bassin d'emploi solide (Michelin, CHU, Limagrain, Vetagro Sup)
- Prix d'entrée raisonnables vs grandes métropoles (Lyon, Bordeaux)
- Rendements bruts entre 4,5 et 6,5 % selon les quartiers

## Les 3 stratégies principales

### Stratégie étudiante

Studios et T2 dans les quartiers Cézeaux, Aubière, Centre-Ville. Rendement brut visé : 5,5 à 6,5 %. Public : étudiants UCA, jeunes internes CHU, alternants Michelin.

Atouts : demande quasi-permanente, loyer toujours payé (garants parents).
Risques : dégradations possibles, rotation annuelle, vacance estivale.

### Stratégie jeune actif

T2 ou T3 en Centre-Ville, Salins, Saint-Jacques, Chamalières. Rendement visé : 4,5 à 5,5 %. Public : jeunes cadres Michelin, internes médecine, jeunes couples.

Atouts : locataires solvables, peu de turnover.
Risques : ticket d'entrée plus élevé, marge de négociation faible à l'achat.

### Stratégie famille / patrimoine

Maisons ou T4 à Beaumont, Cébazat, Romagnat. Rendement visé : 4 à 4,5 %. Public : familles, couples avec enfants.

Atouts : très faible vacance, locataires fidèles 5-10 ans.
Risques : ticket élevé (300-500 K€), travaux majeurs périodiques.

## Quartiers à surveiller en 2025

- **La Gare** : projet Pôle d'Échange Multimodal livré en 2027, valorisation attendue +15 à 20 % d'ici 2030
- **Aubière (Cézeaux)** : extension du tram B, rendements solides aujourd'hui
- **Riom** : alternative budget pour patrimonial, train direct 15 min

## Le calcul de rentabilité

### Rentabilité brute

Loyer annuel / prix d'achat × 100. C'est la base, mais elle ne reflète pas la rentabilité réelle.

### Rentabilité nette

Loyer annuel - charges - taxe foncière - assurance - gestion / (prix d'achat + frais notaire + travaux) × 100.

À Clermont-Ferrand, comptez 7-9 % de frais notaire, 8 % de gestion si vous déléguez, et environ 1-1,5 mois de loyer en charges/taxe foncière.

### Cashflow

Loyer mensuel - mensualité crédit - charges. Sur Clermont-Ferrand, un cashflow positif est possible sur des studios étudiants bien achetés, plus difficile sur des T3/T4.

## Régime fiscal

3 régimes principaux :
- **LMNP** (location meublée non professionnelle) : amortissement = impôt quasi-nul
- **Foncier réel** : déduction des travaux et intérêts, intéressant si gros travaux
- **Pinel** : neuf, plafonds de loyers, peu disponible sur Clermont en 2025

À optimiser avec un comptable spécialisé immo.

## Conclusion

Clermont-Ferrand reste un terrain d'investissement solide en 2025 : prix d'entrée raisonnables, demande locative dynamique, rendements supérieurs à Lyon ou Bordeaux. Le bon choix dépend de votre profil et de votre horizon.
`,
  },
  {
    slug: "marche-immobilier-clermont-ferrand-2025",
    titre: "Marché immobilier à Clermont-Ferrand : tendances et prévisions 2025",
    description:
      "Analyse du marché immobilier clermontois en 2025 : prix, volumes, tendances par secteur et perspectives.",
    categorie: "marche",
    tempsLecture: "9 min",
    datePublication: "2025-02-05",
    contenu: `
## Le marché clermontois en 2025

Après 18 mois de tension liée à la remontée des taux (passés de 1 % à 4,5 % entre 2022 et 2024), le marché clermontois entre en 2025 dans une phase de stabilisation. Les volumes redémarrent (+12 % au S2 2024), les prix se tiennent, l'offre s'élargit.

## Évolution des prix par segment

### Appartements anciens

Prix moyen : 2 280 €/m² (vs 2 210 €/m² en 2023, soit +3,2 %).

Le segment a tenu grâce à une offre limitée. Les biens classés A-D ont gagné 4 %, les classés E-F-G ont perdu 2 à 4 %.

### Maisons individuelles

Prix moyen : 2 800 €/m² (vs 2 690 €/m² en 2023, soit +4,1 %).

Demande très forte sur les maisons familiales avec jardin, peu d'offres : les délais raccourcissent (50 jours vs 70 jours fin 2023).

### Neuf

Prix moyen : 4 500 €/m² (programmes réduits depuis 2023).

L'offre neuve s'est effondrée : -45 % de mises en chantier en 2 ans. Les prix n'ont pas baissé, mais les promoteurs négocient plus de remises commerciales (frais notaire offerts, parking inclus).

## Tendances par secteur

| Secteur | Tendance 2024 | Perspective 2025 |
|---|---|---|
| Centre-Ville / Jaude | +3 à 4 % | Stable, biens premium tirent encore |
| Beaumont / Chamalières | +4 à 5 % | Stable haut de gamme |
| Cézeaux / Aubière | +2 à 3 % | Hausse modérée portée par la demande étudiante |
| Quartiers secondaires | +1 à 2 % | Stabilisation |
| Communes périphériques (Riom, Châtel) | +1 à 2 % | Stable |

## Volumes de transaction

3 800 transactions sur Clermont Métropole en 2024 (vs 3 400 en 2023). Le redémarrage est porté par :
- La détente des taux (4,5 % vers 3,5 % attendu en 2025)
- Le rebond des primo-accédants
- Le retour des investisseurs

## Le facteur DPE

C'est l'élément structurant du marché en 2025. Depuis l'interdiction de location des G en 2025 (puis F en 2028), les propriétaires bailleurs vendent massivement les passoires énergétiques.

Conséquence : dévalorisation marquée des classes F/G (-10 à -15 % vs équivalent classé D), valorisation des classes A-B (+5 %).

## Perspectives 2025

3 scénarios possibles :

### Scénario optimiste (taux 3 %, +15 % de transactions)
Hausse des prix de 4 à 6 %, marché tendu sur le bon stock.

### Scénario central (taux 3,5 %, +8 % de transactions)
Hausse modérée des prix (+2 à 4 %), équilibre offre/demande.

### Scénario pessimiste (taux >4 %, transactions stables)
Stagnation des prix, marché atone en attente d'arbitrages.

Le scénario central est aujourd'hui le plus probable selon les économistes du Crédit Agricole et de la Caisse d'Épargne.

## Conclusion

Clermont-Ferrand entre en 2025 dans un marché plus équilibré qu'en 2024. Bonne nouvelle pour les vendeurs raisonnables et les acheteurs prêts à se positionner. Le facteur DPE est central : ne le négligez pas.
`,
  },
  {
    slug: "frais-notaire-achat-immobilier-clermont",
    titre: "Frais de notaire à Clermont-Ferrand : calcul et astuces",
    description:
      "Tout ce qu'il faut savoir sur les frais de notaire à Clermont-Ferrand : calcul, négociation, optimisation.",
    categorie: "acheteur",
    tempsLecture: "7 min",
    datePublication: "2025-02-12",
    contenu: `
## Combien coûtent les frais de notaire ?

Sur l'achat d'un bien ancien à Clermont-Ferrand :
- 7 à 8 % du prix d'achat
- Dans le neuf : 2 à 3 %

Pour un appartement à 200 000 € :
- Ancien : ~16 000 € de frais
- Neuf : ~5 000 €

## Que comprennent ces frais ?

Contrairement à l'idée reçue, les "frais de notaire" ne vont pas dans la poche du notaire. Ils se décomposent ainsi :

- **Droits de mutation (DMTO)** : ~5,8 % — vont à l'État et au département
- **Émoluments du notaire** : ~1 % — c'est sa rémunération réelle
- **Débours** : ~0,2 % — frais administratifs
- **Contribution sécurité immobilière** : 0,1 %

## Comment réduire les frais ?

### Négocier sur les meubles

Si l'achat inclut du mobilier (cuisine équipée, électroménager…), vous pouvez les valoriser séparément du bien immobilier. Les frais de notaire ne s'appliquent qu'à la part immobilière.

Plafond raisonnable : 5 % du prix total. Au-delà, l'administration peut requalifier.

### Acheter dans le neuf

Frais réduits à 2-3 %, mais prix d'achat plus élevé (4 500 €/m² contre 2 280 €/m² en ancien à Clermont).

### Acheter avec un crédit

Les frais sont les mêmes, mais ils peuvent être intégrés au crédit (sur 25 ans, ça lisse le coût).

### Bien préparer son dossier

Un dossier complet et clair évite des honoraires supplémentaires. Préparez :
- Pièces d'identité
- Justificatifs de revenus
- Plan de financement
- Promesse de vente

## Frais à prévoir en plus

Au-delà des frais de notaire, anticipez :
- Frais de garantie crédit (caution ou hypothèque) : 1 à 2 %
- Frais de dossier banque : 500 à 1 000 €
- Diagnostics (si vendeur ne les fournit pas) : 400 à 800 €
- Déménagement : 800 à 2 000 €

## Les notaires à Clermont-Ferrand

Une trentaine d'études notariales à Clermont. Les tarifs sont les mêmes (réglementés), mais la qualité de service et la rapidité varient. Demandez 2-3 devis et choisissez selon la disponibilité et la communication.

## Conclusion

Les frais de notaire sont incompressibles à environ 90 %, mais quelques leviers existent (mobilier, neuf). Anticipez-les dans votre plan de financement.
`,
  },
  {
    slug: "diagnostics-obligatoires-vente-clermont",
    titre: "Diagnostics obligatoires pour vendre à Clermont-Ferrand",
    description:
      "Liste complète des diagnostics immobiliers obligatoires en 2025 à Clermont-Ferrand : DPE, amiante, plomb, etc.",
    categorie: "vendeur",
    tempsLecture: "6 min",
    datePublication: "2025-02-19",
    contenu: `
## Les diagnostics obligatoires en 2025

Pour vendre un bien à Clermont-Ferrand (et partout en France), le vendeur doit fournir un Dossier de Diagnostic Technique (DDT). Voici la liste complète.

### DPE — Diagnostic de Performance Énergétique

Obligatoire pour tous les biens. Validité : 10 ans. C'est le diagnostic le plus structurant en 2025.

À Clermont-Ferrand, classes typiques :
- Bâti pierre Volvic ancien : E à G
- Logements années 70-80 : D à F
- Récents (post-2010) : A à C

### Amiante

Obligatoire si permis de construire avant 1997. Validité : illimitée si négatif, 3 ans sinon.

Dans Clermont-Ferrand, beaucoup d'immeubles concernés (centre, Salins, Fontgieve…).

### Plomb (CREP)

Obligatoire si construction avant 1949. Validité : 1 an si vente.

Centre-Ville, Montferrand, Carmes : très concernés.

### Termites

Obligatoire dans les zones déclarées par arrêté préfectoral. Le Puy-de-Dôme n'est pas concerné en 2025.

### Gaz et électricité

Obligatoires si l'installation a plus de 15 ans. Validité : 3 ans.

### ERP — État des Risques et Pollutions

Obligatoire pour tous. Mentionne risques naturels (inondation, sismique), miniers, pollutions du sol. Validité : 6 mois.

### Mesurage Loi Carrez

Obligatoire pour les copropriétés. Validité : illimitée si pas de modification.

### Assainissement non collectif

Obligatoire si maison non raccordée au tout-à-l'égout. Validité : 3 ans.

## Combien ça coûte ?

À Clermont-Ferrand, comptez :
- Pack appartement : 250 à 450 € (DPE + amiante + plomb + Carrez + ERP + élec + gaz)
- Pack maison : 400 à 700 €

Plusieurs diagnostiqueurs certifiés sur la métropole : Allodiagnostic, Diagamter, Bureau Veritas…

## Quand les faire ?

Idéalement dès la mise en vente. Les acheteurs les exigent pour signer la promesse, et un diagnostic en cours de validité rassure.

Astuce : faites le DPE en premier. S'il est mauvais (F/G), vous saurez tout de suite que la décote sera importante et adapterez votre prix.

## Que faire si le DPE est mauvais ?

3 options :
1. **Vendre tel quel avec décote** : -10 à -15 % vs équivalent classé D
2. **Faire des travaux** : isolation toiture, fenêtres, chauffage. ROI variable
3. **Vendre à un investisseur travaux** : marchands de biens prêts à acheter et rénover

Notre équipe CBF Conseils peut vous orienter vers la solution la plus rentable pour votre situation.

## Conclusion

Les diagnostics ne sont pas une formalité administrative : en 2025, ils orientent directement la valeur de votre bien. Anticipez-les pour éviter les mauvaises surprises.
`,
  },
  {
    slug: "meilleurs-quartiers-clermont-ferrand-2026",
    titre: "Les meilleurs quartiers de Clermont-Ferrand en 2026",
    description:
      "Quartier par quartier, le guide 2026 pour choisir où acheter à Clermont-Ferrand selon votre profil : familles, étudiants, investisseurs, jeunes actifs.",
    categorie: "acheteur",
    tempsLecture: "7 min",
    datePublication: "2026-01-15",
    contenu: `
## Clermont-Ferrand en 2026 : un marché à plusieurs visages

À 2 229 €/m² en moyenne intra-muros et +3,2 % sur 12 mois, Clermont reste l'une des grandes villes les plus accessibles de France. Mais derrière cette moyenne, les écarts entre quartiers atteignent 40 %. Choisir le bon secteur, c'est sécuriser son achat — qu'on cherche une résidence principale ou un investissement.

Voici la lecture du marché par profil, basée sur les ventes notariales DVF et les transactions suivies par CBF Conseils.

## Pour les familles : Oradou, Beaumont, Chamalières

Trois critères dominent le choix des familles : écoles, calme, espaces verts. À Clermont, trois secteurs sortent du lot :

- **Oradou (2 500 €/m², +2,5 %)** : pavillonnaire, écoles primaires reconnues, proximité parc Montjuzet. Le bon compromis entre ville et résidentiel.
- **Beaumont (commune, 2 700 €/m² maison)** : plus haut de gamme, fiscalité communale maîtrisée, lycée Lafayette à 5 minutes.
- **Chamalières (2 500 €/m² appart)** : centre historique cossu, commerces, transports. Cible CSP+ qui ne veut pas s'éloigner.

À éviter en pure résidence familiale : Cézeaux (trop étudiant) et l'hyper-centre (peu d'extérieurs).

## Pour les étudiants : Cézeaux, Saint-Jacques, Carmes

Avec 35 000 étudiants à Clermont, la demande locative est massive. Trois secteurs concentrent la demande :

- **Les Cézeaux (2 000 €/m²)** : campus universitaire, tram ligne A, studios à 450-550 €/mois. Rentabilité brute jusqu'à 6,5 %.
- **Saint-Jacques (2 100 €/m²)** : facs de médecine et pharmacie, immeubles années 70 à rénover. Vacance locative quasi nulle.
- **Carmes (2 300 €/m²)** : centre historique, ambiance étudiante, T2 prisés des couples.

C'est typiquement la zone où un investisseur achète un studio à 70-90 k€ et le loue 16 à 18 €/m².

## Pour les investisseurs : Saint-Jacques, Cézeaux, Montferrand

Le bon investissement à Clermont en 2026 ne se joue pas sur le prix d'achat le plus bas, mais sur le **rapport rendement / vacance**.

- **Saint-Jacques (+1,5 %)** : demande médicale stable, biens à rénover sous 100 k€.
- **Cézeaux (+1,6 %)** : stock étudiant garanti pour 15 ans (Tesla, UCA, Limagrain).
- **Montferrand (1 950 €/m², +1,4 %)** : décote vs centre, rénovation patrimoniale possible, demande locative familiale.

À éviter pour investir : Jaude et Centre-Ville (rendement < 4 %, ticket d'entrée > 250 k€).

## Pour les jeunes actifs : Jaude, Delille, Centre-Ville

Travailler à Michelin, Limagrain ou en libéral et vivre dans le rythme de la ville : trois quartiers cochent toutes les cases.

- **Jaude (2 600 €/m², +2,8 %)** : le plus cher, mais le plus liquide. Tram, restaurants, opéra. Revente facile.
- **Delille (2 350 €/m²)** : élégant, place ombragée, à 5 minutes de Jaude. Le compromis charme/prix.
- **Centre-Ville / Carmes (2 300-2 400 €/m²)** : vie nocturne, T2-T3 dans immeubles anciens.

## Tableau récapitulatif — quartiers Clermont-Ferrand 2026

| Quartier | Prix/m² appart | Évolution 12 mois | Profil cible |
| --- | --- | --- | --- |
| Jaude | 2 600 € | +2,8 % | Jeunes actifs CSP+ |
| Oradou | 2 500 € | +2,5 % | Familles |
| Centre-Ville | 2 400 € | +2,1 % | Jeunes actifs |
| Delille | 2 350 € | +2,2 % | Jeunes actifs |
| Carmes | 2 300 € | +2,3 % | Étudiants / couples |
| Salins-Trudaine | 2 200 € | +1,8 % | Premier achat |
| Blaise-Pascal | 2 150 € | +1,3 % | Premier achat |
| Saint-Jacques | 2 100 € | +1,5 % | Investisseurs |
| Fontgieve | 2 050 € | +1,4 % | Premier achat |
| Les Cézeaux | 2 000 € | +1,6 % | Investisseurs étudiants |
| Côte-Blatin | 2 000 € | +1,3 % | Familles modestes |
| Montferrand | 1 950 € | +1,4 % | Patrimoine / investisseurs |
| La Plaine / Glacière | 1 800-1 900 € | +0,9 à +1,1 % | Budget serré |

## Communes périphériques : l'alternative

Quand le centre devient trop cher, l'agglo offre des alternatives sérieuses :

- **Chamalières (2 500 €/m²)** : le "16e arrondissement" clermontois.
- **Ceyrat (2 400 €/m² maison)** : pavillonnaire familial, accès rapide A75.
- **Aubière (2 200 €/m²)** : étudiant et résidentiel, proche Cézeaux.
- **Royat (2 200 €/m² maison)** : thermal, charme, parc.

## Comment choisir : la méthode CBF

Notre conseil systématique : **ne pas raisonner uniquement en prix au m²**. Un bien à 2 600 €/m² à Jaude qui se revend en 30 jours bat largement un bien à 1 800 €/m² à La Plaine qui met 4 mois à partir.

Les bons critères de décision en 2026 :
- **Liquidité** : combien de temps pour revendre dans 5 ans ?
- **Locatif** : quel rendement net si le projet de vie change ?
- **DPE** : un D ou mieux protège la valeur, un F/G la détruit.

Notre équipe vous accompagne gratuitement sur le choix du quartier en fonction de votre projet personnel. C'est inclus dans toute estimation ou recherche.
`,
    faq: [
      {
        question: "Quel est le quartier le moins cher de Clermont-Ferrand ?",
        reponse:
          "La Plaine, La Glacière et Chanturgue, autour de 1 800-1 900 €/m². Ces secteurs progressent moins vite que la moyenne mais offrent un ticket d'entrée réduit pour un premier achat.",
      },
      {
        question: "Quel quartier pour investir à Clermont-Ferrand ?",
        reponse:
          "Saint-Jacques, Les Cézeaux et Montferrand offrent les meilleurs rapports rendement/vacance en 2026. Les studios étudiants aux Cézeaux atteignent 6 à 6,5 % brut.",
      },
      {
        question: "Quel quartier pour une famille ?",
        reponse:
          "Oradou pour le compromis ville/résidentiel, Beaumont (commune) pour le haut de gamme calme, et Chamalières pour ceux qui veulent rester proches du centre. Tous offrent écoles reconnues et espaces verts.",
      },
    ],
  },
  {
    slug: "quartiers-plus-chers-clermont-ferrand",
    titre: "Quels sont les quartiers les plus chers de Clermont-Ferrand en 2026 ?",
    description:
      "Top 5 des quartiers les plus chers de Clermont-Ferrand en 2026 : prix au m², facteurs explicatifs et comparaison avec les communes premium de l'agglo.",
    categorie: "marche",
    tempsLecture: "5 min",
    datePublication: "2026-01-20",
    contenu: `
## Le marché premium clermontois en 2026

Clermont-Ferrand reste accessible (2 229 €/m² intra-muros en moyenne), mais certains quartiers tutoient les 2 700 €/m². L'écart avec les secteurs populaires atteint 40 %, et il continue de se creuser : les quartiers premium prennent +2,2 à +2,8 % par an, contre +1 % pour les secteurs les plus modestes.

Voici le top 5 des quartiers les plus chers en 2026.

## 1. Jaude — 2 600 €/m² (+2,8 %)

Le centre névralgique. Place Jaude, statue de Vercingétorix, tram qui dessert tout. Les immeubles haussmanniens y sont rares mais très prisés. Un T3 de 70 m² rénové part à 180-200 k€ en moins de 30 jours.

Pourquoi si cher ?
- **Liquidité maximale** : revente immédiate quel que soit le marché.
- **Zone tertiaire** : sièges sociaux, libéral, restaurants haut de gamme.
- **Tram + parking Galaxie** : double accès.

## 2. Oradou — 2 500 €/m² (+2,5 %)

Le quartier résidentiel le plus convoité. Pavillonnaire calme, écoles, commerces de bouche, parc Montjuzet. La cible : familles CSP+ qui refusent de quitter Clermont pour Beaumont ou Chamalières.

Le ticket d'entrée pour une maison reste rare : moins de 5 transactions par an au-delà de 500 k€.

## 3. Centre-Ville / Carmes — 2 400 €/m² (+2,1 %)

Le cœur historique. Cathédrale, rues piétonnes, marché Saint-Pierre. Beaucoup d'immeubles classés, donc rénovations contraintes mais cachet préservé.

Recherche dominante en 2026 : T2-T3 avec extérieur (balcon, terrasse, courette). Sans extérieur, décote de 8-10 %.

## 4. Delille — 2 350 €/m² (+2,2 %)

Place ombragée à 5 minutes de Jaude, immeubles bourgeois, ambiance bobo-établie. C'est le bon compromis pour ceux qui trouvent Jaude trop bruyant et Oradou trop loin.

Forte demande des cadres de Michelin et libéraux santé.

## 5. Beaumont (commune) — 2 700 €/m² maison (+2,5 %)

Techniquement hors Clermont, mais à 5 minutes du centre. C'est la commune la plus chère de l'agglo en maison, avec Chamalières.

Pourquoi le prix tient ?
- **Lycée Lafayette** : un des meilleurs lycées du 63.
- **Fiscalité maîtrisée** : taxe foncière sous la moyenne agglo.
- **Stock limité** : moins de 100 ventes/an.

## Comparaison avec les communes premium

| Secteur | Prix/m² | Type dominant |
| --- | --- | --- |
| Beaumont | 2 700 € | Maison familiale |
| Jaude (Clermont) | 2 600 € | Appart standing |
| Chamalières | 2 500 € | Appart bourgeois |
| Oradou (Clermont) | 2 500 € | Pavillonnaire |
| Ceyrat | 2 400 € | Maison récente |
| Centre-Ville (Clermont) | 2 400 € | Appart ancien |
| Royat | 2 200 € | Maison thermale |

## Pourquoi ces écarts ?

Trois facteurs structurels expliquent les prix premium à Clermont :

- **Vue Puy-de-Dôme** : tout bien avec vue dégagée prend 5 à 10 % de prime.
- **Tram ligne A** : Jaude, Delille, Cézeaux, Aubière. Tout ce qui est desservi par le tram s'apprécie plus vite.
- **Réputation scolaire** : Lafayette (Beaumont), Massillon (centre), Pasteur (centre) tirent les quartiers environnants.

## Faut-il acheter premium en 2026 ?

C'est la question qui revient le plus à nos clients. Notre lecture :

- **Résidence principale long terme (10 ans+)** : oui, le premium clermontois reste 2 à 3 fois moins cher qu'à Lyon ou Bordeaux. Le ticket est encore raisonnable.
- **Investissement locatif** : non, les rendements sont sous 4 % brut. Mieux vaut Saint-Jacques ou Cézeaux.
- **Achat-revente court terme** : à étudier au cas par cas. La marge se fait sur les biens à rénover dans le centre, pas sur le neuf premium.

Pour une analyse personnalisée, demandez votre estimation. Nos experts CBF Conseils connaissent les transactions réelles, pas les prix affichés.
`,
    faq: [
      {
        question: "Quel est le quartier le plus cher de Clermont-Ferrand ?",
        reponse:
          "Jaude, à 2 600 €/m² en moyenne pour un appartement. Si l'on inclut les communes de l'agglo, Beaumont arrive en tête à 2 700 €/m² pour une maison.",
      },
      {
        question: "Pourquoi Jaude est si cher ?",
        reponse:
          "Trois raisons : la liquidité (un bien à Jaude se revend en 30 jours), la centralité tertiaire (sièges, libéral, commerces), et l'accès tram + parking. C'est le quartier le plus défensif en cas de retournement de marché.",
      },
    ],
  },
  {
    slug: "evolution-prix-immobilier-clermont-ferrand-10-ans",
    titre: "L'évolution des prix de l'immobilier à Clermont-Ferrand sur 10 ans",
    description:
      "Analyse 2015-2026 : +39 % sur 10 ans à Clermont-Ferrand. Comparaison avec Grenoble, Limoges, Besançon. Facteurs et perspectives 2026-2027.",
    categorie: "marche",
    tempsLecture: "6 min",
    datePublication: "2026-02-01",
    contenu: `
## Clermont-Ferrand 2015-2026 : la trajectoire

Il y a dix ans, en 2015, Clermont-Ferrand affichait un prix moyen de 1 600 €/m². En 2026, ce même mètre carré coûte 2 229 € intra-muros : **+39 % en 10 ans**, soit une progression annuelle moyenne de 3,3 %.

C'est moins que Lyon (+62 %) ou Bordeaux (+58 %) sur la même période, mais nettement plus que Limoges (+18 %) ou Saint-Étienne (+12 %). Clermont s'est imposée comme une "ville moyenne qui prend".

## La courbe sur 10 ans

| Année | Prix moyen €/m² | Évolution annuelle |
| --- | --- | --- |
| 2015 | 1 600 € | référence |
| 2017 | 1 720 € | +3,7 % / an |
| 2019 | 1 850 € | +3,7 % / an |
| 2021 | 2 050 € | +5,2 % / an (Covid) |
| 2023 | 2 160 € | +2,7 % / an (taux) |
| 2025 | 2 160 € | stable |
| 2026 | 2 229 € | +3,2 % |

Trois phases distinctes apparaissent :

- **2015-2019 : montée régulière** : +3,7 % par an, marché sain, taux à 1,5-2 %.
- **2020-2022 : flambée Covid** : télétravail, exode parisien, taux à 1 %. Clermont gagne 200 €/m² en 24 mois.
- **2023-2025 : pause** : remontée des taux à 4 %, gel temporaire des transactions, prix qui se stabilisent.
- **2026 : reprise** : taux redescendus à 3-3,3 %, demande qui repart, +3,2 % en 12 mois.

## Comparaison avec d'autres villes moyennes

Sur la période 2015-2026 :

| Ville | Prix 2015 | Prix 2026 | Évolution |
| --- | --- | --- | --- |
| Grenoble | 2 100 € | 2 850 € | +36 % |
| Clermont-Ferrand | 1 600 € | 2 229 € | +39 % |
| Limoges | 1 250 € | 1 480 € | +18 % |
| Besançon | 1 700 € | 2 050 € | +21 % |
| Saint-Étienne | 1 100 € | 1 230 € | +12 % |

Clermont surperforme nettement les villes de taille comparable. Pourquoi ?

## Les 4 moteurs structurels

### 1. Le bassin Michelin

Le siège mondial reste à Clermont. 12 000 emplois directs, beaucoup de cadres expatriés ou itinérants qui achètent une RP à Clermont. C'est un socle de demande premium permanent.

### 2. L'arrivée de Tesla et la dynamique industrielle

L'usine Tesla annoncée en 2024 (Riom, périphérie nord), couplée à Limagrain et Constellium, porte le bassin emploi. Plus de 3 000 créations nettes prévues 2025-2028.

### 3. UCA — l'université Clermont Auvergne

35 000 étudiants, 11e université française. La demande locative étudiante est structurelle et soutient les rendements.

### 4. La LGV Paris-Clermont (annonce 2025)

Le projet de ligne à grande vitesse Paris-Clermont, validé en 2025 pour livraison 2032, a déjà un effet d'anticipation : +0,5 à +1 % sur les biens proches de la gare en 2026.

## Disparités par quartier sur 10 ans

Tous les quartiers n'ont pas progressé au même rythme :

- **Jaude** : +52 % en 10 ans (1 700 → 2 600 €/m²)
- **Oradou** : +47 % (1 700 → 2 500 €/m²)
- **Cézeaux** : +43 % (1 400 → 2 000 €/m²)
- **Montferrand** : +30 % (1 500 → 1 950 €/m²)
- **La Plaine** : +25 % (1 450 → 1 800 €/m²)

Le premium s'apprécie plus vite que le secondaire. Le gap s'élargit.

## Perspectives 2026-2027

Notre analyse pour les 18 mois à venir :

- **Taux** : stabilisation autour de 3 %, scénario favorable à la demande.
- **Stock** : encore bas, sous-offre persistante en T3-T4 famille.
- **Demande** : retour des primo-accédants, soutien Tesla.
- **Prix** : +2 à +4 % attendus en 2026-2027 sur la moyenne, jusqu'à +5 % sur les quartiers premium.

Les zones à risque (DPE F/G non rénovés, secteurs périphériques) pourraient stagner ou baisser légèrement. Les biens performants en énergie et bien placés continueront de prendre 3 à 5 % par an.

## Que faire en 2026 ?

- **Vendre** : oui si le bien est bien noté et bien placé. Le marché est porteur, les délais courts (60 jours).
- **Acheter** : oui pour la résidence principale long terme. Le rapport prix/qualité de vie reste imbattable.
- **Investir** : oui sur les segments à fort rendement (Cézeaux, Saint-Jacques), prudence sur le premium locatif.

Pour une estimation actualisée de votre bien selon les dernières transactions notariales, contactez CBF Conseils.
`,
    faq: [
      {
        question: "Combien a augmenté l'immobilier à Clermont-Ferrand en 10 ans ?",
        reponse:
          "+39 % entre 2015 et 2026, soit une progression annuelle moyenne de 3,3 %. Le prix moyen est passé de 1 600 €/m² à 2 229 €/m² intra-muros.",
      },
      {
        question: "L'immobilier à Clermont va-t-il continuer à monter ?",
        reponse:
          "Oui, +2 à +4 % attendus sur 2026-2027 selon nos projections, avec une accélération sur les quartiers premium. Les facteurs porteurs : Tesla, UCA, projet LGV, stabilisation des taux à 3 %.",
      },
    ],
  },
  {
    slug: "fixer-loyer-appartement-clermont-ferrand",
    titre: "Comment fixer le loyer de son appartement à Clermont-Ferrand en 2026 ?",
    description:
      "La méthode complète pour fixer un loyer juste à Clermont-Ferrand : prix du m² locatif par quartier, charges, encadrement, calcul de rentabilité.",
    categorie: "investisseur",
    tempsLecture: "6 min",
    datePublication: "2026-02-10",
    contenu: `
## Pourquoi le bon loyer change tout

Fixer un loyer trop haut, c'est 3 mois de vacance — soit l'équivalent de 25 % de loyer perdu sur l'année. Fixer trop bas, c'est laisser 50 à 100 €/mois sur la table pendant 5 ans, soit 3 000 à 6 000 € de manque à gagner.

L'objectif : trouver le loyer qui se positionne 0 à -5 % du marché. Le bien part en 1-2 visites, le locataire reste 3 ans en moyenne, et la rentabilité est optimale.

## Prix du m² locatif par quartier (2026)

Les fourchettes observées sur les baux signés en 2025-2026 à Clermont :

| Quartier | Studio (€/m²) | T2 (€/m²) | T3 (€/m²) |
| --- | --- | --- | --- |
| Cézeaux | 16-18 € | 13-15 € | 11-13 € |
| Centre-Ville / Carmes | 14-16 € | 12-14 € | 10-12 € |
| Saint-Jacques | 15-17 € | 12-14 € | 10-12 € |
| Jaude / Delille | 13-15 € | 11-13 € | 10-12 € |
| Oradou / Beaumont | — | 10-12 € | 9-11 € |
| Montferrand / Périphérie | 11-13 € | 9-11 € | 8-10 € |

Plus le bien est petit, plus le €/m² est élevé. Logique : un studio attire un étudiant qui paie au coût d'usage, pas au m².

## Loyers moyens observés à Clermont en 2026

- **Studio (18-25 m²)** : 450-550 €/mois charges comprises
- **T2 (35-45 m²)** : 600-750 €/mois CC
- **T3 (55-70 m²)** : 750-950 €/mois CC
- **T4 (75-90 m²)** : 900-1 200 €/mois CC

Ces fourchettes intègrent les meublés et les non meublés. Un meublé de qualité prend 10-15 % de prime.

## Charges locatives : qui paie quoi ?

C'est l'erreur classique des bailleurs débutants. Récapitulatif :

**À la charge du locataire** :
- Eau (consommation)
- Électricité, gaz
- Internet, abonnements
- Taxe d'habitation (si revenus la rendent due — supprimée pour la majorité)
- Charges courantes de copropriété récupérables (entretien parties communes, ascenseur, chauffage collectif…)

**À la charge du propriétaire** :
- Taxe foncière (souvent 800-1 500 €/an à Clermont sur un T2-T3)
- Gros entretien (toiture, ravalement, chaudière)
- Assurance PNO (Propriétaire Non Occupant), 80-150 €/an
- Frais de gestion locative si délégation (5-8 % HT du loyer)

À Clermont, la taxe foncière reste raisonnable (taux 41,7 %) mais grimpe régulièrement : +12 % cumulés sur 5 ans.

## Encadrement et zone tendue : Clermont en est-elle ?

**Non.** Clermont-Ferrand n'est pas classée en zone tendue au sens du décret de 2013 (liste limitée à Paris, Lyon, Bordeaux, Lille, Marseille, Nice, Toulouse, Montpellier, Strasbourg…).

Conséquences pratiques :
- **Pas d'encadrement des loyers** : vous fixez librement.
- **Pas de complément de loyer à justifier** : le marché tranche.
- **Préavis locataire 3 mois** (zone non tendue), au lieu d'1 mois en zone tendue.

C'est un avantage net pour les bailleurs clermontois.

## La règle "prix marché -5 %" : pourquoi ça marche

Notre conseil systématique aux investisseurs : positionner le loyer **5 % en dessous du prix de marché**.

Exemple concret : un T2 de 40 m² aux Carmes. Marché à 13 €/m² → 520 €/mois. Annonce à 495 €/mois charges comprises.

Résultats observés sur notre fichier 2025 :
- 3-5 visites en 48h
- Choix du locataire le plus solide (CDI, garant)
- Bail signé en 7-10 jours
- Vacance moyenne sur 5 ans : 0,8 mois

À 520 €/mois, vacance moyenne sur 5 ans : 2,5 mois. Le différentiel de 25 €/mois × 12 = 300 €/an est largement absorbé par les 1,7 mois de vacance évitée (≈ 850 €).

## Calculer la rentabilité

**Rentabilité brute** = (loyer annuel × 12) / prix d'achat

Exemple : studio Cézeaux à 75 000 € loué 470 €/mois CC.
- Loyer annuel : 470 × 12 = 5 640 €
- Brut : 5 640 / 75 000 = **7,5 %**

**Rentabilité nette** = (loyer net de charges et fiscalité) / prix d'achat (frais notaire inclus)

Pour le même studio :
- Prix réel (FN inclus) : 82 000 €
- Loyer net (taxe foncière 600 €, PNO 100 €, copro non récup 200 €, vacance 0,5 mois) : 4 505 €
- Net avant impôts : 4 505 / 82 000 = **5,5 %**

Sur Clermont en 2026, viser **5 % net minimum** sur un investissement locatif standard. Sous ce seuil, l'opération a peu de marge.

## En résumé

Pour fixer votre loyer correctement :
1. Récupérer le €/m² de votre quartier via DVF locatif ou notre base CBF.
2. Soustraire 5 % pour minimiser la vacance.
3. Préciser charges incluses ou non, et lesquelles.
4. Vérifier que la rentabilité nette dépasse 5 %.
5. Si ce n'est pas le cas, repenser le prix d'achat ou changer de cible (meublé, colocation).

Pour une analyse loyer + rentabilité personnalisée sur votre bien, CBF Conseils propose un audit gratuit.
`,
    faq: [
      {
        question: "Quel loyer pour un T2 à Clermont-Ferrand ?",
        reponse:
          "Entre 600 et 750 €/mois charges comprises pour un T2 de 35-45 m². La fourchette varie selon le quartier : 700-750 € en centre/Carmes/Cézeaux, 600-650 € en périphérie ou à Montferrand.",
      },
      {
        question: "Clermont-Ferrand est-elle en zone tendue ?",
        reponse:
          "Non. Clermont-Ferrand n'est pas classée en zone tendue. Pas d'encadrement des loyers, pas de complément à justifier, et le préavis locataire est de 3 mois (et non 1).",
      },
      {
        question: "Comment calculer la rentabilité de son bien ?",
        reponse:
          "Brute = loyer annuel × 12 / prix d'achat. Nette = (loyer - taxe foncière - PNO - charges non récupérables - vacance) / prix d'achat frais de notaire inclus. À Clermont, viser 5 % net minimum.",
      },
    ],
  },
  {
    slug: "honoraires-agences-immobilieres-clermont-ferrand",
    titre: "Honoraires des agences immobilières à Clermont-Ferrand : ce qu'il faut savoir en 2026",
    description:
      "Combien coûte une agence immobilière à Clermont-Ferrand en 2026 ? Fourchettes, mandat simple vs exclusif, ce qui est inclus, comment négocier.",
    categorie: "vendeur",
    tempsLecture: "5 min",
    datePublication: "2026-02-15",
    contenu: `
## Combien prend une agence immobilière à Clermont-Ferrand ?

Sur Clermont-Ferrand et son agglomération, les honoraires d'agence se situent entre **4 et 6 % du prix de vente** TTC. La moyenne observée en 2026 sur les transactions CBF Conseils et les agences concurrentes est de **5,2 %**.

Concrètement, sur une vente à 200 000 € :
- 4 % = 8 000 € d'honoraires
- 5 % = 10 000 €
- 6 % = 12 000 €

C'est moins qu'à Paris (3-4 % mais sur des tickets bien plus élevés) et conforme à la moyenne nationale en province (5-6 %).

## Honoraires charge vendeur ou charge acquéreur : quelle différence ?

Le mandat précise qui supporte les honoraires. Trois cas possibles :

### Honoraires charge vendeur (HCV)

Le prix affiché inclut les honoraires. L'acheteur paie 200 000 €, le vendeur reçoit 190 000 €, l'agence garde 10 000 €.

**Avantages vendeur** : prix net qu'il visualise mal au départ, mais paiement uniquement si vente conclue.
**Avantages acheteur** : frais de notaire calculés sur le prix total → légèrement plus de FN.

### Honoraires charge acquéreur (HCA)

Le prix affiché est le prix net vendeur. L'acheteur paie 190 000 € + 10 000 € d'honoraires = 200 000 €, le vendeur reçoit 190 000 €.

**Avantages acheteur** : frais de notaire calculés sur 190 000 € (-700 € environ).
**Avantages vendeur** : visualise immédiatement son net.

### Honoraires partagés

Plus rare, partagés 50/50 ou selon négociation.

À Clermont, **70 % des mandats sont en HCV** (charge vendeur). C'est la pratique dominante car elle simplifie la lecture pour l'acheteur.

## Mandat simple vs mandat exclusif : le vrai sujet

### Mandat simple

Le vendeur peut confier son bien à plusieurs agences ET le vendre lui-même. L'agence qui trouve l'acheteur perçoit les honoraires.

**Inconvénients réels** :
- Aucune agence ne s'investit pleinement (risque de travailler pour rien)
- Photos basiques, peu de promotion
- Pas de coordination, plusieurs annonces parfois contradictoires
- Délai moyen 30 % plus long

### Mandat exclusif

Une seule agence pendant 3 mois minimum. En contrepartie, l'agence engage des moyens : photos pro, home staging conseil, diffusion premium, fichier acheteurs.

**Le vrai bénéfice** chez CBF Conseils : accès au **réseau AMANDA — 34 agences partenaires en France**. Votre bien est diffusé à un fichier de 50 000+ acheteurs qualifiés en parallèle de SeLoger, Leboncoin, Bien'ici.

Statistiques observées sur 2025 :
- Mandat exclusif : vendu en 47 jours moyens, à 98 % du prix affiché.
- Mandat simple : vendu en 71 jours moyens, à 94 % du prix affiché.

Sur un bien à 200 000 €, l'exclusif rapporte en moyenne **8 000 € de plus net**, en plus du gain de temps.

## Ce qui est inclus dans les honoraires

À Clermont, un mandat sérieux couvre :

- **Estimation gratuite** sur la base DVF + comparables actifs
- **Photos professionnelles** (8 à 15 vues, drone si pertinent)
- **Plan 2D** et fiche descriptive complète
- **Visite virtuelle 3D** sur les biens > 250 k€ (chez CBF Conseils, systématique)
- **Diffusion premium** : SeLoger, Leboncoin, Bien'ici, site agence, AMANDA
- **Visites accompagnées** avec qualification financière préalable de l'acheteur
- **Négociation** et rédaction du compromis
- **Suivi notaire** jusqu'à la signature définitive (60-90 jours)

Méfiez-vous des agences qui demandent 5 % d'honoraires mais ne fournissent ni photos pro, ni qualification acheteur, ni AMANDA. Le différentiel de service est énorme.

## Peut-on négocier les honoraires ?

Oui, mais raisonnablement. Trois leviers réels :

1. **Prix de vente élevé** : sur un bien à 500 k€+, négocier de 5 à 4,5 % est légitime (l'agence travaille proportionnellement moins).
2. **Bien facile à vendre** : DPE A-B, quartier premium, prix juste → 4,5 % accepté plus facilement.
3. **Mandat exclusif** vs simple : engagement plus fort = négociation possible (-0,5 point).

Ce qui ne marche pas : demander 3 % en mandat simple sur un bien moyen. L'agence refusera ou bâclera.

## Pourquoi choisir CBF Conseils

Notre approche à Clermont-Ferrand :

- **Honoraires fixés à 5 % HCV** sur la majorité des biens, dégressifs à partir de 400 k€.
- **Mandat exclusif AMANDA** : 34 agences partenaires, fichier de 50 000+ acheteurs.
- **Photos pro + visite 3D** systématiques sur tous les mandats exclusifs.
- **Estimation gratuite sous 48h**, sans engagement.
- **Délai de vente moyen 2025** : 47 jours sur exclusif, 11 jours plus court que la moyenne ville.

Les honoraires ne sont pas un coût, c'est un investissement qui doit vous rapporter plus qu'il ne vous coûte. Bien choisir son agence, c'est gagner 5 à 8 % sur le prix final.

Demandez votre estimation gratuite — nos experts analysent votre bien sous 48h, sans engagement.
`,
    faq: [
      {
        question: "Combien prend une agence immobilière à Clermont-Ferrand ?",
        reponse:
          "Entre 4 et 6 % du prix de vente TTC, avec une moyenne de 5,2 % en 2026. Sur un bien à 200 000 €, cela représente 8 000 à 12 000 €.",
      },
      {
        question: "Peut-on négocier les honoraires d'une agence ?",
        reponse:
          "Oui, surtout sur un bien facile à vendre (DPE A-B, bon quartier, prix juste) ou un ticket élevé (500 k€+). Les agences acceptent souvent -0,5 à -1 point en mandat exclusif. Inutile en revanche de demander un rabais en mandat simple.",
      },
      {
        question: "Vaut-il mieux un mandat exclusif ou simple ?",
        reponse:
          "Mandat exclusif, sans hésitation. Statistiques 2025 : vendu en 47 jours à 98 % du prix vs 71 jours à 94 % en mandat simple. Sur un bien à 200 k€, cela représente 8 000 € de plus net pour le vendeur.",
      },
    ],
  },
  {
    slug: "agences-immobilieres-clermont-ferrand-2026",
    titre: "Meilleures agences immobilières à Clermont-Ferrand en 2026",
    description:
      "Comment choisir la bonne agence immobilière à Clermont-Ferrand : classement 2026, critères de sélection, honoraires et services.",
    categorie: "vendeur",
    tempsLecture: "8 min",
    datePublication: "2026-03-01",
    contenu: `
## Pourquoi le choix de l'agence pèse autant que le prix

À Clermont-Ferrand, la différence entre une bonne et une mauvaise agence se chiffre en milliers d'euros. Sur un bien à 200 000 €, mal vendu en mandat simple, on perd en moyenne 8 000 € net : prix de vente plus faible, délai plus long, frais de portage du crédit qui s'allongent. À l'inverse, une agence locale qui maîtrise son secteur vend 30 % plus vite et 4 % plus cher.

Le marché clermontois compte plus de 120 agences : grandes franchises nationales (Century 21, Orpi, Laforêt, Stéphane Plaza), réseaux régionaux (AMANDA, ImmoChoix), agences indépendantes, mandataires (iad, SAFTI, Capifrance) et plateformes en ligne. Tous ne se valent pas pour un même bien.

## Les 5 critères qui distinguent une bonne agence

### 1. La connaissance fine du quartier
Une agence qui vend depuis 10 ans sur Jaude, Oradou ou Beaumont a un fichier d'acheteurs en attente, connaît les copropriétés au mètre près, sait quels biens partent à 2 600 €/m² et lesquels stagnent à 2 200 €. Elle vous évite la sur ou sous-estimation, qui sont les deux pièges majeurs.

### 2. L'appartenance à un réseau actif
Le réseau AMANDA, par exemple, regroupe 34 agences et plus de 220 collaborateurs en Auvergne-Rhône-Alpes. Quand un bien rentre dans le fichier, il est diffusé à l'ensemble du réseau dans les 24 h. Résultat : un acheteur peut venir d'une agence située à 50 km. CBF Conseils est membre actif de ce réseau, ce qui multiplie par 4 le nombre d'acheteurs potentiels exposés au bien.

### 3. La qualité des photos et de l'annonce
Aujourd'hui, 90 % des acheteurs trient les annonces sur la première photo. Une agence sérieuse investit dans un photographe pro, parfois la visite virtuelle 360°, et soigne le texte de l'annonce. Ce détail fait la différence entre 3 visites par semaine et 3 visites par mois.

### 4. Le taux de transformation mandat → vente
À Clermont-Ferrand, le taux moyen est de 55 % sur 6 mois en mandat exclusif. Les meilleures agences locales atteignent 75 à 85 %. Demandez ce chiffre lors du premier rendez-vous : une agence qui ne le connaît pas n'est pas pilotée par la performance.

### 5. La transparence sur les honoraires
Une agence claire affiche sa grille à l'avance. Pas de "ça dépend du bien" : un barème simple par tranche de prix, une réduction négociable en mandat exclusif (-0,5 à -1 point), et un mandat écrit dès le premier rendez-vous.

## Mandat exclusif vs mandat simple : les chiffres parlent

| Critère | Mandat exclusif | Mandat simple |
|---|---|---|
| Délai moyen de vente | 47 jours | 71 jours |
| % du prix de vente vs prix initial | 98 % | 94 % |
| Visites organisées / mois | 6 à 8 | 2 à 3 |
| Effort marketing de l'agence | Maximum | Limité |

Concrètement : sur un bien à 200 000 €, la différence est de 8 000 € net pour le vendeur, et 24 jours gagnés. Le mandat exclusif n'est donc pas une "perte de liberté" mais un gage d'efficacité.

## Combien coûte vraiment une agence à Clermont-Ferrand ?

Les honoraires varient entre 4 et 6 % TTC du prix de vente, avec une moyenne de 5,2 % en 2026. Sur un bien à 200 000 €, cela représente 10 400 € en moyenne. Honoraires généralement à la charge du vendeur, parfois partagés.

Pour comparer, ne regardez pas que le pourcentage : regardez ce que l'agence inclut (photos pro, visites virtuelles, home staging conseil, diffusion premium, accompagnement notaire). Une agence à 4 % qui fait le minimum coûte plus cher qu'une agence à 5,5 % qui vend 4 % plus cher.

## Comment départager 2 ou 3 agences sérieuses

1. Demandez à chacune une estimation écrite et argumentée
2. Comparez les avis Google (volume + récents)
3. Visitez leur vitrine : les biens sont-ils bien photographiés ?
4. Posez la question : "combien de biens similaires au mien avez-vous vendus dans les 12 derniers mois ?"
5. Demandez un mandat exclusif de 3 mois reconductible plutôt qu'un 6 mois ferme

## Conclusion

À Clermont-Ferrand, la bonne agence est locale, connectée à un réseau actif, transparente et orientée résultat. CBF Conseils coche ces cases : implantation Clermont-Ferrand et Bourgogne, réseau AMANDA, photos pro systématiques, équipe spécialisée par typologie de bien.

**Pour estimer votre bien et obtenir un avis personnalisé en 48 h, demandez votre estimation gratuite en ligne.**
    `,
    faq: [
      {
        question: "Combien y a-t-il d'agences immobilières à Clermont-Ferrand ?",
        reponse:
          "Plus de 120 agences sont actives sur Clermont-Ferrand et son agglomération en 2026, en comptant les franchises nationales, les réseaux régionaux comme AMANDA, les agences indépendantes et les mandataires.",
      },
      {
        question: "Comment comparer plusieurs agences clermontoises ?",
        reponse:
          "Croisez 4 critères : connaissance du quartier (nombre de biens vendus dans la zone sur 12 mois), réseau (AMANDA, MLS, fichiers partagés), qualité visuelle des annonces actuelles, taux de transformation mandat → vente. Les agences sérieuses communiquent ces chiffres.",
      },
      {
        question: "Mandat exclusif ou simple à Clermont-Ferrand ?",
        reponse:
          "Mandat exclusif. Les statistiques locales 2025 montrent une vente en 47 jours à 98 % du prix en exclusif, contre 71 jours à 94 % en mandat simple. Pour un bien à 200 000 €, cela fait 8 000 € de plus pour le vendeur.",
      },
    ],
  },
  {
    slug: "vivre-clermont-ferrand",
    titre: "Vivre à Clermont-Ferrand en 2026 : ce qui attire les acheteurs",
    description:
      "Qualité de vie, restaurants, emploi, transports, université : tout ce qui rend Clermont-Ferrand attractif pour les acheteurs en 2026.",
    categorie: "acheteur",
    tempsLecture: "7 min",
    datePublication: "2026-03-05",
    contenu: `
## Clermont-Ferrand, capitale auvergnate au cœur de la France

Avec ses 150 000 habitants intra-muros et près de 300 000 dans l'agglomération, Clermont-Ferrand est la 2e métropole d'Auvergne-Rhône-Alpes après Lyon. Position centrale stratégique : à 3 h de Paris en TGV, 2 h de Lyon en voiture, accès direct A71 / A72 / A89, aéroport international à 15 min du centre.

Mais ce qui attire vraiment les acheteurs en 2026, c'est le rapport qualité de vie / prix : prix au m² moyen 2 229 € (-45 % vs Lyon, -80 % vs Paris), pour une ville dynamique adossée aux Volcans d'Auvergne.

## Un pôle économique sous-estimé

Trois moteurs principaux portent l'emploi clermontois :

- **Michelin** : siège mondial implanté depuis 1889, plus de 11 000 salariés sur le bassin, écosystème de fournisseurs et sous-traitants
- **Université Clermont Auvergne (UCA)** : 35 000 étudiants, 5 000 personnels, 4 campus dont Cézeaux et Carnot
- **Santé** : CHU Estaing + Gabriel Montpied, 8 000 emplois directs

S'ajoutent une scène tech en plein essor (The Pass, Bivouac, Limagrain pour l'agroalimentaire) et une fiscalité d'entreprise compétitive.

## Une vraie qualité de vie urbaine

### Une scène culinaire qui monte
Clermont-Ferrand a longtemps été perçue comme une ville "trufale" et industrielle. C'est dépassé. Le centre concentre désormais une scène gastronomique solide : bistros place Gaillard, tables étoilées (L'Origine, L'Ostal), brasseries d'auteur autour de la cathédrale. Les marchés Saint-Pierre et Salins sont parmi les meilleurs de la région.

### Une ville à taille humaine
Tout se fait à pied dans le centre : Jaude, cathédrale, Carmes, Montferrand, gare. Le tramway dessert la quasi-totalité des quartiers majeurs. Le vélo est en plein boom (RER Vélo, Vélocity).

### Les Volcans d'Auvergne à 20 minutes
Puy de Dôme, Vulcania, lacs Aydat et Servières, randonnées innombrables, ski l'hiver au Mont-Dore et Super-Besse (45 min). Aucune autre métropole française n'a autant de nature à si courte distance.

## Une ville étudiante qui se renouvelle

L'UCA attire 35 000 étudiants chaque année. Cela tire toute la vie culturelle (festival Vidéoformes, Europavox, Sauve qui peut le court-métrage) et stabilise une demande locative étudiante très soutenue dans les quartiers Cézeaux, Blaise Pascal, Carmes.

Pour un acheteur, c'est aussi un signe : prix immobilier solide, vacance locative faible, demande pérenne.

## Combien faut-il pour bien vivre à Clermont-Ferrand ?

Budget mensuel indicatif pour un couple en 2026 :

- Loyer 3P en centre (Jaude, Carmes) : 700 à 880 €
- Courses et alimentation : 450 à 600 €
- Transport (Pass T2C ou voiture) : 50 à 250 €
- Sorties, loisirs : 200 à 400 €
- Total : 1 600 à 2 200 € selon train de vie

Comparativement à Lyon ou Paris, le pouvoir d'achat est nettement supérieur à revenu équivalent.

## Pourquoi acheter (pas seulement louer) à Clermont-Ferrand

Trois arguments pour les nouveaux arrivants :

1. **Prix bas vs métropoles voisines** : un T3 à 75 m² coûte 165 000 € en moyenne, soit 5 ans de loyer économisés sur 20 ans
2. **Marché stable** : +3,2 % en 12 mois, +25 % sur 10 ans, pas de bulle
3. **Qualité du parc** : nombreux biens haussmanniens, pierres de Volvic, charme authentique

## Conclusion

Clermont-Ferrand combine ce que peu de villes françaises offrent : densité d'emplois qualifiés, prix accessibles, nature à proximité, culture vivante, taille humaine. Pour un acheteur en 2026, le rapport qualité-prix est l'un des meilleurs de France.

**Vous envisagez de vous installer à Clermont-Ferrand ? Demandez votre étude personnalisée auprès de CBF Conseils, qui vous orientera vers le bon quartier selon votre projet.**
    `,
    faq: [
      {
        question: "Clermont-Ferrand est-elle une bonne ville pour s'installer ?",
        reponse:
          "Oui, en particulier pour les jeunes actifs et familles. La ville offre des prix immobiliers 45 % inférieurs à Lyon, un bassin d'emploi qualifié (Michelin, UCA, CHU), une scène gastronomique reconnue et un accès direct à la nature des Volcans d'Auvergne.",
      },
      {
        question: "Quel budget pour vivre à Clermont-Ferrand en 2026 ?",
        reponse:
          "Pour un couple sans enfant, comptez entre 1 600 € et 2 200 € par mois tout compris (logement, courses, transports, loisirs). Un loyer 3P en centre tourne autour de 700 à 880 €/mois, contre 1 200 à 1 500 € à Lyon pour équivalent.",
      },
      {
        question: "Pourquoi acheter plutôt que louer à Clermont-Ferrand ?",
        reponse:
          "Avec un prix moyen de 2 229 €/m² et une dynamique stable (+3,2 % sur 12 mois), un achat se rentabilise en 6 à 8 ans face à un loyer équivalent. Le marché local n'est pas spéculatif : peu de risque de retournement violent.",
      },
    ],
  },
  {
    slug: "quartier-jaude-prix-immobilier",
    titre: "Immobilier quartier Jaude à Clermont-Ferrand : prix et analyse 2026",
    description:
      "Le quartier Jaude est le plus prisé de Clermont-Ferrand. Découvrez les prix au m², les tendances et pourquoi il attire les acheteurs.",
    categorie: "marche",
    tempsLecture: "6 min",
    datePublication: "2026-03-10",
    contenu: `
## Jaude, le cœur battant de Clermont-Ferrand

La place de Jaude est l'épicentre historique et commercial de Clermont-Ferrand. Dominée par la statue équestre de Vercingétorix sculptée par Bartholdi, encadrée par la basilique Saint-Pierre-des-Minimes, la place concentre les enseignes premium (Galeries Lafayette, Apple Store, Nespresso), les restaurants, les terrasses, les cinémas et le terminus de plusieurs lignes de tramway.

Vivre à Jaude, c'est habiter le centre névralgique : tout est accessible à pied en moins de 10 minutes, services, transports, loisirs, écoles. Sans surprise, c'est le quartier le plus cher au m² de Clermont-Ferrand intra-muros.

## Prix au m² à Jaude en 2026

Le marché Jaude se segmente en trois zones :

| Zone | Prix moyen €/m² | Type dominant |
|---|---|---|
| Hyper-centre Jaude (rayon 200 m) | 2 700 €/m² | T2 / T3 haussmanniens |
| Jaude élargi (rues Blatin, Gonod, 8-Mai) | 2 600 €/m² | T2 / T3 / T4 |
| Limite Carmes / Blaise Pascal | 2 400 €/m² | T2 / T3 |

Comparativement, le quartier Oradou tourne autour de 2 500 €/m², le Centre-Ville classique à 2 400 €/m², Carmes à 2 300 €/m². Jaude affiche donc une prime de +5 à +10 % vs les quartiers immédiatement voisins.

Les maisons sont rarissimes à Jaude (densité forte) : moins de 5 transactions par an, presque toujours sur des biens haussmanniens transformés.

## Évolution sur 5 ans

Entre 2021 et 2026, Jaude a gagné +18 % en valeur, soit une progression annualisée de 3,4 %. C'est légèrement supérieur à la moyenne clermontoise (+15 % sur la même période). La dynamique est tirée par :

- Une demande forte de cadres en télétravail recherchant le centre
- Un parc rare et qualitatif (haussmannien, parquets, cheminées, hauteur sous plafond)
- Un manque structurel de neuf disponible

## Profil des acheteurs à Jaude

Trois profils dominent :

1. **Cadres et professions libérales** : avocats, médecins, consultants, qui veulent un pied-à-terre central
2. **Investisseurs locatifs** : la demande locative haut de gamme (3P meublés à 700-880 €/mois) est solide
3. **Jeunes retraités aisés** : revente d'une maison de banlieue pour un T3 central avec ascenseur

## Avantages de Jaude

- Tout à pied, zéro voiture obligatoire
- Tram et bus à toutes les portes
- Vie culturelle dense (cinémas, théâtres, restaurants)
- Charme architectural haussmannien et fin XIXe
- Liquidité forte : un bien Jaude se revend en 30 à 45 jours

## Inconvénients à connaître

- Parking : trouver une place de stationnement est un calvaire, prévoir budget supplémentaire pour box (15 000 à 25 000 €)
- Bruit : terrasses ouvertes jusqu'à minuit en été, animation week-end
- Charges de copropriété parfois élevées (ascenseur, gardien, ravalement)
- Peu d'extérieurs (pas de jardin, balcons rares)

## Comparatif avec les autres quartiers premium

| Quartier | Prix moyen €/m² | Avantage clé |
|---|---|---|
| Jaude | 2 600-2 700 | Centralité absolue, vie urbaine |
| Oradou | 2 500 | Calme, familles, écoles privées |
| Chamalières (commune voisine) | 2 400 | Standing, parc, écoles publiques |
| Centre-Ville classique | 2 400 | Patrimoine, charme |

## Conclusion

Jaude reste en 2026 la valeur refuge clermontoise : prix élevés mais justifiés par la rareté, la centralité et la liquidité. Pour un investisseur en quête de capital plus que de rendement, c'est un choix sûr. Pour un primo-accédant, le ticket d'entrée à 2 600 €/m² peut être prohibitif et il vaut mieux regarder Carmes ou Blaise Pascal en alternative.

**Vous avez un bien à vendre quartier Jaude ? CBF Conseils estime gratuitement votre appartement et le valorise dans son réseau d'acheteurs cadres et investisseurs.**
    `,
    faq: [
      {
        question: "C'est où le quartier Jaude à Clermont-Ferrand ?",
        reponse:
          "Le quartier Jaude est le centre historique et commercial de Clermont-Ferrand, autour de la place de Jaude (statue de Vercingétorix). Il s'étend sur un rayon d'environ 400 m, englobant les rues Blatin, Gonod, 8-Mai-1945 et le bas de la rue Blaise-Pascal.",
      },
      {
        question: "Quel prix pour un appartement place de Jaude ?",
        reponse:
          "En 2026, comptez 2 600 à 2 700 €/m² pour un appartement bien placé à Jaude. Un T2 de 50 m² rénové se vend autour de 130 000 à 140 000 €, un T3 de 75 m² autour de 195 000 à 210 000 €.",
      },
      {
        question: "Jaude est-il un bon quartier pour investir ?",
        reponse:
          "Oui pour la valeur de capital et la liquidité (revente rapide), mais le rendement locatif y est moyen (4,5 à 5 % brut) à cause des prix d'achat élevés. Pour un meilleur rendement, regardez Cézeaux ou La Pradelle.",
      },
    ],
  },
  {
    slug: "places-emblematiques-clermont-ferrand",
    titre: "Les places de Clermont-Ferrand et l'immobilier alentour en 2026",
    description:
      "Place de Jaude, place de la Victoire, place Gaillard, place Sugny : analyse des prix immobiliers autour des places emblématiques de Clermont-Ferrand.",
    categorie: "marche",
    tempsLecture: "7 min",
    datePublication: "2026-03-15",
    contenu: `
## Les places, marqueurs immobiliers d'une ville

À Clermont-Ferrand comme dans toute ville historique, les places concentrent commerces, transports, vie sociale. Habiter à proximité immédiate d'une grande place fait gagner en moyenne 8 à 15 % de valeur au m² par rapport à un quartier équivalent sans cet atout. Voici l'analyse des 5 places clés de Clermont-Ferrand et de leur impact immobilier.

## Place de Jaude — la centralité absolue

Cœur commercial de la ville. Statue de Vercingétorix, basilique Saint-Pierre, Galeries Lafayette, terminus tram. Animation quasi permanente.

- **Prix moyen 2026** : 2 600 €/m² (jusqu'à 2 700 € pour un haussmannien rénové vue place)
- **Profil acheteurs** : cadres, investisseurs haut de gamme, jeunes retraités
- **Atout** : centralité maximum, liquidité de revente
- **Limite** : bruit, peu de stationnement, charges élevées

## Place de la Victoire — l'élégance bourgeoise

Située à 300 m de la cathédrale, c'est le quartier "ancien chic" de Clermont. Place plantée d'arbres, immeubles fin XIXe, calme relatif vs Jaude. Vues parfois directes sur la cathédrale.

- **Prix moyen 2026** : 2 350 €/m²
- **Profil acheteurs** : familles aisées, professions libérales, sénior aisé
- **Atout** : charme haussmannien, calme, proximité cathédrale et hôpital
- **Limite** : peu de places de parking, copropriétés parfois vieillissantes

## Place Gaillard — la place qui vit le soir

Place de marché historique, devenue le hub de la vie nocturne et des terrasses. Très demandée par les jeunes actifs et étudiants en master.

- **Prix moyen 2026** : 2 200 €/m²
- **Profil acheteurs** : jeunes actifs 25-40 ans, investisseurs locatifs
- **Atout** : ambiance, vie de quartier, marché bi-hebdomadaire
- **Limite** : nuisances sonores fortes le week-end, vacance locative très faible (atout pour bailleur)

## Place Sugny — Montferrand authentique

Au cœur de Montferrand, ancien bourg médiéval rattaché à Clermont. Maisons à colombages, ruelles pavées, ambiance villageoise. Long sous-coté, en revalorisation.

- **Prix moyen 2026** : 1 900 €/m² (jusqu'à 2 100 € pour une maison de caractère rénovée)
- **Profil acheteurs** : amateurs de patrimoine, primo-accédants
- **Atout** : charme unique, prix encore accessibles, gentrification en cours
- **Limite** : éloigné du centre Jaude (15 min en tram), commerces limités

## Place Lamartine — entre Jaude et la cathédrale

Plus discrète, mais très bien située : à 5 min à pied de Jaude, à 5 min à pied de la cathédrale. Souvent négligée par les acheteurs qui se concentrent sur Jaude.

- **Prix moyen 2026** : 2 150 €/m²
- **Profil acheteurs** : familles avec enfants scolarisés à Lamartine ou Pascal
- **Atout** : rapport qualité-prix, proximité écoles, calme relatif
- **Limite** : peu d'animation propre, dépend des places voisines

## Synthèse comparative

| Place | Prix €/m² | Niveau de vie | Animation | Cible |
|---|---|---|---|---|
| Jaude | 2 600-2 700 | Premium | Très forte | Cadres, investisseurs |
| Victoire | 2 350 | Bourgeois | Modérée | Familles aisées |
| Gaillard | 2 200 | Bohème | Forte (soir) | Jeunes actifs |
| Lamartine | 2 150 | Familial | Faible | Familles |
| Sugny | 1 900 | Authentique | Faible | Amateurs patrimoine |

## La règle du périmètre 300 mètres

Plus on s'éloigne d'une place, plus le prix baisse rapidement :
- À 0-100 m de la place : prix maximum
- À 100-300 m : -3 à -5 %
- À 300-500 m : -8 à -12 %
- Au-delà : prix de quartier moyen

C'est particulièrement vrai pour Jaude. Un appartement à 600 m de la place, dans le même immeuble qu'à 100 m, perd facilement 200 €/m².

## Comment choisir sa place ?

- **Pour la centralité et la revente** : Jaude
- **Pour le calme et l'élégance** : Victoire
- **Pour la vie de quartier** : Gaillard
- **Pour le charme et le budget** : Sugny
- **Pour les familles** : Lamartine ou Victoire

## Conclusion

Acheter "près d'une place" à Clermont-Ferrand reste une valeur sûre. Le surcoût de 8 à 15 % est largement compensé par la liquidité de revente et la qualité de vie. CBF Conseils maîtrise chacun de ces secteurs et peut vous orienter selon votre budget et votre style de vie.

**Demandez votre estimation gratuite ou votre brief acheteur pour identifier la bonne place pour votre projet.**
    `,
    faq: [
      {
        question: "Quelle est la plus belle place de Clermont-Ferrand ?",
        reponse:
          "Subjectif, mais place de la Victoire est souvent citée pour son élégance haussmannienne et la vue sur la cathédrale. Place Sugny à Montferrand est la plus authentique avec son architecture médiévale. Jaude reste la plus emblématique pour son rôle commercial.",
      },
      {
        question: "Quel quartier autour de Jaude pour acheter ?",
        reponse:
          "Si Jaude est trop cher (2 600 €/m²), regardez Carmes (2 300 €/m²) ou Blaise Pascal (2 200 €/m²) : à moins de 10 min à pied de la place, avec un cadre encore très central et 200 à 400 €/m² économisés.",
      },
      {
        question: "Vivre près d'une place augmente-t-il la valeur du bien ?",
        reponse:
          "Oui, statistiquement +8 à +15 % au m² dans un rayon de 100 à 200 m. Cet écart se conserve à la revente : un bien à 100 m d'une place se vend en moyenne 25 jours plus vite qu'un bien équivalent à 500 m.",
      },
    ],
  },
  {
    slug: "quartiers-rentables-clermont-ferrand",
    titre: "Investir à Clermont-Ferrand : les 5 quartiers à meilleur rendement locatif en 2026",
    description:
      "Quels quartiers de Clermont-Ferrand offrent le meilleur rendement locatif en 2026 ? Gare, La Pradelle, Montjuzet : comparatif rendement brut, vacance et ticket d'entrée.",
    categorie: "investisseur",
    tempsLecture: "7 min",
    datePublication: "2026-03-20",
    contenu: `
## Pourquoi viser le rendement plutôt que le prestige

À Clermont-Ferrand, les quartiers les plus prestigieux (Jaude, Oradou) offrent des rendements bruts de 4,5 à 5 % seulement. Les quartiers les plus rentables, eux, atteignent 6,5 à 7,5 % brut. Sur 20 ans avec effet de levier du crédit, c'est 80 000 à 120 000 € de différence en faveur du rendement. Pour un investisseur locatif, le bon quartier n'est pas forcément celui qu'on aime habiter.

Voici notre top 5 des quartiers où investir à Clermont-Ferrand en 2026.

## 1. Les Cézeaux — le campus universitaire (rendement 7,5 %)

Quartier sud-ouest dominé par le campus scientifique de l'UCA (10 000 étudiants), polytech, écoles d'ingénieurs. Demande locative étudiante massive, vacance quasi nulle de septembre à juillet.

- **Prix moyen 2026** : 1 950 €/m²
- **Loyer studio (20-25 m²)** : 400 à 450 €/mois
- **Rendement brut estimé** : 7,5 %
- **Profil locataires** : étudiants, doctorants, jeunes chercheurs
- **Risque** : turnover élevé (1 à 2 ans), vacance d'été à anticiper (juin-août)

Stratégie : viser un studio meublé, en LMNP, avec garant ou Visale.

## 2. La Pradelle — familles et jeunes actifs (rendement 6,8 %)

Quartier résidentiel ouest, mix immeubles années 70-80 et petits collectifs récents. Pas le plus charmant, mais les prix sont contenus et la demande locative est soutenue par la proximité des hôpitaux et de la zone industrielle.

- **Prix moyen 2026** : 2 100 €/m²
- **Loyer 2P (40-50 m²)** : 550 à 620 €/mois
- **Rendement brut estimé** : 6,8 %
- **Profil locataires** : jeunes couples, infirmières CHU, salariés Michelin
- **Risque** : DPE souvent moyen (D-E), prévoir budget rénovation thermique

## 3. Montferrand — le pari de la revalorisation (rendement 6,9 %)

Ancien bourg médiéval rattaché à Clermont, Montferrand est en gentrification lente. Prix encore modérés, mais la demande monte (quartier branché, marché animé).

- **Prix moyen 2026** : 1 800 à 2 000 €/m²
- **Loyer 2P (40-50 m²)** : 500 à 560 €/mois
- **Rendement brut estimé** : 6,9 %
- **Profil locataires** : jeunes actifs créatifs, télétravailleurs
- **Bonus** : potentiel de plus-value à 5-7 ans (+15 à 20 % anticipés)

## 4. Blaise Pascal / Gare — l'urbain accessible (rendement 6,5 %)

Quartier du nord du centre-ville, autour de la gare SNCF et de la fac de lettres. Bon compromis : centralité, transports (tram + train), prix modérés.

- **Prix moyen 2026** : 2 000 à 2 200 €/m²
- **Loyer 2P (40-50 m²)** : 580 à 640 €/mois
- **Rendement brut estimé** : 6,5 %
- **Profil locataires** : étudiants en master, jeunes actifs, mobilité pro
- **Atout** : à 5 min à pied de Jaude, demande forte toute l'année

## 5. La Pardieu — le quartier d'affaires (rendement 6,2 %)

Au sud-est, La Pardieu concentre la ZAC d'affaires (banques, IT, services), le multiplex Pathé et plusieurs résidences récentes. Locataires solvables, faible vacance.

- **Prix moyen 2026** : 2 000 €/m²
- **Loyer 2P (45-55 m²)** : 580 à 650 €/mois
- **Rendement brut estimé** : 6,2 %
- **Profil locataires** : cadres, consultants en mission longue, expatriés
- **Atout** : tickets locataires plus élevés, baux mobilité possibles

## Tableau de synthèse

| Rang | Quartier | Prix €/m² | Rendement brut | Cible |
|---|---|---|---|---|
| 1 | Les Cézeaux | 1 950 | 7,5 % | Studio étudiant |
| 2 | Montferrand | 1 800-2 000 | 6,9 % | 2P jeunes actifs |
| 3 | La Pradelle | 2 100 | 6,8 % | 2P / 3P familial |
| 4 | Blaise Pascal | 2 000-2 200 | 6,5 % | 2P étudiants/actifs |
| 5 | La Pardieu | 2 000 | 6,2 % | 2P / 3P cadres |

## Attention : rendement brut ne fait pas tout

Le rendement brut affiché ne tient pas compte de :
- Taxe foncière (1 200 à 1 800 €/an pour un appartement)
- Charges de copropriété (80 à 150 €/mois)
- Assurance PNO (150 à 200 €/an)
- Frais de gestion locative si délégation (6 à 8 % des loyers)
- Vacance locative moyenne (1 mois sur 12 sauf Cézeaux : 2 mois)
- CSG et impôts sur les loyers

Le rendement net oscille en réalité entre 3,8 % et 5,5 % selon le quartier et la fiscalité (LMNP réel reste le plus efficace).

## Conclusion

Pour un investisseur 2026, le top du couple rendement / risque à Clermont-Ferrand est Cézeaux pour le pur rendement étudiant, et Montferrand pour le rendement + plus-value future. CBF Conseils peut vous accompagner sur le sourcing de biens off-market dans ces secteurs.

**Demandez un brief investisseur personnalisé : nous vous transmettons les biens correspondant à votre cahier des charges.**
    `,
    faq: [
      {
        question: "Quelle rentabilité locative espérer à Clermont-Ferrand ?",
        reponse:
          "Entre 5,5 % et 7,5 % brut selon le quartier en 2026. Les meilleurs rendements sont sur les studios étudiants des Cézeaux (7,5 %), les pires sur les beaux appartements Jaude / Oradou (4,5 à 5 %). Le rendement net après charges et fiscalité tourne entre 3,8 et 5,5 %.",
      },
      {
        question: "Quel quartier pour un studio étudiant à Clermont-Ferrand ?",
        reponse:
          "Les Cézeaux est imbattable : campus à pied, demande énorme, prix bas (1 950 €/m²), loyer 400-450 €/mois pour un studio 22 m². Blaise Pascal et Carmes sont des alternatives pour les étudiants en lettres et sciences humaines.",
      },
      {
        question: "Faut-il privilégier le neuf ou l'ancien à Clermont-Ferrand ?",
        reponse:
          "L'ancien dans 80 % des cas. Le neuf sur Clermont-Ferrand affiche des prix 25 à 35 % au-dessus de l'ancien (3 200 à 3 800 €/m²) sans gain locatif équivalent. Le neuf garde un sens uniquement avec dispositif fiscal type Pinel résiduel ou pour confort de gestion.",
      },
    ],
  },
  {
    slug: "quartiers-moins-chers-clermont-ferrand",
    titre: "Les quartiers les moins chers de Clermont-Ferrand pour acheter en 2026",
    description:
      "Chanturgue, La Plaine, Croix-de-Neyrat, Le Brézet : les quartiers accessibles de Clermont-Ferrand sous 2 000 €/m² en 2026.",
    categorie: "acheteur",
    tempsLecture: "6 min",
    datePublication: "2026-03-25",
    contenu: `
## Acheter à Clermont-Ferrand pour moins de 200 000 €

Avec un prix moyen de 2 229 €/m² intra-muros, devenir propriétaire à Clermont-Ferrand reste accessible — à condition de regarder les bons quartiers. Plusieurs zones offrent encore des biens sous 2 000 €/m², voire à partir de 1 800 €/m² pour les plus excentrés. Voici le top 5 des quartiers les plus abordables en 2026.

## 1. Le Brézet — 1 800 €/m²

Au nord-est, Le Brézet est connu pour sa zone d'activité économique et l'aéroport. Mais le quartier résidentiel autour offre des maisons individuelles avec jardin à des prix introuvables ailleurs en métropole clermontoise.

- **Prix moyen** : 1 800 €/m² (appartement), 1 950 €/m² (maison)
- **Type de biens** : maisons années 60-80 avec terrain, petits collectifs
- **Cible** : familles, primo-accédants
- **Atouts** : maisons accessibles, accès rapide A71 et aéroport
- **Limites** : éloigné du centre (15 min en voiture), commerces limités

## 2. La Plaine — 1 850 €/m²

Quartier populaire au nord, longtemps dévalorisé, en cours de transformation grâce à plusieurs projets urbains (rénovation de la ZAC, prolongement tram).

- **Prix moyen** : 1 850 €/m²
- **Type de biens** : grands ensembles années 60-70, quelques pavillons
- **Cible** : primo-accédants, investisseurs au rendement
- **Atouts** : prix bas, transformations urbaines à venir
- **Limites** : image de quartier à dépasser, qualité de bâti moyenne

## 3. Croix-de-Neyrat — 1 850 €/m²

À l'est de Clermont, Croix-de-Neyrat est un quartier résidentiel calme, structuré autour de petits collectifs et de pavillons. Bonne desserte bus, écoles publiques correctes.

- **Prix moyen** : 1 850 €/m²
- **Type de biens** : 2P à 4P en immeubles années 70-90, maisons mitoyennes
- **Cible** : familles modestes, retraités, investisseurs
- **Atouts** : calme, sécurité, écoles à proximité
- **Limites** : pas de tram (uniquement bus), excentré du centre

## 4. Chanturgue — 1 900 €/m²

Adossé au plateau de Chanturgue (ancien plateau volcanique), ce quartier offre des vues panoramiques sur Clermont et la chaîne des Puys. Construction mêlant pierre de Volvic et basalte noir caractéristique.

- **Prix moyen** : 1 900 €/m²
- **Type de biens** : maisons en pierre, petits collectifs
- **Cible** : amateurs de patrimoine, familles
- **Atouts** : caractère architectural fort, vue, gentrification lente en cours
- **Limites** : relief (rues en pente), peu de commerces de proximité

## 5. Champratel — 1 950 €/m²

Quartier nord-ouest, calme, principalement résidentiel pavillonnaire. Profil très familial, écoles, espaces verts.

- **Prix moyen** : 1 950 €/m²
- **Type de biens** : maisons des années 70-90, petits collectifs
- **Cible** : familles, primo-accédants
- **Atouts** : maisons à bon prix avec jardin
- **Limites** : excentré, dépendance voiture

## Pourquoi ces quartiers sont moins chers ?

Plusieurs raisons cumulent :
- **Distance du centre** : 10 à 20 min en voiture vs Jaude
- **Image de quartier** : préjugés tenaces sur certaines zones
- **Qualité de bâti** : grands ensembles années 60-70 souvent énergivores (DPE D-E-F)
- **Infrastructures** : moins de commerces, peu ou pas de tram

## Lesquels vont se revaloriser ?

Notre pronostic à 5-10 ans :
- **Chanturgue** : potentiel +20 % (caractère architectural rare, gentrification douce)
- **Montferrand** (proche) : potentiel +25 % (déjà en route)
- **La Plaine** : potentiel +15 à 20 % si les projets urbains aboutissent
- **Le Brézet, Croix-de-Neyrat** : stables (peu de leviers de revalorisation)

## Pour qui sont ces quartiers ?

- **Primo-accédants** : un T3 à 1 850 €/m² coûte 130 000 à 150 000 €, soit 5 à 6 années de revenus médians, vs 8 à 10 ans à Jaude
- **Familles avec enfants** : maisons avec jardin sous 250 000 €, impossible à Chamalières ou Oradou
- **Investisseurs rendement** : rendements bruts 6,5 à 7 %, supérieurs au centre

## Conclusion

Acheter dans un quartier "moins cher" à Clermont-Ferrand n'est pas un compromis : c'est une stratégie. Soit vous priorisez le budget (primo-accession), soit vous pariez sur la revalorisation (Chanturgue, La Plaine), soit vous optimisez le rendement (Le Brézet, Croix-de-Neyrat).

**CBF Conseils vous aide à identifier le bon quartier selon votre projet et votre budget. Demandez votre brief acheteur en ligne.**
    `,
    faq: [
      {
        question: "Quel est le quartier le moins cher de Clermont-Ferrand ?",
        reponse:
          "Le Brézet en 2026, avec une moyenne de 1 800 €/m² pour les appartements. La Plaine et Croix-de-Neyrat suivent à 1 850 €/m². Ces écarts vs la moyenne ville (2 229 €/m²) s'expliquent par la distance au centre et la qualité du bâti.",
      },
      {
        question: "Peut-on acheter sous 150 000 € à Clermont-Ferrand ?",
        reponse:
          "Oui, principalement dans Le Brézet, La Plaine, Croix-de-Neyrat ou Champratel. Un T3 de 70 m² sous 150 000 € reste possible. Plus rare en centre : il faut alors viser un T2 ou un studio, avec souvent des travaux à prévoir.",
      },
      {
        question: "Quels quartiers vont se revaloriser à Clermont-Ferrand ?",
        reponse:
          "Chanturgue (+20 % potentiel à 7-10 ans), Montferrand (+25 % déjà engagé), La Plaine (+15-20 % conditionnel aux projets urbains). À l'inverse, Le Brézet et Croix-de-Neyrat sont sur des plateaux de prix stables.",
      },
    ],
  },
  {
    slug: "acheter-immobilier-clermont-ferrand-2026",
    titre: "Acheter un bien immobilier à Clermont-Ferrand en 2026 : le guide complet",
    description:
      "Toutes les étapes pour réussir votre achat immobilier à Clermont-Ferrand en 2026 : budget, financement, quartiers, négociation, frais.",
    categorie: "acheteur",
    tempsLecture: "9 min",
    datePublication: "2026-04-01",
    contenu: `
## 2026, une bonne année pour acheter à Clermont-Ferrand ?

Le marché clermontois a stabilisé ses prix après le choc des taux 2023-2024. À 2 229 €/m² en moyenne (+3,2 % sur 12 mois), Clermont-Ferrand reste l'une des grandes villes les plus accessibles de France. Les taux de crédit, autour de 3,7-4,2 % en 2026, restent élevés mais permettent à nouveau de monter des dossiers cohérents avec un apport raisonnable. Voici les 7 étapes pour réussir votre achat.

## Étape 1 — Définir son budget réel

Le piège classique : confondre prix d'achat et budget total. Comptez environ +15 % au-dessus du prix net vendeur :

- Prix d'achat (net vendeur) : 200 000 €
- Frais de notaire (ancien) : ~7,5 % = 15 000 €
- Frais d'agence (souvent à charge vendeur, sinon 4-6 %) : 0 à 12 000 €
- Travaux éventuels (DPE, peinture, cuisine) : 5 000 à 30 000 €
- Frais de dossier banque, garantie, hypothèque : 1 500 à 3 500 €
- **Budget total réaliste : 220 000 à 260 000 €**

À Clermont-Ferrand en 2026, voici les budgets typiques par type de bien :
- Studio (25 m²) en centre : 60 000 à 75 000 €
- T2 (45 m²) en centre : 110 000 à 135 000 €
- T3 (70 m²) en centre : 165 000 à 200 000 €
- Maison 4P avec jardin en banlieue : 230 000 à 320 000 €

## Étape 2 — Financer son achat

Les conditions 2026 :
- Taux moyen sur 20 ans : 3,7 à 4,2 %
- Apport minimum exigé : 10 % du prix + frais (= 15 à 20 % du budget total)
- Taux d'endettement maximum : 35 % des revenus (HCSF)
- Durée maximum : 25 ans (27 si neuf VEFA)

PTZ (prêt à taux zéro) : Clermont-Ferrand est en zone B2. Le PTZ y est limité aux logements neufs ou aux opérations achat + travaux importants. Vérifiez votre éligibilité.

Astuce 2026 : faire jouer la concurrence entre 3 banques + un courtier (Empruntis, Cafpi, courtier local). Écart constaté entre meilleur et pire taux : 0,4 à 0,7 point, soit 8 000 à 15 000 € sur la durée du crédit.

## Étape 3 — Choisir son quartier

| Profil | Quartiers recommandés | Budget T3 indicatif |
|---|---|---|
| Cadre célibataire / couple sans enfant | Jaude, Carmes, Centre | 180 000 - 220 000 € |
| Famille avec enfants | Oradou, Lamartine, Chamalières | 200 000 - 280 000 € |
| Primo-accédant | La Pradelle, Le Brézet, Chanturgue | 130 000 - 165 000 € |
| Investisseur | Cézeaux, Montferrand, La Pardieu | 110 000 - 160 000 € |
| Recherche maison + jardin | Beaumont, Aubière, Cournon | 250 000 - 380 000 € |

## Étape 4 — Visiter et vérifier les diagnostics

Le DPE est l'élément n°1 à vérifier en 2026. Un bien classé F ou G :
- N'est plus louable depuis 2025 (G) et le sera bientôt pour F
- Décote de 10 à 15 % à la revente
- Travaux d'isolation à prévoir : 15 000 à 50 000 € selon surface

Autres points à contrôler en visite :
- État des fenêtres (double vitrage ?)
- Chauffage (collectif gaz, individuel élec, fioul ?)
- Charges de copropriété (récupérer 3 derniers PV d'AG)
- Travaux votés ou à venir (ravalement, ascenseur, toiture)
- Plomberie et électricité (visible)
- Humidité, fissures, infiltrations

## Étape 5 — Faire une offre et négocier

Marge de négociation moyenne à Clermont-Ferrand en 2026 : 4 à 6 %. Sur un bien à 200 000 €, cela représente 8 000 à 12 000 € à négocier. Vos arguments :

- Travaux à prévoir (DPE, électricité, cuisine)
- Charges de copropriété élevées
- Délai de mise en vente long (> 3 mois = signe de surprix)
- Comparaisons DVF récentes (ventes notariales du même quartier)

À éviter : offre trop basse (-15 % et plus) qui braque le vendeur sans contre-proposition.

## Étape 6 — Signer le compromis

Une fois l'offre acceptée, le compromis (ou promesse de vente) est signé sous 1 à 3 semaines. Points clés :
- Versement de 5 à 10 % du prix en séquestre
- Délai de rétractation acheteur : 10 jours (loi SRU)
- Clauses suspensives : obtention du crédit (45 à 60 jours), absence de servitude, etc.

Lire attentivement chaque clause. Un avocat ou notaire peut relire le compromis pour 200 à 500 €.

## Étape 7 — Acte authentique chez le notaire

Délai entre compromis et acte : 60 à 90 jours en moyenne. Pendant ce délai :
- Le notaire purge le droit de préemption urbain
- Vous obtenez votre crédit (banque éditera l'offre, délai de réflexion 11 jours)
- Vous préparez le déménagement

Le jour J : signature de l'acte, remise des clés, paiement du solde + frais de notaire.

## Erreurs classiques à éviter

1. Acheter sans avoir vu 5 à 10 biens (manque de comparaison)
2. Sous-estimer les travaux (toujours +20 % sur le devis initial)
3. Négliger les charges de copropriété
4. Ne pas comparer 3 banques minimum
5. Acheter en mandat exclusif d'une seule agence sans avis externe
6. Acheter émotionnellement (coup de cœur)

## Conclusion

Acheter à Clermont-Ferrand en 2026 reste accessible si vous structurez votre démarche, soignez votre dossier de financement, et choisissez le quartier en cohérence avec votre projet de vie.

**CBF Conseils accompagne les acheteurs en exclusivité (off-market) ou via son fichier d'annonces. Demandez votre rendez-vous brief acheteur.**
    `,
    faq: [
      {
        question: "Combien faut-il gagner pour acheter à Clermont-Ferrand ?",
        reponse:
          "Pour un T3 à 180 000 € avec 20 000 € d'apport, les banques exigent en 2026 environ 3 200 €/mois nets pour un couple, ou 2 800 €/mois nets pour une personne seule (taux 4 %, durée 25 ans, taux d'endettement 33 %). Pour un studio à 75 000 €, comptez 1 500 €/mois nets minimum.",
      },
      {
        question: "Quel délai entre compromis et acte authentique ?",
        reponse:
          "60 à 90 jours en moyenne en 2026 à Clermont-Ferrand. Ce délai inclut la purge du droit de préemption (1 mois), l'obtention du crédit (45 à 60 jours), la rédaction de l'acte par le notaire et la prise de rendez-vous final. Si tout est réuni, possible de descendre à 45 jours.",
      },
      {
        question: "Faut-il un apport pour acheter à Clermont-Ferrand ?",
        reponse:
          "Oui, presque obligatoire en 2026. Les banques exigent au minimum 10 % du prix + les frais de notaire, soit environ 15 à 20 % du budget total. Sans apport, le dossier ne passe que dans des cas très spécifiques (très hauts revenus, primo-accédant avec PTZ).",
      },
    ],
  },
  {
    slug: "prix-loyer-clermont-ferrand-2026",
    titre: "Prix des loyers à Clermont-Ferrand en 2026 : analyse par quartier et type de bien",
    description:
      "Loyers moyens à Clermont-Ferrand en 2026 : studio, 2 pièces, 3 pièces, maison. Comparatif par quartier et calcul de rentabilité.",
    categorie: "investisseur",
    tempsLecture: "7 min",
    datePublication: "2026-04-05",
    contenu: `
## Le marché locatif clermontois en 2026

Clermont-Ferrand reste une ville locative dynamique en 2026, portée par les 35 000 étudiants de l'UCA, les 11 000 salariés Michelin, les 8 000 emplois hospitaliers et le télétravail qui attire des cadres venus de Lyon ou Paris. La vacance locative moyenne est faible (1 à 2 % en centre, 3 à 5 % en périphérie). Le loyer moyen au m² s'établit à 11,50 €/m² en 2026, en hausse de +2,3 % sur un an.

## Loyers moyens par typologie

### Studio (18-30 m²)
- Loyer : 350 à 480 €/mois charges comprises
- Loyer moyen : 415 €/mois
- Loyer au m² moyen : 14 à 16 €/m² (les studios sont toujours surpayés au m²)
- Public : étudiants, jeunes actifs en mission

### 2 pièces (35-55 m²)
- Loyer : 520 à 660 €/mois charges comprises
- Loyer moyen : 590 €/mois
- Loyer au m² moyen : 11 à 13 €/m²
- Public : couples sans enfant, jeunes actifs, étudiants en colocation

### 3 pièces (55-80 m²)
- Loyer : 680 à 900 €/mois charges comprises
- Loyer moyen : 780 €/mois
- Loyer au m² moyen : 10 à 12 €/m²
- Public : couples avec 1 enfant, jeunes familles

### 4 pièces et + (80-120 m²)
- Loyer : 880 à 1 200 €/mois (appartement)
- Loyer maison 4P avec jardin : 900 à 1 400 €/mois
- Loyer au m² moyen : 9 à 11 €/m²
- Public : familles, expatriés en mission longue

## Variation par quartier

| Quartier | Indice loyer (base 100 = moyenne ville) |
|---|---|
| Jaude / hyper-centre | 120 (+20 %) |
| Oradou | 115 (+15 %) |
| Centre-Ville classique | 110 (+10 %) |
| Carmes, Blaise Pascal | 105 |
| Chamalières, Royat | 105 |
| Lamartine, Pasteur | 100 |
| Cézeaux | 95 (loyers studios élevés mais petites surfaces) |
| Montferrand | 90 |
| La Pradelle, La Pardieu | 88 |
| Le Brézet, Croix-de-Neyrat | 85 |
| Chanturgue, Champratel | 85 |

Concrètement : un T2 à Jaude se loue 660 €, le même T2 à Croix-de-Neyrat 530 €. Soit 1 560 €/an de différence.

## Clermont-Ferrand est-elle en zone tendue ?

Non. Clermont-Ferrand n'est pas classée en zone tendue stricte au sens de la loi (à la différence de Paris, Lille, Lyon, Bordeaux). Conséquences :
- Pas d'encadrement des loyers (libre fixation)
- Pas de plafonnement à la relocation
- Préavis locataire : 3 mois (vs 1 mois en zone tendue)

Le marché reste néanmoins tendu localement (Jaude, Oradou, Cézeaux), mais sans contrainte légale.

## Rentabilité brute et nette

### Rentabilité brute par quartier

| Quartier | Prix achat €/m² | Loyer €/m² | Rendement brut |
|---|---|---|---|
| Jaude | 2 600 | 14 | 6,5 % |
| Centre-Ville | 2 400 | 13 | 6,5 % |
| Oradou | 2 500 | 13 | 6,2 % |
| Cézeaux | 1 950 | 14-16 (studios) | 7,5 % |
| La Pradelle | 2 100 | 12 | 6,8 % |
| Le Brézet | 1 800 | 11 | 7,3 % |

Attention : le rendement brut est trompeur. Pour le rendement net, déduire :
- Taxe foncière : 1 200 à 1 800 €/an pour un appartement
- Charges copropriété non récupérables : 30 à 50 % des charges totales (~ 600 à 1 200 €/an)
- Assurance PNO : 150 à 200 €/an
- Vacance locative : 1 mois sur 12 (8,3 % du loyer annuel)
- Frais de gestion locative si délégation : 6 à 8 % des loyers
- Imposition (IR + CSG) : 30 à 47 % des revenus fonciers en réel, plus avantageux en LMNP

Rendement net réaliste : 3,8 à 5,5 % selon le quartier et la fiscalité.

## Évolution des loyers : tendance 2026-2027

- Hausse anticipée : +2 à +3 % en 2027 (IRL en hausse, demande forte)
- Pression DPE : les biens E vont devenir interdits à la location dès 2028 (puis F en 2034)
- Conséquence : revalorisation des bons biens (DPE A-B-C-D), forte décote sur les passoires thermiques

## Conclusion

Clermont-Ferrand reste un marché locatif solide pour les bailleurs : faible vacance, demande structurelle (étudiants, Michelin, CHU), pas d'encadrement de loyer. Le bon couple rendement / sécurité est un T2 récent ou rénové dans Cézeaux ou La Pradelle, ou un studio meublé en LMNP.

**CBF Conseils peut estimer le loyer de marché de votre bien et vous accompagner sur la mise en location ou la cession.**
    `,
    faq: [
      {
        question: "Clermont-Ferrand est-elle une ville à loyer encadré ?",
        reponse:
          "Non, Clermont-Ferrand n'est pas en zone tendue stricte. Les loyers sont libres à la mise en location et à la relocation. Le préavis locataire est de 3 mois (vs 1 mois en zone tendue).",
      },
      {
        question: "Quel loyer pour un studio à Clermont-Ferrand en 2026 ?",
        reponse:
          "Entre 350 et 480 €/mois charges comprises selon le quartier. Moyenne ville : 415 €/mois. Les studios des Cézeaux ou Jaude se louent 450-480 €, ceux de Croix-de-Neyrat ou Champratel autour de 360-400 €.",
      },
      {
        question: "Combien rapporte un investissement locatif à Clermont-Ferrand ?",
        reponse:
          "Rendement brut moyen 6 à 7,5 % selon quartier (jusqu'à 7,5 % sur studios étudiants Cézeaux). Rendement net après charges, vacance et fiscalité : 3,8 à 5,5 %. Le LMNP est généralement le régime le plus avantageux fiscalement.",
      },
    ],
  },
  {
    slug: "droits-proprietaire-bailleur-clermont",
    titre: "Droits et obligations du propriétaire bailleur à Clermont-Ferrand",
    description:
      "Contrat de bail, état des lieux, entretien, dépôt de garantie, fin de bail : tout ce que doit savoir un propriétaire bailleur à Clermont-Ferrand.",
    categorie: "investisseur",
    tempsLecture: "8 min",
    datePublication: "2026-04-10",
    contenu: `
## Être bailleur à Clermont-Ferrand : les règles à connaître

Mettre un bien en location à Clermont-Ferrand suit le cadre national de la loi du 6 juillet 1989 (loi Mermaz) et de la loi ALUR (2014). Pas de réglementation locale spécifique (Clermont-Ferrand n'est pas en zone tendue). Mais les obligations du bailleur sont nombreuses et l'évolution réglementaire (DPE notamment) impose une vigilance accrue en 2026.

## Le contrat de bail : ce qu'il doit contenir

Depuis la loi ALUR, un contrat type est obligatoire (décret 2015-587). Il doit comporter :
- Identité du bailleur et du locataire
- Description précise du logement (surface loi Boutin, équipements)
- Durée du bail : 3 ans (location nue) ou 1 an (meublé), 9 mois (étudiant meublé)
- Loyer et charges (forfait ou réel)
- Dépôt de garantie : 1 mois (nu) ou 2 mois (meublé)
- Date de prise d'effet
- Mention des diagnostics (DPE, ERNT, plomb, amiante selon ancienneté)

Le bail nu se reconduit tacitement par périodes de 3 ans. Le bail meublé : 1 an reconductible.

## Les obligations principales du propriétaire

### 1. Délivrer un logement décent
Décret 2002-120 : surface habitable minimum 9 m² ET 20 m³, électricité conforme, eau chaude, chauffage, sanitaires, fenêtre extérieure.

### 2. Entretien et grosses réparations
Le bailleur prend en charge :
- Toiture, façade, gros œuvre
- Chaudière (sauf entretien annuel à charge locataire)
- Volets, fenêtres (sauf entretien courant)
- Canalisations principales
- Tout ce qui n'est pas listé dans le décret 87-712 (travaux locatifs)

### 3. Respecter le DPE (réglementation 2025-2034)
Calendrier en vigueur :
- Depuis 2023 : interdiction de mettre en location un bien G+ (>450 kWh/m²/an)
- Depuis 1er janvier 2025 : interdiction G complet
- 1er janvier 2028 : interdiction F
- 1er janvier 2034 : interdiction E

À Clermont-Ferrand, environ 18 % du parc locatif est en E ou pire. Tout bailleur doit anticiper la rénovation thermique : isolation des combles, changement chaudière, double vitrage, isolation murs.

## Le dépôt de garantie : règles 2026

- Montant maximum : 1 mois de loyer hors charges (nu), 2 mois (meublé)
- Versé par le locataire à la signature du bail
- Restitution dans 1 mois (si état des lieux conforme) ou 2 mois (si dégradations)
- Au-delà de ces délais : intérêts dus (10 % du loyer mensuel par mois de retard)

Erreur classique : retenir abusivement sans justificatif. Toute retenue doit être justifiée par devis ou facture.

## Les états des lieux : entrée et sortie

L'état des lieux d'entrée est obligatoire et joint au bail. Sans état des lieux d'entrée, le logement est présumé en bon état à la sortie (à votre désavantage en tant que bailleur).

À l'entrée comme à la sortie :
- Présence des deux parties ou représentants
- Description pièce par pièce
- Photos (recommandé, pas obligatoire)
- Relevés compteurs (eau, gaz, élec)

À la sortie, comparer avec celui d'entrée. Toute dégradation hors usure normale peut être facturée au locataire.

## La révision du loyer

Une seule fois par an, à la date anniversaire du bail. Indexation sur l'IRL (Indice de Référence des Loyers) publié par l'INSEE chaque trimestre. Calcul :

Nouveau loyer = Loyer actuel × (IRL nouveau / IRL ancien)

Le bail doit prévoir une clause de révision (sinon pas de révision possible). Pas de révision rétroactive : si oubli, le bailleur perd l'année.

## Augmentation du loyer hors révision

Hors zone tendue (cas de Clermont-Ferrand), le bailleur peut :
- Réviser annuellement selon IRL (sans plafond local)
- Augmenter le loyer en cas de relocation (libre fixation)
- Augmenter en cours de bail uniquement si gros travaux d'amélioration

## La fin de bail : congé et reprise

Le bailleur peut donner congé au locataire avec 6 mois de préavis (avant échéance) pour 3 motifs uniquement :
- Vente du bien
- Reprise pour habitation personnelle ou famille
- Motif légitime et sérieux (impayés répétés, troubles, défaut d'usage)

Hors ces motifs, le bail se reconduit. Procédure : courrier recommandé avec AR ou acte d'huissier, mention du motif, du délai et — si vente — d'une offre prioritaire au locataire.

## Les impayés : que faire ?

Procédure type en 2026 :
1. Relance amiable (premier impayé, 30 jours)
2. Mise en demeure recommandée (à J+45)
3. Commandement de payer par huissier (J+60), délai 2 mois pour régulariser
4. Saisine du tribunal d'instance (J+120 environ)
5. Jugement, puis commandement de quitter les lieux
6. Concours de la force publique

Délai total moyen : 18 à 24 mois entre premier impayé et libération effective.

Solutions de protection :
- Garant solidaire (caution physique, idéalement)
- Garantie Visale (gratuite, sécurise impayés et dégradations sur 36 mois max)
- GLI (Garantie Loyers Impayés) privée : 2 à 3 % des loyers, couvre impayés + frais de procédure
- Attention : on ne cumule pas Visale et GLI

## Conclusion

Être bailleur à Clermont-Ferrand en 2026, c'est un cadre national strict mais relativement clair. Les deux gros enjeux : la mise aux normes DPE (calendrier 2028-2034) et la gestion des impayés (Visale ou GLI obligatoires pour dormir tranquille).

**CBF Conseils accompagne les bailleurs sur la mise en location, la sélection des dossiers locataires, et la gestion locative déléguée à Clermont-Ferrand.**
    `,
    faq: [
      {
        question: "Peut-on augmenter le loyer à Clermont-Ferrand ?",
        reponse:
          "Oui. Clermont-Ferrand n'étant pas en zone tendue, le bailleur peut réviser le loyer chaque année selon l'IRL (clause obligatoire dans le bail) et fixer librement le loyer à la relocation. Pas d'encadrement local.",
      },
      {
        question: "Combien de temps pour expulser un locataire à Clermont-Ferrand ?",
        reponse:
          "Entre 18 et 24 mois en moyenne entre le premier impayé et la libération effective des lieux. La procédure passe par mise en demeure, commandement de payer (2 mois), saisine du tribunal, jugement et commandement de quitter avec concours de la force publique.",
      },
      {
        question: "Quel est le délai pour rendre le dépôt de garantie ?",
        reponse:
          "1 mois maximum si l'état des lieux de sortie est conforme à celui d'entrée. 2 mois si des dégradations sont constatées. Au-delà, des intérêts de 10 % du loyer mensuel par mois de retard sont dus au locataire.",
      },
    ],
  },
  {
    slug: "investissement-locatif-clermont-2026",
    titre: "Investissement locatif à Clermont-Ferrand en 2026 : guide stratégique complet",
    description:
      "Rendements, types de biens, fiscalité LMNP, financement : tout ce qu'il faut savoir pour réussir son investissement locatif à Clermont-Ferrand en 2026.",
    categorie: "investisseur",
    tempsLecture: "9 min",
    datePublication: "2026-04-15",
    contenu: `
## Pourquoi investir à Clermont-Ferrand en 2026

Trois raisons rendent Clermont-Ferrand particulièrement intéressante pour un investisseur 2026 :

1. **Prix d'entrée bas** : 2 229 €/m² en moyenne, soit -45 % vs Lyon et -65 % vs Bordeaux
2. **Rendements solides** : 6 à 7,5 % brut selon quartier, supérieurs à la moyenne des grandes villes
3. **Demande locative pérenne** : 35 000 étudiants UCA, 11 000 salariés Michelin, 8 000 hospitaliers, télétravailleurs venus de Paris/Lyon

Le marché est stable (+3,2 % sur 12 mois, +25 % sur 10 ans), sans bulle. C'est un marché de fond, pas spéculatif.

## Quels types de biens privilégier ?

### Le studio étudiant (Cézeaux, Blaise Pascal)
- Budget : 50 000 à 80 000 €
- Loyer : 380 à 460 €/mois meublé
- Rendement brut : 7 à 8 %
- Avantages : ticket d'entrée bas, demande énorme, fiscalité LMNP optimisée
- Inconvénients : turnover annuel, vacance d'été (juin-août)

### Le 2 pièces pour jeune actif (Centre, Carmes, Pradelle)
- Budget : 110 000 à 140 000 €
- Loyer : 550 à 640 €/mois
- Rendement brut : 5,5 à 6,5 %
- Avantages : turnover plus faible (3-4 ans), bail 3 ans, locataire stable
- Inconvénients : rendement plus modeste

### La maison familiale (Beaumont, Aubière, Cournon)
- Budget : 220 000 à 320 000 €
- Loyer : 900 à 1 250 €/mois
- Rendement brut : 5 à 6 %
- Avantages : turnover très faible (5-7 ans), peu de vacance, locataires solvables
- Inconvénients : ticket élevé, gestion plus lourde (jardin, toiture)

### La colocation (T4 / T5 en centre)
- Budget : 200 000 à 280 000 €
- Loyer total : 1 600 à 2 000 €/mois (4 chambres × 400-500 €)
- Rendement brut : 8 à 10 %
- Avantages : rendement maximum, demande étudiante forte
- Inconvénients : gestion intensive, équipement plus lourd, bail spécifique

## Le financement en 2026

Conditions actuelles :
- Taux moyen : 3,7 à 4,2 % sur 20 ans
- Apport recommandé : 15 à 20 % du prix + frais
- Possibilité d'emprunter en SCI à l'IS pour optimiser
- Effet de levier : avec 30 000 € d'apport, achat possible jusqu'à 200 000 €

Astuce 2026 : présentation à la banque doit inclure le plan de financement complet (acquisition + travaux + ameublement éventuel) et un prévisionnel locatif crédible (loyers conservateurs, vacance 1 mois/an).

## Fiscalité : 4 régimes possibles

### 1. Régime micro-foncier (revenus locatifs nus < 15 000 €/an)
- Abattement forfaitaire 30 % sur les loyers
- Imposition au barème IR + 17,2 % CSG/CRDS
- Simple mais peu avantageux si charges réelles élevées

### 2. Régime réel (location nue)
- Déduction des charges réelles (intérêts, taxe foncière, travaux, gestion)
- Création possible d'un déficit foncier imputable jusqu'à 10 700 €/an sur le revenu global
- Idéal si gros travaux à prévoir (rénovation thermique)

### 3. LMNP au régime réel (location meublée non professionnelle)
- Amortissement du bien et du mobilier sur 20-30 ans
- Loyers généralement non imposés sur 8 à 12 ans (effet amortissement)
- Régime préféré 90 % du temps en 2026

### 4. LMP (loueur meublé professionnel)
- Loyers > 23 000 €/an ET > 50 % des revenus du foyer
- Cotisations sociales SSI (~30 % au lieu de 17,2 %)
- Avantages limités, à éviter sauf cas spécifique

## Exemple chiffré : T2 de 50 m² à 150 000 €

### Hypothèses
- Achat : 150 000 € (2 800 €/m² au bas de Jaude, ou 2 100 €/m² La Pradelle pour 70 m²)
- Frais notaire : 11 250 € (7,5 %)
- Apport : 30 000 €
- Crédit : 131 250 € sur 20 ans à 4 %
- Mensualité : 795 €
- Loyer : 600 €/mois (7 200 €/an)
- Charges et taxes : 2 500 €/an

### Cash-flow brut
- Loyers annuels : 7 200 €
- Mensualités annuelles : 9 540 €
- Charges et taxes : 2 500 €
- Cash-flow brut : -4 840 €/an (effort d'épargne mensuel ~400 €)

### Rentabilité réelle
- Rendement brut : 7 200 / 150 000 = 4,8 %
- Rendement net après charges : 3,1 %
- Rendement net après fiscalité (LMNP réel) : 3,5 % (l'amortissement neutralise l'IR)
- Effort d'épargne sur 20 ans : 96 000 €
- Patrimoine net en fin de prêt : 220 000 € (avec inflation)
- TRI net : ~7 % sur 20 ans

## Pièges classiques à éviter

1. **Surévaluer le loyer** : les annonces SeLoger affichent souvent 10-15 % au-dessus du marché réel
2. **Sous-estimer les travaux** : toujours +20 à +30 % sur le devis initial
3. **Oublier la vacance** : prévoir 1 mois sur 12 minimum, 2 mois pour studio étudiant
4. **Mauvais quartier** : un bien Le Brézet à 1 800 €/m² peut sembler attractif mais la liquidité de revente est faible
5. **Pas de garantie locative** : Visale ou GLI sont indispensables
6. **Mauvais régime fiscal** : être au micro-foncier alors que les charges réelles + amortissement LMNP seraient bien plus avantageux

## Perspectives 2026-2027

- Légère hausse des prix anticipée (+2 à +4 % selon quartier)
- DPE va chasser les passoires thermiques : opportunité d'achat avec décote en 2026, valorisation après travaux en 2027
- Demande locative en hausse (UCA augmente sa capacité d'accueil, Michelin recrute toujours)
- Risque : durcissement fiscal possible sur le LMNP (régime réel pourrait être limité)

## Conclusion

Investir à Clermont-Ferrand en 2026, c'est miser sur un marché de fond, accessible, avec des rendements supérieurs à la moyenne nationale. La stratégie gagnante pour la plupart des investisseurs : un T2 ou studio dans un bon quartier (Cézeaux, Pradelle, Centre), en LMNP au réel, financé à crédit avec un apport raisonnable.

**CBF Conseils accompagne les investisseurs : sourcing off-market, simulation fiscale, mise en location et gestion. Demandez votre brief investisseur personnalisé.**
    `,
    faq: [
      {
        question: "Est-ce rentable d'investir à Clermont-Ferrand en 2026 ?",
        reponse:
          "Oui. Avec des rendements bruts de 6 à 7,5 % selon quartier (vs 3,5 à 5 % à Lyon ou Paris), un marché stable et une demande locative pérenne (étudiants, Michelin, CHU), Clermont-Ferrand offre un meilleur rapport rendement / risque que la plupart des grandes villes.",
      },
      {
        question: "LMNP ou foncier nu, que choisir à Clermont-Ferrand ?",
        reponse:
          "LMNP au régime réel dans 90 % des cas. L'amortissement du bien et du mobilier neutralise l'imposition pendant 8 à 12 ans. Foncier nu au réel pertinent uniquement si gros travaux (déficit foncier imputable sur revenu global, jusqu'à 10 700 €/an).",
      },
      {
        question: "Quel apport pour un investissement locatif à Clermont-Ferrand ?",
        reponse:
          "15 à 20 % du prix + les frais de notaire (~7,5 %). Pour un bien à 150 000 €, comptez 30 000 € d'apport minimum. Avec moins, le dossier passe rarement en 2026 sauf revenus très élevés ou patrimoine déjà constitué.",
      },
    ],
  },
  {
    slug: "prix-immobilier-clermont-ferrand-par-quartier-2026",
    titre: "Prix immobilier à Clermont-Ferrand par quartier en 2026 : le tableau complet",
    description:
      "Tableau complet des prix au m² par quartier à Clermont-Ferrand en 2026 : appartement, maison, évolution, fourchette basse/haute. Source DVF.",
    categorie: "marche",
    tempsLecture: "10 min",
    datePublication: "2026-04-16",
    contenu: `
À Clermont-Ferrand, deux appartements situés à 800 mètres l'un de l'autre peuvent se vendre du simple au double. Entre Jaude (2 600 €/m²) et Le Brézet (1 800 €/m²), la différence n'est pas anecdotique : 30 % d'écart sur le même produit, dans la même ville. Voici la cartographie 2026 complète des prix, quartier par quartier, avec les vraies données issues des transactions notariales (DVF).

## Le prix moyen à Clermont-Ferrand en 2026

La moyenne intra-muros s'établit à **2 229 €/m² pour un appartement** et **2 800 €/m² pour une maison**. Sur les 12 derniers mois, le marché a progressé de **+3,2 %**, portée par la stabilisation des taux et le retour des primo-accédants. Mais cette moyenne masque une réalité bien plus contrastée.

## Les prix par quartier intra-muros CLF

| Quartier | Appart €/m² | Maison €/m² | Évol. 12 mois | Profil acheteur |
|----------|-------------|-------------|---------------|-----------------|
| Jaude | 2 600 | 3 200 | +4,1 % | Cadres, investisseurs locatifs |
| Oradou | 2 500 | 3 000 | +3,8 % | Familles aisées, libérales |
| Centre-Ville | 2 400 | 2 950 | +3,5 % | Jeunes actifs, investisseurs |
| Carmes | 2 300 | 2 850 | +3,4 % | Primo-accédants CSP+ |
| Blaise Pascal | 2 200 | 2 750 | +3,2 % | Étudiants, jeunes couples |
| La Pradelle | 2 100 | 2 700 | +3,0 % | Familles, fonctionnaires |
| Les Salins | 2 050 | 2 650 | +2,9 % | Primo-accédants |
| Montferrand | 1 950 | 2 600 | +4,5 % | Amateurs de patrimoine |
| Chanturgue | 1 900 | 2 550 | +5,2 % | Profils gentrification |
| La Plaine | 1 850 | 2 450 | +2,5 % | Budget serré, primo |
| Croix-de-Neyrat | 1 850 | 2 400 | +2,3 % | Investisseurs rendement |
| Le Brézet | 1 800 | 2 350 | +2,1 % | Investisseurs cash flow |
| Saint-Jacques | 2 000 | 2 600 | +2,8 % | Étudiants, hospitaliers |
| La Pardieu | 2 050 | 2 700 | +3,1 % | Cadres tertiaire |

Lecture : à Jaude, un appartement de 60 m² se négocie autour de 156 000 €. Le même bien au Brézet : 108 000 €. Soit un différentiel de 48 000 € pour des biens techniquement comparables.

## Les communes de la métropole

Au-delà des frontières administratives de Clermont-Ferrand, la métropole offre des alternatives, parfois plus accessibles, parfois plus cotées que le centre-ville.

| Commune | Appart €/m² | Maison €/m² | Évol. 12 mois | Atout principal |
|---------|-------------|-------------|---------------|-----------------|
| Chamalières | 2 400 | 3 100 | +3,5 % | Adresse de prestige |
| Royat | 2 350 | 3 050 | +3,3 % | Thermalisme, calme |
| Beaumont | 2 100 | 2 800 | +3,0 % | Familial, écoles |
| Aubière | 2 100 | 2 750 | +3,4 % | Université, dynamique |
| Ceyrat | 2 150 | 2 850 | +3,1 % | Vue, résidentiel |
| Lempdes | 1 950 | 2 600 | +2,8 % | Accès rapide A89 |
| Romagnat | 2 050 | 2 700 | +2,9 % | Familial, plateau |
| Cébazat | 1 900 | 2 550 | +2,7 % | Maisons accessibles |
| Gerzat | 1 850 | 2 500 | +2,5 % | Budget familles |
| Riom | 1 950 | 2 600 | +3,2 % | Patrimoine, A71 |
| Pérignat-lès-Sarliève | 2 000 | 2 700 | +3,0 % | Calme, cadre vert |

## Les quartiers qui montent le plus vite

Trois quartiers tirent le marché vers le haut en 2026.

**1. Chanturgue (+5,2 %)** — La gentrification est en marche. Anciennes maisons de basalte rachetées par des CSP+, nouveaux commerces, cafés branchés. Le quartier était sous-coté il y a 5 ans, le rattrapage s'accélère.

**2. Montferrand (+4,5 %)** — La cité royale médiévale, longtemps oubliée, bénéficie de la labellisation Villes d'Art et d'Histoire et d'un programme de réhabilitation du centre historique. L'effet "patrimoine" attire une clientèle nouvelle.

**3. Jaude (+4,1 %)** — Le quartier premium continue de se valoriser. Rare, recherché, peu de stock. Logique de marché tendu typique des emplacements centraux.

## Les quartiers les plus accessibles

Pour un primo-accédant avec un budget contraint, quatre options se distinguent en 2026 :
- **Le Brézet (1 800 €/m²)** — proche du centre, en mutation
- **Croix-de-Neyrat (1 850 €/m²)** — quartier nord, bien desservi
- **La Plaine (1 850 €/m²)** — cadre verdoyant, prix encore doux
- **Gerzat (1 850 €/m²)** — petite ville à 10 min, maisons accessibles

À ces niveaux de prix, un 2 pièces de 50 m² s'achète entre 90 000 € et 95 000 €. Soit un budget compatible avec un salaire médian + 15 000 € d'apport.

## Comment lire ces données

Tous les chiffres présentés s'appuient sur **DVF (Demande de Valeurs Foncières)**, base notariale officielle. Ce sont de vraies transactions, pas des prix d'annonce. Mais trois précautions s'imposent :

- **L'état du bien** peut faire varier le prix de 20 % à 30 % (à rénover vs refait à neuf).
- **L'étage et la vue** : un dernier étage avec vue sur le Puy-de-Dôme se paie 8 à 12 % de plus que le RDC.
- **L'année de construction** : les biens d'avant 1948 (ancien noble) et ceux d'après 2010 (BBC, RT2012) tirent les moyennes vers le haut.

## Conclusion

Le marché clermontois 2026 reste un des plus accessibles parmi les grandes villes françaises. Avec une fourchette de prix qui va de 1 800 €/m² au Brézet à 2 600 €/m² à Jaude, la stratégie d'achat dépend autant du quartier que du bien lui-même. Notre estimation gratuite vous donne en 48h le prix juste pour votre adresse exacte, basé sur les transactions réelles de votre rue.
`,
    faq: [
      {
        question: "Quel est le prix moyen au m² à Clermont-Ferrand en 2026 ?",
        reponse:
          "2 229 €/m² pour un appartement et 2 800 €/m² pour une maison en moyenne intra-muros, en hausse de +3,2 % sur 12 mois. La fourchette réelle s'étend de 1 800 €/m² (Le Brézet) à 2 600 €/m² (Jaude).",
      },
      {
        question: "Quel quartier de Clermont-Ferrand est le plus cher ?",
        reponse:
          "Jaude reste le quartier le plus cher avec 2 600 €/m² pour un appartement, suivi par Oradou (2 500 €/m²) et Centre-Ville (2 400 €/m²). Hors CLF intra-muros, Chamalières atteint 3 100 €/m² sur les maisons.",
      },
      {
        question: "Les prix vont-ils encore monter à Clermont-Ferrand en 2026 ?",
        reponse:
          "La tendance reste haussière mais modérée : entre +2 % et +4 % attendus en 2026, portée par la stabilisation des taux, le retour des primo-accédants et un stock encore tendu sur les quartiers centraux. Pas de bulle, pas de chute prévue.",
      },
    ],
  },
  {
    slug: "acheter-ou-louer-clermont-ferrand-2026",
    titre: "Acheter ou louer à Clermont-Ferrand en 2026 : le calcul qui tranche",
    description:
      "Acheter ou louer à Clermont-Ferrand : simulation chiffrée 2026 selon votre durée de résidence, budget et situation. La réponse dépend de 3 facteurs clés.",
    categorie: "acheteur",
    tempsLecture: "9 min",
    datePublication: "2026-04-17",
    contenu: `
À Lyon, il faut 7 ans pour rentabiliser un achat. À Paris, plus de 10. À **Clermont-Ferrand, c'est 4 à 5 ans**. Ce chiffre change tout. Il fait basculer la décision pour des dizaines de milliers de Clermontois chaque année. Voici le calcul exact, sans baratin, basé sur les chiffres réels du marché 2026.

## La règle des 5 ans à Clermont-Ferrand

Le seuil de rentabilité, c'est la durée à partir de laquelle l'achat devient mathématiquement plus avantageux que la location. Plus le marché est cher (Paris, Lyon), plus ce seuil est long. Plus le marché est accessible (CLF), plus il est court.

**Cas concret : un 2 pièces de 50 m² à Clermont-Ferrand**
- Prix d'achat : 150 000 €
- Frais de notaire : ~11 250 €
- Loyer équivalent : 590 €/mois (loyer moyen 2P CLF)
- Apport : 30 000 €
- Crédit : 120 000 € sur 20 ans à 3,9 %

**Coût total achat sur 5 ans :**
- Frais de notaire : 11 250 €
- Intérêts d'emprunt (5 ans) : ~21 800 €
- Taxe foncière + charges copro non récup : ~6 500 €
- **Total brut : 39 550 €**
- Moins l'appréciation du bien (+3,2 %/an = +25 500 € sur 5 ans)
- **Coût net réel achat : ~14 050 €**

**Coût total location sur 5 ans :**
- Loyers cumulés : 590 × 60 = 35 400 €
- **Coût net réel location : 35 400 €**

**Différence : 21 350 € en faveur de l'achat sur 5 ans**. Et après 5 ans, l'écart se creuse exponentiellement (le capital remboursé continue de gonfler le patrimoine).

## Simulation comparative détaillée

| Horizon | Coût net achat | Coût net location | Gagnant |
|---------|---------------|-------------------|---------|
| 3 ans | 11 200 € | 21 240 € | Achat (+10 040 €) |
| 5 ans | 14 050 € | 35 400 € | Achat (+21 350 €) |
| 7 ans | 12 800 € | 49 560 € | Achat (+36 760 €) |
| 10 ans | 4 500 € | 70 800 € | Achat (+66 300 €) |

À noter : sur 3 ans, l'achat reste favorable à Clermont-Ferrand grâce à la modicité des frais d'entrée par rapport aux grandes métropoles. À Paris, sur 3 ans, vous perdez 30 000 €.

## Quand vaut-il mieux louer à CLF ?

Trois situations concrètes où la location reste la meilleure option :

**1. Mobilité professionnelle inférieure à 3 ans.** Si votre employeur prévoit une mutation, ou si vous êtes en CDI très récent dans la ville, le coût de revente (frais d'agence + impôt sur plus-value si <2 ans de résidence principale) peut effacer le gain.

**2. Incertitude sur la ville.** Vous arrivez à Clermont, vous ne savez pas si vous allez y rester. Le marché locatif clermontois est accessible : un studio à 415 €/mois ou un 2P à 590 €/mois reste un budget raisonnable pour "tester" la ville.

**3. Apport insuffisant (< 15 000 €).** Sans apport, le crédit est compliqué à décrocher en 2026, et le coût total du financement explose. Mieux vaut louer 12 à 18 mois pour constituer un apport solide.

## Quand vaut-il mieux acheter à CLF ?

À l'inverse, quatre signaux verts qui rendent l'achat évident :

**1. Horizon de 5 ans et plus.** À partir de 5 ans, la balance bascule clairement côté achat à Clermont-Ferrand.

**2. Apport ≥ 20 000 €.** C'est le seuil qui permet de décrocher un taux compétitif en 2026 et de couvrir les frais de notaire sans détériorer la mensualité.

**3. Taux 2026 encore acceptables.** Entre 3,7 % et 4,2 % sur 20 ans. On n'est plus dans le creux historique de 2021, mais on reste très en dessous des taux des années 90-2000 (5-6 %).

**4. Prix CLF toujours accessibles.** Le marché clermontois reste 60 % moins cher que Lyon, 76 % moins cher que Paris. Le rapport pouvoir d'achat / qualité de vie est imbattable.

## L'avantage CLF sur les autres villes

| Ville | Prix moyen | Loyer moyen 2P | Seuil de rentabilité |
|-------|-----------|---------------|---------------------|
| Clermont-Ferrand | 2 229 €/m² | 590 €/mois | **4-5 ans** |
| Bordeaux | 4 800 €/m² | 950 €/mois | 6-7 ans |
| Montpellier | 3 900 €/m² | 850 €/mois | 5-6 ans |
| Lyon | 5 400 €/m² | 1 100 €/mois | 7-8 ans |
| Paris | 9 500 €/m² | 1 600 €/mois | 10-12 ans |

CLF est tout simplement la grande ville française où l'achat redevient rationnel le plus rapidement. Une exception dans le paysage immobilier hexagonal.

## Conclusion

À Clermont-Ferrand, dès que vous prévoyez de rester plus de 4 à 5 ans, l'achat est mathématiquement plus avantageux que la location. La condition : avoir un apport suffisant et un projet de vie stabilisé. Pour les autres profils, le marché locatif clermontois reste accessible. Demandez votre estimation gratuite : nous calculons votre seuil de rentabilité personnel selon votre situation exacte.
`,
    faq: [
      {
        question: "En combien d'années rentabilise-t-on un achat à Clermont-Ferrand ?",
        reponse:
          "4 à 5 ans en moyenne, soit le seuil le plus court de toutes les grandes villes françaises. À Lyon, comptez 7 ans. À Paris, plus de 10 ans.",
      },
      {
        question: "Faut-il louer en attendant que les taux baissent ?",
        reponse:
          "Pas forcément. Les taux 2026 (3,7-4,2 %) restent acceptables historiquement. Surtout, attendre une baisse hypothétique alors que les prix continuent de monter de +3,2 %/an coûte généralement plus cher que d'acheter maintenant.",
      },
      {
        question: "C'est le bon moment d'acheter à Clermont-Ferrand ?",
        reponse:
          "Pour un projet de résidence principale supérieur à 5 ans, oui. Le marché est stabilisé, les vendeurs négocient (4-6 % de marge), les taux sont gérables, et CLF reste sous-évaluée comparée aux autres métropoles régionales.",
      },
    ],
  },
  {
    slug: "salaire-pouvoir-achat-immobilier-clermont-ferrand",
    titre: "Avec le salaire médian, peut-on acheter à Clermont-Ferrand en 2026 ?",
    description:
      "Simulation concrète : avec 2 100 € net/mois de salaire médian, que peut-on acheter à Clermont-Ferrand en 2026 ? La réponse va vous surprendre.",
    categorie: "acheteur",
    tempsLecture: "8 min",
    datePublication: "2026-04-18",
    contenu: `
À Paris, avec le salaire médian français (2 100 €/mois net), vous empruntez environ 140 000 €. Il vous faut donc vous contenter de 15 m². À Clermont-Ferrand, avec exactement le même salaire, vous pouvez acheter un **2 pièces de 55 m² dans un beau quartier**. Voilà la réalité que personne ne dit. Et elle change tout pour des centaines de milliers de Français qui pensent l'achat hors de portée.

## Combien peut-on emprunter avec le salaire médian ?

La règle d'or des banques en 2026 : **33 % d'endettement maximum**. Pour un salaire net mensuel de 2 100 €, ça donne :
- Mensualité maximale : 2 100 × 33 % = **693 €/mois**
- Sur 20 ans à 3,9 % : capital empruntable ≈ **113 000 €**
- Avec apport classique de 15 000 € : **budget total ≈ 128 000 €**

Avec un apport plus solide (25 000 €), on monte à 138 000 € de budget. Avec un crédit sur 25 ans (autorisé jusqu'à 27 ans pour primo-accédants), on grimpe encore à 145 000 €.

## Ce qu'on peut acheter à CLF avec 128 000 €

Et c'est là que CLF fait la différence. Avec ce budget, vous n'achetez pas un placard à balais. Vous achetez du vrai logement.

| Budget | Bien possible | Quartier exemple |
|--------|---------------|------------------|
| 100-120 k€ | Studio 25-30 m² rénové | Centre-Ville, Saint-Jacques |
| 120-140 k€ | 2P 45-50 m² à rafraîchir | La Plaine, Chanturgue, Le Brézet |
| 140-160 k€ | 2P 55-60 m² bon état | Blaise Pascal, Montferrand |
| 160-200 k€ | 3P 65-75 m² | Beaumont, Lempdes, Aubière |

Pour bien comprendre : **140 000 € à Clermont-Ferrand, c'est un appartement de 60 m² dans Blaise Pascal**, soit un quartier vivant et bien situé. À Paris, c'est techniquement impossible. À Lyon, c'est un studio de 26 m² en banlieue.

## Avec deux salaires médians (couple)

Si vous êtes en couple avec deux salaires médians :
- Revenus : 2 × 2 100 = **4 200 €/mois**
- Mensualité maximale : 4 200 × 33 % = **1 386 €/mois**
- Capital empruntable sur 20 ans à 3,9 % : ≈ **226 000 €**
- Avec 30 000 € d'apport : **budget total ≈ 256 000 €**

Avec ce budget, vous accédez à :
- **Une maison 4 pièces de 90 m² à Lempdes** (1 950 €/m²)
- **Un T3-T4 de 80 m² à Aubière**
- **Une maison de village à Cébazat ou Gerzat**
- **Un grand appart 3 pièces dans le Centre-Ville rénové**

C'est ça, la réalité 2026 : un couple à deux SMIC + peut acheter une maison à 10 minutes de Clermont. Quasiment impossible dans les autres métropoles régionales.

## Comparatif avec d'autres villes

| Ville | Surface achetable avec 128 000 € | Type de bien |
|-------|----------------------------------|--------------|
| **Clermont-Ferrand** | **55 m²** | 2 pièces confortable |
| Bordeaux | 27 m² | Studio |
| Montpellier | 33 m² | Petit studio |
| Lyon | 24 m² | Studio en périphérie |
| Paris | 13 m² | Chambre de service |

Avec le même budget, vous achetez **plus de 4 fois la surface à CLF qu'à Paris**, et **plus de 2 fois qu'à Lyon**. La ville est tout simplement championne du pouvoir d'achat immobilier en France.

## Les aides disponibles

Plusieurs leviers permettent d'optimiser votre achat à Clermont-Ferrand :

**PTZ (Prêt à Taux Zéro)** — Clermont-Ferrand est en zone B2. Pour un primo-accédant dans le neuf, le PTZ peut atteindre 40 % du financement, sans intérêts, remboursable après 5 à 15 ans de différé. Sur l'ancien avec travaux ≥ 25 % du prix, idem.

**PAS (Prêt Accession Sociale)** — Sous conditions de ressources, taux préférentiels et frais de notaire réduits. Compatible avec un salaire médian seul.

**Garantie Action Logement** — Pour les salariés du privé, prêt complémentaire à 1 % jusqu'à 40 000 € pour primo-accédants.

**APL accession** — Toujours disponible pour les achats avec PAS, jusqu'à 150 €/mois d'aide selon les revenus.

Cumulés, ces dispositifs peuvent abaisser le coût total du crédit de 15 % à 25 % pour un primo-accédant CLF.

## Conclusion

Clermont-Ferrand est l'une des dernières grandes villes françaises (150 000 habitants, métropole de 300 000) où le salaire médian permet vraiment d'acheter un logement décent. Pas un studio sous les toits. Un vrai 2 pièces, dans un vrai quartier. C'est un argument économique fort pour les jeunes actifs, les primo-accédants, et pour les Parisiens ou Lyonnais qui veulent vivre mieux. Demandez votre estimation gratuite : nous chiffrons votre capacité d'achat exacte à CLF en 48h.
`,
    faq: [
      {
        question: "Quel salaire minimum pour acheter à Clermont-Ferrand ?",
        reponse:
          "Avec 1 800 €/mois net + 15 000 € d'apport, vous accédez à un studio rénové ou un petit 2P à rafraîchir dans des quartiers comme Le Brézet, La Plaine ou Croix-de-Neyrat (~95 000 à 110 000 €). À 2 100 € net (salaire médian), le 2 pièces de 50 m² devient accessible.",
      },
      {
        question: "Peut-on acheter sans apport à Clermont-Ferrand ?",
        reponse:
          "C'est devenu très difficile en 2026. Les banques exigent généralement 8 à 10 % d'apport minimum (pour couvrir frais de notaire). Sans apport, seuls les profils CDI longue ancienneté avec revenus solides ou patrimoine déjà constitué passent. Mieux vaut épargner 15 000 € avant de se lancer.",
      },
      {
        question: "Clermont-Ferrand est-elle accessible pour les primo-accédants ?",
        reponse:
          "Oui, c'est même l'une des grandes villes françaises les plus accessibles. Avec un salaire médian, un PTZ et 15 000 € d'apport, on peut viser un 2 pièces de 50 m² entre 120 000 € et 140 000 €. Le tout avec une mensualité raisonnable de 700 €/mois.",
      },
    ],
  },
  {
    slug: "quartiers-en-devenir-clermont-ferrand-2030",
    titre: "Les quartiers de Clermont-Ferrand qui vont prendre de la valeur d'ici 2030",
    description:
      "Réhabilitation urbaine, nouvelles lignes de transport, projets de ZAC : 5 quartiers clermontois qui devraient fortement se valoriser d'ici 2030.",
    categorie: "investisseur",
    tempsLecture: "8 min",
    datePublication: "2026-04-19",
    contenu: `
Les plus belles plus-values immobilières se font avant que tout le monde soit au courant. À Clermont-Ferrand, certains quartiers cochent déjà toutes les cases du quartier qui va monter : réhabilitation, gentrification, transports, prix encore en dessous de la moyenne. Voici les 5 zones à surveiller pour les investisseurs et les acheteurs avisés à horizon 2030.

## Les 5 indicateurs d'un quartier qui va monter

Avant de regarder le terrain, il faut comprendre les signaux. Aucun quartier ne grimpe par hasard. Cinq facteurs combinés produisent quasi systématiquement la plus-value :

**1. Arrivée de nouveaux équipements publics** — école, médiathèque, parc rénové, complexe sportif. Le mobilier urbain transforme la perception d'un quartier.

**2. Réhabilitation des logements anciens** — quand les façades se refont, les ravalements se généralisent, les copropriétés votent des travaux : c'est le signal que la population change.

**3. Gentrification commerciale** — nouveaux cafés indépendants, épicerie bio, librairie, restaurants. Le commerce change avant les prix immobiliers.

**4. Projets de transport en commun** — extension de ligne, nouvelle station, BHNS. À CLF, le tramway et le réseau bus C-Vélo redessinent la ville.

**5. Prix encore sous la moyenne** — c'est mécanique : plus le delta avec la moyenne est grand, plus le rattrapage potentiel est élevé.

## Nos 5 quartiers à surveiller

### 1. Chanturgue (1 900 €/m²)

Le quartier qui monte le plus vite à CLF (+5,2 % en 12 mois). Maisons en basalte noir, vues panoramiques sur la chaîne des Puys, escaliers escarpés et caractère affirmé. Longtemps considéré comme un quartier "ouvrier", Chanturgue accueille depuis 3-4 ans une population CSP+ jeune (architectes, professions libérales) attirée par le cachet et les prix encore raisonnables. Plusieurs maisons de ville sont en cours de réhabilitation lourde, ce qui tire la moyenne vers le haut.

**Potentiel à 2028 : +15 % à +20 %** par rapport au prix actuel.

### 2. Montferrand (1 950 €/m²)

La cité royale médiévale, longtemps oubliée des Clermontois eux-mêmes. Labellisée Villes d'Art et d'Histoire, Montferrand bénéficie d'un programme de réhabilitation du centre historique soutenu par la métropole. Les ruelles pavées, les hôtels particuliers du XVe et XVIe siècle attirent une nouvelle clientèle : amateurs de patrimoine, jeunes urbains lassés du standardisé. Le tourisme local en hausse profite aux résidents (cafés, restaurants, boutiques d'artisanat).

**Potentiel à 2028 : +12 % à +18 %** sur les biens en bon état dans le périmètre historique.

### 3. La Pardieu extension (2 000 €/m²)

La Pardieu est déjà un pôle économique majeur (Cataroux, Centre Jaude 2 voisin). L'extension nord du quartier, avec de nouveaux programmes tertiaires en cours, attire mécaniquement une demande locative cadres très forte. Les T2 et T3 récents y sont rentables (~5,5-6 % brut), et la demande dépasse l'offre. Tout nouveau programme livré aujourd'hui se positionne déjà 8 à 10 % au-dessus du marché.

**Potentiel à 2028 : +8 % à +12 %** porté par la pression locative et le développement tertiaire.

### 4. Les Cézeaux / Aubière (1 950 / 2 100 €/m²)

L'UCA investit massivement dans le campus des Cézeaux : nouveaux laboratoires, équipements sportifs, résidences étudiantes. Avec 35 000 étudiants à Clermont-Ferrand et une trajectoire haussière, la demande locative étudiante est structurellement forte. Aubière, commune limitrophe directe, profite de l'effet de proximité immédiate. Les T1 et T2 acquis aujourd'hui pour de la location étudiante affichent des rendements de 6 à 7,5 % brut.

**Potentiel à 2028 : +10 % à +15 %** porté par la pérennité de la demande étudiante et le développement universitaire.

### 5. Cournon-d'Auvergne (1 800-1 900 €/m²)

À 10 minutes du centre par l'A75, Cournon est encore considérée comme "à part" par beaucoup de Clermontois. Erreur. La commune se développe rapidement : nouveau centre commercial, plaine de jeux, équipements sportifs (Polydome). Si l'extension du tramway ou un BHNS performant se concrétise dans les 5 ans, la valorisation sera mécanique. Les maisons individuelles avec jardin y restent accessibles à 200 000-260 000 €.

**Potentiel à 2028 : +10 % à +15 %**, avec un bonus possible si nouvelle infrastructure de transport.

## Les signaux à surveiller en temps réel

Pour rester en avance sur le marché, trois sources publiques à monitorer :

- **Budget de la métropole CLF** — voté chaque année, il liste les investissements ZAC, voirie, équipements. Lecture obligatoire.
- **Appels d'offres publics** — boamp.fr, plateforme acheteurs publics. Indique les chantiers à venir 12 à 24 mois en avance.
- **Permis de construire** — disponibles en mairie, ils signalent les projets immobiliers privés et donc l'évolution démographique du quartier.

## Conclusion

Investir dans un quartier "en devenir" n'est pas une loterie. C'est un pari calculé qui se base sur des signaux concrets : transports, équipements, gentrification, prix relatif. Les 5 quartiers ci-dessus combinent plusieurs de ces signaux à Clermont-Ferrand en 2026. Pour une analyse personnalisée de votre projet d'achat ou d'investissement à CLF, demandez une estimation gratuite : nos experts CBF Conseils croisent les transactions DVF avec les projets urbains officiels.
`,
    faq: [
      {
        question: "Quel est le quartier qui monte le plus à Clermont-Ferrand en 2026 ?",
        reponse:
          "Chanturgue, avec +5,2 % en 12 mois. Le quartier en basalte noir bénéficie d'une gentrification active : maisons réhabilitées, nouvelle population CSP+, vues panoramiques. Le potentiel à 2028 est estimé entre +15 % et +20 %.",
      },
      {
        question: "Vaut-il mieux acheter dans un quartier cher stable ou pas cher en hausse ?",
        reponse:
          "Pour un projet patrimonial long terme, mieux vaut un quartier en hausse à prix encore raisonnable (Chanturgue, Montferrand) : la plus-value cumulée est plus forte. Pour une location sécurisée à rendement immédiat, un quartier établi (Jaude, Centre-Ville) reste plus défensif.",
      },
      {
        question: "Montferrand est-il un bon investissement ?",
        reponse:
          "Oui, à condition de cibler les biens en bon état dans le périmètre historique. Le potentiel +12 % à +18 % d'ici 2028 repose sur la dynamique patrimoniale et touristique. Attention en revanche aux biens nécessitant des travaux lourds en zone protégée : ABF impose des contraintes coûteuses.",
      },
    ],
  },
  {
    slug: "clermont-ferrand-vs-lyon-ou-acheter-2026",
    titre: "Clermont-Ferrand vs Lyon : où acheter en 2026 ?",
    description:
      "Prix au m², salaires, rentabilité, qualité de vie : comparatif complet pour choisir entre Clermont-Ferrand et Lyon pour acheter en 2026.",
    categorie: "acheteur",
    tempsLecture: "9 min",
    datePublication: "2026-04-20",
    contenu: `
Lyon ou Clermont ? 200 km et 1h30 de TGV séparent ces deux villes. Mais leurs marchés immobiliers sont à des années-lumière l'un de l'autre. Et cette différence peut littéralement changer votre vie financière. Voici la comparaison complète, sans détour, pour choisir entre les deux en 2026.

## Le grand tableau comparatif

| Critère | Clermont-Ferrand | Lyon |
|---------|-----------------|------|
| Prix moyen appart | **2 229 €/m²** | 5 400 €/m² |
| Prix moyen maison | **2 800 €/m²** | 5 800 €/m² |
| Loyer moyen 2P | 590 €/mois | 1 100 €/mois |
| Rentabilité brute locative | **5-7,5 %** | 3-4,5 % |
| Délai de vente | 60 jours | 45 jours |
| Salaire médian local | 2 100 €/mois | 2 350 €/mois |
| Taux de chômage | 8,2 % | 7,8 % |
| TGV Paris | 3h | **2h** |
| Bassin d'emploi | 250 000 actifs | **900 000 actifs** |
| Qualité de vie (enquête INSEE) | 7,2/10 | 7,4/10 |

Lyon gagne sur l'emploi, l'accessibilité Paris et marginalement sur la qualité de vie. Clermont-Ferrand domine très largement sur tous les indicateurs financiers : prix, rentabilité, accessibilité au logement.

## Le calcul du pouvoir d'achat

Prenons un budget unique : 300 000 €. C'est un budget sérieux mais pas exceptionnel : couple cadres ou primo-accédant aisé.

**À Clermont-Ferrand avec 300 000 €** :
- Surface : ~135 m²
- Type de bien : maison 4-5 pièces avec jardin à Beaumont, Lempdes ou Aubière
- Ou : appartement haut standing 100 m² Centre-Ville / Jaude

**À Lyon avec 300 000 €** :
- Surface : ~55 m²
- Type de bien : 2 pièces standard à Villeurbanne ou Vaise
- Pas d'accès au centre-ville (5 500 €/m² minimum)

Pour une famille avec enfants, le différentiel est massif. CLF permet d'acheter le logement familial complet quand Lyon impose un compromis (rester en location, s'endetter sur 30 ans, ou s'éloigner en banlieue lointaine).

## Pour qui CLF gagne ?

**Les primo-accédants** — Avec un salaire médian, l'achat reste possible à Clermont, impossible à Lyon. Différence majeure.

**Les familles cherchant de l'espace** — 4 chambres + jardin à 250 000 € à Lempdes vs 6 chambres minimum à 600 000 € en proche banlieue lyonnaise.

**Les investisseurs cherchant la rentabilité** — 6-7,5 % brut à CLF vs 3-4 % à Lyon. Pour un investissement locatif, le différentiel de cash flow est colossal.

**Les télétravailleurs** — CLF en télétravail partiel = combinaison gagnante. Espace, nature, prix accessibles, et trajet Paris faisable en 3h pour les rendez-vous physiques mensuels.

## Pour qui Lyon gagne ?

**Les cadres dynamiques avec salaire > 4 000 €** — Le bassin d'emploi (900 000 actifs) ouvre des opportunités impossibles à Clermont. Si votre carrière exige des changements fréquents d'employeur, Lyon offre une fluidité bien supérieure.

**Les jeunes sans enfants** — Plus de bars, plus de restos, plus de scène culturelle, plus de coworking. Lyon reste objectivement plus dense en stimulations urbaines.

**Les professions libérales avec clientèle lyonnaise** — Médecins, avocats, consultants installés sur la place lyonnaise n'ont aucun intérêt à s'éloigner de leur réseau professionnel.

## Le cas du télétravail en 2026

Le télétravail change tout. Une étude récente montre que 38 % des cadres parisiens envisagent une délocalisation en région à horizon 2 ans, à condition de pouvoir revenir 1-2 fois par semaine au siège.

Pour ces profils, CLF coche toutes les cases :
- Logement abordable et spacieux
- Cadre de vie (Puy-de-Dôme, parcs, qualité de l'air)
- Accessibilité Paris (TGV 3h direct)
- Aéroport (Auvergne-Aulnat, vols Lyon, Paris, Bordeaux)
- Coût de la vie inférieur de 20 à 25 % à Lyon

À Lyon, le télétravailleur paie le double pour le même logement, sans avantages décisifs en contrepartie (l'accès Paris est plus rapide, oui, mais à quel prix ?).

## Et si on habitait CLF et travaillait à Lyon ?

C'est une stratégie qui fait son chemin. Calculons.

**Coût annuel logement CLF (3 pièces) : 700 €/mois** = 8 400 €/an
**Coût annuel logement Lyon (3 pièces équivalent) : 1 400 €/mois** = 16 800 €/an
**Économie sur le logement : 8 400 €/an**

**Coût abonnement TGV Lyon-CLF (annuel) : ~2 400 €**
**Carte fréquence + déplacements occasionnels : ~3 600 €/an total**

**Gain net : ~4 800 €/an** (sans compter le différentiel global du coût de la vie : courses, restos, services -20 %).

Cumulé sur 10 ans, c'est près de 50 000 € d'économie. De quoi financer un apport conséquent sur un investissement locatif, ou une éducation supérieure pour les enfants.

## Conclusion

Clermont-Ferrand offre le meilleur rapport qualité-prix-de-vie de France parmi les villes de plus de 100 000 habitants. C'est un secret encore relativement bien gardé, qui s'éventera dans les 3-5 ans avec l'arrivée massive des télétravailleurs urbains. Pour un acheteur en 2026, c'est une fenêtre d'opportunité réelle. Demandez votre estimation gratuite à Clermont-Ferrand : nos experts CBF Conseils vous donnent en 48h une analyse détaillée pour comparer avec votre projet actuel.
`,
    faq: [
      {
        question: "Est-il moins cher de vivre à Clermont-Ferrand qu'à Lyon ?",
        reponse:
          "Oui, très nettement. Le coût de la vie à CLF est inférieur de 20 à 25 % à celui de Lyon, principalement tiré par le logement (-60 % au m² à l'achat, -45 % en loyer). Les autres postes (alimentation, restos, services) sont également 10-15 % moins chers.",
      },
      {
        question: "Peut-on travailler à Lyon et habiter à Clermont-Ferrand ?",
        reponse:
          "Oui, et c'est une stratégie de plus en plus courante avec le télétravail. Le TGV Lyon-CLF se fait en 1h30. Avec 2-3 jours de télétravail par semaine et un abonnement fréquence, l'économie nette annuelle (logement vs transport) peut atteindre 4 800 € à 8 000 €.",
      },
      {
        question: "L'immobilier à Clermont-Ferrand est-il un bon investissement face à Lyon ?",
        reponse:
          "Oui, en termes de rentabilité brute (5-7,5 % vs 3-4,5 %) et de potentiel de plus-value. La hausse +3,2 % par an actuelle à CLF est portée par une demande structurelle (étudiants, Michelin, télétravailleurs). Le ticket d'entrée plus accessible permet aussi de diversifier sur plusieurs biens, là où Lyon impose un seul gros investissement.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(cat: Guide["categorie"]): Guide[] {
  return guides.filter((g) => g.categorie === cat);
}

export function getLatestGuides(n = 3): Guide[] {
  return [...guides]
    .sort((a, b) => b.datePublication.localeCompare(a.datePublication))
    .slice(0, n);
}
