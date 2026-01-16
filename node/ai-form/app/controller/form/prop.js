const BaseController = require('../base');

class PropController extends BaseController {

  async add() {
    const { ctx } = this;
    const { label, type } = ctx.request.body;
    const ret = await ctx.model.ComPropDef.create({
      service_id: 'form_01',
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
