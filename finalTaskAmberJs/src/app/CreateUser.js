const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');


class CreateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;

    const errors = [];

    try {
      const user = new User(data);
      


      if(user.isValidEmail().length > 0){
        errors.push(user.isValidEmail());
      }

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
        error.message = errors;
        throw error;  
      }

      const newUser = await this.UserRepository.add(user.toJSON());

      this.emit(SUCCESS, newUser);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });      
    }
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
