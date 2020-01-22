const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const {authentication} = require('ftauth');

class LoginUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const user = new User(data).toJSON();

    try {
      let userExist = await this.UserRepository.getAll({where: {email: user.email}});
      userExist = userExist.map(l => {
        return l.toJSON();
      });

      const token = authentication.generateToken(userExist[0].id, userExist[0].role, 'supersecretkey', '1h', '24h');
      
      this.emit(SUCCESS, token);
      
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

LoginUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUser;
