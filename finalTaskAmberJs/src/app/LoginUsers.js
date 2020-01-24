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

      const getPassword = userExist[0].dataValues.password;

      await comparePassword(password, getPassword);

      const token = authentication.generateToken(userExist[0].id, 'supersecretkey', '1h', '24h');
      this.emit(SUCCESS, token);


    } catch(error) {
      this.emit(ERROR, {
        type: 'VALIDATION ERROR',
        details: 'Wrong username/password'
      });
    }
  }
}

LoginUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUsers;