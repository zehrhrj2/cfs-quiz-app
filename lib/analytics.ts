// sessionStorage dedupe keys — one per trackable event
const DEDUPE_KEYS: Record<string, string> = {
  quiz_opened: "cfs_track_opened",
  quiz_completed: "cfs_track_completed",
  install_clicked: "cfs_track_install",
};

export function trackEvent(
  event: string,
  extra?: { score?: number }
): void {
  if (typeof window === "undefined") return;

  const dedupeKey = DEDUPE_KEYS[event];
  if (dedupeKey) {
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, "1");
  }

  const src = localStorage.getItem("cfs_quiz_src") ?? "direct";

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, src, ...extra }),
  }).catch((err) => console.error("[track]", err));
}
