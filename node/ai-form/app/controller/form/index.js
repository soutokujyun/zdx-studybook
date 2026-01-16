const BaseController = require('../base');

class FormController extends BaseController {
  async info() {
    const { ctx } = this;
    const service_id = 'form_01';
    const ComPropDefList = await ctx.model.ComPropDef.findAll({
      where: {
        service_id,
      },
    });
    const propDefMap = ComPropDefList.map(item => {
      const { prop_id, prop_vals } = item;
      return { prop_id, ...prop_vals };
    });
    const propValues = await ctx.model.ComPropValues.findOne({
      where: {
        service_id,
      },
    });
    this.success({ propDefMap, propValMap: propValues.prop_vals || {} });
  }

  async submit() {
    const { ctx } = this;
    const service_id = 'form_01';
    const { prop_vals } = ctx.request.body;
    if (!prop_vals) {
      this.error('参数错误');
    }
    const valuesRet = await ctx.model.ComPropValues.findOne({
      where: {
        service_id,
      },
    });
    let ret = null;
    if (valuesRet) {
      ret = await ctx.model.ComPropValues.update({
        prop_vals,
      }, {
        where: {
          id: valuesRet.id,
        },
      });
    } else {
      ret = await ctx.model.ComPropValues.create({
        service_id,
        prop_vals,
      });
    }
    if (ret) {
      this.success('提交成功');
    } else {
      this.error('提交失败');
    }
  }
}
module.exports = FormController;
