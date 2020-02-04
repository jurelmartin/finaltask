const { expect } = require('chai');
const {Operation} = require('@amberjs/core');

describe('App :: Operation', () => {
  var CustomOperation;

  beforeEach(() => {
    CustomOperation = class CustomOperation extends Operation {

    };

    CustomOperation.setEvents(['SUCCESS', 'VALIDATION ERROR']);
  });

  describe('#on', () => {
    context('when added handler for a valid output', () => {
      it('does not throw', () => {
        const operation = new CustomOperation();

        expect(() => {
          operation.on(operation.outputs.SUCCESS, () => {});
        }).to.not.throw;
      });
    });

    context('when added handler for a invalid output', () => {
      it('does not throw', () => {
        const operation = new CustomOperation();

        expect(() => {
          operation.on(operation.outputs.INVALID, () => {});
        }).to.throw(Error, /Invalid output "INVALID" to operation CustomOperation/);
      });
    });
  });
});
