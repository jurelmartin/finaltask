const express = require('express');
const { BaseController } = require('@amberjs/core');
const { setList } = require('src/infra/userHelper/userHelper');

class getClientController extends BaseController {
  
  constructor() {
    
    const router = express.Router();
    super();
    router.use(this.injector('ListUsers'),
      (req, res, next) => { 

        const {operation} = req;
        const { SUCCESS, ERROR, NOT_FOUND } = operation.events;
        operation
          .on(SUCCESS, (result) => {
            const list = result.map((x) => {
              return x.dataValues;
            });
            setList(list);
            next();
          })
          .on(ERROR, () => {
            return next();
          })
          .on(NOT_FOUND, () => {
            return next();
          });
        operation.execute();
      } );
    return router;
  }
}

module.exports = getClientController;
