if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('./sw.js')
            .then((reg) => console.log('[SW] registered', reg))
            .catch((err) => console.log('[SW] not registered', err))
    })
}
