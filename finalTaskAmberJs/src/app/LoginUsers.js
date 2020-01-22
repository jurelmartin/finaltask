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
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const user = new User(data).toJSON();
    
    const email = user.email;
    const password = user.password;

    try {
      let userExist = await this.UserRepository.getAll({where: {email}});
      if (userExist) {
        const getPassword = userExist[0].dataValues.password;

        const checkPassword = await comparePassword(password, getPassword);
        if(checkPassword) {
          const token = authentication.generateToken(userExist[0].id, userExist[0].role, 'supersecretkey', '1h', '24h');
          this.emit(SUCCESS, token);
  
        }
  
      }
      // const userId = userExist[0].id;
      // const userRole = userExist[0].role;

      // if(!userExist) {

      //   return this.emit(NOT_FOUND, error);
      // }
  

     

    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

LoginUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUsers;
