# GEO-AUDIT — prixm2clermontferrand.fr
**Date :** 02/05/2026 | **Auditeur :** Claude Code GEO Skill  
**Site :** https://www.prixm2clermontferrand.fr | **Pages :** 376 | **Framework :** Next.js 14 / Vercel

---

## SCORE GLOBAL : 57/100 — Moyen

> Le site a de **vraies données** (16 882 transactions DVF réelles) et une architecture technique solide. Son problème est que personne ne le sait — ni Google, ni les IA, ni la presse. Le contenu est bon mais mal signé, mal structuré pour la citation, et le domaine prixm2clermontferrand.fr n'a aucune autorité indépendante.

| Catégorie | Score | Poids | Score pondéré |
|---|---|---|---|
| AI Citability & Visibilité | 72/100 | 25 % | 18,0 |
| Autorité de marque (Brand) | 28/100 | 20 % | 5,6 |
| Qualité contenu & E-E-A-T | 58/100 | 20 % | 11,6 |
| Fondations techniques | 78/100 | 15 % | 11,7 |
| Données structurées (Schema) | 47/100 | 10 % | 4,7 |
| Optimisation plateformes IA | 52/100 | 10 % | 5,2 |
| **TOTAL** | **57/100** | **100 %** | **56,8** |

---

## 🔴 BUGS CRITIQUES — À corriger aujourd'hui

### BUG 1 : Faux numéro de téléphone dans le schema JSON-LD
- **Fichier :** layout.tsx (schema sitewide, 376 pages)
- **Actuel :** `"telephone": "+33473000000"` (placeholder)
- **Correct :** `"telephone": "+33473869953"`
- **Impact :** Un faux numéro sur un schema live est un signal de fraude pour Google Knowledge Graph et tous les LLMs.

### BUG 2 : Typo "Clermont-Fermont" dans WebSite schema
- **Fichier :** layout.tsx (WebSite JSON-LD, 376 pages)
- **Actuel :** `"name": "prixm² Clermont-Fermont"`
- **Correct :** `"name": "prixm² Clermont-Ferrand"`
- **Impact :** Le nom de l'entité est incorrect dans tout le Knowledge Graph Google.

### BUG 3 : Deux sameAs invalides dans RealEstateAgent schema
- **Actuel :** `"https://www.google.com/maps/search/CBF+Conseils+Clermont-Ferrand"` (requête, pas une URL stable)
- **Actuel :** `"https://files.data.gouv.fr/geo-dvf/latest/csv/"` (source de données, pas un profil)
- **Correct :** Remplacer par la vraie URL Google Business Profile + supprimer data.gouv.fr de sameAs

### BUG 4 : Sitemap pollué par les routes /opengraph-image
- **Constat :** Le sitemap s'ouvre avec des URLs `/blog/.../opengraph-image` — des routes Next.js auto-générées, pas des pages indexables.
- **Impact :** Dilution du crawl budget, Google déprioritise le sitemap.
- **Fix :** Filtrer ces routes dans `next-sitemap.config.js`

---

## 🟠 QUICK WINS — Cette semaine (impact fort, effort faible)

### QW1 : Créer /llms.txt (30 min — score +10 pts)
Absent. C'est le fichier le plus simple à créer et le plus impactant pour GPT, Claude, Perplexity. Contenu prêt :

```
# prixm² Clermont-Ferrand

> Observatoire indépendant des prix de l'immobilier à Clermont-Ferrand (Puy-de-Dôme).
> Données DVF/DGFiP 2021-2024 (16 882 transactions). Estimation gratuite via CBF Conseils.

## Données marché
- [Accueil — Prix m² par quartier](https://www.prixm2clermontferrand.fr/)
- [Investir à Clermont-Ferrand](https://www.prixm2clermontferrand.fr/investir-clermont-ferrand)
- [Prix immobilier Clermont-Ferrand](https://www.prixm2clermontferrand.fr/prix-immobilier-clermont-ferrand)

## Quartiers (40 pages)
- [Index des quartiers](https://www.prixm2clermontferrand.fr/prix-immobilier-clermont-ferrand)

## Guides
- [Blog & analyses](https://www.prixm2clermontferrand.fr/blog)

## Contact
- Agence : CBF Conseils, 04 73 86 99 53, contact@cbfconseils.com
- Estimation : https://www.prixm2clermontferrand.fr/estimation
```

### QW2 : Article schema sur les pages guides/investir (2h)
Les pages `/investir-clermont-ferrand`, `/vendre-clermont-ferrand`, `/louer-clermont-ferrand` ont du contenu expert sans schema Article → les IA ne peuvent pas les citer comme contenu d'auteur.

```json
{
  "@type": "Article",
  "headline": "[titre de la page]",
  "datePublished": "[date ISO]",
  "dateModified": "[date ISO]",
  "author": {
    "@type": "Person",
    "name": "Louis Combret",
    "jobTitle": "Directeur CBF Conseils",
    "url": "https://www.cbfconseils.com"
  },
  "publisher": { "@id": "https://www.prixm2clermontferrand.fr/#organization" }
}
```

### QW3 : IndexNow pour Bing (1h)
Bing a créé IndexNow — chaque push = pages crawlées en heures. Implémenter via `next-sitemap` ou clé manuelle. Impact direct sur Bing Copilot.

### QW4 : Link cbfconseils.com → prixm2clermontferrand.fr
**Le levier le plus rapide pour l'autorité SEO.** cbfconseils.com est positionné #1 pour "estimation immobilière Clermont-Ferrand gratuite". prixm2clermontferrand.fr n'apparaît même pas. Un lien contextuel `<a href="...">Voir nos données de prix</a>` depuis cbfconseils.com transfère l'autorité du domaine principal vers le site data.

### QW5 : Vérification Bing Webmaster Tools (15 min)
Aucune trace de vérification msvalidate.01. Sans ça, pas de soumission manuelle d'URLs, pas de stats Bing, pas de signal à Bing Copilot.

### QW6 : Content-Security-Policy header (30 min)
Absent. Ajouter dans `vercel.json` :
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "Content-Security-Policy",
      "value": "default-src 'self'; img-src 'self' images.unsplash.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
    }]
  }]
}
```

---

## 🟡 MOYEN TERME — Ce mois-ci

### MT1 : Page /methodologie (1 journée)
Aucune explication de comment les prix sont calculés → MeilleursAgents l'a, SeLoger l'a. Sans cette page, impossible pour Perplexity de citer ce site comme source primaire. Contenu à y mettre :
- Source DVF (data.gouv.fr), 16 882 transactions 2021-2024
- Filtrage (ventes uniquement, Appartement/Maison, surface >9m², prix/m² 500-8000€)
- Méthode de calcul des médianes par zone IRIS
- Fréquence de mise à jour (annuelle, dernière : mai 2026)
- Limites et biais connus

### MT2 : Attribution auteur nommé sur tous les articles
**Problème actuel :** "Équipe Data prixm²" et "L'équipe CBF Conseils" — des pseudonymes sans crédibilité. Google Quality Raters et tous les LLMs détectent l'absence d'auteur réel comme signal négatif E-E-A-T. 

**Fix :** Louis Combret ou Maxence Lami doivent être nommés avec titre + lien LinkedIn sur chaque article. Créer une page `/auteurs/[slug]` avec bio.

### MT3 : Page /a-propos (actuellement 404)
La page 404 pour `/a-propos` est un signal désastreux pour l'E-E-A-T. C'est la première page qu'un Quality Rater consulte. Minimum : date de création CBF Conseils, équipe, zone d'expertise, sources de données, mention FNAIM/SNPI si applicable.

### MT4 : Citations inline vers sources primaires
Chaque statistique DVF doit avoir un lien `<a>` vers data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres. Chaque statistique notariale vers immobilier.notaires.fr. Ça transforme "ils disent" en "ils prouvent".

### MT5 : Article schema dynamique sur les 40 pages quartier
Ajouter dans `/prix-m2/[slug]/page.tsx` un JSON-LD Article avec `dateModified` généré dynamiquement depuis la date de mise à jour des données DVF. Échelle : 40 pages × 0 effort marginal après la 1ère implémentation.

---

## 🔵 STRATÉGIQUE — 3 mois

### S1 : Présence Reddit (impact Perplexity)
**0 mention Reddit** pour prixm2clermontferrand.fr. Perplexity pondère fortement Reddit. Une publication authentique dans r/vosfinances ou r/france avec les données DVF ("J'ai analysé 16 882 transactions à Clermont-Ferrand...") peut générer une citation Perplexity en quelques semaines.

### S2 : Baromètre trimestriel + relations presse
**0 mention presse.** Publier un "Baromètre Prix m2 Clermont-Ferrand Q1 2026" avec des données exclusives DVF et l'envoyer à : La Montagne, France Bleu Auvergne, Le Quotidien, BFM Immo. Une seule reprise = citation permanente dans les corpus d'entraînement des IA.

### S3 : Article Wikipedia "Marché immobilier de Clermont-Ferrand"
Le contenu encyclopédique est le signal d'entité le plus fort pour tous les LLMs. Une ébauche Wikipedia citant les données DVF publiées par CBF Conseils crée un ancrage d'autorité durable.

### S4 : YouTube — 3-5 vidéos de données
Le canal YouTube de CBF Conseils existe mais n'est pas lié au site. Créer 3-5 vidéos courtes ("Prix immobilier Jaude 2026 — les vrais chiffres"), les embedder sur les pages quartier correspondantes. Impact : Gemini (fort), Google AIO (modéré).

---

## ÉTAT DES LIEUX PAR PLATEFORME

| Plateforme | Score | Visibilité actuelle | Queries cibles |
|---|---|---|---|
| Google Search | 61/100 | **Absent du top-10** pour toutes les queries prix | Dominé par SeLoger, MeilleursAgents, Efficity |
| Google AIO | 61/100 | Pas cité dans les AI Overviews | FAQPage ✅ mais sans rang = pas extrait |
| ChatGPT | 45/100 | Non cité | Aucune entité reconnue, 0 mention externe |
| Perplexity | 47/100 | Non cité | 0 Reddit, 0 presse, méthodologie inconnue |
| Google Gemini | 58/100 | Faible | Canal YouTube non lié, pas dans Google News |
| Bing Copilot | 49/100 | Non visible | Pas d'IndexNow, pas de Webmaster Tools |

**Conclusion SERP :** cbfconseils.com est #1 sur "estimation immobilière Clermont-Ferrand" mais prixm2clermontferrand.fr n'apparaît pas comme domaine séparé. Les deux domaines ne se renforcent pas. Le lien cbfconseils.com → prixm2clermontferrand.fr est le levier #1 à activer.

---

## POINTS FORTS (à préserver)

| Atout | Détail |
|---|---|
| **Données DVF réelles** | 16 882 transactions, source DGFiP — rare en local. MeilleursAgents utilise des estimations modélisées. |
| **Données ADEME DPE** | 15 118 diagnostics pour la zone Jaude seule — différenciant fort |
| **robots.txt IA** | 11 crawlers IA explicitement autorisés (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) — excellent |
| **Architecture technique** | Next.js SSG + Vercel, HTTPS, mobile-first, Core Web Vitals bas risque |
| **Couverture topique** | 376 pages, 40 quartiers, 26 guides, 26 articles — cluster thématique solide |
| **Contenu citable** | Passages DVF structurés avec médianes, P25/P75, délais de vente — prêts pour citation IA |

---

## PLAN D'ACTION PRIORISÉ

| # | Action | Impact | Effort | Délai |
|---|---|---|---|---|
| 🔴 1 | Fix téléphone schema `+33473869953` | Critique | 5 min | Aujourd'hui |
| 🔴 2 | Fix typo "Fermont" → "Ferrand" WebSite schema | Critique | 5 min | Aujourd'hui |
| 🔴 3 | Corriger/supprimer sameAs invalides | Élevé | 15 min | Aujourd'hui |
| 🔴 4 | Filtrer /opengraph-image du sitemap | Élevé | 30 min | Aujourd'hui |
| 🟠 5 | Créer /llms.txt | Élevé | 30 min | Cette semaine |
| 🟠 6 | Lien cbfconseils.com → prixm2clermontferrand.fr | Élevé | 1h | Cette semaine |
| 🟠 7 | Article schema sur pages guides (investir/vendre/louer) | Élevé | 2h | Cette semaine |
| 🟠 8 | IndexNow (Bing) | Moyen | 1h | Cette semaine |
| 🟠 9 | Bing Webmaster Tools vérification | Moyen | 15 min | Cette semaine |
| 🟠 10 | CSP header dans vercel.json | Moyen | 30 min | Cette semaine |
| 🟡 11 | Page /methodologie | Élevé | 1 jour | Ce mois |
| 🟡 12 | Auteur nommé sur tous les articles | Élevé | 2 jours | Ce mois |
| 🟡 13 | Page /a-propos (404 → contenu) | Élevé | ½ jour | Ce mois |
| 🟡 14 | Citations inline DVF/notaires sur toutes les pages | Moyen | 2 jours | Ce mois |
| 🟡 15 | Article schema dynamique sur 40 pages quartier | Élevé | 2h (template) | Ce mois |
| 🔵 16 | Post Reddit r/vosfinances avec données DVF | Élevé | 1h | Dans 1 mois |
| 🔵 17 | Baromètre presse Q2 2026 | Élevé | 1 jour | Dans 1 mois |
| 🔵 18 | YouTube vidéos + embed sur pages quartier | Moyen | 1 semaine | Dans 3 mois |
| 🔵 19 | Article Wikipedia marché immobilier Clermont | Élevé | ½ jour | Dans 3 mois |

---

*Rapport généré le 02/05/2026 — prixm2clermontferrand.fr — GEO Skill v1*
