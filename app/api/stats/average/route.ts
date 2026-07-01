import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

const VALID_LOCALES = ["ru", "uk"] as const;
type ValidLocale = (typeof VALID_LOCALES)[number];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");

    if (!locale || !VALID_LOCALES.includes(locale as ValidLocale)) {
      return Response.json(
        { error: "locale is required and must be 'ru' or 'uk'" },
        { status: 400 }
      );
    }

    const sumSuffix = `:${locale}:score_sum`;
    let cursor = 0;
    const sumKeys: string[] = [];
    do {
      const [next, keys] = await redis.scan(cursor, {
        match: `*${sumSuffix}`,
        count: 100,
      });
      cursor = Number(next);
      sumKeys.push(...keys);
    } while (cursor !== 0);

    if (sumKeys.length === 0) {
      return Response.json({ average: 0, count: 0 });
    }

    const countKeys = sumKeys.map(
      (k) => k.slice(0, -sumSuffix.length) + `:${locale}:score_count`
    );
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
