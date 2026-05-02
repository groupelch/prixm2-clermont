const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramLead(data: Record<string, unknown>): Promise<{ ok: boolean }> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID non configuré");
    return { ok: false };
  }

  const type = String(data.Type ?? "");
  const emoji =
    type.includes("complet") ? "📋" :
    type.includes("rappel")  ? "📞" :
    type.includes("simulat") ? "🧮" :
    "🏠";

  const sourceLabel = String(data.Page ?? "—");
  const isOffMarket = sourceLabel.includes("off-market");

  const lines = [
    `${isOffMarket ? "🔑 OFF-MARKET" : `${emoji} NOUVEAU LEAD`} — prixm² Clermont`,
    ``,
    `👤 ${data.Prénom ?? ""} ${data.Nom ?? ""}`,
    `📱 ${data.Téléphone ?? "—"}`,
    data.Email ? `📧 ${data.Email}` : null,
    ``,
    `📍 ${data.Quartier ?? data.Page ?? "—"}`,
    data["Type bien"] ? `🏗 ${data["Type bien"]}${data.Surface ? ` — ${data.Surface} m²` : ""}` : null,
    data.Budget ? `💰 ${data.Budget}` : null,
    data.Objectif ? `🎯 ${data.Objectif}` : null,
    data.Message ? `💬 ${data.Message}` : null,
    data.UTM && data.UTM !== "" ? `📊 ${data.UTM}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: lines,
          parse_mode: "HTML",
        }),
      }
    );
    const json = await res.json() as { ok: boolean };
    return { ok: json.ok };
  } catch (err) {
    console.error("[telegram] Erreur envoi:", err);
    return { ok: false };
  }
}
