// ═══════════════════════════════════════════
//  sw.js — Pixel Kitchen  Service Worker
// ═══════════════════════════════════════════
const CACHE = 'pk-v26';

const STATIC = [
  './',
  './index.html',
  './0_hub.html',
  './1_dish_detective.html',
  './2_pantry_peek.html',
  './3_chop_chop.html',
  './4_recipe_rush.html',
  './5_kitchen_chaos.html',
  './6_plate_perfect.html',
  './menu.js',
  './shared.css',
  './shared.js',
  './sprites.js',
  './achievements.js',
  './icon.svg',
  './manifest.json',
  './assets/food-sprites.webp',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
];

// Cache all static assets on install — do NOT skipWaiting so update toast can appear
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
});

// Remove old caches on activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Page sends 'SKIP_WAITING' when user taps the update toast
self.addEventListener('message', e => {
  if(e.data === 'SKIP_WAITING') self.skipWaiting();
});

// Cache-first for same-origin assets; network-first for Firebase
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(url.hostname.includes('firebase') || url.hostname.includes('firebaseio')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(res => {
        if(res && res.status === 200 && url.origin === self.location.origin){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
