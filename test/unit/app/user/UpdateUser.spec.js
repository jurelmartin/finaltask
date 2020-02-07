const { expect } = require('chai');
const UpdateUser = require('src/app/UpdateUser');

describe('App :: User :: UpdateUser', () => {
  var updateUser;

  context('when user exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockUsersRepository = {
          update: (userId, data) => Promise.resolve({
            id: userId,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName
          })
        };

        updateUser = new UpdateUser({
          UserRepository: MockUsersRepository
        });
      });

      it('updates the user and emits SUCCESS', (done) => {
        const userData = { 
          email: 'asdf@stratpoint.com' 
        };

        updateUser.on(updateUser.events.SUCCESS, (updatedUser) => {
          
          expect(updatedUser.id).to.equal(123);
          expect(updatedUser.email).to.equal(userData.email);
          done();
        });

        updateUser.execute(123,userData);
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockUsersRepository = {
          update: () => Promise.reject(new Error('ValidationError'))
        };

        updateUser = new UpdateUser({
          UserRepository: MockUsersRepository
        });
      });

      it('emits VALIDATION_ERROR with the error', (done) => {
        const userData = {
          email: 'asdf@stratpoint.com'
        };

        updateUser.on(updateUser.events.VALIDATION_ERROR, (error) => {
          expect(error.type).to.equal('VALIDATION ERROR');
          done();
        });

        updateUser.execute(123, userData);
      });
    });
  });

  context('when the user does not exist', () => {
    before(() => {
      const MockUsersRepository = {
        update: () => Promise.reject(new Error('NotFoundError'))
      };

      updateUser = new UpdateUser({
        UserRepository: MockUsersRepository
      });
    });

    it('emits NOT_FOUND with the error', () => {
      const userData = { name: 'New User' };

      updateUser.on(updateUser.events.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        // return done();
      });

      updateUser.execute(123, userData);
    });
  });


  // context('when there is an internal error', () => {
  //   before(() => {
  //     const MockUsersRepository = {
  //       update: () => Promise.reject(new Error('Some Error'))
  //     };

  //     updateUser = new UpdateUser({
  //       UserRepository: MockUsersRepository
  //     });
  //   });

  //   it('emits ERROR with the error', (done) => {
  //     const userData = { name: 'New User' };

  //     updateUser.on(updateUser.events.ERROR, (response) => {
  //       expect(response.message).to.equal('Some Error');
  //       done();
  //     });

  //     updateUser.execute(321, userData);
  //   });
  // });
});
