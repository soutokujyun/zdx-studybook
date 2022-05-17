const router = require("koa-router")();
const jwtAuth = require("koa-jwt");
const secret = "%Yamaha@goodjob!";
const path = require('path')
const fse = require("fs-extra");
// 新增应聘人员
router.post(
  "/file",
  jwtAuth({
    secret,
  }),
  async (ctx) => {
    const file = ctx.request.files.chunk;
    console.log(file);
    const { name, hash } = ctx.request.body;
    
    const chunkPath = path.resolve('./run/staic', hash)
 
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath);
    }

    await fse.move(file.path, `${chunkPath}/${name}`);

    ctx.body = {
        code: 200,
        data: '切片上传成功！'
    }
  }
);


module.exports = router;
