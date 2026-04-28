import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { storeLead } from "@/lib/supabase";
import { sendNotification, buildLeadEmailHtml } from "@/lib/resend";

const inputSchema = z.object({
  email: z.string().email(),
  quartier_slug: z.string().min(1),
  quartier_nom: z.string().min(1),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload invalide" },
      { status: 400 },
    );
  }

  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Email ou quartier invalide",
        errors: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  const { email, quartier_slug, quartier_nom } = parsed.data;

  // Stockage : on réutilise la table prixm2_leads avec type='alerte'
  const [emailRes, dbRes] = await Promise.all([
    sendNotification({
      subject: `Nouvelle alerte prix — ${quartier_nom}`,
      html: buildLeadEmailHtml({
        Type: "alerte",
        Quartier: quartier_nom,
        Slug: quartier_slug,
        Email: email,
      }),
      replyTo: email,
    }),
    storeLead({
      type: "alerte",
      source_page: `/prix-m2/${quartier_slug}`,
      source_quartier: quartier_slug,
      prenom: "Alerte",
      email,
      telephone: "—",
      consentement_rgpd: true,
      payload: { quartier_nom },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    message: "Alerte activée",
    delivery: { email: emailRes.ok, db: dbRes.ok },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "alertes" });
}
