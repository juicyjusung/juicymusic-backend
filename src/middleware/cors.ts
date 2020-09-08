import * as cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  // origin: "http://localhost:8080"
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
