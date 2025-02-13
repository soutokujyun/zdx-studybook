const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  if (pathname == "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-type": "text/plain;charset=utf-8" });
        response.end("500 服务器错误");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end(data);
      }
    });
    return;
  } else {
      res.end()
  }
  //   const params = qs.parse(query)

  //   const data = { name: 'shanyue', id: params.id }

  //   if (params.callback) {
  //     // 服务端将要返回的字符串
  //     str = `${params.callback}(${JSON.stringify(data)})`
  //     res.end(str)
  //   } else {
  //     res.end()
  //   }
});

server.listen(10010, () => console.log("Done"));
