# TODO — Avant mise en production

## Données / contenu

- [ ] **Renseigner les vrais prix m² par quartier** (`data/quartiers.ts`) à partir des données DVF 2024-2025 et de l'expertise terrain CBF
- [ ] **Vérifier la cohérence des prix avec le marché 2025** (croisement DVF + MeilleursAgents + retours agents)
- [ ] **Compléter / corriger les coordonnées GPS** des quartiers (actuellement approximatives)
- [ ] **Compléter les `ruesRecherchees`** réelles par quartier
- [ ] **Réviser les FAQ par quartier** avec les remarques réelles des prospects
- [ ] **Ajouter photos réelles** : équipe CBF, biens vendus, agence (à placer dans `public/images/`)

## API / intégrations

- [ ] **Brancher Resend** : créer le compte, vérifier le domaine `prixm2clermontferrand.fr`, mettre `RESEND_API_KEY` en env
- [ ] **Brancher Supabase** :
  - [ ] Créer projet Supabase
  - [ ] Exécuter le SQL de la table `leads` (cf. commentaire dans `lib/supabase.ts`)
  - [ ] Activer Row Level Security
  - [ ] Mettre `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` en env Vercel
- [ ] **Configurer Google Analytics** : créer la propriété GA4, mettre `NEXT_PUBLIC_GA_ID` en env, ajouter le composant tracking dans `app/layout.tsx`
- [ ] **Configurer Search Console** : valider la propriété, soumettre le sitemap
- [ ] **Cookie banner RGPD** : à intégrer (Tarte au Citron, Axeptio ou custom)

## Société / informations légales

- [ ] **Ajouter vrai numéro de téléphone CBF** dans `NEXT_PUBLIC_PHONE` + mettre à jour `PHONE_DISPLAY` dans `lib/utils.ts`
- [ ] **Ajouter vraie adresse complète CBF Conseils** dans :
  - [ ] `app/contact/page.tsx`
  - [ ] `components/common/SchemaOrg.tsx` (PostalAddress)
  - [ ] `components/layout/Footer.tsx`
- [ ] **Ajouter SIREN, RCS, capital, carte T** dans `app/mentions-legales/page.tsx`
- [ ] **Vérifier email de notification** dans `NOTIFICATION_EMAIL` (par défaut `estimation@cbfconseils.com`)

## Domaine / déploiement

- [ ] **Déposer le projet sur Vercel** (`vercel link` puis `vercel deploy --prod`)
- [ ] **Configurer le DNS prixm2clermontferrand.fr** vers Vercel (CNAME ou A record)
- [ ] **Activer SSL automatique** (Vercel le fait par défaut via Let's Encrypt)
- [ ] **Configurer la redirection HTTP → HTTPS et www → non-www** (ou inverse selon préférence)
- [ ] **Tester en prod** : tous les liens, formulaires, carte, schema.org

## SEO post-lancement

- [ ] **Soumettre le sitemap** dans Google Search Console + Bing Webmaster
- [ ] **Demander indexation** des pages clés (home, pilier, top quartiers)
- [ ] **Tester le schema.org** via https://search.google.com/test/rich-results
- [ ] **Tester les Core Web Vitals** via PageSpeed Insights / Lighthouse
- [ ] **Maillage externe** : lier depuis cbfconseils.com, signature mail des agents CBF, fiches Google My Business

## Conversion / suivi

- [ ] **Définir les goals GA4** (lead submit, click téléphone, scroll 75 %)
- [ ] **A/B test des CTA** (couleur, wording) après 100+ leads collectés
- [ ] **Mettre en place webhook** Supabase → Make/Zapier vers le CRM CBF Conseils (Pennylane / autre)
- [ ] **Email de confirmation au lead** (en plus de la notif interne) — à ajouter dans `app/api/leads/route.ts`

## Optionnel / V2

- [ ] **Pages communes individuelles** (Beaumont, Chamalières, etc.) avec contenu enrichi
- [ ] **Comparateur de quartiers** (côte à côte 2-3 quartiers)
- [ ] **Outil de simulation d'investissement locatif** (calcul rentabilité brute/nette/cashflow)
- [ ] **Page "Notre équipe"** avec photos et bios des agents CBF
- [ ] **Témoignages clients vendeurs/acheteurs**
- [ ] **Blog plus régulier** (1 guide par mois)
- [ ] **Intégration Google My Business** (avis affichés sur la home)
