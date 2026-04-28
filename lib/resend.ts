import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "estimation@cbfconseils.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@prixm2clermontferrand.fr";

const resendClient = apiKey ? new Resend(apiKey) : null;

interface NotifyPayload {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendNotification(payload: NotifyPayload): Promise<{ ok: boolean; reason?: string }> {
  if (!resendClient) {
    console.warn("[resend] RESEND_API_KEY non configuré — email non envoyé. Sujet :", payload.subject);
    return { ok: false, reason: "no_api_key" };
  }

  try {
    await resendClient.emails.send({
      from: `prixm² Clermont <${FROM_EMAIL}>`,
      to: [NOTIFICATION_EMAIL],
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    return { ok: true };
  } catch (err) {
    console.error("[resend] Erreur envoi:", err);
    return { ok: false, reason: "send_error" };
  }
}

export function buildLeadEmailHtml(data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#0A0A0A;">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#2D2D2D;">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");

  return `
  <!doctype html>
  <html><body style="font-family:Inter,Helvetica,Arial,sans-serif;background:#FAF7F0;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border-top:4px solid #B8860B;padding:32px;">
      <h1 style="font-family:Georgia,serif;color:#0A0A0A;margin:0 0 8px;">Nouveau lead prixm² Clermont</h1>
      <p style="color:#6B6B6B;margin:0 0 24px;">Une nouvelle demande vient d'être déposée sur le site.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
      <p style="margin-top:24px;color:#6B6B6B;font-size:12px;">CBF Conseils — Notification automatique prixm2clermontferrand.fr</p>
    </div>
  </body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
