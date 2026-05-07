# GEO Platform Report — prixm2clermontferrand.fr
**Date :** 07 mai 2026
**Requêtes cibles :** "prix immobilier Clermont-Ferrand 2026" · "prix m2 Clermont-Ferrand" · "estimation appartement Clermont-Ferrand" · "meilleur quartier Clermont-Ferrand investissement"

---

## Synthèse exécutive

| Plateforme | Score | Statut |
|---|---|---|
| Google AI Overviews | **72/100** | Bon |
| ChatGPT Web Search | **41/100** | Moyen |
| Perplexity AI | **38/100** | Faible |

**Moyenne GEO : 50/100**

Le site est bien construit techniquement et dispose d'un contenu de qualité, mais il souffre d'une quasi-absence de présence sur les canaux tiers que ChatGPT et Perplexity priorisent (Reddit, forums, Wikipedia/Wikidata, YouTube). Google AIO est la plateforme la plus accessible à court terme car le site a déjà l'architecture et les signaux de contenu requis. Les deux autres nécessitent un travail d'autorité externe.

---

## Plateforme 1 — Google AI Overviews

### Score : 72/100

| Critère | Points obtenus | Max | Constat |
|---|---|---|---|
| Classement organique top 10 | 14 | 20 | Probable top 10-20 sur requêtes longue traîne, position incertaine sur "prix m2 Clermont-Ferrand" face à MeilleursAgents/SeLoger |
| Titres de section en forme de question | 8 | 10 | FAQ structurée avec 12 questions sur /faq et 5+ sur /prix-immobilier. Quelques H2 non interrogatifs ("Métropole de Clermont-Ferrand") |
| Réponse directe après chaque question | 12 | 15 | Les réponses FAQ sont directes et denses (40-80 mots). Légèrement trop longues — les 2 premières phrases suffiraient pour AIO |
| Tableaux de comparaison | 8 | 10 | ComparateurQuartiers existe mais est un composant React interactif — pas de `<table>` HTML statique lisible par les crawlers |
| Listes ordonnées/non ordonnées | 8 | 10 | Présentes dans les guides et articles. Méthodologie utilise des steps numérotées. Certaines sections "sources" restent en prose |
| Section FAQ avec 5+ questions | 10 | 10 | /faq : 12 questions avec FaqPageSchema. Pages quartier : FAQ par quartier. Page prix-immobilier : 5 questions. Excellent |
| Statistiques avec citation de source | 8 | 10 | "16 882 transactions DVF", "DVF DGFiP", "51 240 DPE ADEME" — bon. Manque : certaines affirmations ("+2 à 4% en 2026") sans source explicite |
| Date de publication/mise à jour visible | 4 | 5 | Articles ont datePublished + temps de lecture. Pages quartier : dateModified dynamique. Pages piliers (/prix-immobilier) : date statique dans le code mais non rendue visuellement à l'utilisateur |
| Byline auteur avec titre/rôle | 0 | 5 | Les articles affichent l'auteur (Louis Combret / Maxence Lami) mais sans lien vers une page auteur dédiée avec bio complète. Pages quartier : auteur en JSON-LD seulement |
| Hiérarchie H1>H2>H3 propre | 0 | 5 | Non vérifiable complètement depuis le code, mais pages Next.js SSR — crawlable. Risque : certains composants réutilisés (ChiffresCles, TopQuartiers) injectent des H2 sans contexte de section |

**Points forts :**
- FaqPageSchema sur toutes les pages clés — signal fort pour l'extraction AIO
- Contenu SSR (Next.js statiquement généré) — crawlable sans exécution JS
- llms.txt bien rédigé avec données de référence chiffrées exploitables directement
- Robots.txt ouvre explicitement Googlebot et Google-Extended
- Dataset schema + BreadcrumbSchema + ArticleSchema + PlaceSchema — écosystème schema complet

**Top 3 manques AIO :**

1. **Absence de tableaux HTML statiques.** Le comparateur de quartiers est un composant React interactif non visible des crawlers. AIO cite massivement les tableaux — un tableau statique "Prix m² par quartier 2026" avec 10 lignes (Jaude, Delille, Centre-Ville, Cézeaux, etc.) inséré dans `/prix-immobilier-clermont-ferrand` serait extrait directement.
2. **Pas de page auteur individuelle.** Louis Combret et Maxence Lami sont cités dans les articles mais sans URL `/a-propos/louis-combret` avec schema `Person` incluant `sameAs` LinkedIn. AIO valorise l'expertise humaine identifiable.
3. **Réponses FAQ trop longues pour une citation directe.** La réponse à "Quel est le prix moyen au m² à Clermont-Ferrand en 2026 ?" fait 95 mots. AIO préfère la première phrase autonome (15-25 mots), le reste en développement. Reformater : phrase-choc en premier, explication ensuite.

**Format de contenu préféré par Google AIO :**
Tableaux de données + listes à puces + première phrase de réponse FAQ directe et autonome. AIO extrait préférentiellement les réponses courtes (1-2 phrases) et les tableaux numériques. Les paragraphes de prose longue sont rarement cités directement.

**Actions prioritaires :**

1. Ajouter un tableau HTML `<table>` statique "Prix m² Clermont-Ferrand 2026 par quartier" dans `/prix-immobilier-clermont-ferrand` avec colonnes : Quartier | Prix appart. (€/m²) | Prix maison (€/m²) | Évolution 12 mois | Délai moyen. 15 lignes. Ce tableau doit exister dans le HTML rendu côté serveur.

2. Reformater les réponses FAQ sur le modèle "réponse directe + explication" : la première phrase doit fonctionner seule comme citation AIO. Exemple actuel : "Le prix moyen d'un appartement à Clermont-Ferrand est d'environ 2 400 €/m² en 2026. Il varie fortement selon les quartiers..." — c'est déjà bien, mais la page /faq donne "2 280 €/m² pour un appartement ancien intra-muros, 2 800 €/m² pour une maison" sans introducteur explicite. Harmoniser sur toutes les pages.

3. Créer des pages auteur `/a-propos/louis-combret` et `/a-propos/maxence-lami` avec schema `Person`, bio complète, `sameAs` LinkedIn, et les lier depuis chaque article. Lier également depuis la page `/a-propos` actuelle.

---

## Plateforme 2 — ChatGPT Web Search

### Score : 41/100

| Critère | Points obtenus | Max | Constat |
|---|---|---|---|
| Article Wikipedia de l'entité | 0 | 20 | CBF Conseils n'a pas d'article Wikipedia. Clermont-Ferrand a le sien mais n'y mentionne pas CBF/prixm2 comme source de données. |
| Entité Wikidata avec 5+ propriétés | 0 | 10 | Aucune fiche Wikidata pour CBF Conseils ni pour prixm2clermontferrand.fr |
| Couverture Bing des pages clés | 5 | 10 | IndexNow implémenté (clé a3f9b42e + API route + fichier public) — bon signal. Couverture Bing non vérifiable depuis l'analyse mais probablement partielle |
| Mentions Reddit (positives) | 0 | 10 | Aucune mention Reddit identifiable pour CBF Conseils ou prixm2clermontferrand.fr |
| Chaîne YouTube avec contenu | 0 | 10 | Pas de chaîne YouTube CBF Conseils identifiable |
| Backlinks autoritaires (.edu, .gov, presse) | 6 | 15 | Liens sortants vers data.gouv.fr et data.ademe.fr (sources gouvernementales) — mais ce sont des liens SORTANTS, pas des backlinks entrants depuis ces domaines |
| Cohérence de l'entité entre plateformes | 5 | 10 | sameAs : LinkedIn + PagesJaunes + Facebook + cbfconseils.com. Pas Wikidata, pas Wikipedia. Cohérence partielle |
| Profondeur du contenu (2000+ mots) | 10 | 10 | Pages quartier : 2000-4000 mots équivalent (nombreux blocs de données). Articles blog. Guides complets. Fort. |
| Bing Webmaster Tools configuré | 5 | 5 | IndexNow implémenté = signal fort Bing. Vérification WMT non confirmée depuis l'analyse externe mais probable. |

**Points forts :**
- IndexNow entièrement implémenté (clé publique + API route + GET endpoint de ping)
- robots.txt explicite pour OAI-SearchBot, ChatGPT-User, GPTBot
- Contenu dense et factuel avec données chiffrées citables
- Schema Organization/RealEstateAgent avec sameAs partiel

**Top 3 manques ChatGPT :**

1. **Zéro présence Wikipedia/Wikidata.** ChatGPT cite Wikipedia dans 47,9% de ses réponses. CBF Conseils a 12 ans d'existence et probablement la notoriété suffisante pour une fiche Wikidata (plus facile que Wikipedia). La fiche Wikidata de CBF Conseils avec `instance of: real estate agency`, `location: Clermont-Ferrand`, `founded: 2014`, `official website`, `social media` serait indexée par ChatGPT.

2. **Aucune mention Reddit ou forum immobilier.** ChatGPT utilise Reddit comme signal de validation communautaire. Les requêtes "immobilier Clermont-Ferrand conseil" sur Reddit mènent à des discussions génériques — CBF Conseils n'y participe pas. Même 5-10 réponses utiles sur r/france, r/immobilier, r/investissement seraient indexées.

3. **Pas de backlinks entrants depuis des sources gouvernementales ou presse régionale.** Le site cite data.gouv.fr en lien sortant, mais data.gouv.fr ne cite pas prixm2clermontferrand.fr en retour. Un article dans La Montagne (presse régionale de référence à Clermont-Ferrand) ou sur Puy-de-Dôme.fr créerait un signal d'autorité fort pour ChatGPT/Bing.

**Format de contenu préféré par ChatGPT :**
Déclarations factuelles courtes et précises avec attribution explicite ("Selon les données DVF 2024, le prix médian..."). ChatGPT préfère les phrases qui peuvent être citées directement en réponse à une question, avec une source identifiable. Les tableaux de données numériques sont bien extraits. Éviter les formulations hedgées ("environ", "peut-être", "il semble").

**Actions prioritaires :**

1. Créer une fiche Wikidata pour CBF Conseils (wikidata.org/wiki/Special:NewItem) avec minimum : `instance of: real estate agency (Q3066687)`, `country: France`, `location: Clermont-Ferrand`, `official website`, `inception: 2014`, `LinkedIn ID`. Relier depuis le schema `sameAs` existant.

2. Ouvrir une présence Reddit authentique sur r/immobilier et r/france — répondre à 2-3 questions par mois sur les prix à Clermont-Ferrand en citant les données DVF. Ne pas faire de promotion directe. Le compte Reddit doit avoir un historique de contributions utiles avant de mentionner le site.

3. Contacter La Montagne (lamontagne.fr) pour proposer un dossier "Prix immobiliers à Clermont-Ferrand en 2026" utilisant les données DVF — un article qui cite prixm2clermontferrand.fr comme source créerait un backlink autoritaire visible par Bing/ChatGPT.

---

## Plateforme 3 — Perplexity AI

### Score : 38/100

| Critère | Points obtenus | Max | Constat |
|---|---|---|---|
| Présence Reddit active dans subreddits pertinents | 0 | 20 | Identique à ChatGPT : aucune présence Reddit vérifiable |
| Mentions forums/communautés (HN, SO, Quora) | 3 | 10 | Quelques mentions probables sur des forums immobiliers locaux mais non vérifiées — score conservateur |
| Fraîcheur du contenu (mise à jour < 6 mois) | 8 | 10 | llms.txt indique "mise à jour : avril 2026". Articles récents. `dateModified` dynamique sur pages quartier. Bon, mais aucun signal de date visible sur les pages piliers (/prix-immobilier-clermont-ferrand) |
| Données/recherche originales publiées | 15 | 15 | Fort avantage : 16 882 transactions DVF géolocalisées, 51 240 DPE ADEME, données transport T2C, INSEE IRIS. C'est de la recherche primaire. Aucun concurrent local ne publie ces données à ce niveau. |
| Chaîne YouTube avec transcripts | 0 | 10 | Absente |
| Passages citables autonomes | 6 | 10 | La section "Prix de référence 2026" du llms.txt est parfaitement citable. Certains paragraphes d'articles aussi. Mais beaucoup de contenu important est dans des composants React sans équivalent texte statique |
| Claims multi-sources validés | 6 | 10 | DVF DGFiP + ADEME + observatoire CBF = 3 sources croisées. Explicitement décrit dans /methodologie. Bon, mais la page d'accueil ne liste pas clairement ces 3 sources dans un texte statique accessible |
| Contenu générant de la discussion | 0 | 10 | Aucun article publié sur des plateformes communautaires. Le contenu reste en silo sur le site |
| Présence Wikipedia/Wikidata | 0 | 5 | Identique aux autres plateformes |

**Points forts :**
- Données primaires exceptionnelles (DVF + DPE + T2C + INSEE) — exactement ce que Perplexity valorise comme source directe
- PerplexityBot explicitement autorisé dans robots.txt
- Contenu SSR — Perplexity crawle sans exécuter JS complexe
- llms.txt bien structuré, directement lisible par un LLM

**Top 3 manques Perplexity :**

1. **Absence totale sur Reddit.** Perplexity cite Reddit dans 46,7% de ses réponses. C'est sa source numéro 1. Une discussion sur r/immobilier avec une réponse citant les données DVF de prixm2clermontferrand.fr aurait une probabilité élevée d'être citée par Perplexity pour les requêtes immobilier Clermont-Ferrand.

2. **Données primaires non exposées en format machine-lisible.** Le site possède 16 882 transactions DVF et 51 240 DPE — ce sont des actifs de contenu primaire. Perplexity valorise les sources qui publient leurs données brutes ou des extraits structurés. Une page `/donnees` avec des extraits de statistiques agrégées en HTML texte simple (pas seulement en composants graphiques React) rendrait ces données directement citables.

3. **Contenu confiné au site — aucune diffusion externe.** Perplexity ne voit que ce qui existe sur des plateformes qu'il indexe. Le contenu de prixm2clermontferrand.fr est de qualité mais reste invisible de Perplexity tant qu'aucun site tiers ne le référence. Publier une newsletter ou des fils sur des plateformes communautaires (LinkedIn Pulse, Medium, Substack) avec les données DVF créerait des points d'entrée supplémentaires.

**Format de contenu préféré par Perplexity :**
Paragraphes courts et autonomes (3-5 phrases) qui font une assertion complète avec preuve intégrée. Perplexity cite en extrayant des "blocs" de texte qui répondent seuls à une question. Exemple optimal : "À Clermont-Ferrand, le prix médian d'un appartement est de 2 400 €/m² en 2026, selon 16 882 transactions DVF géolocalisées analysées par CBF Conseils (source : DGFiP). Ce prix varie de 1 800 €/m² à Croix-de-Neyrat à 3 200 €/m² à Jaude." Ce type de paragraphe est extrait directement. Éviter les statistiques noyées dans une longue prose.

**Actions prioritaires :**

1. Créer une page statique `/donnees-marche` avec des paragraphes texte simples résumant les statistiques clés : prix médian par quartier, évolution annuelle, délais de vente, répartition DPE. Pas de graphiques — du texte pur avec les chiffres bien mis en évidence. Lier depuis le footer et le menu. Cette page sera la cible principale des citations Perplexity.

2. Publier un fil LinkedIn mensuel "Baromètre immobilier Clermont-Ferrand" avec 3-4 statistiques issues des données DVF, avec lien vers la page correspondante. LinkedIn est indexé par Perplexity (et ChatGPT). Cela crée aussi du contenu frais tiers.

3. Répondre à des discussions existantes sur r/immobilier concernant Clermont-Ferrand avec des données concrètes (pas de promotion directe). Perplexity indexe les threads Reddit actifs — une réponse utile sur une discussion populaire serait rapidement visible.

---

## Synergies cross-plateformes

Ces actions améliorent simultanément plusieurs scores :

| Action | AIO | ChatGPT | Perplexity | Effort |
|---|---|---|---|---|
| Fiche Wikidata CBF Conseils | +2 | +10 | +5 | Faible — 1h |
| Tableau HTML statique prix/quartier | +8 | +3 | +4 | Faible — 2h |
| Pages auteur avec schema Person | +5 | +4 | +2 | Moyen — 4h |
| Article presse régionale (La Montagne) | +3 | +8 | +5 | Moyen — effort relationnel |
| Présence Reddit (10 réponses/trimestre) | 0 | +8 | +10 | Moyen — régulier |
| Page /donnees-marche texte pur | +3 | +4 | +8 | Faible — 3h |
| Chaîne YouTube (1 vidéo/mois) | +2 | +5 | +5 | Élevé |

---

## Plan d'action prioritaire

### Semaine 1 — Quick wins (impact immédiat, effort minimal)

1. **[CRITIQUE — AIO + ChatGPT + Perplexity]** Insérer un tableau HTML `<table>` statique dans `/prix-immobilier-clermont-ferrand` avec les 15 principaux quartiers, prix appartement, prix maison, évolution 12 mois. Ce tableau doit être rendu côté serveur (SSR) et non dans un composant React client. C'est le seul changement qui impacte les 3 plateformes simultanément.

2. **[CRITIQUE — ChatGPT + Perplexity]** Créer la fiche Wikidata pour CBF Conseils. Prend 1 heure, aucun coût, impact fort sur les deux plateformes qui priorisent la validation d'entité. Puis ajouter l'URL Wikidata dans le `sameAs` du schema `RealEstateAgentSchema`.

3. **[HAUT — AIO]** Reformater les réponses FAQ sur le modèle "réponse directe 1-2 phrases + développement". Harmoniser les 3 pages FAQ (/faq, /prix-immobilier-clermont-ferrand, pages quartier) pour que la première phrase de chaque réponse soit autonome et citable.

### Ce mois — Actions structurantes

4. **[HAUT — AIO]** Créer les pages `/a-propos/louis-combret` et `/a-propos/maxence-lami` avec schema `Person`, titre, bio 100 mots, photo, `sameAs` LinkedIn. Les lier depuis chaque article et depuis le header de `/a-propos`.

5. **[HAUT — Perplexity]** Créer la page `/donnees-marche` avec contenu texte pur organisé en paragraphes citables : prix médians par quartier (texte), évolution annuelle (texte), indicateurs clés (texte). Pas de graphiques — du contenu statique directement lisible.

6. **[MOYEN — ChatGPT + Perplexity]** Ouvrir un compte Reddit dédié à CBF Conseils ou à l'observatoire et commencer à répondre à des questions sur r/immobilier, r/france, r/puy-de-dome. 2-3 réponses utiles par semaine avec données chiffrées. Première mention du site seulement après 3-4 semaines d'activité organique.

### Ce trimestre — Autorité externe

7. **[MOYEN — ChatGPT + Perplexity]** Contacter le service rédaction de La Montagne pour proposer un partenariat data : ils utilisent les données DVF de prixm2clermontferrand.fr dans leurs articles immobiliers en échange d'une citation de source. Un seul article crée un backlink .press avec DA élevé.

8. **[MOYEN — toutes plateformes]** Publier un baromètre trimestriel immobilier Clermont-Ferrand sur LinkedIn (page CBF Conseils) avec 5 statistiques clés issues des données DVF. Format texte + 1 image de tableau. Cela crée du contenu tiers indexable.

9. **[BAS — AIO]** Ajouter les schémas `Person` manquants pour Louis Combret et Maxence Lami sur les pages `/a-propos` et les pages d'auteur avec `sameAs` LinkedIn et `jobTitle`, `worksFor`, `knowsAbout`.

---

## Notes sur les données manquantes (non vérifiables en analyse externe)

- **Classement Bing :** indexation IndexNow confirmée (clé présente dans /public), mais couverture réelle Bing non vérifiable sans accès Bing Webmaster Tools.
- **Mentions Reddit/forum :** l'absence de mentions est une déduction — une recherche directe site:reddit.com "CBF Conseils" ou "prixm2clermontferrand" permettrait de confirmer.
- **Backlinks autoritaires :** aucune donnée backlink disponible sans outil tiers (Ahrefs, Majestic). Les liens sortants vers data.gouv.fr sont confirmés, les liens entrants sont incertains.
- **Position Google effective :** non vérifiable sans Google Search Console. Le score AIO de 72 suppose un top 15-20 sur les requêtes cibles, hypothèse raisonnable vu la qualité structurelle du site mais non confirmée.
