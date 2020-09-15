import { Tracks } from '../models';
import { logger } from '../utils/logger';
import * as HttpStatusCode from 'http-status-codes';
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

  addTrack: async (
    track: TrackAttributes,
    file: Express.MulterS3.File,
    image: Express.MulterS3.File,
    id: number
  ) => {
    try {
      const tracks = await Tracks.create({
        ...track,
        filePath: file.location,
        albumArtPath: image.location,
        userId: id,
      });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: tracks,
      };
      return result;
    } catch (e) {
      logger.error('Error in addTrack Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },

  updateTrackFile: async (
    track: TrackAttributes,
    file: Express.MulterS3.File,
    image: Express.MulterS3.File
  ) => {
    const { id } = track;
    try {
      console.log(file.location);
      console.log(image.location);
      console.log(
        '%c [JL] updateTrackFile - track',
        'font-size: 16px; color:  red;',
        track
      );
      const exTrack = await Tracks.findOne({ where: { id } });
      console.log('exTrack: ', exTrack);
      await exTrack.update({
        filePath: file.location,
        albumArtPath: image.location,
      });
      const tracks = await Tracks.findAll();
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: tracks,
      };
      return result;
    } catch (e) {
      logger.error('Error in updateTrackFile Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },

  updateTrackInfo: async (track: TrackAttributes) => {
    const { id } = track;
    try {
      const exTrack = await Tracks.findOne({ where: { id } });
      await exTrack.update({
        title: track.title,
        album: track.album,
        artist: track.artist,
      });
      const tracks = await Tracks.findAll();
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.OK,
        status: 'successful',
        responseData: tracks,
      };
      return result;
    } catch (e) {
      logger.error('Error in updateTrackInfo Service', { meta: e });
      const result: ResponseBody = {
        httpStatus: HttpStatusCode.BAD_REQUEST,
        status: 'failed',
        errorDetails: e,
      };
      return result;
    }
  },
};
