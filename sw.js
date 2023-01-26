const cacheName = 'timer-v001'
const assets = [
    './',
    './manifest.json',
    './index.html',
    './style.css',
    './index.js',
    './utils.js',
    './Timer.js',
    './sw-reg.js',
    './sw.js',
    './images/delete.png',
    './images/pin.png',
    './images/reset.png',
    './images/save.png',
    './images/stopwatch.png',
    './images/time.png',
    './audio/alarm.mp3',
    // './offline.html',
]
// const assetsNetwork = []

self.addEventListener('install', (event) => {
    console.log('[SW] install', event)

    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[SW] Cashing in', cacheName, cache)
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', async (event) => {
    console.log('[SW] activate', event)

    const cachesList = await caches.keys()
    cachesList.forEach(async (cache) => {
        if (cache !== cacheName) {
            console.warn('[SW] Delete old cache:', cache)
            await caches.delete(cache)
        }
    })

    console.log('[SW] activate END')
})

self.addEventListener('fetch', (event) => {
    console.log('[SW] fetch >>', event.request.url)
    let options = {}
    if (event.request.url.endsWith('.js')) {
        console.log('[SW] !! contains .JS')
        options = { ignoreVary: true }
    }
    // event.respondWith(
    //     caches.match(event.request, options).then((cache) => {
    //         console.log('[SW] << match', cache.url)
    //         return cache || fetch(event.request)
    //     })
    // )
    event.respondWith(cacheFirst(event.request, options))
})

async function cacheFirst(request, options) {
    const cached = await caches.match(request, options)
    console.log('[SW] << match', cached?.url)
    return cached ?? (await fetch(request))
}

// Что такое PWA. Как работают Service Workers
// https://www.youtube.com/watch?v=ifroMW_F4Sc

// self.addEventListener('fetch', (event) => {
//     const { request } = event
//     const url = new URL(request.url)
//     if (url.origin === location.origin) {
//         event.respondWith(cacheFirst(request))
//     } else {
//         event.respondWith(networkFirst(request))
//     }
// })

// async function cacheFirst(request) {
//     const cached = await caches.match(request)
//     return cached ?? (await fetch(request))
// }
// async function networkFirst(request) {
//     const cache = await caches.open(assetsNetwork)
//     try {
//         const response = await fetch(request)
//         await cache.put(request, response.clone())
//         return response
//     } catch (e) {
//         const cached = await cache.match(request)
//         return cached ?? (await caches.match('/offline.html'))
//     }
// }
