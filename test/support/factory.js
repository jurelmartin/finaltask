<<<<<<< HEAD
// const path = require('path');
// const { factory, SequelizeAdapter } = require('factory-girl');
// const  {loaded}   = require('@amberjs/core/src/lib/ModelsLoader');
// const models = require('src/infra/models/UserModel');
=======
const path = require('path');
const { factory, SequelizeAdapter } = require('factory-girl');
const     ModelsLoader   = require('@amberjs/core/src/lib/ModelsLoader');
const models = require('src/infra/models/UserModel');
>>>>>>> 766d94cb2289f87aaf90cbb0ea4a73253bafc524


// const factoryGirl = new factory.FactoryGirl();
// factoryGirl.setAdapter(new SequelizeAdapter());

<<<<<<< HEAD
// module.exports = loaded.load({
//   factoryGirl,
//   models,
//   baseFolder: path.join(__dirname, 'factories')
// });
=======
module.exports = ModelsLoader.load({
  factoryGirl,
  models,
  baseFolder: path.join(__dirname, 'factories')
});
>>>>>>> 766d94cb2289f87aaf90cbb0ea4a73253bafc524
