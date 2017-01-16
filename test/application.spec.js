import startGame from '../src/js/application.js';
import Controller from '../src/js/controller.js';

describe('Checking startGame()', () => {
  it('should NOT begin game before controller is created', () => {
    let spy = sinon.spy(Controller.prototype, 'constructor');

    expect(spy.called).to.be.false;
    spy.restore();
  });
  it('should succedfully begin game after controller is created', () => {
    let spy = sinon.spy(Controller.prototype, 'constructor');

    /* This tests doesn't work... */
    startGame();
    expect(spy.called).to.be.true;
    spy.restore();
  });
});
