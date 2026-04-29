import { School, Trees, Bus } from "lucide-react";
import type { QuartierFact } from "@/lib/quartier-facts";

interface Props {
  facts: QuartierFact;
  quartierNom: string;
}

export function VieLocaleBlock({ facts, quartierNom }: Props) {
  const hasData = facts.ecoles_proches.length > 0 || facts.parcs_proches.length > 0;
  if (!hasData) return null;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container max-w-5xl">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
          Vie locale
        </span>
        <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
          Équipements à {quartierNom}
        </h2>
        <p className="text-cbf-gray mb-8 max-w-2xl">
          Données officielles CLF Open Data — distances calculées depuis le centre du quartier.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Écoles */}
          {facts.ecoles_proches.length > 0 && (
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
                  <School className="h-4 w-4" />
                </div>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                  Écoles à proximité
                </p>
              </div>
              <ul className="space-y-3">
                {facts.ecoles_proches.map((e, i) => (
                  <li key={i} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-cbf-black leading-tight">{e.nom}</p>
                      <p className="text-[0.7rem] text-cbf-gray-light">{e.type.toLowerCase()}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs font-bold text-cbf-gold bg-cbf-ivory px-2 py-1 rounded-sm">
                      {e.distanceM < 1000
                        ? `${e.distanceM} m`
                        : `${(e.distanceM / 1000).toFixed(1)} km`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Parcs */}
          {facts.parcs_proches.length > 0 && (
            <div className="border border-cbf-gray-soft rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
                  <Trees className="h-4 w-4" />
                </div>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                  Espaces verts
                </p>
              </div>
              <ul className="space-y-3">
                {facts.parcs_proches.map((p, i) => (
                  <li key={i} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-cbf-black leading-tight">{p.nom}</p>
                      {p.surface && (
                        <p className="text-[0.7rem] text-cbf-gray-light">{p.surface}</p>
                      )}
                    </div>
                    <span className="flex-shrink-0 text-xs font-bold text-cbf-gold bg-cbf-ivory px-2 py-1 rounded-sm">
                      {p.distanceM < 1000
                        ? `${p.distanceM} m`
                        : `${(p.distanceM / 1000).toFixed(1)} km`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Transport */}
          <div className="border border-cbf-gray-soft rounded-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
                <Bus className="h-4 w-4" />
              </div>
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                Transports T2C
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light mb-1">
                  Score accessibilité
                </p>
                <p className="font-playfair text-3xl font-bold text-cbf-gold">
                  {facts.score_transport}
                  <span className="text-sm text-cbf-gray-light font-normal">/100</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cbf-gray-soft">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">
                    Tramway
                  </p>
                  <p className="text-lg font-bold text-cbf-black">
                    {facts.nb_arrets_tram} arrêt{facts.nb_arrets_tram > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light">Bus</p>
                  <p className="text-lg font-bold text-cbf-black">
                    {facts.nb_arrets_bus} arrêt{facts.nb_arrets_bus > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {facts.creches_proches.length > 0 && (
                <div className="pt-3 border-t border-cbf-gray-soft">
                  <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gray-light mb-2">
                    Crèches
                  </p>
                  {facts.creches_proches.map((c, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-cbf-gray truncate">{c.nom}</span>
                      <span className="text-cbf-gold font-semibold ml-2 flex-shrink-0">
                        {c.distanceM < 1000
                          ? `${c.distanceM}m`
                          : `${(c.distanceM / 1000).toFixed(1)}km`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
          Sources :{" "}
          <a
            href="https://opendata.clermontmetropole.eu"
            target="_blank"
            rel="noopener"
            className="underline hover:text-cbf-gold"
          >
            CLF Métropole Open Data
          </a>{" "}
          · Réseau T2C · Distances calculées depuis le centre de {quartierNom}
        </p>
      </div>
    </section>
  );
}
