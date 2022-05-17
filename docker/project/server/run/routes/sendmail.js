const router = require('koa-router')();
const sendmail = require('../service/sendmail.js')
// 发送邮件
router.get("/", async (ctx) => {
        let { email } = ctx.request.query;

        if (!email) {
            ctx.body = {
                code: 400,
                message: '请输入正确邮箱地址'
            }
            return
        }
        let code = Math.random().toString().slice(2, 6);
        let subject = '雅马哈信息', 
        text = '', 
        html = `【雅马哈信息】验证码 ${code}，请在10分钟内使用，为保障您的账号安全，请勿将此邮件转发给他人`
        let ret = await sendmail({email, subject, text, html});
        if (ret) {
            ctx.session.emailcode = code;
            ctx.body = {
                code: 200
            }
        } else {
            ctx.body = {
                code: 400,
                message: '请输入正确邮箱地址'
            }
        }
    }
);

module.exports = router