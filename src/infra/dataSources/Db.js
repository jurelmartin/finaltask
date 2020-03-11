// // FOR PRODUCTION
// module.exports = {
//   name: 'db',
//   connector : 'sql',
//   config: {
//     host: 'https://remotemysql.com',
//     username: 'gsHgUjN4jj',
//     password: 'pmndflfefU',
//     database: 'gsHgUjN4jj',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
// FOR TESTING
module.exports = {
  name: 'db',
  connector : 'sql',
  config: {
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'yourdatabase',
    dialect: 'mysql',
    isSync: 'true',

  }
};
