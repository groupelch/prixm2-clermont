import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articles, ARTICLE_THEMES, getArticleImage } from "@/data/articles";

// Composant serveur — crawlé directement par Google, pas de JS requis
export function RecentArticles() {
  // 6 articles les plus récents, triés par date
  const recent = [...articles]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Analyse marché
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-2">
              Derniers articles du blog
            </h2>
            <p className="text-cbf-gray text-sm">
              Conseils pratiques et décryptages du marché immobilier clermontois par les experts CBF Conseils.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cbf-gold hover:text-cbf-black transition-colors shrink-0"
          >
            Voir tous les articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grille 3 colonnes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((a) => {
            const themeLabel =
              ARTICLE_THEMES.find((t) => t.id === a.theme)?.label ?? a.theme;
            return (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col bg-cbf-ivory border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm overflow-hidden"
              >
                {/* Image thématique */}
                <div
                  className="relative h-36 bg-cbf-black/10 overflow-hidden"
                  style={{
                    backgroundImage: `url(${getArticleImage(a.theme)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-cbf-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-cbf-gold text-cbf-black text-[0.55rem] uppercase tracking-wider font-bold rounded-sm">
                    {themeLabel}
                  </span>
                </div>

                {/* Contenu */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-playfair text-base font-bold text-cbf-black leading-snug group-hover:text-cbf-gold transition-colors mb-2 line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-xs text-cbf-gray leading-relaxed line-clamp-2 flex-1 mb-3">
                    {a.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-cbf-gray-soft">
                    <span className="inline-flex items-center gap-1 text-[0.65rem] text-cbf-gray-light">
                      <Clock className="h-3 w-3" />
                      {a.readTime} min
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                      Lire <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Lien vers le blog complet */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-cbf-gray-soft bg-cbf-ivory hover:border-cbf-gold hover:bg-white text-sm font-semibold text-cbf-black rounded-sm transition-all"
          >
            Voir tous les articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
