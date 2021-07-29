const dbConfig = require("./db.config");
const Sequelize = require("sequelize");

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.Password, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
module.exports = db;