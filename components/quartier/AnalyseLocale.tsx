import { Check, X, MapPin } from "lucide-react";
import type { Quartier } from "@/data/quartiers";

export function AnalyseLocale({ quartier }: { quartier: Quartier }) {
  return (
    <section className="py-14 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Le quartier décrypté
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-6">
              Analyse de {quartier.nom}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-cbf-gray leading-relaxed">{quartier.description}</p>
            </div>

            {quartier.ruesRecherchees.length > 0 && (
              <div className="mt-8 p-5 bg-white border border-cbf-gray-soft rounded-sm">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-3 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Rues les plus recherchées
                </p>
                <div className="flex flex-wrap gap-2">
                  {quartier.ruesRecherchees.map((rue) => (
                    <span
                      key={rue}
                      className="inline-flex px-3 py-1.5 bg-cbf-ivory text-sm text-cbf-black border border-cbf-gray-soft rounded-sm"
                    >
                      {rue}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-cbf-black text-white text-sm rounded-sm">
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                Profil acheteur
              </span>
              <span className="font-semibold">{quartier.profilAcheteur}</span>
            </div>
          </div>

          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="bg-white border border-cbf-success/30 rounded-sm p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-success font-bold mb-3">
                Points forts
              </p>
              <ul className="space-y-2.5">
                {quartier.pointsForts.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cbf-gray">
                    <Check className="h-4 w-4 text-cbf-success flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-cbf-warning/30 rounded-sm p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-warning font-bold mb-3">
                Points de vigilance
              </p>
              <ul className="space-y-2.5">
                {quartier.pointsFaibles.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cbf-gray">
                    <X className="h-4 w-4 text-cbf-warning flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
