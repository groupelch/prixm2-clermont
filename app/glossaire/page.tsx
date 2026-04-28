import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  BreadcrumbSchema,
  FaqPageSchema,
} from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Glossaire immobilier — 25 termes clés expliqués — Clermont-Ferrand",
  description:
    "Glossaire immobilier 2026 : DVF, DPE, LMNP, SCI, PTZ, frais de notaire, compromis, copropriété… 25 définitions claires pour comprendre l'immobilier à Clermont-Ferrand.",
  path: "/glossaire",
});

interface Term {
  slug: string;
  terme: string;
  definition: string;
  /** Liens internes pertinents : { label, href } */
  liens?: { label: string; href: string }[];
}

const TERMS: Term[] = [
  {
    slug: "dvf",
    terme: "DVF (Demandes de Valeurs Foncières)",
    definition:
      "Base de données publique de la DGFiP qui recense toutes les transactions immobilières réalisées en France depuis 2014. Mise à jour deux fois par an, elle indique pour chaque vente le prix, la surface, la nature du bien et la localisation. C'est la source la plus fiable pour estimer un bien : elle reflète les prix réellement payés, pas les prix affichés. À Clermont-Ferrand, près de 10 000 transactions sont disponibles sur 2021-2024.",
    liens: [
      { label: "Voir les transactions par quartier", href: "/prix-immobilier-clermont-ferrand" },
    ],
  },
  {
    slug: "dpe",
    terme: "DPE (Diagnostic de Performance Énergétique)",
    definition:
      "Document obligatoire à fournir lors d'une vente ou location, qui classe le bien de A (très économe) à G (très énergivore). Depuis 2023, les biens classés G sont progressivement interdits à la location, et la décote sur les biens E/F/G atteint 8 à 15% en 2026. Le DPE est valable 10 ans et doit être réalisé par un diagnostiqueur certifié.",
    liens: [
      { label: "Diagnostiqueurs DPE Clermont-Ferrand", href: "/meilleurs-diagnostiqueurs-dpe-clermont-ferrand" },
    ],
  },
  {
    slug: "lmnp",
    terme: "LMNP (Loueur en Meublé Non Professionnel)",
    definition:
      "Statut fiscal pour louer un bien meublé sans en faire son activité principale. Permet l'amortissement comptable du bien et du mobilier, ce qui réduit fortement la fiscalité sur les loyers. Plafond : recettes inférieures à 23 000 € ou moins de 50% des revenus du foyer. Le LMNP reste un des dispositifs les plus efficaces pour l'investissement locatif en 2026.",
    liens: [
      { label: "Investir à Clermont-Ferrand", href: "/investir-clermont-ferrand" },
    ],
  },
  {
    slug: "sci",
    terme: "SCI (Société Civile Immobilière)",
    definition:
      "Structure juridique permettant de détenir et gérer un bien immobilier à plusieurs. Très utilisée pour transmettre un patrimoine, faciliter une indivision familiale ou organiser un investissement entre associés. La SCI peut être à l'IR (transparence fiscale) ou à l'IS (impôt sur les sociétés, avec amortissement). Création par acte notarié, capital libre.",
  },
  {
    slug: "ptz",
    terme: "PTZ (Prêt à Taux Zéro)",
    definition:
      "Prêt aidé par l'État, sans intérêts, accordé aux primo-accédants pour financer une partie de leur résidence principale. Le PTZ 2026 est recentré sur les zones tendues et le neuf, avec des plafonds de revenus. À Clermont-Ferrand (zone B2), il finance jusqu'à 20% de l'opération sur du neuf, sous conditions. Cumulable avec un prêt classique.",
  },
  {
    slug: "scpi",
    terme: "SCPI (Société Civile de Placement Immobilier)",
    definition:
      "Placement collectif qui permet d'investir dans l'immobilier sans gestion directe. La SCPI achète des bureaux, commerces ou logements et reverse les loyers aux associés au prorata des parts détenues. Rendement moyen 2025 : 4,5 à 5,5% net. Liquidité plus faible qu'une action mais plus élevée qu'un bien physique.",
  },
  {
    slug: "plus-value-immobiliere",
    terme: "Plus-value immobilière",
    definition:
      "Gain réalisé lors de la vente d'un bien, calculé comme la différence entre le prix de vente et le prix d'achat (corrigé des frais et travaux). Les résidences principales sont exonérées. Sur les autres biens, l'impôt est de 19% + 17,2% de prélèvements sociaux, avec abattements progressifs : exonération totale après 22 ans pour l'impôt et 30 ans pour les prélèvements sociaux.",
  },
  {
    slug: "frais-de-notaire",
    terme: "Frais de notaire",
    definition:
      "Ensemble des frais payés par l'acquéreur lors de la signature : droits de mutation (≈ 5,80% sur l'ancien, 0,7% sur le neuf), émoluments du notaire (≈ 1,5%), débours et frais divers (≈ 0,2%). Au total, comptez 7 à 8% du prix sur l'ancien et 2 à 3% sur le neuf. Le notaire ne conserve qu'environ 15% du total : l'essentiel part en taxes.",
    liens: [
      { label: "Calculer mes frais de notaire", href: "/calculateur-frais-notaire" },
    ],
  },
  {
    slug: "compromis-de-vente",
    terme: "Compromis de vente",
    definition:
      "Avant-contrat synallagmatique : vendeur et acheteur s'engagent réciproquement à conclure la vente. Comporte le prix, le bien, les conditions suspensives (prêt, urbanisme, diagnostics) et un séquestre versé par l'acheteur (5 à 10%). Délai de rétractation de 10 jours pour l'acheteur après signature. Acte définitif chez le notaire 2 à 3 mois plus tard.",
  },
  {
    slug: "promesse-unilaterale",
    terme: "Promesse unilatérale de vente",
    definition:
      "Avant-contrat où seul le vendeur s'engage à vendre à un prix fixé pendant un délai défini. L'acheteur (bénéficiaire) verse une indemnité d'immobilisation (5 à 10%), perdue s'il ne lève pas l'option dans les délais. Plus protecteur pour l'acheteur que le compromis : il garde la liberté d'acheter ou non. Doit être enregistrée auprès des impôts dans les 10 jours.",
  },
  {
    slug: "acte-authentique",
    terme: "Acte authentique",
    definition:
      "Acte de vente définitif signé chez le notaire. C'est lui qui transfère officiellement la propriété à l'acquéreur. Le notaire en assure la sécurité juridique : vérification d'urbanisme, purge des privilèges, calcul des taxes, publication au service de la publicité foncière. Délai de signature : 2 à 3 mois après le compromis, le temps d'obtenir le prêt et les pièces.",
  },
  {
    slug: "copropriete",
    terme: "Copropriété",
    definition:
      "Régime juridique applicable à un immeuble divisé en lots appartenant à plusieurs propriétaires. Chaque lot comprend une partie privative (l'appartement) et une quote-part des parties communes (escaliers, toiture, façade). Régie par la loi du 10 juillet 1965, organisée autour d'un syndic et d'une assemblée générale annuelle. Plus de 90% des appartements à Clermont-Ferrand sont en copropriété.",
  },
  {
    slug: "charges-de-copropriete",
    terme: "Charges de copropriété",
    definition:
      "Dépenses liées à l'entretien et au fonctionnement de l'immeuble, réparties entre copropriétaires selon les tantièmes. On distingue les charges courantes (gardien, ascenseur, ménage, énergie) et les charges exceptionnelles (travaux votés en AG). Coût moyen à Clermont-Ferrand en 2026 : 25 à 45 €/m²/an selon les prestations.",
  },
  {
    slug: "reglement-de-copropriete",
    terme: "Règlement de copropriété",
    definition:
      "Document fondateur de la copropriété qui définit les parties privatives et communes, les tantièmes, l'usage des lots et les règles de vie collective. Établi par notaire à la création de l'immeuble, il est opposable à tous les copropriétaires. Toute modification nécessite un vote en AG à la majorité qualifiée. À lire impérativement avant d'acheter.",
  },
  {
    slug: "syndic",
    terme: "Syndic",
    definition:
      "Mandataire chargé d'exécuter les décisions de l'assemblée générale et de gérer la copropriété au quotidien : comptabilité, contrats, travaux, sinistres, suivi des charges. Peut être professionnel (cabinet) ou bénévole (un copropriétaire). Mandat renouvelable tous les 1 à 3 ans en AG. Honoraires moyens 2026 : 200 à 350 € par lot et par an.",
  },
  {
    slug: "diagnostic-immobilier",
    terme: "Diagnostic immobilier",
    definition:
      "Ensemble de documents techniques obligatoires lors d'une vente : DPE, amiante (avant 1997), plomb (avant 1949), termites (zones définies), gaz et électricité (installations >15 ans), ERP (état des risques), assainissement non collectif. Coût total à Clermont-Ferrand : 350 à 600 €. Validité variable selon le diagnostic (de 6 mois à illimité).",
  },
  {
    slug: "loi-carrez",
    terme: "Loi Carrez",
    definition:
      "Loi de 1996 imposant la mention de la surface privative exacte dans toute vente d'un lot en copropriété. Sont exclues les surfaces de moins de 1,80 m de hauteur sous plafond, les balcons, terrasses, caves et garages. Si l'erreur dépasse 5%, l'acquéreur peut demander une réduction proportionnelle du prix dans l'année qui suit l'acte authentique.",
  },
  {
    slug: "surface-habitable",
    terme: "Surface habitable",
    definition:
      "Surface définie par la loi Boutin (différente de la loi Carrez) utilisée pour les locations vides. Exclut les murs, cloisons, marches, gaines, embrasures, ainsi que les surfaces de moins de 1,80 m. Doit obligatoirement figurer dans le bail. Légèrement inférieure à la surface Carrez sur un même bien (≈ 2 à 5% en moins).",
  },
  {
    slug: "taxe-fonciere",
    terme: "Taxe foncière",
    definition:
      "Impôt local annuel dû par tout propriétaire d'un bien bâti au 1er janvier de l'année. Calculée sur la valeur locative cadastrale (revalorisée chaque année) multipliée par les taux votés par les collectivités. À Clermont-Ferrand en 2026, le taux global atteint environ 50%. Pour un appartement T3 standard : 800 à 1 500 €/an.",
  },
  {
    slug: "taxe-habitation",
    terme: "Taxe d'habitation",
    definition:
      "Impôt local progressivement supprimé sur les résidences principales depuis 2023. Reste due sur les résidences secondaires et les logements vacants. À Clermont-Ferrand (commune en zone tendue), une majoration de 60% s'applique sur les résidences secondaires depuis 2024 — point important pour les investisseurs ou propriétaires de pied-à-terre.",
  },
  {
    slug: "credit-immobilier",
    terme: "Crédit immobilier",
    definition:
      "Prêt à long terme (15 à 25 ans) destiné à financer l'achat d'un bien. Encadré par la loi Lagarde et le HCSF : taux d'endettement maximum 35% (assurance comprise), durée maxi 25 ans, apport recommandé 10% minimum. Taux moyens début 2026 à Clermont-Ferrand : 3,2 à 3,8% sur 20 ans selon le profil.",
  },
  {
    slug: "taux-endettement",
    terme: "Taux d'endettement",
    definition:
      "Rapport entre les charges de crédit (mensualités assurance comprise) et les revenus nets du foyer. Plafonné à 35% par le HCSF depuis 2022, sauf dérogation accordée à 20% des dossiers d'une banque. Inclut tous les prêts en cours (immobilier, conso, auto). Calcul indispensable avant tout projet : un taux trop élevé = refus de prêt assuré.",
  },
  {
    slug: "apport-personnel",
    terme: "Apport personnel",
    definition:
      "Somme d'argent que l'acquéreur investit en propre dans son projet, en complément du prêt. Habituellement, 10% du prix au minimum est attendu pour couvrir les frais de notaire et garantie. Plus l'apport est élevé, meilleurs sont les conditions de prêt (taux, durée). À Clermont-Ferrand, l'apport moyen primo-accédant 2026 atteint 25 000 à 45 000 €.",
  },
  {
    slug: "delai-de-vente",
    terme: "Délai de vente",
    definition:
      "Temps écoulé entre la mise en vente et la signature du compromis. Indicateur clé de la santé du marché. À Clermont-Ferrand en 2026, le délai moyen est de 60 jours, contre 45 jours en 2022. Les biens correctement positionnés se vendent en 30-45 jours, les biens surévalués peuvent stagner 4 à 6 mois — d'où l'importance d'une estimation précise dès le départ.",
    liens: [
      { label: "Estimation gratuite sous 48h", href: "/estimation" },
    ],
  },
  {
    slug: "prix-au-m2",
    terme: "Prix au m²",
    definition:
      "Indicateur de référence pour comparer des biens. Calculé en divisant le prix par la surface habitable. À Clermont-Ferrand en 2026, le prix médian appartement ancien atteint 2 280 €/m², avec des écarts importants selon le quartier (1 800 €/m² à La Plaine, 2 600 €/m² à Jaude). Attention : un studio se vend toujours plus cher au m² qu'un T4, à quartier équivalent.",
    liens: [
      { label: "Comparer les prix par quartier", href: "/comparateur-quartiers" },
    ],
  },
];

export default function GlossairePage() {
  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    { name: "Glossaire immobilier", url: `${SITE_URL}/glossaire` },
  ];

  // FAQ schema : "Qu'est-ce que [terme] ?"
  const faqItems = TERMS.map((t) => ({
    question: `Qu'est-ce que ${t.terme.split(" (")[0]} ?`,
    reponse: t.definition,
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <FaqPageSchema items={faqItems} />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Glossaire immobilier" },
          ]}
        />
      </div>

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Lexique
          </span>
          <h1 className="font-playfair text-display-lg md:text-display-xl text-cbf-black font-bold mt-3 mb-5 leading-tight">
            Glossaire immobilier
            <span className="block text-cbf-gold">
              25 termes clés expliqués
            </span>
          </h1>
          <p className="text-lg text-cbf-gray leading-relaxed">
            Tous les termes essentiels pour comprendre une transaction
            immobilière à Clermont-Ferrand : DVF, DPE, LMNP, SCI, frais de
            notaire, copropriété, fiscalité… Définitions claires, à jour 2026.
          </p>
        </div>
      </section>

      {/* Index */}
      <section className="py-10 bg-white border-b border-cbf-gray-soft">
        <div className="container">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-3">
            Accès rapide
          </p>
          <div className="flex flex-wrap gap-2">
            {TERMS.map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="text-xs text-cbf-gray hover:text-cbf-gold transition-colors px-2.5 py-1 border border-cbf-gray-soft rounded-sm hover:border-cbf-gold"
              >
                {t.terme.split(" (")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Termes */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="space-y-10">
            {TERMS.map((t) => (
              <article
                key={t.slug}
                id={t.slug}
                className="scroll-mt-24 pb-8 border-b border-cbf-gray-soft last:border-0"
              >
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cbf-black mb-3">
                  {t.terme}
                </h2>
                <p className="text-cbf-gray leading-relaxed">{t.definition}</p>
                {t.liens && t.liens.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {t.liens.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-sm text-cbf-gold font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        {l.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-cbf-black text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-playfair text-display-md font-bold mb-4">
            Une question sur votre projet&nbsp;?
          </h2>
          <p className="text-cbf-gray-light mb-8">
            Nos experts CBF Conseils vous répondent gratuitement sous 48h.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-cbf-gold text-cbf-black px-6 py-3.5 text-sm font-semibold rounded-sm hover:bg-cbf-gold-light transition-colors"
          >
            Contacter un expert
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
