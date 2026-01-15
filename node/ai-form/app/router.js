/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.view.index.index);

  router.group({ name: 'form', prefix: '/form' }, router => {
    const { info } = controller.form.index;
    router.get('/info', info);
    const { add } = controller.form.index;
    router.post('/add', add);
  });
};
