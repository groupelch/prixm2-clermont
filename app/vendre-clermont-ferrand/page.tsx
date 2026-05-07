import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Camera, Target, Megaphone, Handshake, Users, MapPin } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, ArticleSchema } from "@/components/common/SchemaOrg";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Vendre son bien à Clermont-Ferrand — Guide stratégique 2026",
  description:
    "Méthode complète pour vendre vite et au bon prix à Clermont-Ferrand : estimation, mise en valeur, diagnostics, stratégie de prix, choix de l'agence.",
  path: "/vendre-clermont-ferrand",
});

const steps = [
  {
    n: "01",
    icon: Target,
    title: "Estimer juste",
    desc: "Une estimation précise dès le départ, c'est 80 % du succès. Surévaluer fait fuir, sous-évaluer fait perdre.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Préparer les diagnostics",
    desc: "DPE en priorité — c'est le critère n°1 de tri en 2026. Anticiper évite les surprises en négociation.",
  },
  {
    n: "03",
    icon: Camera,
    title: "Soigner la mise en valeur",
    desc: "Photos pro, désencombrement, home staging léger. 500-1500 € investis = +10-20 K€ à la vente.",
  },
  {
    n: "04",
    icon: Megaphone,
    title: "Diffuser via AMANDA + portails",
    desc: "SeLoger, Leboncoin, Bien'ici ET le réseau AMANDA : 34 agences partenaires de la région, 220+ collaborateurs qui voient votre bien en temps réel. Un exclusif CBF = une visibilité maximale.",
  },
  {
    n: "05",
    icon: Handshake,
    title: "Négocier sans se brader",
    desc: "Marge de négociation 4-6 % en 2026. Mieux vaut un prix juste avec marge de discussion qu'un prix gonflé.",
  },
];

const faqVente = [
  {
    question: "Combien de temps pour vendre un bien à Clermont-Ferrand en 2026 ?",
    reponse:
      "60 jours en moyenne, mais cela varie de 45 jours (Centre, Jaude, Beaumont) à 80 jours (Riom, La Plaine, Chanturgue). Le facteur n°1 est le bon positionnement de prix dès le départ.",
  },
  {
    question: "Combien coûte une estimation chez CBF Conseils ?",
    reponse:
      "L'estimation est totalement gratuite et sans engagement. Nos experts visitent votre bien et vous remettent une analyse chiffrée sous 48h.",
  },
  {
    question: "Vaut-il mieux passer par une agence ou vendre seul ?",
    reponse:
      "À Clermont-Ferrand, environ 70 % des ventes passent par une agence. Avantages : fichier acheteurs qualifiés, gestion des visites, négociation, sécurisation juridique. Coût : 4 à 6 % du prix de vente.",
  },
  {
    question: "Quels diagnostics dois-je faire avant de vendre ?",
    reponse:
      "DPE, amiante (si avant 1997), plomb (si avant 1949), gaz et électricité (si >15 ans), ERP, mesurage Loi Carrez. Pack moyen : 250-450 € appart, 400-700 € maison.",
  },
];

export default function VendrePage() {
  const articlesVendeur = articles.filter((a) => a.theme === "vendeur").slice(0, 4);
  const guidesVendeur = guides.filter((g) => g.categorie === "vendeur").slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Vendre à Clermont-Ferrand", url: `${SITE_URL}/vendre-clermont-ferrand` },
        ]}
      />
      <ArticleSchema
        title="Vendre son bien à Clermont-Ferrand — Guide stratégique 2026"
        description="Méthode complète pour vendre vite et au bon prix à Clermont-Ferrand : estimation, mise en valeur, diagnostics, stratégie de prix, choix de l'agence."
        datePublished="2024-01-15"
        dateModified="2025-06-01"
        url={`${SITE_URL}/vendre-clermont-ferrand`}
        authorName="Louis Combret, Directeur CBF Conseils"
        authorType="Person"
      />

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav items={[{ name: "Accueil", href: "/" }, { name: "Vendre" }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Guide vendeur
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Vendre son bien à Clermont-Ferrand
              <br />
              <span className="text-cbf-gold">Méthode CBF Conseils</span>
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed mb-8">
              Une stratégie en 5 étapes éprouvée par nos experts pour vendre
              rapidement et au meilleur prix sur le marché clermontois.
            </p>
            <Link href="/estimation">
              <Button variant="primary" size="lg">
                Démarrer mon estimation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="space-y-px bg-cbf-gray-soft border border-cbf-gray-soft">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  className="grid md:grid-cols-12 gap-6 bg-white p-6 md:p-10 hover:bg-cbf-ivory transition-colors"
                >
                  <div className="md:col-span-1">
                    <span className="font-playfair text-4xl text-cbf-gold font-bold leading-none">
                      {s.n}
                    </span>
                  </div>
                  <div className="md:col-span-1">
                    <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="md:col-span-10">
                    <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cbf-black mb-2">
                      {s.title}
                    </h2>
                    <p className="text-cbf-gray leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Étape 1 — Décisive
              </span>
              <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-5">
                Demandez une estimation gratuite
              </h2>
              <p className="text-cbf-gray mb-5">
                Avant toute mise en vente, connaissez la valeur réelle de votre
                bien. Nos experts CBF Conseils analysent votre situation et vous
                remettent une fourchette précise sous 48 heures.
              </p>
              <ul className="space-y-2">
                {[
                  "Visite gratuite de votre bien",
                  "Analyse comparative DVF",
                  "Stratégie de prix personnalisée",
                  "Aucun engagement",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-cbf-gray">
                    <CheckCircle2 className="h-4 w-4 text-cbf-success" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-cbf-gray-soft rounded-sm p-6 md:p-8">
              <FormEstimationCourt sourcePage="/vendre-clermont-ferrand" />
            </div>
          </div>
        </div>
      </section>

      {/* Section référent local + AMANDA */}
      <section className="py-14 md:py-20 bg-cbf-black text-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Pourquoi CBF Conseils
            </span>
            <h2 className="font-playfair text-display-md font-bold mt-3">
              Un référent local, une diffusion nationale
            </h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
              Nos agents connaissent Clermont-Ferrand quartier par quartier — les rues qui
              se vendent en 30 jours, les prix réels pratiqués, les acheteurs actifs sur
              le marché. Cette expertise locale, combinée à notre réseau, fait la différence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bloc AMANDA */}
            <div className="border border-cbf-gold/30 rounded-sm p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cbf-gold rounded-sm flex items-center justify-center">
                  <Users className="h-5 w-5 text-cbf-black" />
                </div>
                <a
                  href="https://www.cbfconseils.com"
                  target="_blank"
                  rel="noopener"
                  className="font-playfair text-xl font-bold text-cbf-gold hover:underline"
                >
                  Réseau AMANDA — CBF Conseils
                </a>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                AMANDA (anciennement fichier AMEPI) est le <strong className="text-white">premier outil national
                de partage de mandats exclusifs</strong> entre professionnels de l&apos;immobilier. En confiant votre
                bien à <a href="https://www.cbfconseils.com" target="_blank" rel="noopener" className="text-cbf-gold hover:underline font-semibold">CBF Conseils</a>,
                vous accédez instantanément à tout ce réseau.
              </p>
              <ul className="space-y-3">
                {[
                  "34 agences partenaires dans la région",
                  "220+ collaborateurs voient votre bien en temps réel",
                  "Diffusion immédiate dès la signature du mandat exclusif",
                  "Votre bien proposé par tous les membres AMANDA de la zone",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-cbf-gold mt-0.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bloc référent local */}
            <div className="border border-white/10 rounded-sm p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="font-playfair text-xl font-bold text-white">Expertise locale</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                CBF Conseils est <strong className="text-white">implanté à Clermont-Ferrand depuis plusieurs années</strong>.
                Nos agents vivent et travaillent sur ce marché — ils connaissent les acheteurs actifs,
                les quartiers en tension et les vraies valeurs.
              </p>
              <ul className="space-y-3">
                {[
                  "Connaissance fine de chaque quartier (prix réels, délais réels)",
                  "Fichier d'acheteurs qualifiés et actifs sur Clermont",
                  "Accompagnement de A à Z : estimation, visite, compromis, acte",
                  "Estimation gratuite sous 48h, sans engagement",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-white/50 mt-0.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/estimation">
              <button className="bg-cbf-gold text-cbf-black font-semibold px-8 py-3 rounded-sm hover:bg-cbf-gold/90 transition-colors text-sm uppercase tracking-wider">
                Demander une estimation gratuite
              </button>
            </Link>
          </div>
        </div>
      </section>

      <FaqAccordion items={faqVente} title="Vos questions sur la vente" />

      {/* CLUSTER ARTICLES VENDEUR */}
      {articlesVendeur.length > 0 && (
        <section className="py-14 md:py-20 bg-white">
          <div className="container max-w-5xl">
            <div className="mb-8">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Articles
              </span>
              <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
                Conseils pour vendre à Clermont-Ferrand
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {articlesVendeur.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block bg-cbf-ivory border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
                >
                  <h3 className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-snug mb-3">
                    {a.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                    Lire <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CLUSTER GUIDES VENDEUR + OUTILS */}
      <section className="py-14 md:py-16 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Guides vendeurs */}
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
                Guides complets
              </p>
              <div className="space-y-3">
                {guidesVendeur.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guide/${g.slug}`}
                    className="group flex items-center justify-between gap-3 bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm px-5 py-4"
                  >
                    <p className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-snug">
                      {g.titre}
                    </p>
                    <ArrowRight className="h-4 w-4 text-cbf-gold shrink-0" />
                  </Link>
                ))}
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold hover:underline mt-2"
                >
                  Tous les guides <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Outils pratiques */}
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
                Outils utiles
              </p>
              <div className="space-y-3">
                {[
                  { href: "/vendre", label: "Vendre par quartier", desc: "Prix et délais dans votre secteur exact" },
                  { href: "/meilleurs-agents-immobiliers-clermont-ferrand", label: "Meilleurs agents immo", desc: "Choisir la bonne agence à Clermont-Ferrand" },
                  { href: "/meilleurs-diagnostiqueurs-dpe-clermont-ferrand", label: "Diagnostiqueurs DPE certifiés", desc: "Trouver un diagnostiqueur fiable et rapide" },
                  { href: "/calculateur-frais-notaire", label: "Calculateur frais de notaire", desc: "Estimez les frais pour l'acheteur" },
                ].map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="group flex items-center justify-between gap-3 bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm px-5 py-4"
                  >
                    <div>
                      <p className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors">
                        {t.label}
                      </p>
                      <p className="text-xs text-cbf-gray-light mt-0.5">{t.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-cbf-gold shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
