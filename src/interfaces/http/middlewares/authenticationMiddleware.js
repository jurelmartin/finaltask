const {authentication} = require('ftauth');

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = authentication.verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
      return next();
    } 

    req.isAuthenticated = true;

    req.userId = decodedToken.id;

    return next();

};
