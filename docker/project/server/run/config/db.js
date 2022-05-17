const Sequelize = require("sequelize");

// 需要创建数据表 school
const sequelize = new Sequelize("school", "root", "Ymslx-2020", {
    host: "mysql",
    dialect: "mysql",
    operatorsAliases: false,
});

module.exports = sequelize;