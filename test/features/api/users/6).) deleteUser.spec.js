const request = require('supertest');
const { expect } = require('chai');
const { getUserId } = require('test/support/userHelper');
const { getToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: DELETE /api/users/:id', () => {
  context('when credentials are invalid', () => {  
    it('returns 401 when user is not authenticated', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT).get(`/api/users/${getUserId()}`);
      expect(res.status).to.equal(401);                            
    })
    );
  });
  it('returns 404 when user is not found', mochaAsync(async () => {
    let res = await request('localhost:' + process.env.PORT)
      .delete(`/api/users/dummyid`)
      .set('Authorization', 'bearer ' + getToken());
    expect(res.status).to.equal(404);               
  })
  );
  context('when credentials are valid', () => {  
    it('deletes user data', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT)
        .delete(`/api/users/${getUserId()}`)
        .set('Authorization', 'bearer ' + getToken());
      expect(res.status).to.equal(200);                            
    })
    );
  });    
});