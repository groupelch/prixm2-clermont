# prixm² Clermont-Ferrand

Refonte complète de prixm2clermontferrand.fr — machine à leads immobiliers
pour CBF Conseils, agence immobilière à Clermont-Ferrand.

## Stack

- **Framework** : Next.js 14 (App Router) + React 18 + TypeScript strict
- **Styling** : Tailwind CSS + composants custom (charte CBF Conseils)
- **Animations** : Framer Motion
- **Cartographie** : Leaflet + react-leaflet (OpenStreetMap, gratuit)
- **Formulaires** : React Hook Form + Zod
- **Emails** : Resend (placeholder, clé à brancher)
- **Stockage leads** : Supabase REST (placeholder, à brancher)
- **SEO** : next-sitemap, schema.org JSON-LD complet (RealEstateAgent, FAQPage, BreadcrumbList, Place, Article)

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier l'env
cp .env.local.example .env.local
# (les variables sont optionnelles en dev, le site fonctionne avec console.log)

# 3. Lancer le dev server
npm run dev
```

Site accessible sur http://localhost:3000

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Dev server avec HMR |
| `npm run build` | Build de production |
| `npm run start` | Serveur prod (après build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |

`postbuild` génère automatiquement `public/sitemap.xml` via `next-sitemap`.

## Variables d'environnement

Voir `.env.local.example`. Aucune variable n'est obligatoire en dev :
- Sans `RESEND_API_KEY` : les emails sont loggés en console.
- Sans `NEXT_PUBLIC_SUPABASE_URL` : les leads sont loggés en console.

Pour la prod, brancher au moins :
- `RESEND_API_KEY` + `NOTIFICATION_EMAIL` (réception des leads)
- `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (stockage)
- `NEXT_PUBLIC_GA_ID` (analytics)
- `NEXT_PUBLIC_PHONE` (numéro CBF Conseils)

## Mettre à jour les prix par quartier

Toutes les données sont dans `data/quartiers.ts`. Pour modifier le prix d'un
quartier, changer `prixAppartement` et/ou `prixMaison` dans le seed
correspondant — les fourchettes (`prixBas`/`prixHaut`) sont calculées
automatiquement à ±18 %.

```ts
{
  slug: "clermont-ferrand-jaude",
  nom: "Jaude",
  prixAppartement: 2600, // ← changer ici
  prixMaison: null,
  // ...
}
```

Le déploiement régénère automatiquement les pages statiques (`generateStaticParams`).

## Ajouter un guide

Dans `data/guides.ts`, ajouter un objet :

```ts
{
  slug: "mon-nouveau-guide",
  titre: "Titre H1",
  description: "Meta description",
  categorie: "vendeur" | "acheteur" | "investisseur" | "marche",
  tempsLecture: "8 min",
  datePublication: "2025-MM-DD",
  contenu: `
## Mon titre

Mon paragraphe.
`
}
```

Le contenu supporte les sections `##`, `###`, listes `- `, tableaux `| col |`,
**gras** et liens `[texte](url)`.

## Architecture

```
app/                     Routes Next.js (App Router)
├── layout.tsx           Layout root (header, footer, fonts, schema.org)
├── page.tsx             Home
├── prix-m2/[slug]/      Pages quartier dynamiques (SSG)
├── guide/[slug]/        Pages guide dynamiques (SSG)
├── prix-immobilier-clermont-ferrand/  Pilier SEO
├── estimation/          Simulateur 3 étapes
├── vendre, investir, faq, contact, mentions-legales, politique-confidentialite
└── api/
    ├── leads/           POST → Resend + Supabase
    └── estimation/      POST → calcul indicatif

components/
├── ui/                  Briques de base (Button, Input, Select…)
├── layout/              Header, Footer, StickyCtaBar
├── home/                Sections de la home + carte Leaflet
├── quartier/            Composants page quartier
├── forms/               Formulaires (court, simulateur, rappel)
└── common/              Card, Badge, Schema.org, Breadcrumb

data/                    Sources de vérité (quartiers, guides)
lib/                     utils, schema Zod, seo, resend, supabase
```

## Déploiement Vercel

```bash
# 1. Pusher le repo sur GitHub
# 2. Importer dans Vercel : https://vercel.com/new
# 3. Renseigner les variables d'environnement
# 4. Déployer
```

Le build inclut automatiquement la génération du sitemap. Le domaine
prixm2clermontferrand.fr est à pointer sur Vercel (CNAME).

## Checklist SEO

- [x] Métadonnées complètes (title/description/og/canonical) sur toutes les pages
- [x] Schema.org JSON-LD : RealEstateAgent (home), WebSite, FAQPage,
      BreadcrumbList, Place (quartier), Article (guide)
- [x] Sitemap.xml automatique via next-sitemap
- [x] Robots.txt avec autorisation explicite des bots IA (GPTBot, ClaudeBot,
      PerplexityBot, Google-Extended)
- [x] Structure URL propre (`/prix-m2/{slug}`, `/guide/{slug}`)
- [x] H1 unique par page, hiérarchie h2/h3 cohérente
- [x] Maillage interne : home ↔ pilier ↔ quartiers ↔ guides
- [x] Images Next.js avec lazy-loading
- [x] Mobile-first responsive
- [ ] Google Search Console à brancher (post-déploiement)
- [ ] Soumettre le sitemap dans GSC
- [ ] Backlinks à construire (CBF Conseils, partenaires locaux)

## Checklist conversion

- [x] CTA primaire (gold) sur toutes les pages
- [x] Sticky CTA bar (mobile + desktop)
- [x] Formulaire estimation court (page quartier, page vendre, page investir, guides)
- [x] Simulateur estimation 3 étapes (page estimation)
- [x] Demande de rappel (page contact)
- [x] Téléphone cliquable dans le header + footer
- [x] Confirmation visuelle de l'envoi
- [x] Trust elements : "Estimation gratuite", "Sous 48h", "Sans engagement"
- [ ] A/B test des variantes CTA (à mettre en place post-lancement)

## Checklist tracking

- [x] UTM source/medium/campaign captés dans les leads
- [x] Source page captée dans chaque lead
- [x] Source quartier captée pour les pages quartier
- [ ] Google Analytics 4 à brancher (NEXT_PUBLIC_GA_ID)
- [ ] Conversion goals dans GA4 (lead form submit)
- [ ] Google Tag Manager (optionnel)
- [ ] Cookie banner conforme RGPD (à mettre en place avant lancement officiel)

## Données placeholder à remplacer

Voir `TODO.md`.

## License

Code propriétaire CBF Conseils — usage interne uniquement.
