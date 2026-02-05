const BaseController = require('../base');

class ViewController extends BaseController {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    const list = [{ url: '/news/1', title: 'News 1' }, { url: '/news/2', title: 'News 2' }];
    await ctx.render('index.html', { list });
  }

  async serviceList() {
    const { ctx } = this;
    await ctx.render('service.html');
  }
}
module.exports = ViewController;
