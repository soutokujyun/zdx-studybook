if ('serviceWorker' in navigator) {
    // 注册service worker
    navigator.serviceWorker.register('/sw.js')
    .then(reg => {
        console.log('service worker registed!');
    })
}