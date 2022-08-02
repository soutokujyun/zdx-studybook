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
> 强缓存会将数据缓存到内存和硬盘中，首先先去内存中读取，然后再到硬盘中读取
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

## DNS
### DNS 域名解析过程
1. 浏览器DNS缓存中是否存在域名的IP地址
2. 操作系统DNS缓存检查 + host文件检查
3. 路由器缓存检查
4. 本地DNS服务器 -- 指的是互联网服务提供商

5. 本地DNS服务器向根域名服务器(.)发起解析请求，返回顶级域名服务器的IP
6. 本地DNS服务器通过顶级域名服务器(.com)IP发起解析请求，返回权威域名服务器
7. 本地DNS服务器通过权威域名服务器(baidu.com)IP发起解析请求，返回该域名的IP地址
8. 本地DNS服务器缓存该域名的IP地址并返回给客户端。

### DNS 预解析
大型网站，有多个不同服务器资源的情况下，都可采取DNS预解析，提前解析，减少页面卡顿。
```
<link rel="dns-prefetch" href="//a.baidu.com">
<link rel="dns-prefetch" href="//b.baidu.com">
<link rel="dns-prefetch" href="//c.baidu.com">
```
## 建立连接 -- TCP/IP连接： 3次握手
位码即tcp标志位，有6种标示：
* SYN(synchronous建立联机)
* ACK(acknowledgement 确认)
* PSH(push传送)
* FIN(finish结束)
* RST(reset重置)
* URG(urgent紧急)

3次握手：
* 第一次握手：客户端会发送携带随机数seq=x且标志位SYN=1的TCP包到服务端（SYN=1, seq=x）
* 第二次握手：服务端收到请求确认信息，向客服端发送携带随机数seq=y，确认码ACK=x+1,标志位SYN=1（SYN=1，ACK=x+1, seq=y）
* 第三次握手：客户端收到后验证ACK确认码（即第一次客户端发送的随机数），验证成功后，发送ACK=y+1,seq=z的随机数到服务端，服务端接收到并验证ACK成功后建立连接。
> TCP三次握手会在任何连接被建立之前发生一次。最终，当发送了所有数据之后，服务器发送一个消息，表示不会再有更多数据向客户端发送了；则客户端才会关闭连接（断开 TCP）
> 3次握手是为了验证客户端和服务端都有接收和发送的能力。

4次挥手：
* 第一次挥手：客户端发送携带随机数seq=u且标志位位FIN=1的TCP包到服务端（FIN=1,seq=u）
* 第二次挥手：服务端收到FIN报文，发送ACK=1,ack序列值为u+1，随机数seq=1到服务端，表明收到客户端关闭链接请求
* 第三次挥手：服务端在确认所有数据发送完毕可以关闭链接时，发送携带随机数seq=w的FIN报文，确认码ACK=1，确认码序列值为u+1。
* 第四次挥手：客户端接收到关闭确认请求验证ACK确认码后，向服务端发送确认码为ACK=1,确认码编号w+,序列标号为u+1到服务端，服务端收到后关闭链接。
> 4次挥手是为了确保数据能够完整的传输。

## HTTP
### HTTP协议
HTTP是应用层协议，定义的是传输数据的内容的规范；
HTTP协议中的数据是利用TCP协议传输的，所以支持HTTP也就一定支持TCP。
大致执行过程：
1. 客户端发起请求时，HTTP协议生成针对目标Web服务器的HTTP请求报文
2. TCP协议是将HTTP报文按序号分割成报文段，把每个报文段传给服务端
3. 通过服务端IP地址在路由器中中转和传送
4. 服务端通过TCP协议接收报文段，按序号重组请求报文
5. 服务端通过HTTP协议对请求的报文进行处理

### 特点
* 支持客户/服务器（B/S）模式。
* 简单快速客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有 GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于 HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。
* 灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type（Content-Type是HTTP包中用来表示内容类型的标识）加以标记。
* 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
* 无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

### HTTPS
在HTTP的基础上再加一层TLS（传输层安全性协议）或者SSL（安全套接层）就构成了HTTPS协议。
HTTPS默认工作在TCP协议443端口，大概工作流程：
1. TCP三次握手
2. 客户端验证服务器数字证书
3. DH算法（密钥的交换的加密算法）协商对称加密算法的密钥、hash算法密钥
4. SSL安全加密隧道协商完成
5. 网页以加密的方式传输，用协商的对称加密算法和密钥加密，保证数据机密性；用协商的hash算法进行数据完整性保护，保证数据不被篡改。

大概对话过程
客户端：我现在支持的SSL版本、加密算法、密钥交换算法、MAC算法等是...这些，需要你确定一个。
服务端：我的证书信息是...，如果你需要的话可以验证。往后我们使用的加密算法是...，公钥信息是...
客户端：你的证书我已经验证过了，以后我说的话会使用...加密算法。
服务端：好的，我知道了，我也会用...加密算法说话，现在我们TSL握手成功。

> HTTPS连接 需要7次握手，3次TCP + 4次TLS

## 资源下载
TCP连接建立完成，浏览器发送HTTP请求（请求行，请求头，请求体）。
* 请求行：请求方法（GET）+ 请求URL(/baidu.com?s=123) + HTTP协议版本(HTTP/1.1)
* 请求头：HOST、Connection、Cache-Control、Cookie等
* 请求体：如为POST请求的参数
服务器接收到HTTP完整请求数据，对请求信息处理，处理结束返回数据（响应行，响应头，响应体）给浏览器。
* 响应行：HTTP协议版本(HTTP/1.1) + 状态码（200 OK）
* 响应头：Content-Type、Last-Modified等
* 响应体：返回的内容(HTML资源、图片资源、文本资源)

浏览器拿到HTTP的状态码，根据Content-Type来判断响应文件类型。
* stream 类，浏览器启动下载界面下载文件
* text 图片类，浏览器直接展示在页面上。
* html 类，浏览器会进行页面解析

## 浏览器渲染页面
```
HTML资源      -> HTML Parser  -> DOM Three
                                    |
                                   合并  -> 生成Render Three -> Layout渲染树布局 -> 绘制 -> display
                                    |
Style Sheets -> CSS Parser   -> CSSOM Three
```
### 构建DOM树
浏览器从服务器拿到 HTML 文档后，遍历所有的节点生成 DOM 树；

大致过程：字节 -> 字符 -> TOKEN -> 节点 -> 对象模型

* 浏览器从服务器拿到HTML资源的原始字节。（3C 68 74 6D ... 6D 6C 3E）
* 将原始字节根据指定编码（如UTF-8）转换成字符。(```<html><head>...</head><body>...</body></html>```)
* 将字符串转换成W3C HTML5规定的各种令牌。（[StartTag:html] [StartTag:head] ... [EndTag:head] ... [EndTag:html]）
* 词法分析：根据令牌转换赋有相应属性的DOM节点。
* DOM构建： 将DOM对象构建成树型结构
```
            html
           /      \
        head       body
        /  \      /  |  \
    meta   link  p  div img
                /    |
              span  img
 ```

DOM 树的构建可能会被 CSS 和 JS 的加载而阻塞： 
1. DOM解析时遇到Script脚本标签，HTML解析器会暂停工作，javascript引擎介入并执行script标签的脚本  (如果是外部引用script，则会执行下载再执行步骤)，脚本执行完，HTML解析器恢复工作，继续解析后面的内容，直至生成最终的DOM。

    优化：
    1. 使用CDN，gzip等手段提速script下载；
    2. 如果javascript代码没有操作DOM相关代码，那么可以对script标签标记为async或defer并行加载
    
    async和defer区别：
    1. async: 脚本并行加载，加载完成之后立即执行，执行时机不确定，仍有可能阻塞HTMl解析，执行时机在load事件派发之前。
    2. defer: 脚本并行加载，等待HTML解析完成之后，按照加载顺序执行脚本，执行时机在DOMContentLoaded事件派发之前。
2.  javascript代码 执行之前 会先解析所有的CSS(如果有外部引用的css样式，先下载再解析。
> 总结：Javascript会阻塞DOM生成，而样式文件又会阻塞JS执行。
### 构建CSSOM树
浏览器会解析 CSS 文件并生成 CSS 规则树，每个 CSS 文件都会被解析成 StyleSheet 对象，每个对象都包括 CSS 规则，CSS规则对象包括对应的选择器和声明对象以及其他对象；

大致过程：字节 -> 字符 -> TOKEN -> 节点 -> CSSOM

```
body { font-size: 16px; }
p { font-weight: bold; }
p span { display: none; }
div { width: 250px; }
```
转换
```
            body (font-size: 16px)
           /                    \
    p (font-weight: bold)       div (width: 250px)
    /
span (display: none)
```

> 1. CSS 的解析可以与 DOM 的解析同步进行
> 2. CSS 的解析与 script 的执行互斥
> 3. 在 Webkit 内核中进行了 script 执行优化，只有在 JS 访问 CSS 时才会发生互斥

### 生成渲染树
浏览器首先遍历 DOM 树上的每一个可见节点，然后对每个可见节点找到匹配的 CSS 样式规则并应用。

渲染树只包含渲染网页所需的节点：
1. 渲染树和 DOM 树不完全对对应；
2. display: none 的元素不在渲染树中；
3. visiblity: none 的元素在渲染树中；

### 渲染树布局（Layout）
布局阶段浏览器会遍历渲染树的所有节点，由于每个节点都是一个render对象，都包含宽高、位置、背景等样式信息，所以浏览器就能根据这些信息来确定元素在页面（设备视口）中的确切位置和大小。

### 绘制
浏览器遍历所有的渲染树节点，获取节点的绝对像素。渲染树的绘制工作是由浏览器的 UI后端 完成。

> 避免重排和重绘

### Display
将像素发送给GPU，将其渲染在屏幕上。
