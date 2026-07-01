const DEDUPE_SUFFIXES: Record<string, string> = {
  quiz_opened: "opened",
  quiz_completed: "completed",
  install_clicked: "install",
};

export function trackEvent(
  event: string,
  locale: "ru" | "uk",
  extra?: { score?: number }
): void {
  if (typeof window === "undefined") return;

  const suffix = DEDUPE_SUFFIXES[event];
  if (suffix) {
    const dedupeKey = `cfs_track_${suffix}_${locale}`;
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, "1");
  }

  const src = localStorage.getItem("cfs_quiz_src") ?? "direct";

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, src, locale, ...extra }),
  }).catch((err) => console.error("[track]", err));
}
