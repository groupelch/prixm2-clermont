import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalculateurFraisNotaire } from "@/components/CalculateurFraisNotaire";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  BreadcrumbSchema,
  FaqPageSchema,
} from "@/components/common/SchemaOrg";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Calculateur frais de notaire 2026 — Achat immobilier Clermont-Ferrand",
  description:
    "Calculez en 1 minute vos frais de notaire 2026 : ancien (~7,5%) ou neuf/VEFA (~2,5%), avec ou sans prêt. Détail des postes, total d'acquisition, conseils CBF Conseils.",
  path: "/calculateur-frais-notaire",
});

const FAQ = [
  {
    question: "Combien coûtent les frais de notaire en 2026 ?",
    reponse:
      "Pour un bien ancien, les frais de notaire représentent environ 7 à 8% du prix d'achat. Pour un bien neuf ou en VEFA, ils tombent à 2 à 3% car les droits de mutation sont réduits. Sur un appartement ancien à 250 000 € à Clermont-Ferrand, comptez environ 18 750 € de frais.",
  },
  {
    question: "Que comprennent les frais de notaire ?",
    reponse:
      "Les frais de notaire regroupent trois postes : les droits de mutation (impôts versés à l'État et aux collectivités, ≈ 5,80% sur l'ancien), les émoluments du notaire (rémunération réglementée, ≈ 1,5%) et les débours et frais divers (≈ 0,2%). Contrairement à une idée reçue, le notaire n'encaisse qu'environ 15% du total.",
  },
  {
    question: "Peut-on négocier les frais de notaire ?",
    reponse:
      "Depuis 2016, les notaires peuvent accorder une remise sur leurs émoluments pour les transactions supérieures à 100 000 €, dans la limite de 20%. Les droits de mutation, qui représentent l'essentiel des frais, ne sont pas négociables. Demandez systématiquement la remise possible.",
  },
  {
    question: "Qui paie les frais de notaire à l'achat ?",
    reponse:
      "C'est l'acquéreur qui supporte les frais de notaire dans le cadre d'une vente classique. Ils sont versés au notaire le jour de la signature de l'acte authentique, en plus du prix du bien. Le notaire les reverse ensuite à l'État, aux collectivités et conserve sa propre rémunération.",
  },
  {
    question: "Les frais de notaire sont-ils inclus dans le prêt immobilier ?",
    reponse:
      "En principe, les banques financent le prix du bien hors frais de notaire. Vous devez donc disposer d'un apport personnel pour couvrir ces frais. Toutefois, certaines banques acceptent de financer 110% du projet (prix + frais) si votre dossier est solide, généralement avec un taux légèrement majoré.",
  },
];

export default function CalculateurPage() {
  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    {
      name: "Calculateur frais de notaire",
      url: `${SITE_URL}/calculateur-frais-notaire`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <FaqPageSchema items={FAQ} />

      <div className="container pt-6">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Calculateur frais de notaire" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Outil gratuit
          </span>
          <h1 className="font-playfair text-display-lg md:text-display-xl text-cbf-black font-bold mt-3 mb-5 leading-tight">
            Calculateur de frais de notaire
            <span className="block text-cbf-gold">
              Achat immobilier Clermont-Ferrand 2026
            </span>
          </h1>
          <p className="text-lg text-cbf-gray leading-relaxed">
            Estimez en moins d&apos;une minute le montant des frais de notaire
            sur votre acquisition. Détail des postes, total d&apos;acquisition,
            barèmes 2026 — données pédagogiques validées par les notaires de
            l&apos;agglomération clermontoise.
          </p>
        </div>
      </section>

      {/* Calculateur */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <CalculateurFraisNotaire />
        </div>
      </section>

      {/* Pédagogie */}
      <section className="py-14 md:py-20 bg-cbf-ivory">
        <div className="container max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Comprendre
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-6">
            Pourquoi des frais de notaire ?
          </h2>

          <div className="prose prose-cbf max-w-none space-y-4 text-cbf-gray leading-relaxed">
            <p>
              Le terme « frais de notaire » est trompeur : sur 100 € de frais,
              le notaire n&apos;encaisse qu&apos;une quinzaine d&apos;euros.
              L&apos;essentiel (≈ 80%) part en droits de mutation, c&apos;est-à-dire
              des impôts versés à l&apos;État, au département et à la commune.
            </p>
            <h3 className="font-playfair text-xl font-bold text-cbf-black mt-6 mb-2">
              Les trois postes
            </h3>
            <ul className="space-y-2">
              <li>
                <strong className="text-cbf-black">
                  Droits de mutation (≈ 5,80% ancien, 0,7% neuf) :
                </strong>{" "}
                taxes encaissées par les administrations.
              </li>
              <li>
                <strong className="text-cbf-black">
                  Émoluments du notaire (≈ 1,5%) :
                </strong>{" "}
                rémunération du notaire fixée par décret, dégressive selon le
                prix.
              </li>
              <li>
                <strong className="text-cbf-black">
                  Débours & frais divers (≈ 0,2%) :
                </strong>{" "}
                cadastre, hypothèque, copies authentiques, frais postaux.
              </li>
            </ul>

            <h3 className="font-playfair text-xl font-bold text-cbf-black mt-6 mb-2">
              Neuf vs ancien : pourquoi un tel écart ?
            </h3>
            <p>
              Un bien neuf (achevé depuis moins de 5 ans, vendu pour la première
              fois) est soumis à la TVA, pas aux droits de mutation classiques.
              Résultat : 2 à 3% au lieu de 7 à 8%. Sur un appartement neuf à
              250 000 €, l&apos;économie atteint 12 000 €.
            </p>

            <h3 className="font-playfair text-xl font-bold text-cbf-black mt-6 mb-2">
              Et le prêt immobilier ?
            </h3>
            <p>
              Si vous empruntez, prévoyez 1 à 2% supplémentaires sur le montant
              emprunté pour les frais bancaires (garantie hypothécaire ou
              caution, frais de dossier, assurance emprunteur). Le calculateur
              ci-dessus intègre une estimation à 1,2%.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordion items={FAQ} title="Questions sur les frais de notaire" />

      {/* CTA */}
      <section className="py-14 md:py-20 bg-cbf-black text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-playfair text-display-md font-bold mb-4">
            Vous vendez un bien à Clermont-Ferrand&nbsp;?
          </h2>
          <p className="text-cbf-gray-light mb-8">
            Estimation gratuite et précise sous 48h par un expert CBF Conseils.
            Méthode comparative + données DVF officielles.
          </p>
          <Link
            href="/estimation"
            className="inline-flex items-center gap-2 bg-cbf-gold text-cbf-black px-6 py-3.5 text-sm font-semibold rounded-sm hover:bg-cbf-gold-light transition-colors"
          >
            Estimer mon bien gratuitement
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
