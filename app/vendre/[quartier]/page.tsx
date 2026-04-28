import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  Home as HomeIcon,
  AlertTriangle,
} from "lucide-react";
import { quartiers, getQuartierBySlug } from "@/data/quartiers";
import { getArticlesForQuartier } from "@/data/articles";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  BreadcrumbSchema,
  FaqPageSchema,
  PlaceSchema,
} from "@/components/common/SchemaOrg";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { buildMetadata } from "@/lib/seo";
import { formatPricePerM2, SITE_URL } from "@/lib/utils";

type Params = { quartier: string };

export async function generateStaticParams(): Promise<Params[]> {
  return quartiers.map((q) => ({ quartier: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const q = getQuartierBySlug(params.quartier);
  if (!q) return { title: "Quartier introuvable" };
  return buildMetadata({
    title: `Vendre à ${q.nom} (Clermont-Ferrand) — Stratégie & prix 2025`,
    description: `Vendre votre appartement ou maison à ${q.nom} : prix m² ${formatPricePerM2(q.prixAppartement)}, délai ${q.delaiVente} jours, conseils CBF Conseils. Estimation gratuite.`,
    path: `/vendre/${q.slug}`,
  });
}

export default function VendreQuartierPage({
  params,
}: {
  params: Params;
}) {
  const q = getQuartierBySlug(params.quartier);
  if (!q) notFound();

  const articles = getArticlesForQuartier(q.slug).slice(0, 3);
  const refPrix = q.prixAppartement ?? q.prixMaison;

  const faq = [
    {
      question: `Combien de temps pour vendre à ${q.nom} en 2025 ?`,
      reponse: `Le délai médian est de ${q.delaiVente} jours pour un bien correctement valorisé. Comptez 30 à 50 % de plus pour un bien surévalué ou avec un DPE F/G non anticipé.`,
    },
    {
      question: `Quel est le prix au m² à ${q.nom} en 2025 ?`,
      reponse: `Le prix médian appartement à ${q.nom} est de ${formatPricePerM2(q.prixAppartement)}. Évolution sur 12 mois : ${q.evolution}. La fourchette réelle dépend de l'état, l'étage, le DPE et l'emplacement précis dans le quartier.`,
    },
    {
      question: `Faut-il signer un mandat exclusif pour vendre à ${q.nom} ?`,
      reponse: `L'exclusivité est généralement plus efficace : un seul interlocuteur, mise en marché coordonnée, négociation centralisée. À ${q.nom}, où la liquidité du marché est ${q.delaiVente < 100 ? "bonne" : "moyenne"}, l'exclusivité accélère significativement la vente.`,
    },
    {
      question: `Quels sont les diagnostics obligatoires pour vendre à ${q.nom} ?`,
      reponse: `DPE (obligatoire et opposable depuis 2021), amiante (avant 1997), plomb (avant 1949), électricité/gaz (installations > 15 ans), termites selon arrêté préfectoral, ERP. Pour les copropriétés : carnet d'entretien, PV des 3 dernières AG, charges, état daté.`,
    },
    {
      question: `Combien me reste-t-il après une vente à ${q.nom} ?`,
      reponse: `Du prix de vente, on déduit : honoraires d'agence (typiquement 4-5 % TTC), frais de remboursement anticipé du prêt (≈ 3 % du capital restant dû), éventuelle plus-value imposable (résidence principale exonérée). On vous fournit un calcul net détaillé sur demande.`,
    },
  ];

  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    { name: "Vendre", url: `${SITE_URL}/vendre-clermont-ferrand` },
    { name: q.nom, url: `${SITE_URL}/vendre/${q.slug}` },
  ];

  // Conseil contextualisé selon liquidité
  const liquidite = q.delaiVente < 90 ? "tendu" : q.delaiVente < 130 ? "fluide" : "long";

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <FaqPageSchema items={faq} />
      <PlaceSchema
        name={q.nom}
        lat={q.coordinates.lat}
        lng={q.coordinates.lng}
        description={q.description}
      />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Vendre", href: "/vendre-clermont-ferrand" },
            { name: q.nom },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative pt-10 pb-14 md:pt-14 md:pb-20 bg-cbf-ivory overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-cbf-gold rounded-full opacity-10 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-cbf-gold/30 rounded-full mb-6">
                <HomeIcon className="h-3 w-3 text-cbf-gold" />
                <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cbf-black font-semibold">
                  Vendre · {q.ville}
                </span>
              </div>

              <h1 className="font-playfair text-display-xl text-cbf-black font-bold mb-5 leading-tight">
                Vendre à <span className="text-cbf-gold">{q.nom}</span>
                <br />
                <span className="text-cbf-anthracite text-[0.65em]">
                  Stratégie 2025 & prix réels
                </span>
              </h1>
              <p className="text-lg text-cbf-gray mb-8 max-w-xl">
                Tout ce qu'il faut savoir pour vendre votre bien à {q.nom} au
                bon prix, dans le bon délai. Prix médian, durée de vente,
                profil acheteur, pièges à éviter — par les experts CBF Conseils.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-white border border-cbf-gray-soft rounded-sm p-4">
                  <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                    Prix m²
                  </p>
                  <p className="font-playfair text-xl font-bold text-cbf-black">
                    {formatPricePerM2(refPrix)}
                  </p>
                </div>
                <div className="bg-white border border-cbf-gray-soft rounded-sm p-4">
                  <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                    Délai
                  </p>
                  <p className="font-playfair text-xl font-bold text-cbf-black">
                    {q.delaiVente} jours
                  </p>
                </div>
                <div className="bg-white border border-cbf-gray-soft rounded-sm p-4">
                  <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                    12 mois
                  </p>
                  <p className="font-playfair text-xl font-bold text-cbf-black">
                    {q.evolution}
                  </p>
                </div>
              </div>

              <p className="text-sm text-cbf-gray-light">
                Marché {liquidite} · Profil acheteur :{" "}
                <strong className="text-cbf-black">{q.profilAcheteur}</strong>
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-cbf-gray-soft rounded-sm shadow-lg p-6 md:p-8">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                  Estimation gratuite · 1 minute
                </span>
                <h2 className="font-playfair text-2xl font-bold text-cbf-black mt-2 mb-5">
                  Quel prix réel pour votre bien à {q.nom} ?
                </h2>
                <FormEstimationCourt
                  sourcePage={`/vendre/${q.slug}`}
                  sourceQuartier={q.slug}
                  defaultQuartier={q.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils mise en marché */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Mise en marché
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-8">
            Vendre intelligemment à {q.nom}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-cbf-gold" />
                <h3 className="font-playfair text-lg font-bold text-cbf-black">
                  Le bon prix dès le départ
                </h3>
              </div>
              <p className="text-sm text-cbf-gray leading-relaxed">
                À {q.nom}, un bien surévalué de 10 % perd 2 à 3 mois de visibilité
                et finit souvent en dessous du prix juste. Le bon réflexe :
                positionner dans la fourchette haute du marché — pas au-dessus.
              </p>
            </div>
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-cbf-gold" />
                <h3 className="font-playfair text-lg font-bold text-cbf-black">
                  Anticiper les diagnostics
                </h3>
              </div>
              <p className="text-sm text-cbf-gray leading-relaxed">
                DPE, amiante, plomb, électricité, ERP — à commander avant la mise
                en ligne. Un DPE F ou G connu d'avance permet de fixer un prix
                cohérent et d'éviter une renégociation tardive de l'acquéreur.
              </p>
            </div>
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-cbf-gold" />
                <h3 className="font-playfair text-lg font-bold text-cbf-black">
                  Soigner la présentation
                </h3>
              </div>
              <p className="text-sm text-cbf-gray leading-relaxed">
                Photos pro, plan 2D, home staging léger : à {q.nom},
                {q.pointsForts[0] ? ` mettre en avant "${q.pointsForts[0].toLowerCase()}"` : " jouer sur les atouts du quartier"} fait
                la différence sur les premières 48 h de mise en ligne — pic
                d'audience décisif.
              </p>
            </div>
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-cbf-gold" />
                <h3 className="font-playfair text-lg font-bold text-cbf-black">
                  Pièges à éviter
                </h3>
              </div>
              <p className="text-sm text-cbf-gray leading-relaxed">
                {q.pointsFaibles[0] ? `${q.pointsFaibles[0]} : ` : ""}à anticiper
                dans l'argumentaire. Mandats simples sans coordination,
                surenchère initiale, photos amateurs — les 3 erreurs qui
                allongent la vente de 2 à 4 mois.
              </p>
            </div>
          </div>

          {/* Description quartier */}
          <div className="mt-12 bg-cbf-ivory border-l-4 border-cbf-gold p-6 md:p-8 rounded-sm">
            <h3 className="font-playfair text-xl font-bold text-cbf-black mb-3">
              Le marché de {q.nom} en bref
            </h3>
            <p className="text-cbf-gray leading-relaxed mb-4">{q.description}</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold text-cbf-black mb-2">Points forts</p>
                <ul className="space-y-1">
                  {q.pointsForts.slice(0, 3).map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-cbf-gray">
                      <CheckCircle2 className="h-4 w-4 text-cbf-gold mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-cbf-black mb-2">Vigilance acheteur</p>
                <ul className="space-y-1">
                  {q.pointsFaibles.slice(0, 3).map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-cbf-gray">
                      <AlertTriangle className="h-4 w-4 text-cbf-gold mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link
              href={`/prix-m2/${q.slug}`}
              className="group block bg-white p-6 md:p-8 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold">
                Marché détaillé
              </span>
              <h3 className="font-playfair text-xl font-bold text-cbf-black mt-2 mb-3 group-hover:text-cbf-gold transition-colors">
                Prix m² {q.nom} — analyse complète
              </h3>
              <p className="text-sm text-cbf-gray mb-4">
                Évolutions sur 5 et 10 ans, prix par type, comparaison voisins,
                rues recherchées.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                Analyser le marché <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href={`/estimation-quartier/${q.slug}`}
              className="group block bg-white p-6 md:p-8 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
            >
              <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold">
                Estimation
              </span>
              <h3 className="font-playfair text-xl font-bold text-cbf-black mt-2 mb-3 group-hover:text-cbf-gold transition-colors">
                Estimer mon bien à {q.nom}
              </h3>
              <p className="text-sm text-cbf-gray mb-4">
                Méthode CBF Conseils, document écrit sous 48 h, gratuit et sans
                engagement.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                Estimation gratuite <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {articles.length > 0 && (
            <div className="pt-12 border-t border-cbf-gray-soft">
              <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6">
                Conseils vendeur — articles liés
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group block bg-white p-5 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
                  >
                    <h3 className="font-playfair text-base font-bold text-cbf-black mb-2 leading-snug group-hover:text-cbf-gold transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-xs text-cbf-gray-light line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FaqAccordion items={faq} title={`Vendre à ${q.nom} — questions fréquentes`} />
    </>
  );
}
