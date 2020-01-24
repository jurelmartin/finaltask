const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');


class CreateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const errors = [];

    try {
    const user = new User(data);
    const email = user.email;

    

    // console.log(user.firstLength());


    // console.log(this.UserRepository.find({where: {email}}).toJSON());
    // // console.log(getEmail);
    // console.log(user.isValidEmail());

    if(user.isValidEmail().length > 0){
      errors.push(user.isValidEmail());
    }
    // const findEmail = await this.UserRepository.find({email});
    // console.log(findEmail);

    // if(getEmail){
    //   errors.push('Email already exists!');
    // }
    // if(user.isValidEmail() == true) {
 
    //       if(getEmail) {
    //         errors.push('Email already exists!');
    //       }
          
    // }

    // if(getEmail) {
    //   errors.push('Email already exists!');
    // }

    if(user.pwLength().length > 0){
      errors.push(user.pwLength());

    }
    if(user.firstLength().length > 0){
      errors.push(user.firstLength());

    }
    if(user.lastLength().length > 0){
      errors.push(user.lastLength());

    }
    if(user.midLength().length > 0){
      errors.push(user.midLength());

    }

    if(errors.length > 0){
      const error = new Error;
      error.type = 'VALIDATION_ERROR';
      error.details = errors;
      throw error;  
    }


      const newUser = await this.UserRepository.add(user.toJSON());

      this.emit(SUCCESS, newUser);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: error.type,
        details: errors
      });
    }
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
