const request = require('supertest');
const { expect } = require('chai');
const { getToken } = require('test/support/tokenFactory');
const mochaAsync = require('test/support/mochaAsync');
const { getUserId } = require('test/support/userHelper');

describe('API :: PUT /api/users/:id', () => {
  context('when user exists', () => {
    context('when sent data is valid', () => {
      it('updates and returns 202 with the updated user', mochaAsync(async() => {
        let res = await request('localhost:' + process.env.PORT).put(`/api/users/${getUserId()}`)
          .set('Authorization', 'bearer ' + getToken())
          .send({
            firstName: 'newFirst',
            lastName: 'newLast'
          });
        const obj = JSON.parse(res.text);
        expect(obj.status).to.equal(202);
        expect(obj.details.result).to.be.an('array');
        // console.log(obj);
      }));
    });

    context('when sent data is invalid', () => {
      it('returns 400 with validation error', mochaAsync(async () => {
        let res = await request('localhost:' + process.env.PORT).put(`/api/users/${getUserId()}`)
          .set('Authorization', 'bearer ' + getToken())
          .send({
            email: 'm',
            password: 'a',
            firstName: 'l',
            lastName: 'i',
            middleName: '!'
          })
          .expect(400);
        const obj = JSON.parse(res.text);
        expect(obj.type).to.equal('ValidationError');
        expect(obj.details.message[0]).to.equal('Please input a vaid email!');
        expect(obj.details.message[1]).to.equal('Minimum password length is 6!');
        expect(obj.details.message[2]).to.equal('Minimum firstName length is 4!');
        expect(obj.details.message[3]).to.equal('Minimum lastName length is 4!');
        expect(obj.details.message[4]).to.equal('Minimum middleName length is 4!');


      }));
    });

  });

  context('when user does not exist', () => {
    it('returns 400 with the NotFoundError', mochaAsync(async() => {
      const user = {
        id: 'fc879fc7-052f-4f63-8f26-b5881d5adb60'
      };
      let res = await request('localhost:' + process.env.PORT).put(`/api/users/${user.id+'wrong'}`)
        .set('Authorization', 'bearer ' + getToken())
        .send({
          firstName: 'tryToEdit'
        })
        .expect(400);
    
      const obj = JSON.parse(res.text);
      expect(obj.details).to.equal('NotFoundError');
    }));
  });
});
