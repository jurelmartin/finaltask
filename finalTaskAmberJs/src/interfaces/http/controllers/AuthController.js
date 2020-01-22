const express = require('express');
const { BaseController } = require('@amberjs/core');
const {authorization} = require('ftauth');

class AuthController extends BaseController {
  
  constructor() {
    
    const app = express();
    super();
    app.use(this.injector('ShowUser'),
      (req, res, next) => { 

        if(!req.userId){
          return next();
        }

        const {operation} = req;
        const { SUCCESS, ERROR, NOT_FOUND } = operation.events;
        operation
          .on(SUCCESS, (result) => {
            authorization.setCurrentRole(result.dataValues.role);
            return next();
          })
          .on(NOT_FOUND, () => {
            res.status(401).json({
              status: 401,
              message: 'Not Authenticated'
            });
          })
          .on(ERROR, () => {
            res.status(401).json({
              status: 401,
              message: 'Not Authenticated'
            });
          });
        operation.execute(req.userId);
      } );
    return app;
  }
}

module.exports = AuthController;
