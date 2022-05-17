const router = require('koa-router')();
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const User = require("../models/user");
const md5 = require("md5");
const { Op } = require("sequelize");

const secret = HashSalt = "%Yamaha@goodjob!";

router.get("/", (ctx) => {
    ctx.body = '测试用例';
});

// 注册
router.post("/register", async (ctx) => {
    let { username, email, emailcode, password, nickname } = ctx.request.body;

    // 验证邮箱验证码
    if (ctx.session.emailcode !== emailcode) {
        ctx.body = {
            code: 403,
            message: '验证码不正确'
        }
        return
    }

    // 验证邮箱和用户名是否重复
    let ret = await User.findOne({ 
        where:{ 
            [Op.or]:[
                { username: username }, 
                { email: email }
            ]
        } 
    })
    if (ret) {
        ctx.body = {
            code: 403,
            message: '用户名或邮箱已被占用'
        }
        return
    }

    ret = await User.create({
        username,
        password: md5(password + HashSalt),
        nickname,
        email,
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    });

    if (ret) {
        ctx.body = {
            code: 200,
            data: {
                username
            }
        }
    } else {
        ctx.body = {
            code: 403,
            message: '注册失败，请重试'
        }
    }
});

// 登录，获取token
router.post("/login", async (ctx) => {
    const { body } = ctx.request;
    // 验证码
    if(body.captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
        // 登录逻辑
        let ret = await User.findOne({ where:{ username: body.username, password:md5(body.password + HashSalt)} })
        if (ret == null) {
            ctx.body = {
                code: 403,
                message: "登录失败，账号或密码错误"
            };
            return;
        }
        // 设置session
        ctx.body = {
            code: 200,
            message: "登录成功",
            // 生成 token 返回给客户端
            data: jwt.sign(
                {
                    data: ret.dataValues.username,
                    // 设置 token 过期时间，2小时后，秒为单位
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
                },
                secret
            ),
        };
    } else {
       
        ctx.body = {
            code: 403,
            message: "验证码错误！"
        };
        return;
    }
});
router.get(
    "/info",
    jwtAuth({
        secret,
    }),
    async (ctx) => {
        let username = ctx.state.user.data;
        let ret = await User.findOne({ 
            attributes: ['username', 'avatar'],
            where:{ username: username},
        });
        if (ret == null) {
            ctx.body = {
                code: 400,
                message: "获取用户信息失败！"
            }
            return;
        }
        // 返回值
        ctx.body = {
            code: 200,
            message: "获取数据成功",
            data: {...ret.dataValues, roles:['admin']}
        };
    }
);

module.exports = router