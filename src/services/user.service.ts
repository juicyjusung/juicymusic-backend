import { Tracks, User } from '../models';
import { logger } from '../utils/logger';
import * as HttpStatusCode from 'http-status-codes';
import { ResponseBody } from '../interfaces/Response.interface';
import { UserAttributes } from '../interfaces/api-rest';
import * as bcrypt from 'bcrypt';

export const UserServices = {
  signup: async (user: UserAttributes) => {
    const { userId, name, password } = user;
    try {
      const exUser = await User.findOne({ where: { userId } });
      if (exUser) {
        const result: ResponseBody = {
          httpStatus: HttpStatusCode.OK,
          status: 'successful',
          message: '이미 존재하는 ID입니다.',
        };
        return result;
      }
      const createdUser = await User.create({
        ...user,
        password: await bcrypt.hash(password, 12),
      });

      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: createdUser,
      };
      return result;
    } catch (e) {
      logger.error('Error in signup Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },
  updateUser: async (user: UserAttributes) => {
    const { userId, name, password } = user;
    try {
      const exUser = await User.findOne({ where: { userId } });
      const updatedUser = await exUser.update({
        ...user,
        password: await bcrypt.hash(password, 12),
      });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: updatedUser,
      };
      return result;
    } catch (e) {
      logger.error('Error in signup Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },
};
