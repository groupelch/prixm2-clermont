/**
 * /admin/leads — Tableau de bord des leads prixm²
 * Accès : /admin/leads?secret=ADMIN_SECRET
 * Protection légère par query param — suffisant pour un usage interne.
 */
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";

interface SearchParams { secret?: string }

async function getLeadsStats() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const sql = neon(url);

  const [total, parSource, parCampaign, parType, parSemaine, derniers] = await Promise.all([
    // Total
    sql`SELECT count(*)::int AS n FROM prixm2_leads`,

    // Par source_page (top 20)
    sql`
      SELECT source_page, count(*)::int AS n
      FROM prixm2_leads
      GROUP BY source_page
      ORDER BY n DESC
      LIMIT 20
    `,

    // Par utm_campaign (top 15 — attribution articles)
    sql`
      SELECT
        COALESCE(utm_campaign, '(direct)') AS campaign,
        COALESCE(utm_source, '(direct)')   AS source,
        COALESCE(utm_medium, '(direct)')   AS medium,
        count(*)::int AS n
      FROM prixm2_leads
      GROUP BY utm_campaign, utm_source, utm_medium
      ORDER BY n DESC
      LIMIT 15
    `,

    // Par type de lead
    sql`
      SELECT type, count(*)::int AS n
      FROM prixm2_leads
      GROUP BY type
      ORDER BY n DESC
    `,

    // Par semaine (12 dernières)
    sql`
      SELECT
        date_trunc('week', created_at)::date AS semaine,
        count(*)::int AS n
      FROM prixm2_leads
      WHERE created_at > now() - interval '12 weeks'
      GROUP BY semaine
      ORDER BY semaine DESC
    `,

    // 20 derniers leads
    sql`
      SELECT
        id, created_at, prenom, nom, telephone, email,
        type, source_page, source_quartier,
        utm_source, utm_medium, utm_campaign,
        type_bien, surface
      FROM prixm2_leads
      ORDER BY created_at DESC
      LIMIT 20
    `,
  ]);

  return { total: total[0]?.n ?? 0, parSource, parCampaign, parType, parSemaine, derniers };
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Protection par secret
  const expected = process.env.ADMIN_SECRET;
  if (!expected || searchParams.secret !== expected) {
    redirect("/");
  }

  const data = await getLeadsStats();

  if (!data) {
    return (
      <div className="p-10 text-red-600">
        DATABASE_URL non configuré — aucune donnée disponible.
      </div>
    );
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleString("fr-FR", {
      day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-sm text-gray-800">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord leads</h1>
            <p className="text-gray-500 text-xs mt-1">prixm²clermontferrand.fr — CBF Conseils</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-amber-600">{data.total}</p>
            <p className="text-xs text-gray-500">leads au total</p>
          </div>
        </div>

        {/* Grille stats principales */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Par type */}
          <Card title="Par type de demande">
            <table className="w-full">
              <tbody>
                {data.parType.map((r: Record<string, unknown>) => (
                  <tr key={r.type as string} className="border-b last:border-0">
                    <td className="py-1.5 text-gray-700">{r.type as string}</td>
                    <td className="py-1.5 text-right font-bold text-gray-900">{r.n as number}</td>
                    <td className="py-1.5 text-right text-gray-400 w-16">
                      {Math.round(((r.n as number) / data.total) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Par semaine */}
          <Card title="Leads par semaine">
            <table className="w-full">
              <tbody>
                {data.parSemaine.map((r: Record<string, unknown>) => (
                  <tr key={r.semaine as string} className="border-b last:border-0">
                    <td className="py-1.5 text-gray-700">
                      Sem. {new Date(r.semaine as string).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                    </td>
                    <td className="py-1.5 text-right font-bold text-gray-900">{r.n as number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Attribution UTM */}
          <Card title="Attribution (UTM campaign)">
            <table className="w-full">
              <tbody>
                {data.parCampaign.map((r: Record<string, unknown>, i: number) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-1.5 text-gray-700 max-w-[140px] truncate" title={r.campaign as string}>
                      <span className={`inline-block px-1.5 py-0.5 text-[10px] rounded mr-1 ${
                        r.source === "article" ? "bg-amber-100 text-amber-700" :
                        r.source === "(direct)" ? "bg-gray-100 text-gray-600" :
                        "bg-blue-100 text-blue-700"
                      }`}>{r.source as string}</span>
                      {r.campaign as string}
                    </td>
                    <td className="py-1.5 text-right font-bold text-gray-900 pl-2">{r.n as number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Par source_page */}
        <Card title="Leads par page source">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gray-400 border-b">
                <th className="pb-2 text-left">Page</th>
                <th className="pb-2 text-right">Leads</th>
                <th className="pb-2 text-right">%</th>
              </tr>
            </thead>
            <tbody>
              {data.parSource.map((r: Record<string, unknown>) => (
                <tr key={r.source_page as string} className="border-b last:border-0">
                  <td className="py-1.5 text-gray-700 font-mono text-xs">{r.source_page as string}</td>
                  <td className="py-1.5 text-right font-bold text-gray-900">{r.n as number}</td>
                  <td className="py-1.5 text-right text-gray-400">
                    {Math.round(((r.n as number) / data.total) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* 20 derniers leads */}
        <Card title="20 derniers leads">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-400 border-b">
                  <th className="pb-2 text-left">Date</th>
                  <th className="pb-2 text-left">Contact</th>
                  <th className="pb-2 text-left">Type</th>
                  <th className="pb-2 text-left">Source</th>
                  <th className="pb-2 text-left">UTM campaign</th>
                  <th className="pb-2 text-left">Bien</th>
                </tr>
              </thead>
              <tbody>
                {data.derniers.map((r: Record<string, unknown>) => (
                  <tr key={r.id as string} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-1.5 text-gray-500 whitespace-nowrap">{fmt(r.created_at as string)}</td>
                    <td className="py-1.5 font-medium">
                      {r.prenom as string} {r.nom as string}
                      <br />
                      <span className="text-gray-400 font-normal">{r.telephone as string}</span>
                    </td>
                    <td className="py-1.5">
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px]">
                        {r.type as string}
                      </span>
                    </td>
                    <td className="py-1.5 font-mono text-[10px] text-gray-500 max-w-[120px] truncate">
                      {(r.source_quartier as string) ?? (r.source_page as string)}
                    </td>
                    <td className="py-1.5 text-[10px] text-gray-500">
                      {(r.utm_campaign as string) ?? "—"}
                    </td>
                    <td className="py-1.5 text-gray-600">
                      {r.type_bien ? `${r.type_bien} ${r.surface ? `${r.surface}m²` : ""}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-xs text-gray-400 text-center pb-6">
          Données Neon PostgreSQL · prixm²clermontferrand.fr
        </p>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">{title}</h2>
      {children}
    </div>
  );
}
