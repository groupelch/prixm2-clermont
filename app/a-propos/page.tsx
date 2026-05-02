import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Database, Users, Award, TrendingUp } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, ArticleSchema } from "@/components/common/SchemaOrg";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "À propos — prixm² Clermont-Ferrand par CBF Conseils",
  description:
    "prixm²clermontferrand.fr est l'observatoire de référence des prix immobiliers à Clermont-Ferrand, édité par CBF Conseils. Données DVF, méthode transparente, 16 882 transactions analysées.",
  path: "/a-propos",
});

const equipe = [
  {
    nom: "Louis Combret",
    role: "Directeur — Groupe LCH / CBF Conseils",
    bio: "Fondateur du Groupe LCH, Louis pilote la stratégie immobilière du groupe depuis Clermont-Ferrand. Il supervise l'analyse des données de marché et la méthodologie de cet observatoire.",
  },
  {
    nom: "Maxence Lami",
    role: "Directeur Général — CBF Conseils",
    bio: "Maxence dirige les opérations de CBF Conseils au quotidien. Sa connaissance terrain du marché clermontois (transactions, quartiers, délais de vente) alimente directement les données publiées sur ce site.",
  },
  {
    nom: "Équipe Data CBF Conseils",
    role: "Analyse & traitement des données",
    bio: "L'équipe data extrait, nettoie et analyse les Demandes de Valeurs Foncières (DVF) publiées par la Direction Générale des Finances Publiques. Les données sont croisées avec les observations terrain des négociateurs.",
  },
];

const sources = [
  {
    icon: Database,
    titre: "DVF — Demandes de Valeurs Foncières",
    description:
      "Source principale. La DVF recense toutes les transactions immobilières enregistrées par les notaires en France. Nous exploitons les données 2021-2024 couvrant Clermont-Ferrand et son agglomération — soit 16 882 transactions analysées.",
    lien: "https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/",
    label: "data.gouv.fr",
  },
  {
    icon: TrendingUp,
    titre: "ADEME — Base de données DPE",
    description:
      "Les diagnostics de performance énergétique (DPE) sont fournis par l'Agence de la Transition Écologique. Nous croisons les DPE avec les transactions pour estimer l'impact énergétique sur les prix de chaque quartier.",
    lien: "https://data.ademe.fr/datasets/dpe-v2-logements-existants",
    label: "data.ademe.fr",
  },
  {
    icon: Users,
    titre: "Observations terrain CBF Conseils",
    description:
      "Notre réseau de négociateurs collecte des données qualitatives non disponibles dans les bases publiques : délais de vente réels par quartier, marges de négociation constatées, profils acheteurs, biens off-market.",
    lien: "https://www.cbfconseils.com",
    label: "cbfconseils.com",
  },
];

const chiffres = [
  { val: "16 882", label: "Transactions analysées (2021-2024)" },
  { val: "40+", label: "Quartiers et communes couverts" },
  { val: "2024", label: "Dernière mise à jour des données DVF" },
  { val: "2014", label: "Année de création de CBF Conseils" },
];

export default function AProposPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "À propos", url: `${SITE_URL}/a-propos` },
        ]}
      />
      <ArticleSchema
        title="À propos — prixm² Clermont-Ferrand par CBF Conseils"
        description="prixm²clermontferrand.fr est l'observatoire de référence des prix immobiliers à Clermont-Ferrand, édité par CBF Conseils. Données DVF, méthode transparente, 16 882 transactions analysées."
        datePublished="2024-01-15"
        dateModified="2025-01-01"
        url={`${SITE_URL}/a-propos`}
        authorName="CBF Conseils"
        authorType="Organization"
      />

      {/* HERO */}
      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav
            items={[{ name: "Accueil", href: "/" }, { name: "À propos" }]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Qui sommes-nous
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              prixm² Clermont-Ferrand
              <br />
              <span className="text-cbf-gold">par CBF Conseils</span>
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed mb-4">
              prixm²clermontferrand.fr est l'observatoire indépendant des prix
              immobiliers à Clermont-Ferrand. Il est édité par{" "}
              <a
                href="https://www.cbfconseils.com"
                className="text-cbf-black font-semibold underline underline-offset-2 hover:text-cbf-gold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                CBF Conseils
              </a>
              , agence immobilière implantée en Auvergne depuis 2014.
            </p>
            <p className="text-base text-cbf-gray leading-relaxed">
              Notre objectif : rendre accessibles les données de marché
              réelles — pas des estimations algorithmi&shy;ques, mais des
              prix issus des actes notariés (DVF) croisés avec l'expertise
              terrain de nos négociateurs. 16 882 transactions analysées
              sur Clermont-Ferrand et son agglomération.
            </p>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="py-12 bg-cbf-black text-white">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {chiffres.map((c) => (
              <div key={c.label} className="text-center">
                <p className="font-playfair text-3xl font-bold text-cbf-gold mb-2">
                  {c.val}
                </p>
                <p className="text-xs text-white/60 uppercase tracking-wider leading-snug">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Notre mission
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-6">
            Transparence sur les prix immobiliers clermontois
          </h2>
          <div className="prose prose-lg max-w-none text-cbf-gray space-y-4">
            <p>
              Le marché immobilier souffre d'un déficit d'information structurel.
              Les vendeurs surestiment souvent leur bien faute de références
              fiables. Les acheteurs ne savent pas si un prix est juste. Les
              investisseurs naviguent avec des données partielles ou dépassées.
            </p>
            <p>
              prixm²clermontferrand.fr a été conçu pour combler ce vide sur le
              marché clermontois. Nous publions les données brutes des transactions
              notariées (DVF), les enrichissons avec les diagnostics énergétiques
              (DPE) et y ajoutons l'analyse terrain de nos négociateurs — pour
              que chaque visiteur dispose d'une vision précise du marché dans son
              quartier.
            </p>
            <p>
              Ce service est gratuit. Il est financé par l'activité de CBF
              Conseils : si vous souhaitez vendre, acheter ou investir à
              Clermont-Ferrand, nos experts sont disponibles pour une étude
              personnalisée sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* SOURCES DE DONNÉES */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Sources & méthode
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            D'où viennent nos données ?
          </h2>
          <p className="text-cbf-gray text-sm mb-10 max-w-2xl">
            Toutes nos données sont issues de sources publiques officielles ou
            de notre observation terrain. Aucune estimation algorithmique sans
            base transactionnelle réelle.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {sources.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.titre}
                  className="bg-white border border-cbf-gray-soft rounded-sm p-7"
                >
                  <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-cbf-black mb-3">
                    {s.titre}
                  </h3>
                  <p className="text-sm text-cbf-gray leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <a
                    href={s.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cbf-gold font-semibold hover:underline"
                  >
                    {s.label} →
                  </a>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/methodologie" className="text-sm text-cbf-gold font-semibold hover:underline inline-flex items-center gap-1">
              Lire la méthodologie détaillée <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            L'équipe
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-10">
            Des experts immobiliers clermontois
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {equipe.map((p) => (
              <div
                key={p.nom}
                className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-7"
              >
                <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-cbf-black mb-1">
                  {p.nom}
                </h3>
                <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-3">
                  {p.role}
                </p>
                <p className="text-sm text-cbf-gray leading-relaxed">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER LÉGAL */}
      <section className="py-10 bg-cbf-ivory border-t border-cbf-gray-soft">
        <div className="container max-w-4xl">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-3">
            Mentions importantes
          </p>
          <p className="text-xs text-cbf-gray leading-relaxed">
            Les prix publiés sur prixm²clermontferrand.fr sont des médianes
            calculées sur des transactions réelles. Ils constituent une
            référence indicative et ne sauraient être considérés comme une
            estimation formelle de la valeur d'un bien particulier. Chaque
            transaction est unique et dépend de l'état du bien, de son étage,
            de son exposition, de ses annexes et des conditions de marché au
            moment de la vente. Pour une estimation précise, contactez un
            professionnel habilité.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-xs">
            <Link href="/mentions-legales" className="text-cbf-gold hover:underline">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-cbf-gold hover:underline">
              Politique de confidentialité
            </Link>
            <Link href="/methodologie" className="text-cbf-gold hover:underline">
              Méthodologie
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
