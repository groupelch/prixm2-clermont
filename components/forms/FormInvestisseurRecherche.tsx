"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  prenom: z.string().min(2, "Prénom requis"),
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().min(10, "Téléphone invalide"),
  email: z.string().email("Email invalide"),
  budget: z.enum(["50-100k", "100-200k", "200-350k", "350-500k", "500k+"], {
    errorMap: () => ({ message: "Sélectionnez un budget" }),
  }),
  type_bien: z.enum(["appartement", "maison", "local", "tout"], {
    errorMap: () => ({ message: "Sélectionnez un type de bien" }),
  }),
  objectif: z.enum(["rendement", "revente", "residence"], {
    errorMap: () => ({ message: "Sélectionnez un objectif" }),
  }),
  quartiers_souhaites: z.string().optional(),
  criteres_libres: z.string().optional(),
  consentement_rgpd: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
});

type FormData = z.infer<typeof schema>;

const BUDGET_LABELS: Record<string, string> = {
  "50-100k": "50 000 – 100 000 €",
  "100-200k": "100 000 – 200 000 €",
  "200-350k": "200 000 – 350 000 €",
  "350-500k": "350 000 – 500 000 €",
  "500k+": "500 000 € et plus",
};

const OBJECTIF_LABELS: Record<string, string> = {
  rendement: "Investissement locatif / rendement",
  revente: "Achat-revente / plus-value",
  residence: "Résidence principale ou secondaire",
};

export function FormInvestisseurRecherche() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      consentement_rgpd: true as unknown as true,
    },
  });

  const consentValue = watch("consentement_rgpd");

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    const message = [
      `Budget : ${BUDGET_LABELS[data.budget]}`,
      `Type : ${data.type_bien === "tout" ? "Tous types" : data.type_bien}`,
      `Objectif : ${OBJECTIF_LABELS[data.objectif]}`,
      data.quartiers_souhaites ? `Quartiers souhaités : ${data.quartiers_souhaites}` : null,
      data.criteres_libres ? `Critères complémentaires : ${data.criteres_libres}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "estimation_court",
          source_page: "/biens-off-market-clermont-ferrand",
          prenom: data.prenom,
          nom: data.nom,
          telephone: data.telephone,
          email: data.email,
          objectif: "investissement",
          message,
          consentement_rgpd: true,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-cbf-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-7 w-7 text-cbf-success" />
        </div>
        <div>
          <p className="font-playfair text-xl font-bold text-cbf-black mb-2">
            Votre profil acquéreur est enregistré
          </p>
          <p className="text-cbf-gray text-sm max-w-sm mx-auto leading-relaxed">
            Un expert CBF Conseils vous contacte sous 24-48h avec les
            opportunités correspondant à vos critères.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Identité */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input id="prenom" placeholder="Thomas" {...register("prenom")} className="mt-1" />
          {errors.prenom && <p className="text-xs text-red-500 mt-1">{errors.prenom.message}</p>}
        </div>
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input id="nom" placeholder="Martin" {...register("nom")} className="mt-1" />
          {errors.nom && <p className="text-xs text-red-500 mt-1">{errors.nom.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input id="telephone" type="tel" placeholder="06 XX XX XX XX" {...register("telephone")} className="mt-1" />
          {errors.telephone && <p className="text-xs text-red-500 mt-1">{errors.telephone.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="thomas@exemple.fr" {...register("email")} className="mt-1" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label className="mb-2 block">Budget d'acquisition *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(["50-100k", "100-200k", "200-350k", "350-500k", "500k+"] as const).map((b) => (
            <label
              key={b}
              className={`flex items-center justify-center text-center text-xs font-semibold px-3 py-3 rounded-sm border cursor-pointer transition-all ${
                watch("budget") === b
                  ? "bg-cbf-black text-white border-cbf-black"
                  : "bg-white text-cbf-black border-cbf-gray-soft hover:border-cbf-gold"
              }`}
            >
              <input type="radio" value={b} {...register("budget")} className="sr-only" />
              {BUDGET_LABELS[b]}
            </label>
          ))}
        </div>
        {errors.budget && <p className="text-xs text-red-500 mt-1">{errors.budget.message}</p>}
      </div>

      {/* Type & Objectif */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type_bien" className="mb-2 block">Type de bien *</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["appartement", "maison", "local", "tout"] as const).map((t) => (
              <label
                key={t}
                className={`flex items-center justify-center text-xs font-semibold px-3 py-3 rounded-sm border cursor-pointer transition-all capitalize ${
                  watch("type_bien") === t
                    ? "bg-cbf-black text-white border-cbf-black"
                    : "bg-white text-cbf-black border-cbf-gray-soft hover:border-cbf-gold"
                }`}
              >
                <input type="radio" value={t} {...register("type_bien")} className="sr-only" />
                {t === "tout" ? "Indifférent" : t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
          {errors.type_bien && <p className="text-xs text-red-500 mt-1">{errors.type_bien.message}</p>}
        </div>

        <div>
          <Label className="mb-2 block">Objectif *</Label>
          <div className="flex flex-col gap-2">
            {(["rendement", "revente", "residence"] as const).map((o) => (
              <label
                key={o}
                className={`flex items-center text-xs font-semibold px-3 py-3 rounded-sm border cursor-pointer transition-all ${
                  watch("objectif") === o
                    ? "bg-cbf-black text-white border-cbf-black"
                    : "bg-white text-cbf-black border-cbf-gray-soft hover:border-cbf-gold"
                }`}
              >
                <input type="radio" value={o} {...register("objectif")} className="sr-only" />
                {OBJECTIF_LABELS[o]}
              </label>
            ))}
          </div>
          {errors.objectif && <p className="text-xs text-red-500 mt-1">{errors.objectif.message}</p>}
        </div>
      </div>

      {/* Quartiers */}
      <div>
        <Label htmlFor="quartiers_souhaites">Quartier(s) souhaité(s)</Label>
        <Input
          id="quartiers_souhaites"
          placeholder="Cézeaux, Centre-Ville, La Gare… ou indifférent"
          {...register("quartiers_souhaites")}
          className="mt-1"
        />
      </div>

      {/* Critères libres */}
      <div>
        <Label htmlFor="criteres_libres">Critères complémentaires</Label>
        <textarea
          id="criteres_libres"
          {...register("criteres_libres")}
          placeholder="Surface minimale, nombre de pièces, rendement visé, contraintes particulières…"
          rows={3}
          className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
        />
      </div>

      {/* RGPD */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="rgpd"
          checked={!!consentValue}
          onChange={(e) =>
            setValue("consentement_rgpd", e.target.checked as true, { shouldValidate: true })
          }
        />
        <label htmlFor="rgpd" className="text-xs text-cbf-gray-light leading-relaxed cursor-pointer">
          J'accepte que CBF Conseils utilise mes coordonnées pour me contacter dans le cadre
          de ma recherche immobilière.{" "}
          <a href="/politique-confidentialite" className="underline hover:text-cbf-gold">
            Politique de confidentialité
          </a>
        </label>
      </div>
      {errors.consentement_rgpd && (
        <p className="text-xs text-red-500">{errors.consentement_rgpd.message}</p>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-sm p-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          Une erreur est survenue. Appelez-nous directement au 04 73 XX XX XX.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Envoi en cours…</>
        ) : (
          "Soumettre ma recherche — réponse sous 48h"
        )}
      </Button>
    </form>
  );
}
