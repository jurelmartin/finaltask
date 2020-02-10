const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { generateToken } = require('test/support/tokenFactory');

chai.use(chaiHttp);
describe('API :: GET /api/users', () => {
  context('when credentials are invalid', () => {  
    it('returns 401 when user is not authenticated', async () => {
      chai.request('localhost:' + process.env.PORT)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(401);                            
        });
    });
  });
  context('when credentials are valid', () => {  
    it('returns list of users when credentials are valid', async () => {
      chai.request('localhost:' + process.env.PORT)
        .get('/api/users')
        .set('Authorization', 'bearer ' + generateToken())
        .send({
          email : 'jec@stratpoint.com',
          password: '111111'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);                            
        });
    });
  });    
});
    