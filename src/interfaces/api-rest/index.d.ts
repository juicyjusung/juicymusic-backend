import { BuildOptions, Model } from 'sequelize';

/*************
 *  User
 **************/
export interface UserAttributes {
  id?: number;
  userId: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}
export type UserStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

/*************
 *  Track
 **************/
export interface TrackAttributes {
  title: string;
  artist: string;
  album: string;
  albumArt?: string;
  filePath: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TrackModel extends Model<TrackAttributes>, TrackAttributes {}
export class Track extends Model<TrackModel, TrackAttributes> {}
export type TrackStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): TrackModel;
};
