const { expect } = require('chai');
const  sinon  = require('sinon');
const LoginUser = require('src/app/LoginUser');
const { authentication }  = require('ftauth');
const hashPassword  = require('src/infra/encryption/hashPassword');


describe('App :: User :: LoginUser', () => {
    
  let loginUser;

  context('when user credentials are VALID', () => {
    before(() => {
        
      const MockUsersRepository = {
        getAll: () => Promise.resolve([{
          dataValues:{
            id: 1,
            email: 'jagustin@stratpoint.com',
            password: '111111'
          }
        }])
      };
      
      loginUser = new LoginUser({
        UserRepository: MockUsersRepository
      });
    });

    it('should emits SUCCESS with the details', (done) => {

      const data = {       
        email: 'jagustin@stratpoint.com',
        password: '111111'
      };

      sinon.stub(hashPassword, 'comparePassword');
      hashPassword.comparePassword.returns(this.pasword = true);

      sinon.stub(authentication, 'generateToken');
      authentication.generateToken.returns({
        token: 'zyx',
        userId: 1
      }); 
      
      
      loginUser.on(loginUser.events.SUCCESS, (token) => {

        expect(token).to.have.property('userId');
        done();   
      });

      loginUser.execute(data);
      
    });
  });
    
  context('when user credentials are INVALID', () => {
    before(() => {
        
      const MockUsersRepository = {
        getAll: () => Promise.reject(new Error('VALIDATION ERROR'))
      };

      loginUser = new LoginUser({
        UserRepository: MockUsersRepository
      });
      
    });

    it('should emits VALIDATION_ERROR',  (done) => {

      const data = {       
        email: 'jagustin@stratpoint.com',
        password: '111111'
      };


      loginUser.on(loginUser.events.VALIDATION_ERROR, (error) => {
        expect(error.type).to.equal('VALIDATION ERROR');
        done();
      });

      loginUser.execute(data);
    });
  });
});
