import * as logger from 'morgan';
const morganMiddleware = logger(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
);

export default morganMiddleware;
