import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

const SUFFIX = ":quiz_opened";

async function getStats() {
  let cursor = 0;
  const openedKeys: string[] = [];
  do {
    const [next, keys] = await redis.scan(cursor, {
      match: `*${SUFFIX}`,
      count: 100,
    });
    cursor = Number(next);
    openedKeys.push(...keys);
  } while (cursor !== 0);

  if (openedKeys.length === 0) return [];

  const sources = openedKeys.map((k) =>
    k.endsWith(SUFFIX) ? k.slice(0, -SUFFIX.length) : k
  );

  const pipeline = redis.pipeline();
  for (const src of sources) {
    pipeline.get(`${src}:quiz_opened`);
    pipeline.get(`${src}:quiz_completed`);
    pipeline.get(`${src}:install_clicked`);
    pipeline.get(`${src}:score_sum`);
    pipeline.get(`${src}:score_count`);
  }
  const results = (await pipeline.exec()) as (number | null)[];

  return sources.map((src, i) => {
    const base = i * 5;
    const opened = results[base] ?? 0;
    const completed = results[base + 1] ?? 0;
    const installed = results[base + 2] ?? 0;
    const scoreSum = results[base + 3] ?? 0;
    const scoreCount = results[base + 4] ?? 0;
    return {
      src,
      opened,
      completed,
      installed,
      completionRate: opened > 0 ? Math.round((completed / opened) * 100) : 0,
      installRate: completed > 0 ? Math.round((installed / completed) * 100) : 0,
      avgScore: scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : null,
    };
  }).sort((a, b) => b.opened - a.opened);
}

export default async function StatsPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("stats_auth")?.value === "1";

  if (!isAuthed) {
    return <LoginForm />;
  }

  const rows = await getStats();

  const globalOpened = rows.reduce((s, r) => s + r.opened, 0);
  const globalCompleted = rows.reduce((s, r) => s + r.completed, 0);
  const globalInstalled = rows.reduce((s, r) => s + r.installed, 0);
  const globalCompletionRate =
    globalOpened > 0 ? Math.round((globalCompleted / globalOpened) * 100) : 0;
  const globalInstallRate =
    globalCompleted > 0
      ? Math.round((globalInstalled / globalCompleted) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-bg p-8">
      <h1 className="text-xl font-bold mb-6">Quiz Stats</h1>

      {rows.length === 0 ? (
        <p className="text-sm text-muted">No data yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-8 font-semibold">Source</th>
                <th className="py-2 pr-8 font-semibold text-right">Opened</th>
                <th className="py-2 pr-8 font-semibold text-right">Completed</th>
                <th className="py-2 pr-8 font-semibold text-right">Installed</th>
                <th className="py-2 pr-8 font-semibold text-right">Completion %</th>
                <th className="py-2 pr-8 font-semibold text-right">Install %</th>
                <th className="py-2 font-semibold text-right">Avg Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border bg-surface font-semibold">
                <td className="py-2 pr-8">ALL</td>
                <td className="py-2 pr-8 text-right">{globalOpened}</td>
                <td className="py-2 pr-8 text-right">{globalCompleted}</td>
                <td className="py-2 pr-8 text-right">{globalInstalled}</td>
                <td className="py-2 pr-8 text-right">{globalCompletionRate}%</td>
                <td className="py-2 pr-8 text-right">{globalInstallRate}%</td>
                <td className="py-2 text-right">—</td>
              </tr>
              {rows.map((row) => (
                <tr key={row.src} className="border-b border-border">
                  <td className="py-2 pr-8 font-mono">{row.src}</td>
                  <td className="py-2 pr-8 text-right">{row.opened}</td>
                  <td className="py-2 pr-8 text-right">{row.completed}</td>
                  <td className="py-2 pr-8 text-right">{row.installed}</td>
                  <td className="py-2 pr-8 text-right">{row.completionRate}%</td>
                  <td className="py-2 pr-8 text-right">{row.installRate}%</td>
                  <td className="py-2 text-right">
                    {row.avgScore !== null ? row.avgScore : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
