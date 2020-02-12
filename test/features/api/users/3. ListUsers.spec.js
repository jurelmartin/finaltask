const request = require('supertest');
const { expect } = require('chai');
const { getAdminToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: GET /api/users', () => {
  context('when credentials are invalid', () => {  
    it('returns 401 when user is not authenticated', mochaAsync(async () => {
      let res = await request('localhost:3001').get('/api/users');
      expect(res.status).to.equal(401);                            
    })
    );
  });
  context('when credentials are valid', () => {  
    it('returns list of users when credentials are valid', mochaAsync(async () => {
      let res = await request('localhost:3001')
        .get('/api/users')
        .set('Authorization', 'bearer ' + getAdminToken());
      expect(res.status).to.equal(200);                            
    })
    );
  });    
});
    