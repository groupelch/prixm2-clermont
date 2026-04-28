import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "a3f9b42e8c154d07b6e21a8f3d9c7b1e";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.prixm2clermontferrand.fr";

/**
 * POST /api/indexnow
 * Corps : { urls: string[] }  — max 10 000 URLs par appel
 * Soumet les URLs à Bing IndexNow pour indexation rapide.
 * Protégé par CRON_SECRET pour éviter les abus.
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let urls: string[] = [];
  try {
    const body = await req.json();
    urls = Array.isArray(body.urls) ? body.urls : [];
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (urls.length === 0) {
    return NextResponse.json({ ok: false, message: "No URLs provided" }, { status: 400 });
  }

  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true, submitted: urls.length, status: res.status });
    } else {
      const text = await res.text();
      return NextResponse.json({ ok: false, status: res.status, body: text }, { status: 502 });
    }
  } catch (err) {
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}

/**
 * GET /api/indexnow/ping
 * Soumet toutes les URLs statiques connues — à appeler après chaque déploiement.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  // Liste les pages importantes du site
  const staticUrls = [
    `${SITE_URL}/`,
    `${SITE_URL}/prix-immobilier-clermont-ferrand`,
    `${SITE_URL}/estimation`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/investir-clermont-ferrand`,
    `${SITE_URL}/vendre-clermont-ferrand`,
    `${SITE_URL}/louer-clermont-ferrand`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/contact`,
  ];

  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: staticUrls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      ok: res.ok,
      submitted: staticUrls.length,
      status: res.status,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}
