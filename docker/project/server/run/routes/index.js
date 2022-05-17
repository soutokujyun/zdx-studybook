const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(__dirname);

files.filter(file => ~file.search(/^[^\.].*\.js$/)).forEach(file => {
  const fileName = file.substring(0, file.length - 3);
  const fileEntity = require(path.join(__dirname, file));
  if (fileName !== 'index') {
    router.use(`/${fileName}`, fileEntity.routes(), fileEntity.allowedMethods());
  }
});

module.exports = router;