import { BuildOptions, Model } from 'sequelize';
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
  new (values?: Record<strin, unknown>, options?: BuildOptions): UserModel;
};
export interface SkillsAttributes {
  id: number;
  skill: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SkillsModel extends Model<SkillsAttributes>, SkillsAttributes {}
export class Skills extends Model<SkillsModel, SkillsAttributes> {}
export type SkillsStatic = typeof Model & {
  new (values?: Record<strin, unknown>, options?: BuildOptions): SkillsModel;
};
