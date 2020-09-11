import * as HttpStatusCode from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export const AuthMiddleware = {
  isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.status(HttpStatusCode.UNAUTHORIZED).send('only for logged in users');
    }
  },
};
