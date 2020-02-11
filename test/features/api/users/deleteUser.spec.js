// const request = require('supertest');
// const { expect } = require('chai');
// const { getToken } = require('test/support/tokenFactory');
// const mochaAsync = require('test/support/mochaAsync');
// const { getUserId } = require('test/support/userHelper');


// describe('API :: GET /api/users:id', () => {
//   it('delete user', mochaAsync(async () => {
//     let res = await request('localhost:' + process.env.PORT).delete(`/api/users/${getUserId()}`)
//       .set('Authorization', 'bearer ' + getToken())
//       .send({
//         email : 'jec@stratpoint.com',
//         password: '111111'
//       });
//     const obj = JSON.parse(res.text);
//     console.log(obj);
//   }));   
// });
