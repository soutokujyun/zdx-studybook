'use strict';

module.exports = app => {
  const { INTEGER, UUIDV4, UUID, JSON, STRING } = app.Sequelize;

  const ComPropDef = app.model.define('com_prop_def', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    prop_id: {
      type: UUID,
      defaultValue: UUIDV4,
    },
    service_id: STRING, // 服务ID
    prop_vals: JSON,
  }, {
    timestamps: true,
  });

  // alter force
  ComPropDef.sync({ force: false });

  return ComPropDef;
};
