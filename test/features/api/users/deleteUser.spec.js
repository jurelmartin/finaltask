// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = require('chai');
// const { generateToken } = require('test/support/tokenFactory');
// const { generateUser } = require('test/support/newUserFactory');

// chai.use(chaiHttp);
// describe('API :: GET /api/users:id', () => {
//   before(async() => {
//     console.log(await generateUser());
//   });
//   it('delete user', async () => {
//     chai.request('localhost:' + process.env.PORT)
//       .delete('/api/users')
//       .set('Authorization', 'bearer ' + generateToken())
//       .send({
//         email : 'jec@stratpoint.com',
//         password: '111111'
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);                            
//       });
//   });   
// });
    