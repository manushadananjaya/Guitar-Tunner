/* GuitarTunePro service worker.
 *
 * Goal: the tuner, metronome, and chord library keep working with no network
 * — useful in a rehearsal room or anywhere with bad signal.
 *
 * Strategy, chosen so a stale cache can never mask a deploy:
 *   - Navigations (HTML): network-first, fall back to cache, then to /offline.
 *     Content stays fresh whenever there is a connection.
 *   - Hashed build assets (/_next/static/*): cache-first. Their URLs change on
 *     every build, so they are immutable and safe to serve from cache forever.
 *   - Same-origin images/fonts: stale-while-revalidate.
 *   - Everything cross-origin (ads, analytics, fonts CDNs): not touched at all.
 *     Caching ad requests would break reporting and could serve stale creatives.
 */

const VERSION = 'v1';
const SHELL_CACHE = `gtp-shell-${VERSION}`;
const ASSET_CACHE = `gtp-assets-${VERSION}`;
const PAGE_CACHE = `gtp-pages-${VERSION}`;
const OFFLINE_URL = '/offline';

/** Precached so the core tools open with no network at all. */
const SHELL_URLS = [
  '/',
  '/metronome',
  '/chords',
  OFFLINE_URL,
  '/Logo.png',
  '/site.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      // Individually, so one 404 cannot fail the whole install.
      .then((cache) =>
        Promise.all(
          SHELL_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => {}),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  const keep = new Set([SHELL_CACHE, ASSET_CACHE, PAGE_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.map((n) => (keep.has(n) ? null : caches.delete(n)))),
      )
      .then(() => self.clients.claim()),
  );
});

/** Let the page tell a waiting worker to take over immediately. */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

const isHashedAsset = (url) =>
  url.pathname.startsWith('/_next/static/');

const isCacheableAsset = (request, url) =>
  request.destination === 'image' ||
  request.destination === 'font' ||
  url.pathname.startsWith('/screenshots/');

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Never interfere with other origins — ads, analytics, third-party fonts.
  if (url.origin !== self.location.origin) return;
  // Range requests (audio/video seeking) must not be served from the cache.
  if (request.headers.has('range')) return;

  // 1. Page navigations: network-first.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const shell = await caches.match(OFFLINE_URL);
          return (
            shell ??
            new Response('Offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            })
          );
        }),
    );
    return;
  }

  // 2. Immutable build output: cache-first.
  if (isHashedAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches
                .open(ASSET_CACHE)
                .then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  // 3. Images and fonts: serve cached immediately, refresh in the background.
  if (isCacheableAsset(request, url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches
                .open(ASSET_CACHE)
                .then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached);
        return cached ?? network;
      }),
    );
  }
});
