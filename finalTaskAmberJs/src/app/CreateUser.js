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
    
    const findEmail = await this.UserRepository.getAll({where: {email}});
    const checkEmail = findEmail[0].email;

    // if(checkEmail) {
    //   errors.push('Email already exists!');
    // }
    // console.log(user.isEmail());
    // if(user.isEmail()){
    //   errors.push(user.isEmail());
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
