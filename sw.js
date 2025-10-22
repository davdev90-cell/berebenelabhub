
const CACHE = 'berebenehub-v9-5-2';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE && caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { const r=e.request; e.respondWith(caches.match(r).then(c=>c||fetch(r).then(resp=>{const copy=resp.clone(); caches.open(CACHE).then(cc=>cc.put(r,copy)); return resp;}).catch(()=>caches.match('./index.html')))); });
