import App from './app';

import * as bodyParser from 'body-parser';
import logger from './middleware/logger';

import HomeController from './controllers/home.controller';
import * as dotenv from 'dotenv';
dotenv.config(
  process.env.NODE_ENV === 'production'
    ? { path: `${__dirname}/../.env.prod` }
    : { path: `${__dirname}/../.env.dev` }
);
const app = new App({
  port: parseInt(process.env.PORT, 10),
  controllers: [new HomeController()],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), logger],
});

app.listen();
