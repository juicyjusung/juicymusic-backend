import * as session from 'express-session';
import { SessionOptions } from 'express-session';

const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

const sessionMiddleware = session(sessionOptions);

export default sessionMiddleware;
