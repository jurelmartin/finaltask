// FOR PRODUCTION
module.exports = {
  name: 'db',
  connector : 'sql',
  config: {
    host: 'remotemysql.com',
    username: 'gsHgUjN4jj',
    password: process.env.DB_PASSWORD,
    database: 'gsHgUjN4jj',
    dialect: 'mysql',
    isSync: 'true',

  }
};
//FOR TESTING
// module.exports = {
//   name: 'test-db',
//   connector : 'sql',
//   config: {
//     host: 'remotemysql.com',
//     username: 'I3pzK8hI33',
//     password: 'i2kDmahSWR',
//     database: 'I3pzK8hI33',
//     dialect: 'mysql',
//     isSync: 'true',

//   }
// };
