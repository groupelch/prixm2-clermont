import { MapPinned, TrendingUp, Building2 } from "lucide-react";
import type { IrisProfil, IrisStats } from "@/lib/iris";

interface IrisBlockProps {
  stats: IrisStats;
  quartierNom?: string;
}

const PROFIL_LABEL: Record<IrisProfil, string> = {
  populaire: "Populaire",
  intermédiaire: "Intermédiaire",
  aisé: "Aisé",
  premium: "Premium",
};

const PROFIL_BADGE: Record<IrisProfil, string> = {
  populaire: "bg-cbf-gray-soft text-cbf-gray border-cbf-gray-soft",
  intermédiaire: "bg-cbf-navy/10 text-cbf-navy border-cbf-navy/20",
  aisé: "bg-cbf-gold/15 text-cbf-gold-dark border-cbf-gold/30",
  premium: "bg-cbf-black text-cbf-gold border-cbf-black",
};

const PROFIL_DESC: Record<IrisProfil, string> = {
  populaire: "Secteur accessible, forte demande locative.",
  intermédiaire: "Secteur équilibré, bonne liquidité du marché.",
  aisé: "Secteur résidentiel recherché, délais courts.",
  premium: "Secteur très prisé, rareté des biens disponibles.",
};

function formatPrix(prix: number): string {
  if (!prix) return "—";
  return prix.toLocaleString("fr-FR") + " €/m²";
}

export function IrisBlock({ stats, quartierNom }: IrisBlockProps) {
  if (!stats.zones.length && !stats.prix_m2_median_iris) return null;

  const zonesAffichees = stats.zones.slice(0, 3);
  const profil = stats.profil;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Sociologie du marché
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            Profil du secteur
          </h2>
          <p className="text-cbf-gray">
            Segmentation établie à partir des transactions DVF récentes et du
            découpage statistique INSEE&nbsp;IRIS
            {quartierNom ? ` autour de ${quartierNom}` : ""}.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 mb-6">
          {/* Profil */}
          <div className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6">
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-3">
              Profil
            </p>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-sm border text-sm font-bold uppercase tracking-wider ${PROFIL_BADGE[profil]}`}
            >
              {PROFIL_LABEL[profil]}
            </span>
            <p className="text-sm text-cbf-gray mt-4 leading-relaxed">
              {PROFIL_DESC[profil]}
            </p>
          </div>

          {/* Prix médian */}
          <div className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white text-cbf-gold">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                Prix médian (DVF)
              </p>
            </div>
            <p className="font-playfair text-3xl font-bold text-cbf-black leading-none">
              {formatPrix(stats.prix_m2_median_iris)}
            </p>
            <p className="text-xs text-cbf-gray-light mt-2">
              Médiane des transactions dans un rayon ~{stats.rayon_km.toFixed(1)} km
            </p>
          </div>

          {/* Ventes récentes */}
          <div className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white text-cbf-gold">
                <Building2 className="h-5 w-5" />
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                Ventes récentes
              </p>
            </div>
            <p className="font-playfair text-3xl font-bold text-cbf-black leading-none">
              {stats.nb_ventes_recentes.toLocaleString("fr-FR")}
            </p>
            <p className="text-xs text-cbf-gray-light mt-2">
              Transactions enregistrées 2023-2024
            </p>
          </div>
        </div>

        {/* Zones IRIS */}
        {zonesAffichees.length > 0 && (
          <div className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white text-cbf-gold">
                <MapPinned className="h-5 w-5" />
              </div>
              <h3 className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
                Zones statistiques INSEE
              </h3>
            </div>
            <ul className="grid gap-2 sm:grid-cols-3">
              {zonesAffichees.map((z) => (
                <li
                  key={z.code}
                  className="bg-white border border-cbf-gray-soft rounded-sm px-4 py-3"
                >
                  <span className="block font-medium text-cbf-black text-sm">
                    {z.nom}
                  </span>
                  {z.type && (
                    <span className="block text-xs text-cbf-gray-light capitalize mt-0.5">
                      {z.type}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
          Source&nbsp;: INSEE IRIS + DVF (Demandes de Valeurs Foncières) — mise à jour
          {" "}
          {stats.meta.updated}
        </p>
      </div>
    </section>
  );
}
