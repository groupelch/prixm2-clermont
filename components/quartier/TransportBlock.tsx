import { Bus, TrainFront } from "lucide-react";
import type { TransportArretProche, TransportStats } from "@/lib/transport";

interface TransportBlockProps {
  stats: TransportStats;
  quartierNom?: string;
}

interface ColumnProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  items: TransportArretProche[];
}

function Column({ icon, label, count, items }: ColumnProps) {
  const visible = items.slice(0, 4);
  const remaining = Math.max(0, count - visible.length);

  return (
    <div className="bg-white border border-cbf-gray-soft rounded-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cbf-ivory text-cbf-gold">
          {icon}
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gold font-bold">
            {label}
          </p>
          <p className="font-playfair text-xl font-bold text-cbf-black leading-none mt-1">
            {count}
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {visible.map((item, i) => (
          <li
            key={`${item.nom}-${i}`}
            className="text-sm text-cbf-gray leading-snug flex items-baseline justify-between gap-3"
          >
            <span className="font-medium text-cbf-black truncate">{item.nom}</span>
            <span className="text-xs text-cbf-gray-light flex-shrink-0">
              {item.distance_m} m
            </span>
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <p className="mt-4 pt-3 border-t border-cbf-gray-soft text-xs text-cbf-gray-light">
          + {remaining} autre{remaining > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

function scoreColor(score: number): string {
  if (score >= 70) return "bg-cbf-success/10 text-cbf-success";
  if (score >= 40) return "bg-cbf-gold/10 text-cbf-gold";
  return "bg-cbf-gray-soft text-cbf-gray";
}

function scoreLabel(score: number): string {
  if (score >= 70) return "Excellente desserte";
  if (score >= 40) return "Bonne desserte";
  if (score >= 15) return "Desserte correcte";
  return "Desserte limitée";
}

export function TransportBlock({ stats, quartierNom }: TransportBlockProps) {
  const totalBus = stats.arrets_bus.length;
  const totalTram = stats.arrets_tram.length;
  if (totalBus === 0 && totalTram === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Transports en commun
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              {quartierNom ? `Se déplacer à ${quartierNom}` : "Réseau T2C"}
            </h2>
            <p className="text-cbf-gray">
              Arrêts du réseau T2C (bus &amp; tramway) à proximité immédiate (rayon
              ~{stats.rayon_km.toFixed(1)}&nbsp;km), classés par distance à pied.
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-3 px-4 py-3 rounded-sm ${scoreColor(stats.score_accessibilite)}`}
          >
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] font-bold leading-none mb-1">
                Score accessibilité
              </p>
              <p className="text-xs font-medium">{scoreLabel(stats.score_accessibilite)}</p>
            </div>
            <div className="font-playfair text-3xl font-bold leading-none">
              {stats.score_accessibilite}
              <span className="text-sm font-medium opacity-70">/100</span>
            </div>
          </div>
        </div>

        <div className={`grid gap-5 ${totalTram > 0 ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
          {totalTram > 0 && (
            <Column
              icon={<TrainFront className="h-5 w-5" />}
              label="Tramway"
              count={totalTram}
              items={stats.arrets_tram}
            />
          )}
          {totalBus > 0 && (
            <Column
              icon={<Bus className="h-5 w-5" />}
              label="Bus"
              count={totalBus}
              items={stats.arrets_bus}
            />
          )}
        </div>

        <p className="mt-6 text-[0.65rem] uppercase tracking-wider text-cbf-gray-light">
          Source&nbsp;: OpenStreetMap contributors — mise à jour {stats.meta.updated}
        </p>
      </div>
    </section>
  );
}
