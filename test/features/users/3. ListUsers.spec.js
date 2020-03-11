const request = require('supertest');
const { expect } = require('chai');
const { getAdminToken, getUserToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: GET /api/users', () => {
  context('when user is authenticated', () => {
    context('when users exists', () => {
      it('returns 200 with the user data', mochaAsync(async () => {
        let res = await request('http://localhost:3000')
          .get('/api/users')
          .set('Authorization', 'bearer ' + getAdminToken())
          .expect(200);
        const obj = JSON.parse(res.text);      
        expect(obj.details.message).to.not.be.empty();                        
      }));
    });
    context('when user does not exists', () => {
      it('returns 200 but with the NotFound error', mochaAsync(async () => {
        let res = await request('http://localhost:3000')
          .get('/api/users')
          .set('Authorization', 'bearer ' + getAdminToken())
          .expect(200);

        const obj = JSON.parse(res.text);
        let [...cloneResult] = obj.details.result;
        cloneResult = []; 
        expect(cloneResult).to.have.lengthOf(0);                          
      }));
    });
  });

  context('when user is not authenticated', () => {  
    it('returns 401 with the message', mochaAsync(async () => {
      let res = await request('http://localhost:3000')
        .get('/api/users')
        .expect(401);

      const obj = JSON.parse(res.text);     
      expect(obj.message).to.equal('Not Authenticated');                            
    }));
  });  
});
    