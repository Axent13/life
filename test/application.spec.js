import startGame from '../src/application.js';
import Controller from '../src/controller.js';

describe('Checking starGame()', () => {
    it('should successfully create the object', () => {
        let spy = sinon.spy(Controller.prototype, 'initializeInterval');

        expect(spy.called).to.be.false;
        spy.restore();
     });
    it('should successfully create the object', () => {
        let spy = sinon.spy(Controller.prototype, 'initializeInterval');

        startGame();
        expect(spy.called).to.be.true;
        spy.restore();
     });
});
