"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { leadSchemaRappel, type LeadRappel } from "@/lib/schema";

interface FormRappelProps {
  sourcePage?: string;
}

export function FormRappel({ sourcePage = "/contact" }: FormRappelProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadRappel>({
    resolver: zodResolver(leadSchemaRappel),
    defaultValues: {
      source_page: sourcePage,
      consentement_rgpd: true as unknown as true,
    },
  });

  const onSubmit = async (data: LeadRappel) => {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "rappel" }),
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
      <div className="flex items-start gap-3 p-6 bg-cbf-success/10 border border-cbf-success rounded-sm">
        <CheckCircle2 className="h-6 w-6 text-cbf-success flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-playfair text-lg font-bold text-cbf-success">Demande envoyée</p>
          <p className="text-sm mt-1">Nous vous rappelons sous 24h ouvrées.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="prenom-rappel">Prénom</Label>
          <Input id="prenom-rappel" {...register("prenom")} />
          {errors.prenom && <p className="text-xs text-cbf-danger mt-1">{errors.prenom.message}</p>}
        </div>
        <div>
          <Label htmlFor="telephone-rappel">Téléphone</Label>
          <Input id="telephone-rappel" type="tel" {...register("telephone")} />
          {errors.telephone && <p className="text-xs text-cbf-danger mt-1">{errors.telephone.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email-rappel">Email (optionnel)</Label>
        <Input id="email-rappel" type="email" {...register("email")} />
      </div>
      <div>
        <Label htmlFor="message-rappel">Message</Label>
        <Textarea id="message-rappel" {...register("message")} placeholder="Décrivez votre besoin…" />
      </div>
      <div className="flex items-start gap-2">
        <Checkbox id="rgpd-rappel" {...register("consentement_rgpd")} defaultChecked />
        <label htmlFor="rgpd-rappel" className="text-xs text-cbf-gray leading-relaxed">
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
        {status === "loading" ? "Envoi…" : "Être rappelé"}
      </Button>
    </form>
  );
}
