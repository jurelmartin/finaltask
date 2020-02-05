const { expect } = require('chai');
const {Operation} = require('@amberjs/core');

describe('App :: Operation', () => {
  var CustomOperation;

  beforeEach(() => {
    CustomOperation = class CustomOperation extends Operation {

    };

    CustomOperation.setEvents(['SUCCESS']);
  });

  describe('#on', () => {
    context('when added handler for a valid output', () => {
      it('does not throw', () => {
        const operation = new CustomOperation();

        expect(() => {
          operation.on(operation.events.SUCCESS, () => {});
        }).to.not.throw;
      });
    });

    context('when added handler for a invalid output', () => {
      it('throws', () => {
        const operation = new CustomOperation();
        expect(() => {
          operation.on('INVALID', () => {});
        }).to.throw('Invalid event "INVALID" to operation CustomOperation');
      });
    });
  });
});
