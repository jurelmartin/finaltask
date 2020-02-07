const { expect } = require('chai');
const ShowUser = require('src/app/ShowUser');
const { authorization } = require('ftauth');


describe('App :: User :: ShowUser', () => {
  // this.enableTimeouts(false);
  let showUser;

  context('when user exists', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getById: (userId) => Promise.resolve({
          dataValues: {
            id: userId,
            email: 'jagustin@stratpoint.com',
            role: 'admin',
            firstName: 'jorelle',
            lastName: 'agustin',
            middleName: 'dela pena'
          }

        })
      };

      showUser = new ShowUser({
        UserRepository: MockUsersRepository
      });
    });

    it('emits SUCCESS with the user', (done) => {
      showUser.on(showUser.events.SUCCESS, (user) => {
        expect(user.dataValues.id).to.equal(1);
        expect(user.dataValues.email).to.equal('jagustin@stratpoint.com');
        expect(user.dataValues.role).to.equal('admin');
        expect(user.dataValues.firstName).to.equal('jorelle');
        expect(user.dataValues.lastName).to.equal('agustin');
        expect(user.dataValues.middleName).to.equal('dela pena');
        done();
      });

      showUser.execute(1);
      
    });
  });

  context('when user does not exist', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getById: () => Promise.reject({
          details: 'User with id 123 can\'t be found.'
        })
      };

      showUser = new ShowUser({
        UserRepository: MockUsersRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      showUser.on(showUser.events.NOT_FOUND, (error) => {
        expect(error.details).to.equal('User with id 123 can\'t be found.');
        done();
      });

      showUser.execute(123);
    });
  });
});
