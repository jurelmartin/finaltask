const { attributes } = require('structure');

const Client = attributes({
  //id
  name: { 
    type: String, 
    required: true 
  },
  secret: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: String
  }
})(class Client {
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

module.exports = Client;