const CACHE_NAME = 'YMA'
const urlsToCache = [
	'./index.html',
	'./styles/index.css',
	'./styles/reset.css',
	'./scripts/index.js',
	'./assets/icons/logo.png',
]

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(urlsToCache)
		}),
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				return response
			}
			return fetch(event.request)
		}),
	)
})

self.addEventListener('activate', event => {
	const cacheWhitelist = [CACHE_NAME]
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName)
					}
				}),
			)
		}),
	)
})
