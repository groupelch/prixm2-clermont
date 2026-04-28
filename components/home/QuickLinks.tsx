import Link from "next/link";
import { ArrowRight, BarChart3, Calculator, Key, Map, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickLink = {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const links: QuickLink[] = [
  {
    href: "/estimation",
    title: "Estimer mon bien",
    subtitle: "Valeur réelle sous 48h",
    icon: Calculator,
  },
  {
    href: "/vendre-clermont-ferrand",
    title: "Vendre",
    subtitle: "Méthode CBF Conseils",
    icon: TrendingUp,
  },
  {
    href: "/louer-clermont-ferrand",
    title: "Louer",
    subtitle: "Simulateur & gestion",
    icon: Key,
  },
  {
    href: "/investir-clermont-ferrand",
    title: "Investir",
    subtitle: "Rendements 4,5-6,5 %",
    icon: BarChart3,
  },
  {
    href: "/prix-immobilier-clermont-ferrand",
    title: "Prix par quartier",
    subtitle: "31 quartiers analysés",
    icon: Map,
  },
];

export function QuickLinks() {
  return (
    <section className="py-12 md:py-16 bg-cbf-ivory border-y border-cbf-gray-soft">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Accès rapide
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2">
            Que cherchez-vous aujourd&apos;hui&nbsp;?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {links.map(({ href, title, subtitle, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col bg-white border border-cbf-gray-soft rounded-sm p-5 hover:border-cbf-gold hover:bg-cbf-ivory hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 bg-cbf-black text-cbf-gold rounded-sm mb-4 group-hover:bg-cbf-gold group-hover:text-cbf-white transition-colors duration-200">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <h3 className="font-playfair text-lg text-cbf-black font-bold leading-tight mb-1.5 group-hover:text-cbf-gold transition-colors">
                {title}
              </h3>
              <p className="text-sm text-cbf-gray-light leading-snug mb-4">
                {subtitle}
              </p>

              <ArrowRight
                className="h-4 w-4 text-cbf-gray-light mt-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-cbf-gold transition-all duration-200"
                strokeWidth={2}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
