
const { Router } = require('express');
const Status = require('http-status');

// const { BaseController } = require('@amberjs/core');


class UsersController {
  
  constructor() {
    
    this.injector = operation => (req, res, next) => {
      req['operation'] = req.container.resolve(operation);
      next();
    };
    const router = Router();

    router.post('/login', this.injector('LoginUsers'), this.login);
    // super();
    
    router.get('/users', this.injector('ListUsers'), this.index);
    router.post('/add', this.injector('CreateUser'), this.create);
    router.get('/user', this.injector('ShowUser'), this.show);
    router.put('/update', this.injector('UpdateUser'), this.update);      
    router.delete('/delete', this.injector('DeleteUser'), this.delete);

    return router;
  }
  
  login(req, res) {
    const { operation } = req;
    const { SUCCESS, ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'Logged in successfully!', result: result} });
      })
      .on(ERROR,  (result) => {
        res
          .status(401)
          .json({
            type: result.type,
            details: result.details
          });
      });

    operation.execute(req.body);
  }
  /**
   * CRUD sample implementation
   * You may delete the commented code below if you have extended BaseController class
   * The following methods are already inherited upon extending BaseController class from @amberjs/core
   */

  index(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR} = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'List of Users', result: result } });
      })
      .on(ERROR, next);

    operation.execute();
  }

  show(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json({ status: Status.OK, details: { message: 'List of User', result: result } });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute((req.query.id));
  }

  create(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json({ status: Status.CREATED, details: { message: 'User Created!', userId: result } });
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: error.type,
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(req.body);
  }

  update(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, () => {
        res
          .status(Status.ACCEPTED)
          .json({ status: Status.ACCEPTED, details: { message: 'Following fields has been Updated!', result: Object.keys(req.body)} });
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute((req.query.id), req.body);
  }

  delete(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, () => {
        res
          .status(Status.OK)
          .json({status: Status.OK, details: { message: 'Successfully deleted!' }}).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(req.query.id);
  }
}

module.exports = UsersController;
