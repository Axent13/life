import Controller from '../src/js/controller.js';
import Model from '../src/js/model.js';

const assert = require('assert');

describe('Controller testing', () => {
  describe('Checking constructor', () => {
    it('input fieldWidth should be equal to property _fieldWidth', () => {
      const fieldWidth = 10;
      const controller = new Controller(fieldWidth, 1);

      assert.equal(controller._fieldWidth, fieldWidth);
    });
    it('input fieldHeight should be equal to property _fieldHeight', () => {
      const fieldHeight = 10;
      const controller = new Controller(1, fieldHeight);

      assert.equal(controller._fieldHeight, fieldHeight);
    });
    it('properties _fieldWidth and _fieldHeight should be 30 in default', () => {
      const controller = new Controller();

      assert.equal(controller._fieldWidth, 30);
      assert.equal(controller._fieldHeight, 30);
    });
  });
  describe('Checking nextStep()', () => {
    beforeEach(() => {
      const testBody = '<table class="game-field js-game-field"><tbody>' +
        '<tr><td data-position="0-0" class="dead"></td>' +
        '<td data-position="0-1" class="dead"></td>' +
        '<td data-position="0-2" class="dead"></td></tr>' +
        '<tr><td data-position="1-0" class="dead"></td>' +
        '<td data-position="1-1" class="dead"></td>' +
        '<td data-position="1-2" class="dead"></td></tr>' +
        '<tr><td data-position="2-0" class="dead"></td>' +
        '<td data-position="2-1" class="dead"></td>' +
        '<td data-position="2-2" class="dead"></td></tr>' +
        '</tbody></table>';

      const $body = $('body');
      $body.html(testBody);
    });
    it('cell [0, 0] will change after nextStep()', () => {
      const controller = new Controller(3, 3);
      controller._model.changeCellState(0, 0);

      controller.nextStep();

      const result = controller._model._changingCells;
      assert.deepEqual(result, [[0, 0]]);
    });
    it('cell [-1, -1] will not change anything after nextStep()', () => {
      const controller = new Controller(3, 3);

      controller._model.changeCellState(-1, -1);
      controller.nextStep();

      const result = controller._model._changingCells;
      assert.deepEqual(result, []);
    });
    it('1x3 line should change 4 cells after nextStep()', () => {
      const controller = new Controller(3, 3);

      controller._model.changeCellState(1, 0);
      controller._model.changeCellState(1, 1);
      controller._model.changeCellState(1, 2);

      controller.nextStep();

      const result = controller._model._changingCells;
      assert.deepEqual(result, [[1, 0], [0, 1], [2, 1], [1, 2]]);
    });
  });

  describe('Checking initializeInterval()', () => {
    beforeEach(() => {
      const testBody = '<form class="control">' +
        '<button class="start-button js-start-button">Начать</button>' +
        '<button class="pause-button js-pause-button" disabled>Пауза</button>' +
        '</form>';

      const $body = $('body');
      $body.html(testBody);
    });

  });

  describe('Checking gameStateListen()', () => {
    it('should call model.setGameState(), after view emits startGame', () => {
      const controller = new Controller();

      let spy = sinon.spy(Model.prototype, 'setGameState');
      expect(spy.called).to.be.false;

      controller._view.emit('startGame');

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call model.setGameState(), after view emits pauseGame', () => {
      const controller = new Controller();

      let spy = sinon.spy(Model.prototype, 'setGameState');
      expect(spy.called).to.be.false;

      controller._view.emit('pauseGame');

      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('Checking changeCellListen()', () => {
    it('should call model.changeCellState(), after view emits changeCell', () => {
      const controller = new Controller();

      let spy = sinon.spy(Model.prototype, 'changeCellState');
      expect(spy.called).to.be.false;

      controller._view.emit('changeCell', '0-0');

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call model.changeCellState() with parameters (0,0), after view emits changeCell', () => {
      const controller = new Controller();

      let spy = sinon.spy(Model.prototype, 'changeCellState');
      expect(spy.called).to.be.false;

      controller._view.emit('changeCell', '0-0');

      sinon.assert.calledWith(spy, '0', '0');
      spy.restore();
    });
  });
});
