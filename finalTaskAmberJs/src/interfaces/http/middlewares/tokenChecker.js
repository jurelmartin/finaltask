const {authentication} = require('ftauth');
const {authorization} = require('ftauth');


module.exports = (req, res, next) => { 
  const authHeader = req.get('Authorization');
  // gets the decoded token from verify function
  
  const decodedToken = authentication.verifyToken(authHeader, 'supersecretkey');
  
  if (!decodedToken) {
    return res.status(403).json({ status: '401', message: 'Not Authenticated' });
  }
  // put the decoded refresh token to request
  
  // set User's role for the checkUser function
  authorization.setCurrentRole(decodedToken.role);
  next();

};
