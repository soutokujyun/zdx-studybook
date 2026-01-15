/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
    package: 'egg-static',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  routerGroup: {
    enable: true,
    package: 'egg-router-group',
  },
};
