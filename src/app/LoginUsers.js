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

    const user = await new User(data).toJSON();

    const email    = user.email;
    const password = user.password;


    try {
      const userData = (await this.UserRepository.getAll({ where: { email } }))[0];

      if(userData === undefined) {
         this.email = false;
 
      }else {
        const setUser =  userData.dataValues;
        const newUserPassword =  setUser.password;
        this.email =  true;
        
        const checkPassword =  comparePassword(password, newUserPassword);
        if(!checkPassword) {
          this.password =  false;
        }else {

          const getUserId =  setUser.id;
          const token =  authentication.generateToken(setUser.id, 'supersecretkey', '1hr');
          token.userId =  getUserId;
        
          this.password =  true;
          return this.emit(SUCCESS, token);
        }
      }
           
      const newUser =  {email: this.email, password: this.password};
      const user =  await new User(newUser);
      const result =  user.isAuth();

      if(result) {
        const error =  new Error;
        error.message =  result;
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