const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, encodedPassword) => {
  return bcrypt.compareSync(password, encodedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};
