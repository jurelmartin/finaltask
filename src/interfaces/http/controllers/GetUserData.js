const express = require('express');
const { BaseController } = require('@amberjs/core');
const { configure } = require('src/interfaces/http/middlewares/strategy.js');
class getClientController extends BaseController {
  
  constructor() {
    
    const router = express.Router();
    super();
    router.use(this.injector('ShowUser'),
      (req, res, next) => {
        const config = {
          authSecret: process.env.ACCESS_TOKEN_KEY
        };
        configure(config, (id) => {
          const { operation } = req;
  
          console.log(id);
          const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

          return new Promise ((resolve, reject) => {
            operation
              .on(SUCCESS, (result) => {
                console.log(result.dataValues);
                resolve(result.dataValues);
              })
              .on(NOT_FOUND, () => {
                reject(null);
              })
              .on(ERROR, () => {
                reject(null);
              });
            operation.execute(id);
          });
        });

        next();

      } );
    return router;
  }
}

module.exports = getClientController;
