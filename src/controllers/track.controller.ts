import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import IControllerBase from 'interfaces/ControllerBase.interface';
import { AuthMiddleware } from '../middleware/auth';
import * as HttpStatusCode from 'http-status-codes';

import { TrackServices } from '../services/track.service';
import { logger } from '../utils/logger';
import { TrackAttributes } from '../interfaces/api-rest';
import { upload } from '../middleware/multer';
import { ResponseBody } from '../interfaces/Response.interface';

class TrackController implements IControllerBase {
  public path = '/track';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use(AuthMiddleware.isAuthenticated);
    this.router.get('/tracks', this.getAllTracks);
    this.router.post(`${this.path}`, upload.any(), this.addTrack);
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
  addTrack = async (req: any, res: Response) => {
    const track: TrackAttributes = req.body;
    const { files } = req;
    const file = files.find(file => file.fieldname === 'file');
    const image = files.find(file => file.fieldname === 'image');
    if (!req.files) {
      const response: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        message: '파일 업로드에 문제가 발생했습니다. 다시 시도해주세요',
      };
      return res.status(response.httpStatus).send(response);
    }
    try {
      const response = await TrackServices.addTrack(track, file, image, req.user.id);
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
