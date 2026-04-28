import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendNotification, buildLeadEmailHtml } from "@/lib/resend";
import { storeLead, type LeadRecord } from "@/lib/supabase";
import { getQuartierBySlug } from "@/data/quartiers";

const inputSchema = z.object({
  type: z.enum(["estimation_court", "estimation_complet", "rappel", "simulateur"]),
  source_page: z.string().default("/"),
  source_quartier: z.string().nullable().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  prenom: z.string().min(1),
  nom: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  telephone: z.string().min(8),
  adresse: z.string().nullable().optional(),
  type_bien: z.string().nullable().optional(),
  surface: z.coerce.number().nullable().optional(),
  nb_pieces: z.coerce.number().nullable().optional(),
  etat: z.string().nullable().optional(),
  dpe: z.string().nullable().optional(),
  delai_vente: z.string().nullable().optional(),
  objectif: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  quartier: z.string().nullable().optional(),
  consentement_rgpd: z.literal(true),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Payload invalide" }, { status: 400 });
  }

  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Validation échouée", errors: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const quartier = data.quartier ? getQuartierBySlug(data.quartier) : null;
  const quartierLabel = quartier ? quartier.nom : data.source_quartier ?? "—";

  const lead: LeadRecord = {
    type: data.type,
    source_page: data.source_page,
    source_quartier: data.source_quartier ?? data.quartier ?? null,
    utm_source: data.utm_source ?? null,
    utm_medium: data.utm_medium ?? null,
    utm_campaign: data.utm_campaign ?? null,
    prenom: data.prenom,
    nom: data.nom,
    email: data.email && data.email !== "" ? data.email : undefined,
    telephone: data.telephone,
    adresse: data.adresse ?? null,
    type_bien: data.type_bien ?? null,
    surface: data.surface ?? null,
    nb_pieces: data.nb_pieces ?? null,
    etat: data.etat ?? null,
    delai_vente: data.delai_vente ?? null,
    objectif: data.objectif ?? null,
    message: data.message ?? null,
    consentement_rgpd: data.consentement_rgpd,
    payload: { dpe: data.dpe ?? null, raw: data },
  };

  const [emailRes, dbRes] = await Promise.all([
    sendNotification({
      subject: `Nouvelle demande estimation — ${quartierLabel} — ${data.prenom}`,
      html: buildLeadEmailHtml({
        Type: data.type,
        Page: data.source_page,
        Quartier: quartierLabel,
        Prénom: data.prenom,
        Nom: data.nom ?? "",
        Email: data.email ?? "",
        Téléphone: data.telephone,
        "Type bien": data.type_bien ?? "",
        Surface: data.surface ?? "",
        Pièces: data.nb_pieces ?? "",
        Adresse: data.adresse ?? "",
        État: data.etat ?? "",
        DPE: data.dpe ?? "",
        Délai: data.delai_vente ?? "",
        Objectif: data.objectif ?? "",
        Message: data.message ?? "",
        UTM: [data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / "),
      }),
      replyTo: data.email && data.email !== "" ? data.email : undefined,
    }),
    storeLead(lead),
  ]);

  return NextResponse.json({
    ok: true,
    message: "Demande reçue",
    delivery: { email: emailRes.ok, db: dbRes.ok },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "leads" });
}
