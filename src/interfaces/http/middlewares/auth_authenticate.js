const auth = require('brewery-auth-test'); 


const config = {
  secret: process.env.ACCESS_TOKEN_KEY
};


module.exports = (req, res, next) => {
//   const { UserRepository } = req.container.cradle;

  auth.authenticate();


  return next();
};  