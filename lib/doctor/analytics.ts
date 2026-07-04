import type { Locale } from "@/data/doctor-phrases";

// Kept in sync with VALID_EVENTS in app/api/track-doctor/route.ts — the API
// route rejects anything not in that list, so add new events to both places.
export type DoctorEventName =
  | "doctor_page_view"
  | "doctor_phrase_played"
  | "doctor_phrase_favorited"
  | "doctor_show_to_doctor_opened"
  | "doctor_category_opened"
  | "doctor_cfs_cta_click"
  | "doctor_offline_ready"
  | "doctor_pdf_downloaded";

// Events that should fire at most once per tab session (mirrors the dedupe
// pattern in lib/analytics.ts) — avoids double counts from React StrictMode's
// double-invoked effects in dev, and from SW activation firing more than once.
const DEDUPE_EVENTS = new Set<DoctorEventName>(["doctor_page_view", "doctor_offline_ready"]);

export type DoctorAnalyticsPayload = {
  locale: Locale;
  phrase_id?: string;
  category?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

export function trackDoctorEvent(
  event: DoctorEventName,
  payload: DoctorAnalyticsPayload
): void {
  if (typeof window === "undefined") return;

  if (DEDUPE_EVENTS.has(event)) {
    const dedupeKey = `cfs_doctor_track_${event}_${payload.locale}`;
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, "1");
  }

  fetch("/api/track-doctor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...payload }),
  }).catch((err) => console.error("[track-doctor]", err));
}
