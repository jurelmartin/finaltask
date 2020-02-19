const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const { authentication } = require('ftauth');
const hashPassword  = require('../infra/encryption/hashPassword');

class LoginUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;

    const user = new User(data);
    const { email, password } = user;
    const inputPassword = password;


    try {
      const userData = (await this.UserRepository.getAll({ where: { email } }))[0];

      if (userData === undefined) { this.email = false; }

      else {
        const { id, password } = userData.dataValues;
        const checkPassword =  hashPassword.comparePassword(inputPassword, password);

        if(!checkPassword) {this.password =  false; }


        else {

          const token =  authentication.generateToken(id, process.env.ACCESS_TOKEN_KEY, process.env.ACCESS_TOKEN_EXP);
          token.userId =  id;
  
          this.email =  true;
          this.password =  true;
          return this.emit(SUCCESS, token);
        }
      }
           
      const newUser =  { 
        email: this.email, 
        password: this.password
      };

      const user =  await new User(newUser);
      const result =  user.isAuth();

      if(result) {
        const error =  new Error;
        error.message =  result;
        throw error;  
      }

    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });
    }
  }
}

LoginUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = LoginUser;
