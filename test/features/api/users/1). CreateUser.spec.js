const request = require('supertest');
const { expect } = require('chai');
const mochaAsync = require('test/support/mochaAsync');

describe('API :: POST /api/users', () => {
  context('when inputs are valid', () => {  
    it('returns 200', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT)
        .post('/api/users')
        .send({
          email: 'test'+Math.random()+'@stratpoint.com',
          password: '111111',
          firstName: 'jerico',
          lastName: 'Estanislao',
          middleName: 'Esquibel',
          role: 'admin'
        });

      expect(res.status).to.equal(201);                         
    })
    );
  });
  context('when inputs are invalid', () => {  
    it('returns 401', mochaAsync(async () => {
      let res = await request('localhost:' + process.env.PORT)
        .post('/api/users')
        .send({
          email: 'test'+Math.random()+'@stratpoint.com',
          password: '111111',
          firstName: 'jerico',
          lastName: 'Estanislao',
          middleName: 'Esquibel',
          role: 'admin'
        });
  
      expect(res.status).to.equal(201);                         
    })
    );
  });
});
    