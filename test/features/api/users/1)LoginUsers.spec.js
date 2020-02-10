const app = require('test/support/test-app');
const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

let token;

// chai.use(chaiHttp);
describe('API :: POST /api/login', () => {
  before(() => {
    request('http://localhost:3000')
      .post('/api/login')
      .send({           
        email : 'jagustin@stratpoint.com',
        password: '111111' 
      })
      .end((err, res) => {
        const responseObject = res.text;
        const fields = responseObject.split(' "token":');
        console.log(fields[1]);
        // console.log(res.text);
        // token = res.token;
        // token = result;

        // done();
      });
    // app();
  });
  context('when credentials are valid', () => {
    it('returns token', async (done) => {
      request('/api/login')
        .set('Authorization', 'Bearer ' +token)
        .expect(200, done);
    });
  });
});
//   context('when credentials are invalid', () => {
//     it('returns 401', async () => {
//       chai.request('localhost:' + process.env.PORT)
//         .post('/api/login')
//         .end((err, res) => {
//           expect(res).to.have.status(401);         
//         });
//     });
//   });
// });

// describe('API :: GET /api/users', () => {
//   before(() => {
//     console.log(token);
//   });
//   context('when credentials are valid', () => {  
//     it('returns 401 when user is not authenticated', async () => {
//       chai.request('localhost:' + process.env.PORT)
//         .get('/api/users')
//         .end((err, res) => {
//           expect(res).to.have.status(401);                            
//         });
//     });
//   });
//   context('when credentials are valid', () => {  
//     it('returns list of users when credentials are valid', async () => {
//       chai.request('localhost:' + process.env.PORT)
//         .get('/api/users')
//         .set('Authorization', 'bearer ' + token)
//         .end((err, res) => {
//           // console.log(res);
//           // console.log(token);
//           expect(res).to.have.status(200);                            
//         });
//     });
//   });    

  