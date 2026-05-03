"use client";

import { useState, useRef, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { MapPin, Loader2 } from "lucide-react";
import type { EstimationFormData } from "@/lib/schema";

// ──────────────────────────────────────────────────────────────────────────────
// Types BAN API (Base Adresse Nationale — data.gouv.fr)
// ──────────────────────────────────────────────────────────────────────────────
interface BanFeature {
  properties: {
    label: string;
    name: string;
    city: string;
    postcode: string;
    citycode: string;
    type: "housenumber" | "street" | "locality" | "municipality";
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// Hook debounce
// ──────────────────────────────────────────────────────────────────────────────
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ──────────────────────────────────────────────────────────────────────────────
// Composant principal
// ──────────────────────────────────────────────────────────────────────────────
export function AddressAutocomplete() {
  const {
    control,
    formState: { errors },
  } = useFormContext<EstimationFormData>();

  const { field } = useController({ control, name: "adresse" });

  const [inputValue, setInputValue] = useState<string>(
    (field.value as string) ?? ""
  );
  const [suggestions, setSuggestions] = useState<BanFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(inputValue, 280);

  // ── Fetch BAN API ────────────────────────────────────────────────────────
  useEffect(() => {
    if (debouncedQuery.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
        debouncedQuery
      )}&limit=6&autocomplete=1`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((data: { features?: BanFeature[] }) => {
        const features = data.features ?? [];
        setSuggestions(features);
        setIsOpen(features.length > 0);
        setActiveIndex(-1);
      })
      .catch(() => {
        /* abort ou erreur réseau, on ignore */
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  // ── Fermer sur clic extérieur ─────────────────────────────────────────────
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // ── Sélection d'une suggestion ────────────────────────────────────────────
  const handleSelect = (feature: BanFeature) => {
    const label = feature.properties.label;
    setInputValue(label);
    field.onChange(label);
    setIsOpen(false);
    setSuggestions([]);
  };

  // ── Navigation clavier ────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const hasError = !!errors.adresse;

  return (
    <div ref={containerRef} className="relative">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            field.onChange(e.target.value);
          }}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onBlur={field.onBlur}
          placeholder="12 rue Pascal, Clermont-Ferrand"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={[
            "flex h-12 w-full rounded-sm border bg-white px-4 pr-10 text-sm text-cbf-black",
            "placeholder:text-cbf-gray-light",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cbf-gold/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            "transition-colors",
            hasError
              ? "border-cbf-danger focus-visible:border-cbf-danger"
              : "border-cbf-gray-soft focus-visible:border-cbf-gold",
          ].join(" ")}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cbf-gray-light">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </div>
      </div>

      {/* Erreur react-hook-form */}
      {hasError && (
        <p className="text-xs text-cbf-danger mt-1">
          {errors.adresse?.message as string}
        </p>
      )}

      {/* Dropdown suggestions */}
      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-auto rounded-sm border border-cbf-gray-soft bg-white shadow-lg"
        >
          {suggestions.map((f, i) => (
            <li key={`${f.properties.label}-${i}`} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onMouseDown={() => handleSelect(f)}
                className={[
                  "flex w-full items-start gap-2 px-3 py-2.5 text-left transition-colors",
                  i === activeIndex ? "bg-cbf-ivory" : "hover:bg-cbf-ivory",
                ].join(" ")}
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cbf-gold" />
                <div>
                  <span className="block text-sm font-medium text-cbf-black">
                    {f.properties.name}
                  </span>
                  <span className="block text-xs text-cbf-gray">
                    {f.properties.postcode} {f.properties.city}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
