const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    nickname: Sequelize.STRING,
    avatar: Sequelize.STRING,
    email: Sequelize.STRING
}, {
    timestamps: true
});

module.exports = User;
