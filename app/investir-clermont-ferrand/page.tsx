import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, GraduationCap, Briefcase, Home as HomeIcon, ArrowRight, MapPin, BarChart3 } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, FaqPageSchema, ArticleSchema } from "@/components/common/SchemaOrg";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Investir à Clermont-Ferrand 2026 — Rendements, quartiers & stratégies",
  description:
    "Guide complet investissement immobilier à Clermont-Ferrand : rendements 4 à 6,5 %, quartiers cibles (Cézeaux, La Gare, Centre-Ville), prix m² réels. Marché porté par 39 000 étudiants et le CHU. Étude personnalisée CBF Conseils.",
  path: "/investir-clermont-ferrand",
});

const strategies = [
  {
    icon: GraduationCap,
    title: "Stratégie étudiante",
    rendement: "5,5 — 6,5 %",
    ticket: "80 — 110 K€",
    quartiers: "Cézeaux, Aubière, Centre-Ville",
    public: "Étudiants UCA, internes CHU, alternants Michelin",
    pour: "Demande locative quasi-permanente, ticket d'entrée accessible",
    contre: "Rotation annuelle, vacance estivale possible, dégradations",
  },
  {
    icon: Briefcase,
    title: "Stratégie jeune actif",
    rendement: "4,5 — 5,5 %",
    ticket: "130 — 220 K€",
    quartiers: "Centre-Ville, Salins, Saint-Jacques, Chamalières",
    public: "Cadres Michelin, internes médecine, jeunes couples",
    pour: "Locataires solvables, peu de turnover, valorisation solide",
    contre: "Ticket d'entrée plus élevé, marge de négociation faible",
  },
  {
    icon: HomeIcon,
    title: "Stratégie famille / patrimoine",
    rendement: "4 — 4,5 %",
    ticket: "250 — 500 K€",
    quartiers: "Beaumont, Cébazat, Romagnat, Lempdes",
    public: "Familles, couples avec enfants",
    pour: "Vacance quasi nulle, locataires fidèles 5-10 ans",
    contre: "Ticket élevé, travaux majeurs périodiques",
  },
];

const topQuartiers = [
  {
    slug: "clermont-fermond-les-cezeaux",
    nom: "Les Cézeaux",
    prix: 2000,
    evolution: "+1.6%",
    rendement: "5,5–6,5 %",
    profil: "Étudiant",
    why: "Campus UCA / ISIMA, 39 000 étudiants à 10 min à pied",
    slug_url: "clermont-ferrand-les-cezeaux",
  },
  {
    slug: "la-gare",
    nom: "La Gare",
    prix: 1850,
    evolution: "+0.8%",
    rendement: "5–6 %",
    profil: "Opportuniste",
    why: "Prix bas + PEM 2027 → revalorisation anticipée 15-25 %",
    slug_url: "clermont-ferrand-la-gare",
  },
  {
    slug: "glaciere",
    nom: "La Glacière",
    prix: 1900,
    evolution: "+1.1%",
    rendement: "5–5,5 %",
    profil: "Rendement pur",
    why: "Quartier investisseur par nature, prix d'entrée bas, demande stable",
    slug_url: "clermont-ferrand-la-glaciere",
  },
  {
    slug: "montferrand",
    nom: "Montferrand",
    prix: 1950,
    evolution: "+1.4%",
    rendement: "5–5,5 %",
    profil: "Patrimoine abordable",
    why: "Centre historique, biens avec cachet, locataires fidèles",
    slug_url: "clermont-ferrand-montferrand",
  },
  {
    slug: "centre-ville",
    nom: "Centre-Ville",
    prix: 2400,
    evolution: "+2.1%",
    rendement: "4,5–5 %",
    profil: "Équilibré",
    why: "Liquidité maximale à la revente, forte demande locative mixte",
    slug_url: "clermont-ferrand-centre-ville",
  },
  {
    slug: "la-pardieu",
    nom: "La Pardieu",
    prix: 2100,
    evolution: "+1.7%",
    rendement: "4,5–5 %",
    profil: "Tertaire / Actifs",
    why: "Parc technologique Michelin, IBM, Limagrain — demande cadres",
    slug_url: "clermont-ferrand-la-pardieu",
  },
];

const comparatif = [
  { ville: "Lyon", prixM2: 5200, rendement: "3–4 %", vacance: "Faible" },
  { ville: "Bordeaux", prixM2: 4600, rendement: "3,5–4,5 %", vacance: "Faible" },
  { ville: "Dijon", prixM2: 2400, rendement: "4–5 %", vacance: "Modérée" },
  { ville: "Clermont-Ferrand", prixM2: 2100, rendement: "4,5–6,5 %", vacance: "Faible", highlight: true },
];

const faqInvestir = [
  {
    question: "Quel rendement espérer pour un investissement à Clermont-Ferrand ?",
    reponse:
      "Entre 4 % (résidentiel premium Beaumont / Chamalières) et 6,5 % (studio étudiant Cézeaux). Les rendements bruts sont supérieurs à Lyon ou Bordeaux à profil locataire équivalent, grâce à des prix d'achat 25-40 % inférieurs.",
  },
  {
    question: "Quel quartier choisir pour investir en 2026 ?",
    reponse:
      "Les Cézeaux pour le rendement étudiant maximal, La Gare pour le pari de valorisation post-PEM 2027, le Centre-Ville pour la liquidité à la revente. Le choix dépend de votre profil investisseur, de votre horizon et de votre tolérance à la rotation locative.",
  },
  {
    question: "Vaut-il mieux acheter en LMNP ou en foncier classique à Clermont ?",
    reponse:
      "Le LMNP (location meublée non pro) permet d'amortir le bien et neutralise quasiment l'impôt sur 10-15 ans — idéal pour les studios étudiants Cézeaux. Le foncier classique convient mieux si vous avez de gros travaux à déduire. À optimiser avec un comptable spécialisé immobilier.",
  },
  {
    question: "Combien de temps avant de revendre avec plus-value à Clermont-Ferrand ?",
    reponse:
      "La valorisation tourne autour de +2 à 3 % par an. Comptez 7-8 ans minimum pour neutraliser frais de notaire et coûts de portage avant plus-value nette. Sur le quartier Gare, les projections PEM 2027 peuvent accélérer ce calendrier.",
  },
  {
    question: "Quel est l'impact du futur Pôle d'Échanges Multimodal (PEM) sur les prix ?",
    reponse:
      "Le PEM prévu en 2027 connectera la gare SNCF, le tramway et les bus en un hub unique. Le quartier Gare (actuellement 1 800-2 100 €/m²) est le seul secteur clermontois encore sous-valorisé par rapport à son potentiel. Les investisseurs anticipent une revalorisation de 15 à 25 % d'ici 2028-2030.",
  },
  {
    question: "L'immobilier clermontois est-il accessible aux primo-investisseurs ?",
    reponse:
      "Oui. Un studio étudiant à Cézeaux se négocie entre 80 000 et 100 000 €. Avec 20 % d'apport (16-20 K€) et un crédit sur 20 ans, la mensualité est souvent couverte par le loyer. C'est l'un des marchés les plus accessibles de France pour commencer à investir.",
  },
  {
    question: "Faut-il passer par une agence pour investir à Clermont-Ferrand ?",
    reponse:
      "Ce n'est pas obligatoire, mais un expert local fait gagner du temps et évite les pièges : prix de marché réels, charges de copropriété, état locatif, quartiers à éviter. CBF Conseils propose une étude d'investissement gratuite adaptée à votre budget et vos objectifs.",
  },
];

export default function InvestirPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Investir à Clermont-Ferrand", url: `${SITE_URL}/investir-clermont-ferrand` },
        ]}
      />
      <ArticleSchema
        title="Investir à Clermont-Ferrand 2026 — Rendements, quartiers & stratégies"
        description="Guide complet investissement immobilier à Clermont-Ferrand : rendements 4 à 6,5 %, quartiers cibles (Cézeaux, La Gare, Centre-Ville), prix m² réels. Marché porté par 39 000 étudiants et le CHU."
        datePublished="2024-01-15"
        dateModified="2025-06-01"
        url={`${SITE_URL}/investir-clermont-ferrand`}
        authorName="Louis Combret, Directeur CBF Conseils"
        authorType="Person"
      />
      <FaqPageSchema items={faqInvestir} />

      {/* ── HERO ── */}
      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-6xl">
          <BreadcrumbNav items={[{ name: "Accueil", href: "/" }, { name: "Investir" }]} />
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Guide investisseur — données 2026
              </span>
              <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
                Investir à Clermont-Ferrand
                <br />
                <span className="text-cbf-gold">Stratégies & rendements 2026</span>
              </h1>
              <p className="text-lg text-cbf-gray leading-relaxed mb-8">
                Avec 39 000 étudiants (UCA, médecine, ingénieurs),
                le CHU Estaing — l'un des plus grands de province — et le siège
                mondial de Michelin, Clermont-Ferrand génère une demande locative
                structurelle. Les prix d'entrée restent{" "}
                <strong className="text-cbf-black">25 à 40 % inférieurs à Lyon</strong>{" "}
                pour des rendements supérieurs.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/estimation">
                  <Button variant="primary" size="lg">
                    Étudier mon projet d'investissement
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/prix-immobilier-clermont-ferrand">
                  <Button variant="outline" size="lg">
                    Voir les prix par quartier
                  </Button>
                </Link>
              </div>
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "4 – 6,5 %", label: "Rendement brut" },
                  { val: "39 000", label: "Étudiants (UCA)" },
                  { val: "2 100 €/m²", label: "Prix médian ville" },
                ].map((k) => (
                  <div key={k.label} className="bg-white border border-cbf-gray-soft rounded-sm p-4 text-center">
                    <p className="font-playfair text-xl font-bold text-cbf-black">{k.val}</p>
                    <p className="text-[0.65rem] text-cbf-gray-light uppercase tracking-wider mt-1">{k.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1493339424841-c97be3525f8f?w=1200&q=80&auto=format&fit=crop"
                  alt="Auvergne — vue depuis Clermont-Ferrand"
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cbf-black/40 via-transparent to-transparent" />
              </div>
              <p className="text-[0.65rem] text-cbf-gray-light/50 mt-2 text-right">Photo : Unsplash</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIF VILLES ── */}
      <section className="py-12 bg-cbf-black text-white">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="h-5 w-5 text-cbf-gold" />
            <h2 className="font-playfair text-xl font-bold">Clermont-Ferrand vs autres grandes villes françaises</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-6 text-[0.6rem] uppercase tracking-widest text-white/50 font-normal">Ville</th>
                  <th className="text-right py-3 pr-6 text-[0.6rem] uppercase tracking-widest text-white/50 font-normal">Prix médian m²</th>
                  <th className="text-right py-3 pr-6 text-[0.6rem] uppercase tracking-widest text-white/50 font-normal">Rendement brut</th>
                  <th className="text-right py-3 text-[0.6rem] uppercase tracking-widest text-white/50 font-normal">Vacance locative</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((c) => (
                  <tr
                    key={c.ville}
                    className={`border-b border-white/5 ${c.highlight ? "bg-cbf-gold/10" : ""}`}
                  >
                    <td className={`py-4 pr-6 font-semibold ${c.highlight ? "text-cbf-gold" : "text-white"}`}>
                      {c.ville} {c.highlight && "✓"}
                    </td>
                    <td className={`text-right py-4 pr-6 font-bold ${c.highlight ? "text-cbf-gold" : "text-white/80"}`}>
                      {c.prixM2.toLocaleString("fr-FR")} €
                    </td>
                    <td className={`text-right py-4 pr-6 ${c.highlight ? "text-cbf-gold font-bold" : "text-white/80"}`}>
                      {c.rendement}
                    </td>
                    <td className="text-right py-4 text-white/60">{c.vacance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.6rem] text-white/30 mt-4">Sources : DVF 2024-2025, données marché locatif FNAIM / Meilleurs Agents 2025</p>
        </div>
      </section>

      {/* ── 3 STRATÉGIES ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-6xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              3 stratégies, 3 profils
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Quelle stratégie pour quel investisseur ?
            </h2>
            <p className="text-cbf-gray text-sm leading-relaxed">
              Chaque profil investisseur correspond à un couple rendement / risque différent.
              Le marché clermontois est suffisamment profond pour les trois.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {strategies.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-7 hover:border-cbf-gold transition-colors"
                >
                  <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-cbf-black mb-3">
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cbf-success/10 border border-cbf-success/30 rounded-sm">
                      <TrendingUp className="h-3.5 w-3.5 text-cbf-success" />
                      <span className="text-xs text-cbf-success font-bold">{s.rendement} brut</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cbf-ivory border border-cbf-gray-soft rounded-sm">
                      <span className="text-xs text-cbf-gray font-semibold">{s.ticket}</span>
                    </span>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light font-bold mb-0.5">
                        Quartiers cibles
                      </dt>
                      <dd className="text-cbf-black">{s.quartiers}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light font-bold mb-0.5">
                        Public locataire
                      </dt>
                      <dd className="text-cbf-gray">{s.public}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] uppercase tracking-wider text-cbf-success font-bold mb-0.5">
                        Atouts
                      </dt>
                      <dd className="text-cbf-gray">{s.pour}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] uppercase tracking-wider text-cbf-warning font-bold mb-0.5">
                        Risques
                      </dt>
                      <dd className="text-cbf-gray">{s.contre}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOP QUARTIERS INVESTISSEURS ── */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-6xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Données DVF 2025
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Top 6 quartiers pour investir
            </h2>
            <p className="text-cbf-gray text-sm leading-relaxed">
              Sélectionnés sur la base du rendement estimé, de la liquidité locative
              et des perspectives de valorisation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topQuartiers.map((q) => (
              <Link
                key={q.slug}
                href={`/prix-m2/${q.slug_url}`}
                className="group bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-cbf-gold" />
                      <p className="font-playfair font-bold text-cbf-black group-hover:text-cbf-gold transition-colors">
                        {q.nom}
                      </p>
                    </div>
                    <span className="text-[0.55rem] uppercase tracking-wider px-2 py-0.5 bg-cbf-ivory border border-cbf-gold/30 text-cbf-gold font-bold rounded-sm">
                      {q.profil}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-cbf-success">{q.rendement}</p>
                    <p className="text-[0.6rem] text-cbf-gray-light">rendement brut</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-cbf-gray">Prix médian</span>
                  <span className="font-bold text-cbf-black">
                    {q.prix.toLocaleString("fr-FR")} €/m²
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-cbf-gray">Évolution 12 mois</span>
                  <span className={`font-bold ${q.evolution.startsWith("+") ? "text-cbf-success" : "text-red-500"}`}>
                    {q.evolution}
                  </span>
                </div>
                <p className="text-xs text-cbf-gray-light leading-snug border-t border-cbf-gray-soft pt-3">
                  {q.why}
                </p>
                <div className="flex items-center gap-1 mt-3 text-cbf-gold text-xs font-semibold">
                  Voir les données <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/prix-immobilier-clermont-ferrand">
              <Button variant="outline" size="sm">
                Voir tous les quartiers (38 au total)
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ÉTUDE PERSONNALISÉE ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="bg-cbf-ivory border border-cbf-gray-soft p-8 md:p-12 rounded-sm">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Étude personnalisée — gratuite
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-4">
              Un expert CBF Conseils étudie votre projet
            </h2>
            <p className="text-cbf-gray mb-6 leading-relaxed">
              Budget, fiscalité (LMNP / nu / SCI), quartiers cibles, simulation de
              rendement net-net. Réponse sous 48 h. Sans engagement.
            </p>
            <FormEstimationCourt sourcePage="/investir-clermont-ferrand" />
          </div>
        </div>
      </section>

      <FaqAccordion items={faqInvestir} title="Vos questions sur l'investissement clermontois" />

      {/* ── MAILLAGE INTERNE THÉMATIQUE ── */}
      <section className="py-12 bg-cbf-ivory border-t border-cbf-gray-soft">
        <div className="container max-w-5xl">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-6">
            Guides complémentaires
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { href: "/vendre-clermont-ferrand", label: "Vendre à Clermont-Ferrand", desc: "Délais, négociation, mise en marché" },
              { href: "/louer-clermont-ferrand", label: "Louer à Clermont-Ferrand", desc: "Baux, fiscalité, gestion locative" },
              { href: "/calculateur-frais-notaire", label: "Calculateur frais de notaire", desc: "Simulez vos frais d'acquisition" },
              { href: "/prix-immobilier-clermont-ferrand", label: "Prix par quartier", desc: "38 quartiers et communes — données DVF" },
              { href: "/blog", label: "Blog immobilier", desc: "Analyses de marché, conseils, tendances" },
              { href: "/estimation", label: "Estimation gratuite", desc: "Votre bien estimé par un expert sous 48h" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-start justify-between gap-3 bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-4"
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

      <FinalCta />
    </>
  );
}
