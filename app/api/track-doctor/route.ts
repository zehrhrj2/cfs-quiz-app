import { redis } from "@/lib/redis";

// Separate from /api/track: that route's schema is hardcoded to the quiz's
// 3 events + a numeric score field and "ru"|"uk" locales, and doesn't fit the
// doctor page's per-phrase / per-category / UTM payload shape. Reuses the
// same Redis client though.
const VALID_EVENTS = [
  "doctor_page_view",
  "doctor_phrase_played",
  "doctor_phrase_favorited",
  "doctor_show_to_doctor_opened",
  "doctor_category_opened",
  "doctor_cfs_cta_click",
  "doctor_offline_ready",
  "doctor_pdf_downloaded",
] as const;
type ValidEvent = (typeof VALID_EVENTS)[number];

const VALID_LOCALES = ["ua", "ru"] as const;
type ValidLocale = (typeof VALID_LOCALES)[number];

const MAX_KEY_PART_LENGTH = 64;

function sanitizeKeyPart(value: unknown): string | null {
  if (typeof value !== "string" || value.length === 0) return null;
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, MAX_KEY_PART_LENGTH);
  return cleaned.length > 0 ? cleaned : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, locale, phrase_id, category, utm_source } = body;

    if (!event || typeof event !== "string" || !VALID_EVENTS.includes(event as ValidEvent)) {
      return Response.json({ error: "invalid event" }, { status: 400 });
    }

    if (!locale || !VALID_LOCALES.includes(locale as ValidLocale)) {
      return Response.json(
        { error: "locale is required and must be 'ua' or 'ru'" },
        { status: 400 }
      );
    }

    const pipeline = redis.pipeline();
    pipeline.incr(`doctor:${locale}:${event}`);

    if (event === "doctor_page_view") {
      const src = sanitizeKeyPart(utm_source) ?? "direct";
      pipeline.incr(`doctor:${locale}:page_view:src:${src}`);
    }

    if (
      event === "doctor_phrase_played" ||
      event === "doctor_phrase_favorited" ||
      event === "doctor_show_to_doctor_opened"
    ) {
      const id = sanitizeKeyPart(phrase_id);
      if (id) pipeline.incr(`doctor:${locale}:${event}:${id}`);
    }

    if (event === "doctor_category_opened") {
      const cat = sanitizeKeyPart(category);
      if (cat) pipeline.incr(`doctor:${locale}:${event}:${cat}`);
    }

    await pipeline.exec();

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[/api/track-doctor]", err);
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}
