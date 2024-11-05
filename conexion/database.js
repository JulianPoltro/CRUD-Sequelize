const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const ENV = process.env.NODE_ENV || 'local'
dotenv.config({ path: `.env.${ENV}` })

// process.loadEnvFile();
// const { DBUSER, PASSWORD, HOST, DATABASE } = process.env;

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
  });

module.exports = { sequelize };
