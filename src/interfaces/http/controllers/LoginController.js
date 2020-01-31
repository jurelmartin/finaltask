
const { Router } = require('express');
const Status = require('http-status');

// const { BaseController } = require('@amberjs/core');


class LoginController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.post('/login', this.injector('LoginUser'), this.login);
    return router;
  }
  
  login(req, res) {
    const { operation } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'Logged in successfully!', result: result} }).end();
      })
      .on(ERROR,  (result) => {
        res
          .status(Status.UNAUTHORIZED)
          .json({
            status: Status.UNAUTHORIZED,
            type: result.type,
            details: result.details
          }).end();
      })



    operation.execute(req.body);
  }

}
module.exports = LoginController;
