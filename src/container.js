const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');



const config = require('../config');
const {brew} = require('@amberjs/core');
const CreateUser = require('./app/CreateUser')

const {

  ListUsers,
  ShowUser,
  UpdateUser,
  DeleteUser
} = require('./app');

const UserSerializer = require('./interfaces/http/utils/serializer');

const Server = require('@amberjs/core/src/lib/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/middlewares/loggerMiddleware');
const errorHandler = require('./interfaces/http/middlewares/errorHandler');
const devErrorHandler = require('./interfaces/http/middlewares/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/middlewares/openApiMiddleware');

const logger = require('../config/logging');
const {BaseRepository} = require('@amberjs/core');
const { database, User: UserModel } = require('./infra/models/UserModel');

const container = createContainer();

// System
container
  .register({
    app: asClass(brew).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    // logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  usersRepository: asClass(BaseRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel)
});

// Operations
container.register({
  createUser: asClass(CreateUser)
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer)
});

module.exports = container;