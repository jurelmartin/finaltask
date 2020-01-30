const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const { authentication } = require('ftauth');
const { comparePassword } = require('../infra/encryption/hashPassword');
const validationClass = require('../domain/utils/validateInput');

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

      if(userData !== undefined){
        const setUser = userData.dataValues;
        const newUserPassword = setUser.password;
        
        const checkPassword = await comparePassword(password, newUserPassword);
        if(checkPassword){
          const getUserId = setUser.id;
          const token = authentication.generateToken(setUser.id, 'supersecretkey', '1hr');
          token.userId = getUserId;
    
          this.emit(SUCCESS, token);
        }
      }

      const newUser = {email: undefined, password: undefined};
      const user = new User(newUser);

      const result = new validationClass(user);
      const errors = result.validationChecker();
      
      if(errors){
        const error = new Error;
        error.message = errors;
        throw error;  
      }
     
    } catch(error) {
      this.emit(ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

LoginUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUsers;