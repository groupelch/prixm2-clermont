import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function BreadcrumbNav({ items, dark = false }: { items: BreadcrumbItem[]; dark?: boolean }) {
  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs ${dark ? "text-white/40" : "text-cbf-gray-light"}`}>
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {it.href ? (
              <Link
                href={it.href}
                className={`transition-colors ${dark ? "hover:text-cbf-gold" : "hover:text-cbf-gold"}`}
              >
                {it.name}
              </Link>
            ) : (
              <span className={`font-medium ${dark ? "text-white/70" : "text-cbf-gray"}`}>{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
