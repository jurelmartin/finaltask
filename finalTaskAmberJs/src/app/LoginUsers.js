const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const {authentication} = require('ftauth');
const { comparePassword } = require('../infra/encryption/hashPassword');


class LoginUsers extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR } = this.events;

    const user = new User(data).toJSON();
    
    const email = user.email;
    const password = user.password;

    try {
      let userExist = await this.UserRepository.getAll({where: {email}});
      if (!userExist) {
        const error = new Error;
        error.type = 'VALIDATION_ERROR';
        error.details = 'Invalid password/username';
        throw error;
      }
      const getPassword = userExist[0].dataValues.password;

      const checkPassword = await comparePassword(password, getPassword);
        
      if(!checkPassword) {
        const error = new Error;
        error.type = 'VALIDATION_ERROR';
        error.details = 'Invalid password/username';
        throw error;   
      }

      const token = authentication.generateToken(userExist[0].id, userExist[0].role, 'supersecretkey', '1h', '24h');
      this.emit(SUCCESS, token);


    } catch(error) {
      this.emit(ERROR, {
        type: error.type,
        details: error.details
      });
    }
  }
}

LoginUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUsers;