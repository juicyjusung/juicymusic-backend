import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { CorsOptions } from 'cors';

dotenv.config(
  process.env.NODE_ENV === 'production'
    ? { path: `${__dirname}/../../.env.prod` }
    : { path: `${__dirname}/../../.env.dev` }
);
const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN,
  methods: ['GET, POST, OPTIONS, PUT, DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
