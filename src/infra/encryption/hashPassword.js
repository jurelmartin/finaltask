const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = (password, encodedPassword) => {
  try {
    result = bcrypt.compareSync(password, encodedPassword);   
    return result;
  } catch (err) {
    return false;
  }

};


