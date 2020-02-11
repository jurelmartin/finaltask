const app = require('test/support/test-app');
const { setToken } = require('test/support/tokenFactory');
const request = require('supertest');
const { expect } = require('chai');

var mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

before(() => {
  app();
});
describe('API :: POST /api/login', () => {

  context('when credentials are valid', () => {
    it('returns 200', mochaAsync(async () => { 
      let res = await request('localhost:' + process.env.PORT)
        .post('/api/login')
        .send({
          email : 'jec@stratpoint.com',
          password: '111111'
        });
      expect(res.status).to.equal(200);
    }));
    it('returns token with userId', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT).post('/api/login')
        .send({
          email : 'jec@stratpoint.com',
          password: '111111'
        });
      const obj = JSON.parse(res.text);
      setToken(obj.details.result.token);
      expect(obj.details.result).to.have.property('token');
      expect(obj.details.result).to.have.property('userId');   
    }));

  });

  context('when credentials are invalid', () => {
    it('returns 401', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT).post('/api/login')
        .send({
          email: 'jagustin@stratpoint.com',
          password: '1'
        });
      expect(res.status).to.equal(401); 

    }));
  });
});