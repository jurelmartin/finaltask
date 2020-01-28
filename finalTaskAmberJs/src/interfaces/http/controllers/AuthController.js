const express = require('express');
const { BaseController } = require('@amberjs/core');

class AuthController extends BaseController {
  
  constructor() {
    
    const router = express.Router();
    super();
    router.use(this.injector('ShowUser'),
      (req, res, next) => { 

        const {operation} = req;
        const { SUCCESS, ERROR, NOT_FOUND } = operation.events;
        operation
          .on(SUCCESS, () => {
            return next();
          })
          .on(ERROR, () => {
            return next();
          })
          .on(NOT_FOUND, () => {
            return res.status(401).json({
              status: 401,
              message: 'Not Authenticated'
            });

          });
        operation.execute(req.userId);
      } );
    return router;
  }
}

module.exports = AuthController;
