
const { BaseRepository } = require('@amberjs/core');

class ClientRepository extends BaseRepository {
  constructor({ ClientModel }) {
    super(ClientModel);
  }
}

module.exports = ClientRepository;

