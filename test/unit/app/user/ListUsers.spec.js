const { expect } = require('chai');
const ListUsers = require('src/app/ListUsers');

describe('App :: User :: ListUsers', () => {
  var getAllUsers;

  context('when query is successful', () => {
    before(() => {
      const MockUsersRepository = {
        getAll: () => Promise.resolve('Imagine all the users...')
      };

      listUsers = new ListUsers({
        UserRepository: MockUsersRepository
      });
    });

    it('emits SUCCESS with all the users', (done) => {
      listUsers.on(listUsers.events.SUCCESS, (response) => {
        expect(response).to.equal('Imagine all the users...');
        done();
      });

      listUsers.execute();
    });
  });

  context('when the users does not exist', () => {
    before(() => {
      const MockUsersRepository = {
        getAll: () => Promise.reject(new Error('NotFoundError'))
      };

      listUsers = new ListUsers({
        UserRepository: MockUsersRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      listUsers.on(listUsers.events.NOT_FOUND, (error) => {
        expect(error.message).to.equal('NotFoundError');
        done();
      });

      listUsers.execute();
    });
  });

  // context('when there is an internal error', () => {
  //   before(() => {
  //     const MockUsersRepository = {
  //       getAll: () => Promise.reject(new Error('Failed'))
  //     };

  //     listUsers = new ListUsers({
  //       UserRepository: MockUsersRepository
  //     });
  //   });

  //   it('emits ERROR with the error', () => {
  //     listUsers.on(listUsers.events.ERROR, (response) => {
  //       expect(response.message).to.equal('Failed');

  //       // done();
  //     });

  //     listUsers.execute();
  //   }).timeout(5000);
  // });
});
