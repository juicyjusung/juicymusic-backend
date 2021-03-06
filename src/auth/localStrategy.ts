import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { User } from '../models';

export default () => {
  passport.use(
    new Strategy(
      {
        usernameField: 'userId',
        passwordField: 'password',
      },
      async (userId, password, done) => {
        try {
          const exUser = await User.findOne({ where: { userId } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};
