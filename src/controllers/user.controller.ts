import * as express from 'express';
import * as passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import IControllerBase from 'interfaces/ControllerBase.interface';
import { User } from '../models';
import { UserAttributes } from '../interfaces/api-rest';
import { logger } from '../utils/logger';
import { constants } from 'http2';
import * as bcrypt from 'bcrypt';
import { TrackServices } from '../services/track.service';
import * as HttpStatusCode from 'http-status-codes';
import { UserServices } from '../services/user.service';
import { ResponseBody } from '../interfaces/Response.interface';

class UserController implements IControllerBase {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/signup`, this.signup);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
    this.router.put(`${this.path}`, this.updateUser);
    this.router.get(`${this.path}/isLoggedIn`, this.isLoggedIn);
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserAttributes = req.body;
    try {
      const response = await UserServices.signup(user);
      return res.status(response.httpStatus).send(response);
    } catch (e) {
      logger.error('Error in signup Controller', { meta: e });
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        httpStatus: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: 'failed',
        errorDetails: e,
      });
    }
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.send(info);
      }
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        delete user.dataValues.password;
        const result: ResponseBody = {
          httpStatus: HttpStatusCode.OK,
          status: 'successful',
          responseData: user,
        };
        return res.status(constants.HTTP_STATUS_OK).send(result);
      });
    })(req, res, next);
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    req.session.destroy(e => {
      logger.info('Session destroyed');
    });
    res.status(constants.HTTP_STATUS_OK).send('로그아웃 완료');
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserAttributes = req.body;
    try {
      const response = await UserServices.updateUser(user);
      return res.status(response.httpStatus).send(response);
    } catch (e) {
      logger.error('Error in signup Controller', { meta: e });
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        httpStatus: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: 'failed',
        errorDetails: e,
      });
    }
  };

  isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    return res.status(constants.HTTP_STATUS_OK).send(req.isAuthenticated());
  };
}

export default UserController;
