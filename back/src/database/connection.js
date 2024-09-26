const { Sequelize, QueryTypes } = require("sequelize");
require('dotenv').config();

let config = process.env.DB_URL;

if(!config || config.length <= 0) {
    config = {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
}

const connection = new Sequelize(config);

module.exports = connection;
