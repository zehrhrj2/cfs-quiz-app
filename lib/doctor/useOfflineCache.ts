"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/doctor-phrases";
import { trackDoctorEvent } from "./analytics";

// Scoped to "/doctor" so this SW never intercepts requests for /quiz, /ua,
// /ru, or /admin — registering with the default (root) scope would silently
// change caching behavior for the rest of the site.
const SW_URL = "/doctor-sw.js";
const SW_SCOPE = "/doctor";

export function useOfflineCache(locale: Locale): boolean {
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    // Service workers make the dev server's hot-reloaded assets stick in
    // cache and fight with each other; only register in production builds.
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;

    const markReady = () => {
      if (cancelled) return;
      setOfflineReady(true);
      trackDoctorEvent("doctor_offline_ready", { locale });

      // Warm the PDF generator's chunk (jsPDF + embedded font, ~150KB)
      // into the SW's runtime cache now, while still online, so the
      // download button works in airplane mode even if never clicked
      // during this first visit. doctor-sw.js's fetch handler caches any
      // same-origin GET it observes, so this import alone is enough —
      // no direct cache.put() call needed here.
      import("./generatePdf").catch(() => {
        // best-effort prefetch only; the button's own dynamic import on
        // click will simply try again
      });
    };

    navigator.serviceWorker
      .register(SW_URL, { scope: SW_SCOPE })
      .then((registration) => {
        if (registration.active) {
          markReady();
          return;
        }
        const worker = registration.installing ?? registration.waiting;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "activated") markReady();
        });
      })
      .catch((err) => console.error("[doctor-sw]", err));

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return offlineReady;
}
