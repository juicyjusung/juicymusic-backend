import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import IControllerBase from 'interfaces/ControllerBase.interface';
import { AuthMiddleware } from '../middleware/auth';
import * as HttpStatusCode from 'http-status-codes';

import { TrackServices } from '../services/track.service';
import { logger } from '../utils/logger';
import { Track, TrackAttributes } from '../interfaces/api-rest';

class TrackController implements IControllerBase {
  public path = '/track';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use(AuthMiddleware.isAuthenticated);
    this.router.get(`${this.path}`, this.getAllTracks);
    this.router.post(`${this.path}`, this.addTrack);
  }

  getAllTracks = async (req: Request, res: Response) => {
    try {
      const response = await TrackServices.getAllTracks();
      return res.status(response.httpStatus).send(response);
    } catch (e) {
      logger.error('Error in getAllTracks Controller', { meta: e });
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        httpStatus: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: 'failed',
        errorDetails: e,
      });
    }
  };
  addTrack = async (req: Request, res: Response) => {
    const track: TrackAttributes = req.body;
    try {
      const response = await TrackServices.addTrack(track);
      return res.status(response.httpStatus).send(response);
    } catch (e) {
      logger.error('Error in addTrack Controller', { meta: e });
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        httpStatus: HttpStatusCode.INTERNAL_SERVER_ERROR,
        status: 'failed',
        errorDetails: e,
      });
    }
  };
}

export default TrackController;
