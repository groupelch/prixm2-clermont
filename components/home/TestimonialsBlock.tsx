import { Star } from "lucide-react";

interface Avis {
  prenom: string;
  initiale: string;
  quartier: string;
  note: number;
  texte: string;
  date: string;
  type: string;
}

const AVIS: Avis[] = [
  {
    prenom: "Jean-Marc",
    initiale: "D.",
    quartier: "Jaude",
    note: 5,
    texte:
      "Estimation précise en 48h, exactement dans la fourchette des offres reçues ensuite. Vendu en 3 semaines.",
    date: "Mars 2026",
    type: "Vendeur",
  },
  {
    prenom: "Sophie",
    initiale: "M.",
    quartier: "Chamalières",
    note: 5,
    texte:
      "Données très complètes sur les prix du quartier. L'outil m'a aidée à fixer le bon prix pour ma maison.",
    date: "Février 2026",
    type: "Vendeuse",
  },
  {
    prenom: "Thomas",
    initiale: "B.",
    quartier: "Beaumont",
    note: 5,
    texte:
      "Référentiel très utile pour comparer les quartiers avant d'investir. CBF Conseils a géré toute la transaction.",
    date: "Janvier 2026",
    type: "Investisseur",
  },
];

function StarRow({ note }: { note: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${note} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < note
              ? "h-4 w-4 fill-cbf-gold text-cbf-gold"
              : "h-4 w-4 text-cbf-gray-soft"
          }
        />
      ))}
    </div>
  );
}

export function TestimonialsBlock() {
  return (
    <section className="py-16 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Témoignages clients
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            Ce que disent nos clients
          </h2>
          <p className="text-cbf-gray">
            Estimations réalisées par CBF Conseils — agence partenaire.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {AVIS.map((avis) => (
            <article
              key={`${avis.prenom}-${avis.quartier}`}
              className="flex flex-col h-full bg-white border border-cbf-gray-soft rounded-sm p-6 md:p-7"
            >
              <header className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-cbf-black text-sm">
                    {avis.prenom} {avis.initiale}
                  </p>
                  <StarRow note={avis.note} />
                </div>
                <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold">
                  Quartier {avis.quartier}
                </p>
              </header>

              <blockquote className="flex-1 text-cbf-gray italic leading-relaxed mb-5">
                « {avis.texte} »
              </blockquote>

              <footer className="pt-4 border-t border-cbf-gray-soft flex items-center justify-between text-[0.65rem] uppercase tracking-wider">
                <span className="text-cbf-gray-light">{avis.date}</span>
                <span className="text-cbf-black font-bold">{avis.type}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
