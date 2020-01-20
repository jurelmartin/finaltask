const {authentication} = require('ftauth');
const {authorization} = require('ftauth');
const url = require('url');

module.exports = (req, res, next) => {
  
  let unless = [
    ['POST', 'api/users/login'], 
    ['POST', '/api/users/']
  ];

  unless = unless.map((path) => {
    const filter = url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: path[1],
    });
    return [path[0], filter];
  });

  const requestPath = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.path,
  });

  for(let path of unless) {
    if (requestPath === path[1] && path[0] == req.method){
      authorization.setCurrentRole('guest');
      return next();
    }
  }

  const authHeader = req.get('Authorization');
  // gets the decoded token from verify function

  const decodedToken = authentication.verifyToken(authHeader, 'supersecretkey');

  if (!decodedToken) {
    return res.status(403).json({ status: '401', message: 'Not Authenticated' });
  }
  // put the decoded refresh token to request

  // set User's role for the checkUser function
  authorization.setCurrentRole(decodedToken.role);
  return next();
};
