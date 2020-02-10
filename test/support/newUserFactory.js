const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

exports.generateUser = async () => {
  chai.request('localhost:' + process.env.PORT)
    .post('/api/users')
    .send({
      email: 'test'+Math.random()+'@stratpoint.com',
      password: '111111',
      firstName: 'jerico',
      lastName: 'Estanislao',
      middleName: 'Esquibel',
      role: 'admin'
    })
    .end(async(err, res) => {
      return await JSON.parse(res.text).details.userId;                          
    });
};