import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-xs text-cbf-gray-light">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {it.href ? (
              <Link
                href={it.href}
                className="hover:text-cbf-gold transition-colors"
              >
                {it.name}
              </Link>
            ) : (
              <span className="text-cbf-gray font-medium">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
