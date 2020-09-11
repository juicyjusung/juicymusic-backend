import { Tracks } from '../models';
import { logger } from '../utils/logger';
import * as HttpStatusCode from 'http-status-codes';
import { Response } from 'express';
import { ResponseBody } from '../interfaces/Response.interface';
import { TrackAttributes } from '../interfaces/api-rest';

export const TrackServices = {
  getAllTracks: async () => {
    try {
      const tracks = await Tracks.findAll();
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: tracks,
      };
      return result;
    } catch (e) {
      logger.error('Error in getAllTracks Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },

  addTrack: async (track: TrackAttributes) => {
    try {
      const tracks = await Tracks.findAll();
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: tracks,
      };
      return result;
    } catch (e) {
      logger.error('Error in getAllTracks Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },
};
