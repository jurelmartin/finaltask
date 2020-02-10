require('module').Module._initPaths();
const { brew } = require('@amberjs/core');
const config = require('config');

module.exports = () => {
  brew(config, (err, brewed) => {
    if (err) throw err;
    const app = brewed.getServer();
    app.start().then(() => {
    }).catch(error => {
      app.logger.error(error.stack);
      process.exit();
    });
  });
};
