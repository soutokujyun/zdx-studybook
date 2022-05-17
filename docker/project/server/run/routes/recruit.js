const router = require("koa-router")();
const jwtAuth = require("koa-jwt");
const secret = "%Yamaha@goodjob!";
const HRM = require("../models/hrm");
const { Op, fn, col } = require("sequelize");

// 新增应聘人员
router.post(
  "/add",
  jwtAuth({
    secret,
  }),
  async (ctx) => {
    let userinfo = ctx.request.body;
    try {
      let ret = await HRM.create(userinfo);
      ctx.body = {
        code: 200,
        data: ret,
      };
    } catch (error) {
      ctx.body = {
        code: 406,
        message: "格式有误",
      };
    }
  }
);

router.post(
  "/getlist",
  jwtAuth({
    secret,
  }),
  async (ctx) => {
    let { page, limit, process, state, userName, daterange, graduation } =
      ctx.request.body;

    let whereOps = [];

    process && whereOps.push({ process });
    state && whereOps.push({ state });
    userName && whereOps.push({ userName: { [Op.like]: `%${userName}%` } });

    daterange &&
      whereOps.push({
        createdAt: {
          [Op.gt]: daterange[0],
          [Op.lt]: daterange[1],
        },
      });

    graduation && whereOps.push({ graduation });

    let userInfos = await HRM.findAll({
      where: {
        [Op.and]: whereOps,
      },
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", "DESC"]],
    });

    let total = await HRM.count({
      where: {
        [Op.and]: whereOps,
      },
    });

    ctx.body = {
      code: 200,
      data: {
        items: userInfos,
        total: total,
      },
    };
  }
);

router.post(
  "/update/info",
  jwtAuth({
    secret,
  }),
  async (ctx) => {
    let {
      id,
      adaptivePerformance,
      skillScore,
      interviewResult,
      secInterviewResult,
    } = ctx.request.body;

    // 验证邮箱验证码
    if (!id) {
      ctx.body = {
        code: 403,
        message: "出错了，请重试",
      };
      return;
    }

    let ret = await HRM.update(
      {
        adaptivePerformance,
        skillScore,
        interviewResult,
        secInterviewResult,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!ret) {
      ctx.body = {
        code: 403,
        message: "出错了，请重试",
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: {
        ret,
      },
    };
  }
);

module.exports = router;
