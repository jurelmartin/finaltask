const {authentication, paths} = require('ftauth');


module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = authentication.verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
      return res.status(401).json({ status: 401, message: 'Not Authenticated' });
    }


    req.userId = decodedToken.id;

    // console.log('decoded: '+decodedToken.id);
    // console.log('query: '+req.query.id);
  
    // console.log(decodedToken.id.toString() === req.query.id.toString());
    // if(pathExist.method == 'PUT'){
    //   if (decodedToken.id.toString() !== req.query.id.toString()){
    //     return res.status(401).json({ status: 401, message: 'Cannot Change Other User!' });
    //   }else {
    //     return next();
    //   }

    // )

  

  next();
};
