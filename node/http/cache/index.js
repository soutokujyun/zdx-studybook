
function updateTime() {
    // !this.settime || (this.time = new Date().toUTCString())
    this.settime = this.settime || (setInterval(() => this.time = new Date().toUTCString(), 5000) && (this.time = new Date().toUTCString()) );
    return this.time
}

const http = require("http")
http.createServer((req, res) => {
    const {url} = req
    if (url === '/') {
        res.end(`
            <html>
                html Update Time ${updateTime()}
                <script src='main.js'></script>
            </html>
        `)
    } else if(url === '/main.js'){
        const content = `document.writeln('<br>JS Update Time: ${updateTime()}')`
        // 强缓存策略
        // 1.http1.0 Expires 设置过期时间
        // res.setHeader('Expires', new Date(Date.now() + 10* 1000).toUTCString())
        // 2.http1.1 Cache-Control 设置多少秒内有效时间 优先度大于Expires
        // res.setHeader('Cache-Control', 'max-age=20')
        // res.statusCode = 200
        // res.end(content)

        
        // 协商缓存
        // 1.last-modified & if-modified-since 通过协商修改时间为基础的策略  
        // res.setHeader('Cache-Control', 'no-cache'); // 强制使用协商缓存
        // res.setHeader('last-modified', new Date().toUTCString())
        // if(new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
        //     console.log('协商缓存命中...');
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }
        // 2.etag & if-none-match 通过内容判断，一般的做法时将返回内容进行摘要（Hash），然后通过对比摘要来判断内容是否更新
        const crypto = require('crypto')
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Cache-Control', 'no-cache'); // 强制使用协商缓存
        res.setHeader('Etag', hash)
        if(req.headers['if-none-match'] === hash) {
            console.log('Etag 缓存命中...');
            res.statusCode = 304
            res.end()
            return
        }
    } else if(url === './favicon.icon'){
        res.end('')
    } else {
        res.end('')
    }
})
.listen(3000, () => {
    console.log('Http Cache Test Run at ' + 3000);
})