"use client";

import { useEffect } from "react";

/**
 * Registers the service worker in production only.
 *
 * Deliberately not registered in development: a cache-first worker sitting in
 * front of the dev server makes changes appear not to take effect, which is a
 * miserable and easily-avoided debugging trap.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // When a new worker has installed and an old one is still in
          // control, activate it right away so a deploy is picked up on the
          // next navigation rather than after every tab is closed.
          registration.addEventListener("updatefound", () => {
            const incoming = registration.installing;
            if (!incoming) return;
            incoming.addEventListener("statechange", () => {
              if (
                incoming.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                incoming.postMessage("SKIP_WAITING");
              }
            });
          });
        })
        .catch(() => {
          // A failed registration must never break the page.
        });
    };

    // Deliberately NOT gated on window.load. `load` waits for every
    // subresource including the AdSense and Analytics scripts, so on this site
    // it fires very late — and if those requests hang, never. Effects already
    // run after hydration, which is late enough to stay off the critical path.
    register();
  }, []);

  return null;
}
