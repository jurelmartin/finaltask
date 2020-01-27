const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const { authentication } = require('ftauth');
const { comparePassword } = require('../infra/encryption/hashPassword');

class LoginUsers extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR } = this.events;

    const user = new User(data).toJSON();
    
    const email    = user.email;
    const password = user.password;


    try {
      const userData = (await this.UserRepository.getAll({ where: { email } }))[0];

      const getPassword = userData.dataValues.password;
      const checkPassword = await comparePassword(password, getPassword);
    
      if(!checkPassword) {
        this.emit(ERROR, {
    
          type: 'VALIDATION ERROR',
          details: 'Invalid Email or Password'
        });
      }

      const token = authentication.generateToken(userData.dataValues.id, process.env.KEY, process.env.ACCESS_TOKEN_EXP, process.env.REFRESH_TOKEN_EXP);
      this.emit(SUCCESS, token);


    } catch(error) {
      this.emit(ERROR, {
        type: 'VALIDATION ERROR',
        details: 'Invalid Email or Password'
      });
    }
  }
}

LoginUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUsers;