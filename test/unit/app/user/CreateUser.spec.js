const { expect } = require('chai');
const CreateUser = require('src/app/CreateUser');

describe('App :: User :: CreateUser', () => {
  var createUser;

  context('when user is valid', () => {
    before(() => {
      const MockUsersRepository = {
        add: (user) => Promise.resolve(user)
      };

      createUser = new CreateUser({
        UserRepository: MockUsersRepository
      });

    });

    it('creates the user and emits SUCCESS',  (done) => {
      const data = {       
      email: "jagustin@stratpoint.com",
      password: "123456"
    };

      createUser.on(createUser.events.SUCCESS,  (response) => {
        expect(response.email).to.equal(data.email);
        done();      
      });
      
      createUser.execute(data);
      
    });
    
  });

  context('when user is invalid', () => {
    before(() => {
      const MockUsersRepository = {
        add: () => Promise.reject(Error('ValidationError'))
      };

      createUser = new CreateUser({
        UserRepository: MockUsersRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const userData = {       
        email: "etanwislao@stratpoint.com",
        password: "1" };

      createUser.on(createUser.events.VALIDATION_ERROR, (response) => {
        expect(response.type).to.equal('VALIDATION ERROR');
        done();
      });

      createUser.execute(userData);
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockUsersRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createUser = new CreateUser({
        UserRepository: MockUsersRepository
      });
    });
  });
});
