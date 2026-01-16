const BaseController = require('../base');

class FormController extends BaseController {
  async info() {
    const { ctx } = this;
    const service_id = 'form_01';
    const ComPropDefList = await ctx.model.ComPropDef.findAll({
      where: {
        service_id,
      }
    });
    const propDefMap = ComPropDefList.map((item) => {
      const { prop_id, prop_vals } = item;
      return { prop_id, ...prop_vals };
    })
    const propValMap = {};
    propDefMap.forEach((item) => {
      const { prop_id } = item;
      propValMap[prop_id] = '';
    })
    this.success({ propDefMap, propValMap });
  }

  async add() {
    const { ctx } = this;
    const ret = await ctx.model.ComPropDef.create({
      service_id: 'form_01',
      prop_vals: {
        label: '姓名',
        type: 'input',
      }
    });
    console.log(ret);
    if (ret.id) {
      this.success('添加成功');
    } else {
      this.error('添加失败');
    }
  }
}
module.exports = FormController;
