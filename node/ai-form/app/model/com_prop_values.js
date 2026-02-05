'use strict';

module.exports = app => {
  const { INTEGER, UUIDV4, UUID, JSON, STRING } = app.Sequelize;

  const ComPropValues = app.model.define('com_prop_values', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    biz_id: {
      type: UUID,
      defaultValue: UUIDV4,
    },
    service_id: UUID, // 服务ID
    prop_vals: JSON,
  }, {
    timestamps: true,
  });

  // alter force
  ComPropValues.sync({ alter: false });

  return ComPropValues;
};
