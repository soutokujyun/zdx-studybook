/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.view.index.index);

  router.group({ name: 'form', prefix: '/form' }, router => {
    const { info, submit } = controller.form.index;
    router.get('/info', info);
    router.post('/submit', submit);
  });

  router.group({ name: 'prop', prefix: '/prop' }, router => {
    const { add } = controller.form.prop;
    router.post('/add', add);
  });
};
