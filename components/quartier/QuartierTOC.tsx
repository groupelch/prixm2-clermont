const ITEMS = [
  { href: "#prix", label: "Prix & évolution" },
  { href: "#dpe", label: "Énergie" },
  { href: "#transactions", label: "Transactions DVF" },
  { href: "#equipements", label: "Équipements" },
  { href: "#transport", label: "Transport" },
  { href: "#estimation", label: "Estimer" },
];

export function QuartierTOC() {
  return (
    <nav
      aria-label="Sommaire de la fiche quartier"
      className="hidden lg:block sticky top-20 z-40 bg-white border-b border-cbf-gray-soft"
    >
      <div className="container">
        <div className="flex items-center gap-6 py-3 text-xs text-cbf-gray-light">
          <span className="font-semibold text-cbf-black uppercase tracking-wider text-[0.6rem]">
            Accès rapide
          </span>
          {ITEMS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-cbf-gold transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
