const BaseController = require('../base');

class PropController extends BaseController {

  async add() {
    const { ctx } = this;
    const { label, type, service_id } = ctx.request.body;
    console.log(label, type, service_id);
    if (!service_id) {
      this.error('参数错误');
    }
    const ret = await ctx.model.ComPropDef.create({
      service_id,
      prop_vals: {
        label,
        type,
      },
    });
    if (ret.id) {
      this.success('添加成功');
    } else {
      this.error('添加失败');
    }
  }
}
module.exports = PropController;
