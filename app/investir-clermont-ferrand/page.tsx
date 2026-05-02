import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, GraduationCap, Briefcase, Home as HomeIcon } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema } from "@/components/common/SchemaOrg";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Investir à Clermont-Ferrand 2026 — Rendements, quartiers & stratégies",
  description:
    "Guide complet investissement immobilier à Clermont-Ferrand : rendements 4 à 6,5 %, quartiers cibles (Cézeaux, Jaude, La Gare), 3 stratégies (étudiant, jeune actif, patrimoine). Marché porté par 39 000 étudiants et le CHU.",
  path: "/investir-clermont-ferrand",
});

const strategies = [
  {
    icon: GraduationCap,
    title: "Stratégie étudiante",
    rendement: "5,5 — 6,5 %",
    quartiers: "Cézeaux, Aubière, Centre-Ville",
    public: "Étudiants UCA, internes CHU, alternants Michelin",
    pour: "Demande locative quasi-permanente, ticket d'entrée bas (80-100 K€)",
    contre: "Rotation annuelle, vacance estivale, dégradations possibles",
  },
  {
    icon: Briefcase,
    title: "Stratégie jeune actif",
    rendement: "4,5 — 5,5 %",
    quartiers: "Centre-Ville, Salins, Saint-Jacques, Chamalières",
    public: "Cadres Michelin, internes médecine, jeunes couples",
    pour: "Locataires solvables, peu de turnover, ambiance qualitative",
    contre: "Ticket d'entrée plus élevé, marge négo faible à l'achat",
  },
  {
    icon: HomeIcon,
    title: "Stratégie famille / patrimoine",
    rendement: "4 — 4,5 %",
    quartiers: "Beaumont, Cébazat, Romagnat, Lempdes",
    public: "Familles, couples avec enfants",
    pour: "Très faible vacance, locataires fidèles 5-10 ans, valorisation lente mais sûre",
    contre: "Ticket élevé (300-500 K€), travaux majeurs périodiques",
  },
];

const faqInvestir = [
  {
    question: "Quel rendement espérer pour un investissement à Clermont-Ferrand ?",
    reponse:
      "Entre 4 % (résidentiel premium Beaumont/Chamalières) et 6,5 % (studio étudiant Cézeaux). Les rendements bruts sont supérieurs à Lyon ou Bordeaux à profil équivalent.",
  },
  {
    question: "Quel quartier choisir pour investir en 2026 ?",
    reponse:
      "Cézeaux pour le rendement, Centre-Ville pour la stabilité, La Gare pour le pari de valorisation post-PEM 2027. Le choix dépend de votre profil investisseur et horizon.",
  },
  {
    question: "Vaut-il mieux acheter en LMNP ou en foncier classique ?",
    reponse:
      "Le LMNP (location meublée non pro) permet d'amortir le bien et neutralise quasiment l'impôt pendant 10-15 ans. Le foncier classique convient mieux si vous avez de gros travaux à passer en déduction. À optimiser avec un comptable spécialisé.",
  },
  {
    question: "Combien de temps avant de revendre avec plus-value ?",
    reponse:
      "Sur Clermont-Ferrand, la valorisation tourne autour de +2 à 3 % par an. Comptez 7-8 ans minimum pour neutraliser frais notaire et coûts de portage avant plus-value nette.",
  },
  {
    question: "Quel impact a le futur Pôle d'Échanges Multimodal (PEM) sur les prix ?",
    reponse:
      "Le PEM prévu en 2027 va connecter la gare SNCF, le tramway et les bus en un hub unique. Le quartier Gare (actuellement 1 800-2 100 €/m²) est le seul secteur clermontois encore sous-valorisé par rapport à son potentiel. Les investisseurs anticipent une revalorisation de 15 à 25 % sur les appartements bien situés autour de la gare d'ici 2028-2030.",
  },
  {
    question: "L'immobilier clermontois est-il plus accessible qu'en 2024 ?",
    reponse:
      "Oui. La légère correction de 2023-2024 (−3 à −5 %) a ramené les prix à des niveaux plus sains. En 2026, le marché se stabilise avec un léger rebond (+2 à 3 % annualisé). C'est une bonne fenêtre d'entrée avant la revalorisation liée au PEM et aux projets urbains du centre-ville.",
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

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-6xl">
          <BreadcrumbNav items={[{ name: "Accueil", href: "/" }, { name: "Investir" }]} />
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Guide investisseur
              </span>
              <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
                Investir à Clermont-Ferrand
                <br />
                <span className="text-cbf-gold">Stratégies & rendements 2026</span>
              </h1>
              <p className="text-lg text-cbf-gray leading-relaxed mb-8">
                Avec 39 000 étudiants (UCA, école de médecine, écoles d'ingénieurs),
                le CHU Estaing — l'un des plus grands de province — et le siège
                mondial de Michelin, Clermont-Ferrand génère une demande locative
                structurelle rarement perturbée. Les prix d'entrée restent
                25 à 40 % inférieurs à Lyon pour des rendements équivalents.
              </p>
              <Link href="/estimation">
                <Button variant="primary" size="lg">
                  Étudier mon projet d'investissement
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1493339424841-c97be3525f8f?w=1200&q=80&auto=format&fit=crop"
                  alt="Puy de Dôme — Auvergne, vue depuis Clermont-Ferrand"
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

      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-6xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              3 stratégies, 3 profils
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Quelle stratégie pour quel investisseur ?
            </h2>
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
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-cbf-success/10 border border-cbf-success/30 rounded-sm">
                    <TrendingUp className="h-3.5 w-3.5 text-cbf-success" />
                    <span className="text-xs text-cbf-success font-bold">
                      {s.rendement} brut
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

      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-4xl">
          <div className="bg-white border border-cbf-gray-soft p-8 md:p-12 rounded-sm">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Étude personnalisée
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-4">
              Faisons étudier votre projet
            </h2>
            <p className="text-cbf-gray mb-4">
              Un de nos experts{" "}
              <a
                href="https://www.cbfconseils.com"
                target="_blank"
                rel="noopener"
                className="text-cbf-gold font-semibold hover:underline"
              >
                CBF Conseils
              </a>{" "}
              étudie votre projet d'investissement gratuitement : objectif, budget,
              fiscalité, quartiers cibles. Réponse sous 48h.
            </p>
            <FormEstimationCourt sourcePage="/investir-clermont-ferrand" />
          </div>
        </div>
      </section>

      <FaqAccordion items={faqInvestir} title="Vos questions sur l'investissement" />
      <FinalCta />
    </>
  );
}
