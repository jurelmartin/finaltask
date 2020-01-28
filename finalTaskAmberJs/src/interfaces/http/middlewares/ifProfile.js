const { paths, authorization } = require('ftauth');

module.exports = (req, res, next) => {
  const pathExist = paths.checkPath(req.originalUrl, req.method);
  console.log(pathExist.roles);
  if (authorization.getCurrentRole().toLowerCase() === 'user' && pathExist.roles.includes('Profile')){
    if (req.query.id == req.userId){
      return next();
    }else{
      return res.status(403).json({ status: 401, message: 'Not Authorized' });
    }
  }
  return next();
};