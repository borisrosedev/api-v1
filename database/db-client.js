const path = require("node:path");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV == "prod" ? "../.env.prod" : "../.env.local",
  ),
});

const dbClient = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
  },
);

module.exports = dbClient;
