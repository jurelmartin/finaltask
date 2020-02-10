const app = require('test/support/test-app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);

before(() => {
  app();
});
describe('API :: POST /api/login', () => {
  context('when credentials are invalid', () => {
    it('returns 401', async () => {
      chai.request('localhost:' + process.env.PORT)
        .post('/api/login')
        .end((err, res) => {
          expect(res).to.have.status(401);         
        });
    });
  });
  
  context('when credentials are valid', () => {
    it('returns token', async () => {
      chai.request('localhost:' + process.env.PORT)
        .post('/api/login')
        .send({
          email : 'jec@stratpoint.com',
          password: '111111'
        })
        .end(async (err, res) => {
          expect(res).to.have.status(200);          
        });
    });
  });
});