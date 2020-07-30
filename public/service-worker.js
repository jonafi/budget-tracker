self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/icons/144x144.png',
                '/icons/200x200.png',
                'db.js',
                'index.html',
                '/',
                'index.js',
                'styles.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                let responseClone = response.clone();
                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
        }
    }));
});
