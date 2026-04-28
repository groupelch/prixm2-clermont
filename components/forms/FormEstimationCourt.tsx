"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { leadSchemaCourt, type LeadCourt } from "@/lib/schema";
import { quartiers } from "@/data/quartiers";

interface FormEstimationCourtProps {
  sourcePage: string;
  sourceQuartier?: string | null;
  defaultQuartier?: string;
  variant?: "light" | "dark";
}

export function FormEstimationCourt({
  sourcePage,
  sourceQuartier = null,
  defaultQuartier,
  variant = "light",
}: FormEstimationCourtProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadCourt>({
    resolver: zodResolver(leadSchemaCourt),
    defaultValues: {
      source_page: sourcePage,
      source_quartier: sourceQuartier,
      quartier: defaultQuartier ?? "",
      consentement_rgpd: true as unknown as true,
    },
  });

  const onSubmit = async (data: LeadCourt) => {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "estimation_court" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Une erreur est survenue");
      }
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Erreur");
    }
  };

  if (status === "success") {
    return (
      <div className={variant === "dark" ? "text-white" : ""}>
        <div className="flex items-start gap-3 p-6 bg-cbf-success/10 border border-cbf-success rounded-sm">
          <CheckCircle2 className="h-6 w-6 text-cbf-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-playfair text-lg font-bold text-cbf-success">
              Demande reçue
            </p>
            <p className="text-sm mt-1">
              Un expert CBF Conseils vous recontacte sous 48 heures.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="prenom">Prénom</Label>
          <Input id="prenom" placeholder="Marie" {...register("prenom")} />
          {errors.prenom && <p className="text-xs text-cbf-danger mt-1">{errors.prenom.message}</p>}
        </div>
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" placeholder="Dupont" {...register("nom")} />
          {errors.nom && <p className="text-xs text-cbf-danger mt-1">{errors.nom.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="vous@exemple.fr" {...register("email")} />
          {errors.email && <p className="text-xs text-cbf-danger mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" type="tel" placeholder="06 00 00 00 00" {...register("telephone")} />
          {errors.telephone && <p className="text-xs text-cbf-danger mt-1">{errors.telephone.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="type_bien">Type de bien</Label>
          <Select id="type_bien" {...register("type_bien")} defaultValue="">
            <option value="" disabled>Sélectionner…</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="local">Local commercial</option>
            <option value="terrain">Terrain</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="surface">Surface (m²)</Label>
          <Input id="surface" type="number" min={1} placeholder="80" {...register("surface")} />
        </div>
      </div>

      <div>
        <Label htmlFor="quartier">Quartier ou commune</Label>
        <Select id="quartier" {...register("quartier")} defaultValue={defaultQuartier ?? ""}>
          <option value="">Sélectionner…</option>
          <optgroup label="Clermont-Ferrand">
            {quartiers.filter((q) => q.type === "quartier").map((q) => (
              <option key={q.slug} value={q.slug}>{q.nom}</option>
            ))}
          </optgroup>
          <optgroup label="Communes agglo">
            {quartiers.filter((q) => q.type === "commune").map((q) => (
              <option key={q.slug} value={q.slug}>{q.nom}</option>
            ))}
          </optgroup>
        </Select>
      </div>

      <div className="flex items-start gap-2 pt-2">
        <Checkbox id="rgpd-court" {...register("consentement_rgpd")} defaultChecked />
        <label htmlFor="rgpd-court" className={`text-xs ${variant === "dark" ? "text-cbf-gray-light" : "text-cbf-gray"} leading-relaxed`}>
          J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
          <a href="/politique-confidentialite" className="underline hover:text-cbf-gold">
            politique de confidentialité
          </a>.
        </label>
      </div>
      {errors.consentement_rgpd && (
        <p className="text-xs text-cbf-danger">{errors.consentement_rgpd.message}</p>
      )}

      {status === "error" && errorMsg && (
        <div className="flex items-start gap-2 p-4 bg-cbf-danger/10 border border-cbf-danger/40 rounded-sm">
          <AlertCircle className="h-4 w-4 text-cbf-danger flex-shrink-0 mt-0.5" />
          <p className="text-xs text-cbf-danger">{errorMsg}</p>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Envoi en cours…" : "Demander mon estimation gratuite"}
      </Button>
    </form>
  );
}
