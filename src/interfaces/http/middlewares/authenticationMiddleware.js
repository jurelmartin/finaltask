const { authentication } = require('ftauth');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const decodedToken = authentication.verifyToken(authHeader, process.env.ACCESS_TOKEN_KEY);

  if (!decodedToken) {
    return res.status(401).json({ status: 401, message: 'Not Authenticated' });
  }
  req.userId = decodedToken.id;
  next();
};
