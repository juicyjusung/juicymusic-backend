import * as sequelize from 'sequelize';
import { UserFactory } from './User';
import { sequelizeConfig } from '../config/config';
import { TrackFactory } from './Track';

const { database, username, password } = sequelizeConfig;

export const dbConfig = new sequelize.Sequelize(
  database,
  username,
  password,
  sequelizeConfig
);
// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const User = UserFactory(dbConfig);
export const Tracks = TrackFactory(dbConfig);
// Skills.belongsToMany(User, { through: user_has_skills });
Tracks.belongsTo(User);
User.hasMany(Tracks);
