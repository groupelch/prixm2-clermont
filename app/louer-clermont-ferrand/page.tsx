import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Shield,
  Users,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { SimulateurLoyer } from "@/components/location/SimulateurLoyer";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { BreadcrumbSchema, FaqPageSchema } from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Combien louer son appartement à Clermont-Ferrand ? Simulateur 2026",
  description:
    "Estimez le loyer de votre bien à Clermont-Ferrand en moins de 2 minutes. Données marché 2026 par quartier, meublé vs nu, DPE, rendement brut. Rapport gratuit par un expert.",
  path: "/louer-clermont-ferrand",
});

const FAQ_LOYER = [
  {
    question: "Quel est le loyer moyen à Clermont-Ferrand en 2026 ?",
    reponse:
      "Le loyer moyen à Clermont-Ferrand se situe entre 9 et 14 €/m² selon le secteur. Le centre-ville (Jaude, Délille) affiche 13-15 €/m², les quartiers intermédiaires (Saint-Jacques, Montferrand) entre 10 et 12 €/m², et les secteurs périphériques entre 8 et 10 €/m².",
  },
  {
    question: "Meublé ou vide : quel est l'écart de loyer à Clermont-Ferrand ?",
    reponse:
      "Un logement meublé se loue en moyenne 10 à 15% plus cher qu'un logement vide à Clermont-Ferrand. L'avantage fiscal du régime LMNP (amortissement, charges déductibles) en fait souvent une option plus rentable nette d'impôts pour les petites surfaces.",
  },
  {
    question: "Combien coûte un gestionnaire locatif à Clermont-Ferrand ?",
    reponse:
      "Les honoraires de gestion locative représentent généralement 6 à 8 % du loyer charges comprises. Pour un loyer de 700 €/mois, comptez environ 42 à 56 €/mois TTC. En échange, vous déléguez totalement la recherche de locataire, la rédaction du bail, la collecte du loyer et le suivi des travaux.",
  },
  {
    question: "L'encadrement des loyers s'applique-t-il à Clermont-Ferrand ?",
    reponse:
      "Non. Clermont-Ferrand n'est pas soumise à l'encadrement des loyers, contrairement à Paris, Lyon ou Bordeaux. Vous êtes donc libre de fixer votre loyer selon le marché. Cependant, un loyer surestimé allongera la durée de vacance et incitera le locataire à partir plus vite.",
  },
  {
    question: "Quelle assurance pour mon bien locatif à Clermont-Ferrand ?",
    reponse:
      "En tant que bailleur, l'assurance PNO (Propriétaire Non Occupant) est fortement recommandée. Elle couvre les dommages non pris en charge par l'assurance du locataire (dégât des eaux, incendie, responsabilité civile). Son coût moyen est de 80 à 200€/an selon la surface et les garanties.",
  },
  {
    question: "Comment éviter les impayés de loyer à Clermont-Ferrand ?",
    reponse:
      "La sélection rigoureuse du locataire reste la meilleure protection : vérifier les justificatifs de revenus (3 mois de bulletins, avis d'imposition), exiger un garant ou une garantie Visale, et utiliser un bail conforme à la loi Alur. La GLI (Garantie Loyers Impayés) peut compléter ce dispositif pour les propriétaires qui souhaitent une couverture totale.",
  },
];

export default function LouerClermontFerrandPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: SITE_URL },
    {
      name: "Louer son bien",
      url: `${SITE_URL}/louer-clermont-ferrand`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FaqPageSchema items={FAQ_LOYER} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cbf-ivory">
        <div className="container">
          <BreadcrumbNav
            items={[
              { name: "Accueil", href: "/" },
              { name: "Louer son bien à Clermont-Ferrand" },
            ]}
          />
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Bailleurs · Location & Gestion
              </span>
              <h1 className="font-playfair text-display-lg text-cbf-black font-bold mt-2 mb-4 leading-tight">
                Combien louer votre bien à Clermont-Ferrand ?
              </h1>
              <p className="text-lg text-cbf-gray max-w-2xl">
                Estimez le loyer de votre appartement ou maison en 2 minutes.
                Données de marché 2026 par quartier, meublé vs vide, impact DPE
                et rendement brut calculé automatiquement.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1650056221902-3972989f2d19?w=1200&q=80&auto=format&fit=crop"
                  alt="Rue de Clermont-Ferrand — quartier résidentiel"
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

      {/* Simulateur */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-start max-w-6xl mx-auto">
            {/* Left: pitch */}
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Simulateur
              </span>
              <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-5">
                Votre loyer estimé en 3 étapes
              </h2>
              <p className="text-cbf-gray mb-8">
                Notre simulateur analyse votre bien (type, surface, quartier,
                état, DPE, meublé/nu) et calcule une fourchette de loyer basée
                sur les transactions réelles du marché clermontois.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <TrendingUp className="h-5 w-5 text-cbf-gold" />,
                    titre: "Données marché réelles",
                    texte:
                      "Loyers de référence issus des annonces actives et des baux signés sur Clermont-Ferrand.",
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-cbf-gold" />,
                    titre: "Impact DPE pris en compte",
                    texte:
                      "Un DPE A-B justifie un loyer +6%. Un logement G perd 10% et sera interdit à la location en 2028.",
                  },
                  {
                    icon: <ClipboardList className="h-5 w-5 text-cbf-gold" />,
                    titre: "Rapport locatif gratuit",
                    texte:
                      "Un expert CBF Conseils vérifie votre estimation et vous envoie les comparables réels sous 48h.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-cbf-ivory border border-cbf-gold/30 rounded-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-cbf-black text-sm mb-0.5">
                        {item.titre}
                      </p>
                      <p className="text-sm text-cbf-gray">{item.texte}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: simulateur */}
            <div>
              <SimulateurLoyer />
            </div>
          </div>
        </div>
      </section>

      {/* Loyers par secteur */}
      <section className="py-16 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Référentiel 2026
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-8">
            Loyers par secteur à Clermont-Ferrand
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cbf-gray-soft">
                  <th className="text-left pb-3 text-cbf-black font-bold">Secteur</th>
                  <th className="text-right pb-3 text-cbf-black font-bold">Loyer vide (€/m²)</th>
                  <th className="text-right pb-3 text-cbf-black font-bold">Loyer meublé (€/m²)</th>
                  <th className="text-right pb-3 text-cbf-black font-bold">Rendement brut moyen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cbf-gray-soft">
                {[
                  { secteur: "Jaude / Hyper-centre", vide: "13-15", meuble: "15-17", rdt: "5.3%" },
                  { secteur: "Délille / Plateau Central", vide: "12-14", meuble: "14-16", rdt: "5.4%" },
                  { secteur: "Montjuzet / Côtes de Clermont", vide: "12-13", meuble: "13-15", rdt: "5.2%" },
                  { secteur: "Saint-Jacques / CHU", vide: "10-12", meuble: "12-13", rdt: "5.5%" },
                  { secteur: "République / Gare", vide: "11-13", meuble: "12-14", rdt: "5.6%" },
                  { secteur: "Montferrand (centre hist.)", vide: "9-11", meuble: "10-12", rdt: "5.7%" },
                  { secteur: "Les Vergnes / La Plaine", vide: "8-10", meuble: "9-11", rdt: "5.8%" },
                  { secteur: "Beaumont / Cournon d'Auvergne", vide: "10-12", meuble: "12-13", rdt: "5.4%" },
                  { secteur: "Chamalières", vide: "11-13", meuble: "13-14", rdt: "5.2%" },
                  { secteur: "Riom / Vichy (agglo nord)", vide: "8-10", meuble: "9-11", rdt: "6.0%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white transition-colors">
                    <td className="py-3 font-medium text-cbf-black">{row.secteur}</td>
                    <td className="py-3 text-right text-cbf-gray">{row.vide}</td>
                    <td className="py-3 text-right text-cbf-gold font-semibold">{row.meuble}</td>
                    <td className="py-3 text-right text-cbf-black">{row.rdt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-cbf-gray-light mt-4">
            * Données indicatives basées sur les annonces actives et baux signés
            en 2026. Source : observatoire interne CBF Conseils.
          </p>
        </div>
      </section>

      {/* Gestion locative */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Délégation totale
              </span>
              <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-5">
                Gestion locative professionnelle : pourquoi déléguer ?
              </h2>
              <p className="text-cbf-gray mb-6">
                Gérer seul un bien locatif représente en moyenne 30 à 40 heures
                par an. État des lieux, relances, réparations, déclarations
                fiscales… Déléguer à un professionnel, c'est sécuriser ses
                revenus sans les contraintes.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Recherche et sélection rigoureuse du locataire",
                  "Rédaction du bail conforme loi Alur",
                  "États des lieux d'entrée et de sortie",
                  "Encaissement des loyers et quittances",
                  "Suivi des travaux et interventions",
                  "Régularisation des charges annuelles",
                  "Reporting mensuel bailleur",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-cbf-gold flex-shrink-0" />
                    <span className="text-sm text-cbf-gray">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cbf-black text-white text-sm font-semibold hover:bg-cbf-gold hover:text-cbf-black transition-all rounded-sm"
              >
                Demander un devis gestion locative
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-cbf-ivory border border-cbf-gray-soft rounded-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-5 w-5 text-cbf-gold" />
                  <span className="font-bold text-cbf-black text-sm">
                    Honoraires CBF Conseils
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cbf-gray">Mise en location seule</span>
                    <span className="font-semibold text-cbf-black">1 mois de loyer TTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cbf-gray">Gestion complète</span>
                    <span className="font-semibold text-cbf-black">7 % du loyer CC/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cbf-gray">Gestion + GLI</span>
                    <span className="font-semibold text-cbf-gold">Sur devis</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-cbf-black text-white rounded-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-cbf-gold" />
                  <span className="font-bold text-sm">Assurance PNO bailleur</span>
                </div>
                <p className="text-sm text-cbf-gray-light mb-4">
                  L'assurance Propriétaire Non Occupant protège votre
                  investissement même quand votre locataire n'est pas assuré.
                  Dégâts des eaux, incendie, responsabilité civile…
                </p>
                <a
                  href="https://mon-assureur.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cbf-gold text-sm font-semibold hover:underline"
                >
                  Devis PNO en ligne (MonAssureur.com)
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              <div className="p-6 border border-amber-200 bg-amber-50 rounded-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-800 text-sm mb-1">
                      DPE G : interdiction de louer dès 2028
                    </p>
                    <p className="text-xs text-amber-700">
                      Si votre bien est classé G, il ne pourra plus être loué
                      au 1er janvier 2028. Anticipez dès maintenant en
                      consultant nos experts pour planifier les travaux et
                      conserver votre rendement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide rapide bailleurs */}
      <section className="py-16 bg-cbf-ivory">
        <div className="container max-w-5xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Guides bailleurs
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-8">
            Tout savoir sur la location à Clermont-Ferrand
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                href: "/blog/combien-louer-appartement-clermont-ferrand-quartier",
                titre: "Combien louer son appartement par quartier ?",
                desc: "Loyers médians 2026 par quartier, studio, T2, T3, maison.",
              },
              {
                href: "/blog/gestion-locative-clermont-soi-meme-professionnel",
                titre: "Gestion locative : seul ou délégué ?",
                desc: "Comparatif coûts, gain de temps, sécurité juridique 2026.",
              },
              {
                href: "/blog/assurances-bailleur-gli-pno-clermont",
                titre: "GLI, PNO : quelles assurances bailleur ?",
                desc: "Les 3 assurances clés à Clermont-Ferrand et leurs prix.",
              },
              {
                href: "/blog/rendement-locatif-quartier-clermont-classement-2025",
                titre: "Rendement locatif par quartier 2026",
                desc: "Le top 10 des quartiers les plus rentables à Clermont.",
              },
              {
                href: "/blog/bail-mobilite-meuble-nu-quel-type-location-clermont",
                titre: "Bail mobilité, meublé, nu : quel choix ?",
                desc: "Durée, fiscalité, profil locataire : le guide bailleur 2026.",
              },
              {
                href: "/blog/encadrement-loyers-clermont-ferrand-2025",
                titre: "Encadrement des loyers à Clermont",
                desc: "IRL, plafonds, zones tendues. Le point réglementaire 2026.",
              },
            ].map((guide, i) => (
              <Link
                key={i}
                href={guide.href}
                className="group block bg-white p-6 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
              >
                <h3 className="font-playfair text-lg font-bold text-cbf-black mb-2 group-hover:text-cbf-gold transition-colors">
                  {guide.titre}
                </h3>
                <p className="text-sm text-cbf-gray mb-4">{guide.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                  Lire le guide <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion items={FAQ_LOYER} title="Questions fréquentes sur la location à Clermont-Ferrand" />

      {/* Final CTA */}
      <section className="py-16 bg-cbf-black text-white">
        <div className="container max-w-3xl text-center">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Expert locatif Clermont-Ferrand
          </span>
          <h2 className="font-playfair text-display-md text-white font-bold mt-3 mb-5">
            Prêt à louer votre bien sereinement ?
          </h2>
          <p className="text-cbf-gray-light mb-8 max-w-xl mx-auto">
            Nos experts CBF Conseils gèrent votre bien de A à Z : annonce,
            sélection locataire, bail, loyers, travaux. Vous percevez vos
            revenus locatifs sans les contraintes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cbf-gold text-cbf-black font-bold text-sm hover:bg-white transition-all rounded-sm"
            >
              Confier mon bien à un expert
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/estimation"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white text-white font-semibold text-sm hover:border-cbf-gold hover:text-cbf-gold transition-all rounded-sm"
            >
              Estimer la valeur vénale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
