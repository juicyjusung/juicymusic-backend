import * as express from 'express';
import { Application } from 'express';
import { dbConfig } from './models';
import * as passport from 'passport';

import passportConfig from './auth/index';
class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.port = appInit.port;
    this.app = express();
    passportConfig();
    dbConfig.sync();

    this.middlewares(appInit.middleWares);
    this.passportMiddleware();
    this.routes(appInit.controllers);
    this.assets();
  }

  private passportMiddleware() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
