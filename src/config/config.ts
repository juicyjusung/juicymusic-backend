import * as dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config(
  process.env.NODE_ENV === 'production'
    ? { path: `${__dirname}/../../.env.prod` }
    : { path: `${__dirname}/../../.env.dev` }
);

export const sequelizeConfig: Options = {
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  host: process.env.SEQUELIZE_HOST,
  dialect: 'mysql',
  logging: process.env.NODE_ENV !== 'production',
};
