import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Collect all *:score_sum keys via SCAN
    let cursor = 0;
    const sumKeys: string[] = [];
    do {
      const [next, keys] = await redis.scan(cursor, {
        match: "*:score_sum",
        count: 100,
      });
      cursor = Number(next);
      sumKeys.push(...keys);
    } while (cursor !== 0);

    if (sumKeys.length === 0) {
      return Response.json({ average: 0, count: 0 });
    }

    const countKeys = sumKeys.map((k) => k.slice(0, -":score_sum".length) + ":score_count");
    const values = await redis.mget<(number | null)[]>(...sumKeys, ...countKeys);

    const half = sumKeys.length;
    let totalSum = 0;
    let totalCount = 0;
    for (let i = 0; i < half; i++) {
      totalSum += values[i] ?? 0;
      totalCount += values[i + half] ?? 0;
    }

    const average =
      totalCount > 0 ? Math.round((totalSum / totalCount) * 10) / 10 : 0;
    return Response.json({ average, count: totalCount });
  } catch (err) {
    console.error("[/api/stats/average]", err);
    return Response.json({ average: 0, count: 0 });
  }
}
