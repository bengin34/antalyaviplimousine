const CACHE_PREFIX = 'vip-admin-shell-'
const CACHE_NAME = `${CACHE_PREFIX}v2`
const ADMIN_ROOT = new URL('./', self.location.href)
const INDEX_URL = new URL('index.html', ADMIN_ROOT)

async function cacheAdminShell() {
  const cache = await caches.open(CACHE_NAME)
  const response = await fetch(INDEX_URL, { cache: 'no-cache' })
  if (!response.ok) throw new Error('Admin shell could not be cached')

  await cache.put(ADMIN_ROOT, response.clone())
  await cache.put(INDEX_URL, response.clone())

  const html = await response.text()
  const assetURLs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
    .map(match => new URL(match[1], INDEX_URL))
    .filter(url => url.origin === self.location.origin)

  await Promise.allSettled(assetURLs.map(async url => {
    const assetResponse = await fetch(url, { cache: 'no-cache' })
    if (assetResponse.ok) await cache.put(url, assetResponse)
  }))
}

self.addEventListener('install', event => {
  event.waitUntil(cacheAdminShell())
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME)
          await cache.put(request, response.clone())
        }
        return response
      } catch {
        return (await caches.match(request))
          || (await caches.match(INDEX_URL))
          || (await caches.match(ADMIN_ROOT))
      }
    })())
    return
  }

  event.respondWith((async () => {
    const cached = await caches.match(request)
    const network = fetch(request).then(async response => {
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME)
        await cache.put(request, response.clone())
      }
      return response
    }).catch(() => null)

    return cached || (await network) || Response.error()
  })())
})
