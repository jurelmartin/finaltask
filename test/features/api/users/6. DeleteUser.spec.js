const request = require('supertest');
const { expect } = require('chai');
const { getUserId } = require('test/support/userHelper');
const { getAdminToken, getUserToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: DELETE /api/users/:id', () => {


  context('when user is authenticated', () => {
    context('when user role is "user"', () => {
      context('user is UNAUTHORIZED', () => {
        it('returns 403 with the message', mochaAsync(async()=> {
          let res = await request('localhost:3000')
            .delete(`/api/users/${getUserId()}`)
            .set('Authorization', 'bearer ' + getUserToken())
            .expect(403);

          const obj = JSON.parse(res.text); 
          expect(obj.details).to.be.equal('Not Authorized');             
        }));
      });
    });

    context('when user role is "admin"', () => {
      context('user is AUTHORIZED', () => {
        context('when user exists', () => {
          it('returns 200 with the message', mochaAsync(async () => {
            let res = await request('localhost:3000')
              .delete(`/api/users/${getUserId()}`)
              .set('Authorization', 'bearer ' + getAdminToken())
              .expect(200);
      
            const obj = JSON.parse(res.text);      
            expect(obj.details.message).to.equal('Successfully deleted!');                
          }));
        });
        context('when user does not exists', () => {
          it('returns 404 with the NotFound error', mochaAsync(async () => {
            let res = await request('localhost:3000')
              .delete('/api/users/1')
              .set('Authorization', 'bearer ' + getAdminToken())
              .expect(404);

            const obj = JSON.parse(res.text);      
            expect(obj.details).to.be.equal('User does not exists!');                          
          }));
        });
      });
    });
  });  

  context('when user is not authenticated', () => {  
    it('returns 401 with the message', mochaAsync(async () => {
      let res = await request('localhost:3000')
        .delete(`/api/users/${getUserId()}`)
        .expect(401);

      const obj = JSON.parse(res.text);
      expect(obj.message).to.equal('Not Authenticated');                            
    }));
  });
});