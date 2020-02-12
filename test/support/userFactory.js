const request = require('supertest');
const { setUserCredentials } = require('test/support/userHelper');

exports.generateUser =  async (role) => {
  const data = {
    email: 'test'+Math.random()+'@stratpoint.com',
    password: '111111',
    firstName: 'jerico',
    lastName: 'Estanislao',
    middleName: 'Esquibel',
    role: role
  };
  let res = await request('localhost:3000')
    .post('/api/users')
    .send(data);
  const id = JSON.parse(res.text).details.userId;
  setUserCredentials({
    userId: id,
    credentials: {
      email: data.email,
      password: data.password
    }
  });
};