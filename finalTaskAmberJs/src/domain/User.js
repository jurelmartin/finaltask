const { attributes } = require('structure');
const validator = require('email-validator');
const { authorization } = require('ftauth');

const User = attributes({
  // Add atttributes here
  // id: Number,
  email: {
    type: String,
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
  }
  ,
  createdAt: Date,
  updatedAt: Date,
})(class User {

  // EMAIL VALIDATION NALANG KULANG NETO !
  isAdmin() {
    isTrue = (authorization.getCurrentRole().toLowerCase() !== User.IS_ADMIN );
    if(this.role){
      if(isTrue) {
        return('Not allowed to change roles');
      }
    }
    return isTrue;
    
  }


  isValidEmail() {

    isTrue = validator.validate(this.email);
    if(isTrue == true) {
      return isTrue;
    }
    else{
      return 'Please input a vaid email!';
    }
  }

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

User.MIN_PASSWORD_LENGTH = 6;
User.MIN_INPUT_LENGTH = 4;
User.IS_ADMIN = 'admin';

module.exports = User;