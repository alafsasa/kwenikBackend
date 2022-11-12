const Sequelize = require('sequelize');

//DB Logins & Configs
const sensitiveDBConfigs = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'mydata12345',
    DB: 'kwenik',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize (
    sensitiveDBConfigs.DB,
    sensitiveDBConfigs.USER,
    sensitiveDBConfigs.PASSWORD,
    {
        host: sensitiveDBConfigs.HOST,
        dialect: sensitiveDBConfigs.dialect,
        operatorAliases: false,
        pool: {
            max: sensitiveDBConfigs.pool.max,
            min: sensitiveDBConfigs.pool.min,
            acquire: sensitiveDBConfigs.pool.acquire,
            idle: sensitiveDBConfigs.pool.idle
        }
    }
);

//init mysql to use Sequelize
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//require modes & init with sequlize
db.userdata = require('../models/userBio.model')(sequelize, Sequelize);


module.exports = db;