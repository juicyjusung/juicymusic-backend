import * as sequelize from 'sequelize';
import { UserModel } from './User';
import { sequelizeConfig } from '../config/config';

const { database, username, password } = sequelizeConfig;
console.log(sequelizeConfig);

export const dbConfig = new sequelize.Sequelize(
  database,
  username,
  password,
  sequelizeConfig
);
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const User = UserModel(dbConfig);

// Skills.belongsToMany(User, { through: user_has_skills });
