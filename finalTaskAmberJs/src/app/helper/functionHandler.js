// const User = require('src/domain/User');

class functionCollections {
  constructor(user) {
    this.user = user;
    this.errors = []; 
  }
    
  validationFunctions() {
    if(this.user.isValidEmail().length > 0){
      this.errors.push(this.user.isValidEmail());
    }

    if(this.user.pwLength().length > 0){
      this.errors.push(this.user.pwLength());

    }
    if(this.user.firstLength().length > 0){ 
      this.errors.push(this.user.firstLength());

    }
    if(this.user.lastLength().length > 0){
      this.errors.push(this.user.lastLength());
    }
    if(this.user.midLength().length > 0){
      this.errors.push(this.user.midLength());
    }

    if(this.errors.length > 0){
      const error = new Error;
      error.message = this.errors;
      return error;  
    }
  }
  

}


module.exports = functionCollections;