const BaseController = require('../base');

class ServiceController extends BaseController {
  async add() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    const ret = await ctx.model.ComService.create({
      name,
    });
    if (ret.id) {
      this.success('添加成功');
    } else {
      this.error('添加失败');
    }
  }

  async list() {
    const { ctx } = this;
    const ComServiceList = await ctx.model.ComService.findAll();
    this.success({ serviceList: ComServiceList || [] });
  }
}
module.exports = ServiceController;
