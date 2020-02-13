const request = require('supertest');
const { expect } = require('chai');
const mochaAsync = require('test/support/mochaAsync');
const { setUserCredentials, setAdminCredentials } = require ('test/support/userHelper');

describe('API :: POST /api/users', () => {
  context('when inputs are valid', () => {  
    const adminData = {
      email: 'test'+Math.random()+'@stratpoint.com',
      password: '111111',
      firstName: 'jerico',
      lastName: 'Estanislao',
      middleName: 'Esquibel',
      role: 'admin'
    };
    const userData = {
      email: 'test'+Math.random()+'@stratpoint.com',
      password: '111111',
      firstName: 'jerico',
      lastName: 'Estanislao',
      middleName: 'Esquibel',
      role: 'user'
    };
    it('returns 200', mochaAsync(async () => {
      let res = await request('localhost:3001')
        .post('/api/users')
        .send(adminData);

      expect(res.status).to.equal(201);       
      setAdminCredentials({
        email: adminData.email,
        password: adminData.password
      });   
      res = await request('localhost:3001')
        .post('/api/users')
        .send(userData);

      expect(res.status).to.equal(201);       
      setUserCredentials({
        email: userData.email,
        password: userData.password
      });              
    })
    );
  });
  context('when inputs are invalid', () => {  
    it('returns 401', mochaAsync(async () => {
      let res = await request('localhost:3001')
        .post('/api/users')
        .send({
          email: 'test'+Math.random()+'@stratpoint.com',
          password: '11111',
          firstName: 'jerico',
          lastName: 'Estanislao',
          middleName: 'Esquibel',
          role: 'admin'
        });
  
      expect(res.status).to.equal(400);                         
    })
    );
  });
});
    