const { Operation } = require('@amberjs/core');

class ListUsers extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute() {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const users = await this.UserRepository.getAll({ attributes: {exclude: ['password', 'createdAt', 'updatedAt']} });

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }
}

ListUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListUsers;
    
