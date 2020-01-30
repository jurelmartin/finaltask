const { paths, authorization } = require('ftauth');

module.exports = (req, res, next) => {

  if (!req.userId){
    return next();
  }
    if (req.query.id == req.userId){
      req.isProfile = true;
    }
    return next();
};