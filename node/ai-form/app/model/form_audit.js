'use strict';
// ai表单审计日志
module.exports = app => {
  const { INTEGER, JSON, TEXT, UUID, STRING } = app.Sequelize;

  const FormAudit = app.model.define('form_audit', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    service_id: UUID, // 表单ID
    action: STRING, // 操作类型
    prompt: TEXT, // 提示内容
    response: JSON, // 响应内容
  }, {
    timestamps: true,
  });

  // alter true
  FormAudit.sync({ alter: false });

  return FormAudit;
};
