const auth = require('brewery-auth-test'); 


const config = {
  authSecret: process.env.ACCESS_TOKEN_KEY
};


module.exports = (req, res, next) => {
  const { UserRepository } = req.container.cradle;

  auth.initialize(config, UserRepository);


  return next();
};  