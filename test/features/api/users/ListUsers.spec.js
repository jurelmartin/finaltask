const request = require('supertest');
const { expect } = require('chai');
const { getToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: GET /api/users', () => {
  context('when credentials are invalid', () => {  
    it('returns 401 when user is not authenticated', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT).get('/api/users');
      expect(res.status).to.equal(401);                            
    })
    );
  });
  context('when credentials are valid', () => {  
    it('returns list of users when credentials are valid', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT)
        .get('/api/users')
        .set('Authorization', 'bearer ' + getToken());
      expect(res.status).to.equal(200);                            
    })
    );
  });    
});
    