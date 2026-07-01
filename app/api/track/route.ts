import { redis } from "@/lib/redis";

const VALID_EVENTS = ["quiz_opened", "quiz_completed", "install_clicked"] as const;
type ValidEvent = (typeof VALID_EVENTS)[number];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, src, score } = body;

    if (!event || typeof event !== "string" || !src || typeof src !== "string") {
      return Response.json(
        { error: "src and event must be non-empty strings" },
        { status: 400 }
      );
    }

    if (!VALID_EVENTS.includes(event as ValidEvent)) {
      return Response.json({ error: "invalid event" }, { status: 400 });
    }

    if (
      event === "quiz_completed" &&
      (score === undefined ||
        !Number.isInteger(score) ||
        score < 0 ||
        score > 15)
    ) {
      return Response.json(
        { error: "score must be an integer 0–15 for quiz_completed" },
        { status: 400 }
      );
    }

    const pipeline = redis.pipeline();
    pipeline.incr(`${src}:${event}`);
    if (event === "quiz_completed") {
      pipeline.incrby(`${src}:score_sum`, score as number);
      pipeline.incr(`${src}:score_count`);
    }
    await pipeline.exec();

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[/api/track]", err);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}
