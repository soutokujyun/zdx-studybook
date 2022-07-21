self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('v1').then(cache => {
            // 预先缓存文件
            return cache.addAll([
                '/pwa.html',
                '/assets/css/index.css'
            ])
        })
    )
})

self.addEventListener( "activate", event => {
    console.log('WORKER: activate event in progress.');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // 检测是否已经缓存过
                if (response) {
                    return response
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        // 检测请求是否有效
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open('v1')
                            .then(function (cache) {
                                return cache.delete(event.request)
                                .then(function() {
                                    cache.put(event.request, responseToCache);
                                })
                            });

                        return response;
                    }
                );
            }).catch(function(err) {
                return caches.match(event.request)
            })
    )
})