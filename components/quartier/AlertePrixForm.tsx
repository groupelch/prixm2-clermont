"use client";

import { useState } from "react";
import { Bell, Check, AlertCircle } from "lucide-react";

interface Props {
  quartierId: string;
  quartierNom: string;
}

type State = "idle" | "loading" | "success" | "error";

export function AlertePrixForm({ quartierId, quartierNom }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/alertes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          quartier_slug: quartierId,
          quartier_nom: quartierNom,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setError(data.message ?? "Une erreur est survenue.");
        return;
      }
      setState("success");
    } catch {
      setState("error");
      setError("Connexion impossible. Réessayez plus tard.");
    }
  };

  if (state === "success") {
    return (
      <div className="flex items-start gap-3 p-4 bg-white border border-cbf-success/40 rounded-sm">
        <Check className="h-5 w-5 text-cbf-success flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-cbf-black text-sm">
            Alerte activée pour {quartierNom}
          </p>
          <p className="text-xs text-cbf-gray mt-1">
            Vous recevrez les évolutions de prix par email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 items-stretch"
    >
      <div className="relative flex-1">
        <Bell className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cbf-gray-light" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@email.fr"
          disabled={state === "loading"}
          className="w-full bg-white border border-cbf-gray-soft rounded-sm pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-cbf-gold transition-colors disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-cbf-black text-white font-semibold rounded-sm px-5 py-2.5 text-sm hover:bg-cbf-gold hover:text-cbf-black transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {state === "loading" ? "..." : "Suivre les prix"}
      </button>
      {state === "error" && error && (
        <div className="sm:col-span-2 flex items-start gap-2 text-xs text-cbf-warning mt-1 sm:mt-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
