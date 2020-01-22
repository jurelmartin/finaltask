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
  
  // login(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(200)
  //         .json(result);
  //     })
  //     .on(ERROR, next);

  //   operation.execute(req.body);
  // }
  /**
   * CRUD sample implementation
   * You may delete the commented code below if you have extended BaseController class
   * The following methods are already inherited upon extending BaseController class from @amberjs/core
   */

  // index(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.OK)
  //         .json(result);
  //     })
  //     .on(ERROR, next);

  //   operation.execute();
  // }

  // show(req, res, next) {
  //   const { operation } = req;

  //   const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.OK)
  //         .json(result);
  //     })
  //     .on(NOT_FOUND, (error) => {
  //       res.status(Status.NOT_FOUND).json({
  //         type: 'NotFoundError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(Number(req.params.id));
  // }

  // create(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.CREATED)
  //         .json(result);
  //     })
  //     .on(VALIDATION_ERROR, (error) => {
  //       res.status(Status.BAD_REQUEST).json({
  //         type: 'ValidationError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(req.body);
  // }

  // update(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.ACCEPTED)
  //         .json(result);
  //     })
  //     .on(VALIDATION_ERROR, (error) => {
  //       res.status(Status.BAD_REQUEST).json({
  //         type: 'ValidationError',
  //         details: error.details
  //       });
  //     })
  //     .on(NOT_FOUND, (error) => {
  //       res.status(Status.NOT_FOUND).json({
  //         type: 'NotFoundError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(Number(req.params.id), req.body);
  // }

  // delete(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR,  NOT_FOUND } = operation.events;

  //   operation
  //     .on(SUCCESS, () => {
  //       res.status(Status.ACCEPTED).end();
  //     })
  //     .on(NOT_FOUND, (error) => {
  //       res.status(Status.NOT_FOUND).json({
  //         type: 'NotFoundError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(Number(req.params.id));
  // }
}

module.exports = AuthController;
