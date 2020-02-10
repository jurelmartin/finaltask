const { authentication } = require('ftauth');

exports.generateToken = () => {
  return authentication.generateToken( 'dc49eb12-2546-44e8-b6cc-4a7773245585', 'supersecretkey', '1h').token;
};