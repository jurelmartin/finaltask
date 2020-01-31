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
          .on(SUCCESS, (result) => {
            req.role = result.role;
            return next();
          })
          .on(ERROR, () => {
            return next();
          })
          .on(NOT_FOUND, () => {
            req.isAuthenticated = false;
            return next();
          });
        operation.execute(req.userId);
      } );
    return router;
  }
}

module.exports = AuthController;