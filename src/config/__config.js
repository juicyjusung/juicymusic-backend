require('dotenv').config(
  process.env.NODE_ENV === 'production'
    ? { path: `${__dirname}/../../.env.prod` }
    : { path: `${__dirname}/../../.env.dev` }
);

module.exports = {
  development: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
