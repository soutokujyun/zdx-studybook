var cacheName = 'pwa-v2';
// 安装
// 初始化缓存并添加离线应用时所需的文件
self.addEventListener('install', function (event) {
    const preCache = async () => {
        // 使用给定的名字开启了一个缓存
        const cache = await caches.open(cacheName);
        // 将应用所需要缓存的文件全部添加到缓存中
        return cache.addAll([
            '/pwa.html',
            '/assets/js/main.js',
            '/assets/css/index.css'
        ]);
    };
    // event.waitUntil 是告诉事件分发器该事件仍在进行。
    // Service Worker 会等到 waitUntil 里面的代码执行完毕之后才开始安装。
    event.waitUntil(preCache());
    // 更新版本时触发
    event.waitUntil(self.skipWaiting());
})

// 激活
// 删除那些我们已经不需要的文件或者做一些清理工作
self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if(cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
});

// 响应请求：应用发起 HTTP 请求的时候被触发
// 允许我们拦截请求并对请求作出自定义的响应
self.addEventListener('fetch', function (event) {
    event.respondWith(
        // 匹配当前访问的请求
        caches.match(event.request)
            .then(function (response) {
                // 检测是否已经缓存过
                if (response) {
                    // 如果缓存过，直接返回缓存的资源
                    return response
                }

                // 没缓存，会转而从网络中请求数据，然后将它缓存起来。

                // 获取当前url请求信息
                var fetchRequest = event.request.clone();

                // 请求资源
                return fetch(fetchRequest).then(
                    function (response) {
                        // 检测请求是否有效
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();
                        // 重新缓存
                        caches.open(cacheName)
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