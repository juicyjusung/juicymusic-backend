import App from './app';

import * as bodyParser from 'body-parser';
import morgan from './middleware/morgan';
import cors from './middleware/cors';
import session from './middleware/session';

import * as dotenv from 'dotenv';
dotenv.config(
  process.env.NODE_ENV === 'production'
    ? { path: `${__dirname}/../.env.prod` }
    : { path: `${__dirname}/../.env.dev` }
);

import HomeController from './controllers/home.controller';

const app = new App({
  port: parseInt(process.env.PORT, 10) || 8000,
  controllers: [new HomeController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    morgan,
    cors,
    session,
  ],
});

app.listen();
