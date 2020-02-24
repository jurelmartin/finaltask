const { Operation } = require('@amberjs/core');
const Client = require('src/domain/Client');

class CreateClient extends Operation {
  constructor({ ClientRepository }) {
    super();
    this.ClientRepository = ClientRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;

    const client = new Client(data);
    
    try {
      const newClient = await this.ClientRepository.add(client);
  
      this.emit(SUCCESS, newClient);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
     
  }
}

CreateClient.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClient;
