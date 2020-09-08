import * as logger from 'morgan';
const loggerMiddleware = logger(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
);

export default loggerMiddleware;
