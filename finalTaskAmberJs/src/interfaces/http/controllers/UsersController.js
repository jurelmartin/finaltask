const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const {authorization} = require('ftauth');

class UsersController extends BaseController {
  
  constructor() {
    
    const router = Router();
    super();
    router.post('/login', this.injector('LoginUsers'), (req, res) => {
      const { operation } = req;
      const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

      operation
        .on(SUCCESS, (result) => {
          res
            .status(200)
            .json(result);
        })
        .on(ERROR, () => {
          res
            .status(401)
            .json({
              status: '401',
              message: 'Login Failed.'
            });
        })
        .on(VALIDATION_ERROR, () => {
          res
            .status(401)
            .json({
              status: '401',
              message: 'Login Failed.'
            });
        });

      operation.execute(req.body);
    });
    router.get('/', authorization.checkUser('Admin'), this.injector('ListUsers'), this.index);
    router.post('/', authorization.checkUser('Admin'), this.injector('CreateUser'), this.create);
    router.get('/:id', authorization.checkUser('Admin'), this.injector('ShowUser'), this.show);
    router.put('/:id', authorization.checkUser('Admin'), this.injector('UpdateUser'), this.update);
    router.delete('/:id', authorization.checkUser('Admin'), this.injector('DeleteUser'), this.delete);
    return router;
  }
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

module.exports = UsersController;
