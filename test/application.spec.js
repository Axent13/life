import startGame from '../src/js/application.js';
import Controller from '../src/js/controller.js';

describe('Checking startGame()', () => {
    it('should NOT begin game before controller is created', () => {
        let spy = sinon.spy(Controller.prototype, 'initializeInterval');

        expect(spy.called).to.be.false;
        spy.restore();
     });
    it('should succedfully begin game after controller is created', () => {
        let spy = sinon.spy(Controller.prototype, 'initializeInterval');

        startGame();
        expect(spy.called).to.be.true;
        spy.restore();
     });
});
