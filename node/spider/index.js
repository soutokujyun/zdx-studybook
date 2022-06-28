const originRequest = require("request")
const iconv = require('iconv-lite')  // 编码
const cheerio = require('cheerio') // 后端的JQuery

function request(url, callback) {
    const option = {
        encoding: null
    }
    originRequest(url, option, callback)
}

for (let i = 102408; i < 102428; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`
    request(url, function(err, res, body){
        const html = iconv.decode(body, 'gb2312')
        const $ = cheerio.load(html)
        console.log($('.title_all h1').text());
    })
}