const { Operation } = require('@amberjs/core');
const Client = require('src/domain/Client');

class CreateClient extends Operation {
  constructor({ ClientRepository }) {
    super();
    this.ClientRepository = ClientRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;

    try {
      const client = new Client(data);
      console.log(client);
      // Set the client properties that came from the POST data
      // client.name = req.body.name;
      // client.id = req.body.id;
      // client.secret = req.body.secret;
      // client.userId = req.user._id;


      // const newClient = await this.ClientRepository.add((client).toJSON());

      this.emit(SUCCESS, client);
    } catch(error) {
      this.emit(VALIDATION_ERROR, {
        type: 'VALIDATION ERROR',
        details: error.message
      });      
    }
    /**
     * Implement service/usecase logic here. eg:
     * 
     const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;
     * 
     * const user = new User(data);
     *
     *  try {
     *     const newUser = await this.UserRepository.add(user);
     *
     *     this.emit(SUCCESS, newUser);
     *   } catch(error) {
     *     if(error.message === 'ValidationError') {
     *       return this.emit(VALIDATION_ERROR, error);
     *     }
     *     this.emit(ERROR, error);
     *   }
     */
  }
}

CreateClient.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClient;
