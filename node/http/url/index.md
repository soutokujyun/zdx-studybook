# url
## 解析
浏览器解析：
```
    https://www.baidu.com:80/news?id=123#main

    https:// + www.baidu.com + :80 + /news + ?id=123 + #main
    协议            主机        端口    路径      参数     锚点
```
并构造一个http请求。

### HSTS
由于安全隐患，会使用 HSTS 强制客户端使用 HTTPS 访问页面。
当你的网站均采用 HTTPS，并符合它的安全规范，就可以申请加入 HSTS 列表，之后用户不加 HTTPS 协议再去访问你的网站，浏览器都会定向到 HTTPS。无论匹配到没有，都要开始 DNS 查询工作了。

### 资源缓存
1. 强缓存策略：请求发送前会根据请求头 expires 和 cache-control 判断缓存是否命中，如果命中则去缓存中取数据，否则进入下一步。
```
// 强缓存策略
// 1.http1.0 Expires 设置过期时间
res.setHeader('Expires', new Date(Date.now() + 10* 1000).toUTCString())
// 2.http1.1 Cache-Control 设置多少秒内有效时间 优先度大于Expires
res.setHeader('Cache-Control', 'max-age=20')
```
2. 协商缓存：没有命中强缓存规则，浏览器会发送请求，根据请求头 If-Modified-Since 和 If-None-Match 判断是否命中协商缓存，如果命中，直接从缓存中取资源，否则直接获取资源。
```
// 1. last-modified & if-modified-since 通过协商修改时间为基础的策略
res.setHeader('Cache-Control', 'no-cache'); // 强制使用协商缓存
res.setHeader('last-modified', new Date().toUTCString())
if(new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
    console.log('协商缓存命中...');
    res.statusCode = 304
    res.end()
    return
}

或
// 2.etag & if-none-match 通过内容判断，一般的做法时将返回内容进行摘要（Hash），然后通过对比摘要来判断内容是否更新
res.setHeader('Cache-Control', 'no-cache'); // 强制使用协商缓存
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
```
> 如果两种方式都支持的话，服务器会优先考虑ETag。

### 资源存储位置


## DNS 域名解析