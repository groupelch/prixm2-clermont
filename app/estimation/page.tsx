import type { Metadata } from "next";
import { CheckCircle2, Clock, Shield, MapPin } from "lucide-react";
import { SimulateurEstimation } from "@/components/forms/SimulateurEstimation";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema } from "@/components/common/SchemaOrg";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Estimation immobilière gratuite à Clermont-Ferrand",
  description:
    "Estimez gratuitement votre bien immobilier à Clermont-Ferrand. Simulateur en 3 étapes + analyse approfondie par un expert CBF Conseils sous 48h.",
  path: "/estimation",
});

const benefits = [
  { icon: Clock, label: "Réponse sous 48h" },
  { icon: Shield, label: "Sans engagement" },
  { icon: MapPin, label: "Expertise locale" },
  { icon: CheckCircle2, label: "100 % gratuit" },
];

export default function EstimationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Estimation", url: `${SITE_URL}/estimation` },
        ]}
      />

      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-5xl">
          <BreadcrumbNav
            items={[{ name: "Accueil", href: "/" }, { name: "Estimation" }]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Estimation gratuite
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Combien vaut votre bien à Clermont-Ferrand ?
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed">
              Renseignez votre bien en 3 minutes et recevez une estimation
              indicative immédiate, suivie d'une analyse précise par un expert
              CBF Conseils sous 48 heures.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-cbf-gray-soft rounded-sm"
                  >
                    <Icon className="h-4 w-4 text-cbf-gold flex-shrink-0" />
                    <span className="text-xs text-cbf-black font-semibold">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cbf-ivory pb-20">
        <div className="container max-w-5xl">
          <SimulateurEstimation />
        </div>
      </section>
    </>
  );
}
