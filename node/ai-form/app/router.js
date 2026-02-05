/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.view.index.index);

  router.group({ name: 'service', prefix: '/service' }, router => {
    const { add, list } = controller.service.index;
    const { serviceList } = controller.view.index;
    router.get('/', serviceList);
    router.post('/add', add);
    router.get('/list', list);
  });


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
