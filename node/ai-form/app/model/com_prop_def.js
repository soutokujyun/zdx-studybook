'use strict';

module.exports = app => {
  const { INTEGER, UUIDV4, UUID, JSON } = app.Sequelize;

  const ComPropDef = app.model.define('com_prop_def', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    prop_id: {
      type: UUID,
      defaultValue: UUIDV4,
    },
    prop_vals: JSON,
  }, {
    timestamps: true,
  });

  // alter force
  ComPropDef.sync({ force: true });

  return ComPropDef;
};
