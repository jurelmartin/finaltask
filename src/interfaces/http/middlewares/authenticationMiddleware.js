const {authentication, paths} = require('ftauth');


module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = authentication.verifyToken(authHeader, process.env.KEY);

    if (!decodedToken) {
      return res.status(401).json({ status: 401, message: 'Not Authenticated' });
    }
    req.userId = decodedToken.id;
  next();
};
