const { Router, static } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const path = require('path');
const openApiDoc = require('./openApi.json');
const {authorization} = require('ftauth');
const unless = require('express-unless');



module.exports = ({ config, notFound, authenticationMiddleware, containerMiddleware, loggerMiddleware, errorHandler, openApiMiddleware }) => {
  const router = Router();
  authenticationMiddleware.unless = unless;

  router.use(containerMiddleware);

  router.use(authenticationMiddleware.unless({ path: ['/', '/api/login', '/AmberJS.png', '/api/docs', { url: '/api/users', methods: ['POST'] }]}));

  // router.use(tryAuthMid);

  // router.use(authenticationMiddleware);

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
    .use('/docs', openApiMiddleware(openApiDoc));

    

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   * Avoid hardcoding in this file as much. Deleting comments in this file
   * may cause errors on scaffoldings
   */

  // apiRouter.use('/users', controller('controllers/UsersController'));
  apiRouter.use(controller('controllers/AuthenticationController.js'));
  apiRouter.use(authorization.checkPermission());

  apiRouter.use(controller('controllers/UsersController.js'));
  /* apiRoutes END */

  router.use('/api', apiRouter);
  router.use('/', static(path.join(__dirname, './public')));
  router.use('/', notFound);

  router.use(errorHandler);

  return router;
};
