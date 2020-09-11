import * as passport from 'passport';
import local from './localStrategy';
import { User } from '../models';

export default () => {
  passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    })
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err));
  });
  local();
};
