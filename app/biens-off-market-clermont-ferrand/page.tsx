import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Eye, Bell, Users, CheckCircle2, TrendingUp, MapPin } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, FaqPageSchema } from "@/components/common/SchemaOrg";
import { FormInvestisseurRecherche } from "@/components/forms/FormInvestisseurRecherche";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Biens off-market Clermont-Ferrand — Investisseurs & acquéreurs prioritaires",
  description:
    "Accédez aux biens immobiliers non publiés à Clermont-Ferrand avant leur mise sur le marché. Studios étudiants Cézeaux, immeubles de rapport, appartements Centre-Ville. Service dédié investisseurs par CBF Conseils.",
  path: "/biens-off-market-clermont-ferrand",
});

const avantages = [
  {
    icon: Lock,
    titre: "Avant tout le monde",
    texte:
      "Les biens off-market ne passent jamais par les portails. Vous êtes alerté en premier, avant toute publication.",
  },
  {
    icon: Eye,
    titre: "Vendeurs motivés",
    texte:
      "Ces biens viennent de propriétaires qui préfèrent la discrétion à la surexposition. Moins de concurrence, plus de marge de négociation.",
  },
  {
    icon: Bell,
    titre: "Alerte sur mesure",
    texte:
      "Votre profil acquéreur est enregistré. Dès qu'un bien correspond à vos critères, vous recevez un appel — pas un email noyé.",
  },
  {
    icon: Users,
    titre: "Réseau terrain CBF Conseils",
    texte:
      "Après plus de 10 ans sur le marché clermontois, notre carnet d'adresses génère des opportunités invisibles en ligne.",
  },
];

const typesOffMarket = [
  {
    label: "Studios étudiants Cézeaux",
    budget: "80 – 110 K€",
    rendement: "5,5 – 6,5 %",
    pourquoi: "Fort turn-over vendeur, propriétaires fatigués de la gestion",
  },
  {
    label: "T2 / T3 Centre-Ville",
    budget: "130 – 220 K€",
    rendement: "4,5 – 5 %",
    pourquoi: "Successions, divorces, mutations professionnelles",
  },
  {
    label: "Immeubles de rapport",
    budget: "250 – 600 K€",
    rendement: "5 – 7 %",
    pourquoi: "Vente discrète entre pros, rarement publiés",
  },
  {
    label: "Appartements à rénover",
    budget: "90 – 180 K€",
    rendement: "4,5 – 6 % post-travaux",
    pourquoi: "DPE F/G, vendeurs pressés, forte décote",
  },
  {
    label: "Maisons Chamalières / Beaumont",
    budget: "300 – 550 K€",
    rendement: "Patrimoine long terme",
    pourquoi: "Familles qui évitent l'exposition publique",
  },
  {
    label: "Locaux commerciaux / bureaux",
    budget: "100 – 400 K€",
    rendement: "6 – 9 % brut",
    pourquoi: "Entreprises en restructuration, cessions rapides",
  },
];

const faq = [
  {
    question: "Qu'est-ce qu'un bien off-market à Clermont-Ferrand ?",
    reponse:
      "Un bien off-market est une propriété mise en vente sans publication sur les portails immobiliers (SeLoger, LeBonCoin, etc.). La transaction se fait en circuit fermé, entre l'agent et ses acquéreurs identifiés. À Clermont-Ferrand, CBF Conseils accède à ces biens grâce à son réseau de propriétaires, gestionnaires et notaires.",
  },
  {
    question: "Comment obtenir accès aux biens off-market CBF Conseils ?",
    reponse:
      "En soumettant votre profil acquéreur via notre formulaire. Un expert CBF Conseils valide votre dossier et vous contacte sous 48h. Dès qu'un bien correspond à vos critères (budget, type, quartier, objectif), vous êtes alerté en priorité.",
  },
  {
    question: "Les prix off-market sont-ils négociables ?",
    reponse:
      "Généralement oui. Les vendeurs off-market sont souvent motivés par la discrétion ou la rapidité, pas par le prix maximum. La marge de négociation est en moyenne 5 à 10 % supérieure à celle des biens publiés, selon notre expérience terrain.",
  },
  {
    question: "Faut-il être un investisseur expérimenté pour accéder à ce service ?",
    reponse:
      "Non. Nous accompagnons aussi bien les primo-investisseurs que les marchands de biens ou les détenteurs de patrimoine. L'essentiel est d'avoir un projet défini (budget, objectif, horizon) pour que nous puissions matcher efficacement.",
  },
  {
    question: "Quel délai pour trouver un bien correspondant à mes critères ?",
    reponse:
      "Variable selon la rareté du profil recherché. Pour un studio étudiant Cézeaux (budget 80-100 K€), comptez 2 à 6 semaines. Pour un immeuble de rapport > 400 K€, l'horizon peut être de 2 à 6 mois. Nous préférons la qualité à la vitesse.",
  },
  {
    question: "Ce service est-il payant ?",
    reponse:
      "L'inscription au service acquéreur est gratuite. Les honoraires d'agence s'appliquent uniquement en cas de transaction réalisée, selon les conditions légales en vigueur (honoraires vendeur ou partagés selon le mandat).",
  },
];

export default function OffMarketPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Biens off-market Clermont-Ferrand", url: `${SITE_URL}/biens-off-market-clermont-ferrand` },
        ]}
      />
      <FaqPageSchema items={faq} />

      {/* ── HERO ── */}
      <section className="bg-cbf-black text-white pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="container max-w-5xl">
          <BreadcrumbNav
            items={[{ name: "Accueil", href: "/" }, { name: "Off-market" }]}
            dark
          />
          <div className="mt-10 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Service acquéreurs — accès restreint
              </span>
              <h1 className="font-playfair text-display-xl font-bold mt-3 mb-5 leading-tight">
                Biens off-market
                <br />
                <span className="text-cbf-gold">Clermont-Ferrand</span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Accédez aux opportunités immobilières qui ne paraissent jamais
                sur les portails. Studios étudiants, T3 Centre-Ville, immeubles
                de rapport — alerté avant tout le monde, avant toute publication.
              </p>

              {/* Social proof */}
              <div className="flex flex-wrap gap-5 mb-8">
                {[
                  { val: "60 %", label: "de nos ventes ne passent pas par les portails" },
                  { val: "48 h", label: "délai de réponse à votre profil" },
                  { val: "10 ans", label: "de réseau terrain à Clermont-Ferrand" },
                ].map((s) => (
                  <div key={s.label} className="flex items-start gap-3">
                    <p className="font-playfair text-2xl font-bold text-cbf-gold whitespace-nowrap">{s.val}</p>
                    <p className="text-white/50 text-xs leading-relaxed max-w-[120px]">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Checkpoints */}
              <ul className="space-y-2.5">
                {[
                  "Successions & divorces — prix inférieurs au marché",
                  "Propriétaires fatigués de la gestion locative",
                  "Mutations / départs rapides — biens DPE F/G décotés",
                  "Immeubles de rapport cédés discrètement",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-white/75">
                    <CheckCircle2 className="h-4 w-4 text-cbf-gold flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-sm p-8 shadow-2xl">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-1">
                  Déposez votre profil acquéreur
                </p>
                <h2 className="font-playfair text-xl text-cbf-black font-bold mb-6">
                  Recevez les opportunités en avant-première
                </h2>
                <FormInvestisseurRecherche />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TYPES DE BIENS OFF-MARKET ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-6xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Profils de biens disponibles
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Quels types de biens transitent en off-market ?
            </h2>
            <p className="text-cbf-gray text-sm leading-relaxed">
              Les biens off-market ne tombent pas du ciel. Ils suivent des
              profils récurrents que notre équipe terrain identifie en amont.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {typesOffMarket.map((t) => (
              <div
                key={t.label}
                className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6 hover:border-cbf-gold transition-colors"
              >
                <h3 className="font-playfair font-bold text-cbf-black mb-3">{t.label}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[0.65rem] uppercase tracking-wider px-2.5 py-1 bg-white border border-cbf-gray-soft rounded-sm text-cbf-black font-semibold">
                    {t.budget}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-wider px-2.5 py-1 bg-cbf-success/10 border border-cbf-success/30 rounded-sm text-cbf-success font-semibold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {t.rendement}
                  </span>
                </div>
                <p className="text-xs text-cbf-gray-light leading-snug">{t.pourquoi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="max-w-xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Pourquoi ce service ?
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2">
              Ce que vous gagnez à passer par le réseau off-market
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {avantages.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.titre}
                  className="bg-white border border-cbf-gray-soft rounded-sm p-7 flex gap-5"
                >
                  <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-cbf-black mb-2">{a.titre}</h3>
                    <p className="text-sm text-cbf-gray leading-relaxed">{a.texte}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAILLAGE INTERNE ── */}
      <section className="py-10 bg-white border-t border-cbf-gray-soft">
        <div className="container max-w-5xl">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-5">
            Préparer votre investissement
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/investir-clermont-ferrand", label: "Guide investisseur 2026", desc: "Rendements & stratégies" },
              { href: "/prix-immobilier-clermont-ferrand", label: "Prix par quartier", desc: "38 secteurs analysés" },
              { href: "/calculateur-frais-notaire", label: "Frais de notaire", desc: "Simulez vos coûts d'acquisition" },
              { href: "/estimation", label: "Estimation gratuite", desc: "Évaluez avant d'acheter ou vendre" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-start justify-between gap-3 bg-cbf-ivory border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-4"
              >
                <div>
                  <p className="font-semibold text-sm text-cbf-black group-hover:text-cbf-gold transition-colors">
                    {l.label}
                  </p>
                  <p className="text-xs text-cbf-gray-light mt-0.5">{l.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-cbf-gray-light group-hover:text-cbf-gold transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion items={faq} title="Vos questions sur l'off-market à Clermont-Ferrand" />
      <FinalCta />
    </>
  );
}
