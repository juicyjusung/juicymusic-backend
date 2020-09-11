import * as cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET, POST, OPTIONS, PUT, DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
