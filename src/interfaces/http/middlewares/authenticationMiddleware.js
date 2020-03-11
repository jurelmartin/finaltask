const passport = require('passport');
const {ExtractJwt, Strategy} = require('passport-jwt');
// const userRepository = require('src/infra/repositories/UserRepository');
// const userModel = require('src/infra/models/UserModel');

exports.initialize = () => {
  return passport.initialize();
};

exports.authenticate = (repository) => {
  return [
    (req, res, next) => {

      const jwtOptions = {};
      jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      jwtOptions.secretOrKey = 'supersecretkey';  
      

      passport.use(new Strategy(jwtOptions, (jwt_payload, done) => {
        repository.findByPk(jwt_payload.id)
          .then((user) => {
            done(null, user);
          })
          .catch((error) =>  done(error, null));
      }));
  
      passport.serializeUser(function (user, done) {
        done(null, user);
      });
  
      passport.deserializeUser(function (user, done) {
        done(null, user);
      });
  
      return passport.authenticate('jwt', (err, user, info)=> {
        if(!user){
          res.status(401).json({
            status: 401,
            message: 'Not Authenticated'
          });
        }
        next();
      })(req, res, next);
    }
  ];
};
