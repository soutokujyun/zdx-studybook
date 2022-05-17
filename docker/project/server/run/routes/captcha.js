const router = require('koa-router')();
const svgCaptcha = require('svg-captcha');
// 注册
router.get("/", (ctx) => {
    const captcha = svgCaptcha.create({
        size: 4,
        noise: 2,
        fontSize: 50,
        with: 120,
        height: 47,
        background: '#fff'
    });
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data
});

module.exports = router