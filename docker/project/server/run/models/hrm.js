const sequelize = require("../config/db");
const Sequelize = require("sequelize");

// Human Resource Management DB
const HRM = sequelize.define("hrm", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userName: Sequelize.STRING,
    gender: Sequelize.STRING,
    jobName: Sequelize.STRING,
    // deliveryTime: Sequelize.STRING,
    process: Sequelize.STRING,
    state: Sequelize.STRING,
    tel: Sequelize.STRING,
    residence: Sequelize.STRING,
    school: Sequelize.STRING,
    major: Sequelize.STRING,
    graduation: Sequelize.STRING,
    adaptivePerformance: Sequelize.STRING,
    skillScore: Sequelize.STRING,
    interviewResult: Sequelize.STRING,
    secInterviewResult: Sequelize.STRING
},{
    timestamps: true
});

module.exports = HRM;
