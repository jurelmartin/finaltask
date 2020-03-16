const { attributes } = require('structure');

const Token = attributes({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})(class Token {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;

module.exports = Token;
