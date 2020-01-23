const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  id: Number,
  email: {
    type: String,
    email: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
},
  middleName: {
    type: String,
    required: true
},
  createdAt: Date,
  updatedAt: Date,
})(class User {

// EMAIL VALIDATION NALANG KULANG NETO !

  // isEmail() {
  //   isTrue = !emailChecker.test(this.email);
  //   if (emailChecker.test(this.email)){
  //     return('Invalid email!');
  //   }
  //   // isTrue = emailChecker.test(this.email) 

  //   // if(!isTrue){
  //   //   return true;
  //   // }
  //   return isTrue;
    
  // } 

  pwLength() {
    isTrue = this.password.length >= User.MIN_PASSWORD_LENGTH;
    if(!isTrue) {
      return('Minimum password length is 6!');
    }
      return isTrue;
  }

  firstLength() {
    isTrue = this.firstName.length >= User.MIN_INPUT_LENGTH;
    if(!isTrue) {
      return('Minimum firstName length is 4!');
    }
      return isTrue;
  }
  lastLength() {
    isTrue = this.lastName.length >= User.MIN_INPUT_LENGTH;
    if(!isTrue) {
      return('Minimum lastName length is 4!');
    }
      return isTrue;
  }
  midLength() {
    isTrue = this.middleName.length >= User.MIN_INPUT_LENGTH;
    if(!isTrue) {
      return('Minimum middleName length is 4!');
    }
      return isTrue;
  }


});

let isTrue;
const emailChecker = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
User.MIN_PASSWORD_LENGTH = 6;
User.MIN_INPUT_LENGTH = 4;

module.exports = User;