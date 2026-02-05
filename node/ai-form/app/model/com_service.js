'use strict';
module.exports = app => {
  const { INTEGER, UUIDV4, UUID, STRING } = app.Sequelize;

  const ComService = app.model.define('com_service', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    service_id: {
      type: UUID,
      defaultValue: UUIDV4,
    },
    name: STRING, // 服务名称
  }, {
    timestamps: true,
  });

  // alter true
  ComService.sync({ alter: false });

  return ComService;
};
