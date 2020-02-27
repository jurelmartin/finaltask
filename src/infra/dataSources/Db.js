// FOR PRODUCTION
// module.exports = {
//   name: 'db',
//   connector : 'sql',
//   config: {
//     host: 'remotemysql.com',
//     username: 'gsHgUjN4jj',
//     password: 'cK4rfSzeoj',
//     database: 'gsHgUjN4jj',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
//FOR TESTING
module.exports = {
  name: 'db',
  connector : 'sql',
  config: {
    host: 'remotemysql.com',
    username: 'I3pzK8hI33',
    password: process.env.DB_PASSWORD_TEST,
    database: 'I3pzK8hI33',
    dialect: 'mysql',
    isSync: 'true',

  }
};
