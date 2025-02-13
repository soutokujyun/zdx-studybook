const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  console.log(req.method);
  const params = qs.parse(query)

  const data = { name: 'zdx', id: params.id }

  if (params.callback) {
    // 服务端将要返回的字符串
    str = `${params.callback}(${JSON.stringify(data)})`
    res.end(str)
  } else {
    res.end()
  }
});

server.listen(10011, () => console.log("Done"));
