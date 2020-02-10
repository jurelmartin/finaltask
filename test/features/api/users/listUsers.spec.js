// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = require('chai');
// const { GetToken } = require('test/support/TokenHelper');

// chai.use(chaiHttp);
// describe('API :: GET /api/users', () => {
//   before( () => {
//   });
//   it('returns 401 when user is not authenticated', async () => {
//     chai.request('localhost:' + process.env.PORT)
//       .get('/api/users')
//       .end((err, res) => {
//         expect(res).to.have.status(401);                            
//       });
//   });
//   it('returns list of users when credentials are valid', async () => {
//     chai.request('localhost:' + process.env.PORT)
//       .get('/api/users')
//       .set('X-API-Key', GetToken())
//       .send({
//         email : 'jec@stratpoint.com',
//         password: '111111'
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);                            
//       });
//   });
// });
