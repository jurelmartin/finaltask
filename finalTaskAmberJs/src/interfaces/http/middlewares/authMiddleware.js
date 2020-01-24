const {authentication} = require('ftauth');
const {paths} = require('ftauth');

// const userRepository = require('src/infra/repositories/UserRepository');
// const userModel = require('src/infra/models/UserModel');

module.exports = (req, res, next) => {

  paths.setPath([
    {roles: ['Admin'], method: 'GET', url: '/api/users'}, 
    {roles: ['Admin'], method: 'GET', url: '/api/user?id=' + req.query.id}, 
    {roles: ['Admin'], method: 'PUT', url: '/api/update?id=' + req.query.id},
    {roles: ['Admin'], method: 'DELETE', url: '/api/delete?id='+ req.query.id}
  ]);

  const pathExist = authentication.checkPath(req.originalUrl, req.method);

  if(pathExist){
    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = authentication.verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
      return res.status(401).json({ status: 401, message: 'Not Authenticated' });
    }

    req.userId = decodedToken.id;

  }

  next();
};
