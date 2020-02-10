const path = require('path');
const { factory, SequelizeAdapter } = require('factory-girl');
const     ModelsLoader   = require('@amberjs/core/src/lib/ModelsLoader');
const models = require('src/infra/models/UserModel');


const factoryGirl = new factory.FactoryGirl();
factoryGirl.setAdapter(new SequelizeAdapter());

module.exports = ModelsLoader.load({
  factoryGirl,
  models,
  baseFolder: path.join(__dirname, 'factories')
});
