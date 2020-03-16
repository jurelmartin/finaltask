const { Router, static } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const path = require('path');
const openApiDoc = require('./openApi.json');
const passport = require('passport');

const helper = require('src/infra/userHelper/userHelper');

module.exports = ({ config, authenticationMiddleware, notFound, containerMiddleware, loggerMiddleware, errorHandler, openApiMiddleware }) => {
  const router = Router();

  router.use(containerMiddleware);
  /* istanbul ignore if */
  if(config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use('/docs', openApiMiddleware(openApiDoc))
    .use(passport.initialize());

  apiRouter.use(controller('controllers/AuthController.js'));
  // apiRouter.use(controller('controllers/GetUserData.js'));
  apiRouter.use(controller('controllers/GetUserData.js'), passport.authenticate('jwt'), controller('controllers/RestrictedController.js'));
  /* apiRoutes END */
  router.use('/api', apiRouter);
  router.use('/', static(path.join(__dirname, './public')));
  router.use('/', notFound);

  router.use(errorHandler);

  return router;
};
