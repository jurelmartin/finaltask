const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const functionCollections = require('./helper/functionHandler');

class UpdateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, data) {
    const { SUCCESS, VALIDATION_ERROR } = this.events;


    try {
      const user = new User(data);

      const result = new functionCollections(user);
      const errors = result.validationFunctions();

    
      if(errors){
        const error = new Error;
        error.message = errors;
        throw error;  
      }
      
     
      const updatedUser = await this.UserRepository.update(id, data);
      
      this.emit(SUCCESS, updatedUser);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });      
    }
  }
}

UpdateUser.setEvents(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateUser; 
    
