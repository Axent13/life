import startGame from '../src/js/application.js';
import Controller from '../src/js/controller.js';

describe('Checking startGame()', () => {
  it('should successfully create Controller object', () => {
    const testObject = startGame();

    const result = testObject instanceof Controller;

    assert.equal(result, true);
  });
});
