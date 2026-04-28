# Contexte projet — prixm² Clermont-Ferrand
> À coller dans une conversation Claude pour reprendre le projet

---

## C'est quoi ce projet ?

Site Next.js 14 (App Router) — machine à leads immobiliers pour **CBF Conseils** (agence immobilière Clermont-Ferrand, groupe LCH).

**URL prod visée** : `https://www.prixm2clermontferrand.fr`

**Objectif** : générer des leads "estimation de bien" via du contenu SEO sur les prix m² par quartier clermontois.

---

## Stack technique

- Next.js 14 App Router + React 18 + TypeScript strict
- Tailwind CSS (charte CBF Conseils : noir + or `#B8860B` + ivoire)
- Framer Motion (animations)
- Leaflet + react-leaflet (carte OpenStreetMap, gratuit)
- React Hook Form + Zod
- Resend (emails) — **clé à brancher**
- Supabase (stockage leads) — **à brancher**
- next-sitemap + schema.org JSON-LD complet

---

## Structure du projet

```
/app
  page.tsx                            — Home
  prix-immobilier-clermont-ferrand/   — Page pilier SEO
  prix-m2/[slug]/                     — Pages quartiers (dynamiques)
  estimation/                         — Formulaire estimation complet
  contact/
  faq/
  guide/[slug]/                       — Articles de blog
  investir-clermont-ferrand/
  vendre-clermont-ferrand/
  mentions-legales/
  politique-confidentialite/
  api/leads/route.ts                  — API POST lead → Supabase + Resend
  api/estimation/route.ts

/components
  home/        — HeroSection, TopQuartiers, InteractiveMap, ChiffresCles, etc.
  quartier/    — QuartierHero, ChiffresQuartier, AnalyseLocale, PrixParType,
                 QuartierMap, ConseilsVendeur, PrixJustePedagogie, ComparaisonVoisins
  forms/       — FormEstimationCourt, FormRappel, SimulateurEstimation
  common/      — BreadcrumbNav, SchemaOrg, PrixBadge, QuartierCard
  layout/      — Header, Footer, StickyCtaBar
  ui/          — button, input, select, checkbox, label, textarea

/data
  quartiers.ts   — TOUTES les données (prix, évolutions, FAQ, coordonnées GPS)
  guides.ts      — Articles de blog

/lib
  utils.ts       — formatPricePerM2, SITE_URL, PHONE, etc.
  seo.ts         — buildMetadata()
  supabase.ts
  resend.ts
  schema.ts
```

---

## Données : quartiers.ts

Interface `Quartier` (chaque quartier a) :
- `slug`, `nom`, `type` ("quartier" | "commune"), `ville`
- `prixAppartement: number | null`, `prixMaison: number | null`
- `prixBas`, `prixHaut` (calculés ±18% auto)
- `evolution12m`, `evolution5ans`, `evolution10ans`
- `delaiVente` (jours)
- `profilAcheteur`, `description`, `pointsForts[]`, `pointsFaibles[]`
- `ruesRecherchees[]`, `quartiersVoisins[]`
- `faq: FaqItem[]`
- `coordinates: { lat, lng }`
- `superficie?`

Premier quartier du seed : Centre-Ville (2 400 €/m² appart, 3 200 €/m² maison).

---

## Variables d'environnement (.env.local)

```env
NEXT_PUBLIC_SITE_URL=https://www.prixm2clermontferrand.fr
RESEND_API_KEY=re_XXXX           # à brancher
NOTIFICATION_EMAIL=estimation@cbfconseils.com
FROM_EMAIL=no-reply@prixm2clermontferrand.fr
NEXT_PUBLIC_SUPABASE_URL=...     # à brancher
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # à brancher
NEXT_PUBLIC_PHONE=+33473000000   # à remplacer par le vrai n° CBF
```

Toutes les variables sont **optionnelles en dev** — le site fonctionne avec console.log.

---

## Charte graphique CBF Conseils

- Couleurs : Noir `#1A1A1A` + Or `#B8860B` + Ivoire `#FAF8F4`
- Classes Tailwind custom : `cbf-black`, `cbf-gold`, `cbf-ivory`, `cbf-gray`, `cbf-gray-soft`, `cbf-gray-light`, `cbf-success`
- Polices : **Playfair Display** (titres, classe `font-playfair`) + **Inter** (corps)
- Boutons : `variant="primary"` (or), `variant="outline"` (bordure)

---

## TODO avant mise en production

### Données
- [ ] Vrais prix m² par quartier (données DVF 2024-2025 + terrain CBF)
- [ ] Vérifier cohérence prix marché 2025
- [ ] Coordonnées GPS exactes des quartiers
- [ ] Compléter `ruesRecherchees` par quartier
- [ ] Réviser FAQ par quartier
- [ ] Photos réelles équipe CBF + biens vendus

### API / intégrations
- [ ] Brancher **Resend** (compte + domaine vérifié + `RESEND_API_KEY`)
- [ ] Brancher **Supabase** (projet + table `leads` + RLS + env vars)
- [ ] **Google Analytics** GA4 + composant tracking dans `app/layout.tsx`
- [ ] **Google Search Console** : valider propriété + soumettre sitemap
- [ ] **Cookie banner RGPD** (Axeptio ou custom)

### Infos légales CBF Conseils
- [ ] Vrai numéro de téléphone (`NEXT_PUBLIC_PHONE`)
- [ ] Vraie adresse complète (contact/page.tsx + SchemaOrg.tsx + Footer.tsx)
- [ ] SIREN, RCS, capital, carte T dans mentions-legales/page.tsx
- [ ] Vérifier `NOTIFICATION_EMAIL` (estimation@cbfconseils.com)

### Déploiement
- [ ] `vercel link` + `vercel deploy --prod`
- [ ] DNS `prixm2clermontferrand.fr` → Vercel
- [ ] SSL auto (Vercel / Let's Encrypt)
- [ ] Test complet : liens, formulaires, carte, schema.org

### SEO post-lancement
- [ ] Soumettre sitemap (Search Console + Bing)
- [ ] Demander indexation pages clés
- [ ] Tester schema.org (rich results)
- [ ] Core Web Vitals (PageSpeed / Lighthouse)
- [ ] Maillage externe : cbfconseils.com, signatures mail agents, GMB

---

## Commandes dev

```bash
npm run dev         # Dev server localhost:3000
npm run build       # Build prod (génère aussi sitemap)
npm run typecheck   # Vérification TypeScript
npm run lint        # ESLint
```

---

## Contexte groupe

Site pour **CBF Conseils** — filiale transaction immobilière du **Groupe LCH** (Louis Combret, Clermont-Ferrand).
Le dirigeant veut une V1 rapide fonctionnelle, puis itérer.
Pas de blabla — aller droit au but, proposer UNE décision.
