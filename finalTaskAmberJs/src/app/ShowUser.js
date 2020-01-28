const { Operation } = require('@amberjs/core');
const { authorization } = require('ftauth');

class ShowUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND, ERROR} = this.events;

    if (!id) {
      return this.emit(ERROR, {
        type: 'ERROR',
        details: 'Empty parameters.'
      });
    }

    try {
      const user = await this.UserRepository.getById(id, {attributes: {exclude: ['password', 'createdAt', 'updatedAt']}} );

      authorization.setCurrentRole(user.dataValues.role);

      this.emit(SUCCESS, user);

    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ShowUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowUser;
    
