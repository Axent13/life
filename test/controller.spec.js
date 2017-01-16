import Controller from '../src/js/controller.js';
import Model from '../src/js/model.js';
import View from '../src/js/view.js';

const chai = require('chai');
const assert = chai.assert;

describe('Controller testing', () => {
  describe('Checking constructor', () => {
    it('should run _gameStatelisten after creation', () => {
      const spy = sinon.spy(Controller.prototype, '_gameStateListen');

      new Controller();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should run _changeCellListen after creation', () => {
      const spy = sinon.spy(Controller.prototype, '_changeCellListen');

      new Controller();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should run _unfocusInputsListen after creation', () => {
      const spy = sinon.spy(Controller.prototype, '_unfocusInputsListen');

      new Controller();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('checking that model was created after controller creation', () => {
      const controller = new Controller();

      assert.isDefined(controller._model);
    });
    it('checking that _model.createEmptyField() was called after creation', () => {
      const spy = sinon.spy(Model.prototype, 'createEmptyField');

      new Controller();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('checking that view was created after controller creation', () => {
      const controller = new Controller();

      assert.isDefined(controller._view);
    });
    it('chacking that _view.drawField was called after creation', () => {
      const spy = sinon.spy(View.prototype, 'drawField');

      new Controller();
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('Checking initializeInterval()', () => {
    it('should not call method nextStep if model._isPaused === true', () => {
      const controller = new Controller();
      controller.initializeInterval();
      const spy = sinon.spy(Controller.prototype, 'nextStep');

      expect(spy.called).to.be.false;
      spy.restore();
    });
    it('should not call method nextStep if model._isPaused === true but not passed at least 1 second', () => {
      const clock = sinon.useFakeTimers();

      const controller = new Controller();
      controller.initializeInterval();

      const spy = sinon.spy(Controller.prototype, 'nextStep');

      expect(spy.called).to.be.false;

      controller._model._isPaused = false;
      clock.tick(500);
      expect(spy.called).to.be.false;

      spy.restore();
      clock.restore();
    });
    it('should call method nextStep if model._isPaused === false and passed at least 1 second', () => {
      const clock = sinon.useFakeTimers();

      const controller = new Controller();

      controller.initializeInterval();

      const spy = sinon.spy(Controller.prototype, 'nextStep');

      expect(spy.called).to.be.false;

      controller._model._isPaused = false;
      clock.tick(10000);
      expect(spy.called).to.be.true;

      spy.restore();
      clock.restore();
    });
    it('should not call method nextStep if model._isPaused === true and passed at least 1 second', () => {
      const clock = sinon.useFakeTimers();

      const controller = new Controller();

      controller.initializeInterval();

      const spy = sinon.spy(Controller.prototype, 'nextStep');

      clock.tick(10000);
      expect(spy.called).to.be.false;

      spy.restore();
      clock.restore();
    });
  });

  describe('Checking nextStep()', () => {
    it('should call method _model.nextCellStates', () => {
      const controller = new Controller();
      const spy = sinon.spy(Model.prototype, 'nextCellStates');

      controller.nextStep();

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call method _view.drawField', () => {
      const controller = new Controller();
      const spy = sinon.spy(View.prototype, 'drawField');

      controller.nextStep();

      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
  describe('Checking gameStateListen()', () => {
    it('should call model.setGameState(), after view emits startGame', () => {
      const controller = new Controller();

      const spy = sinon.spy(Model.prototype, 'setGameState');
      expect(spy.called).to.be.false;

      controller._view.emit('startGame');

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call model.setGameState(), after view emits pauseGame', () => {
      const controller = new Controller();

      const spy = sinon.spy(Model.prototype, 'setGameState');
      expect(spy.called).to.be.false;

      controller._view.emit('pauseGame');

      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('Checking changeCellListen()', () => {
    it('should call model.changeCellState(), after view emits changeCell', () => {
      const controller = new Controller();

      const spy = sinon.spy(Model.prototype, 'changeCellState');
      expect(spy.called).to.be.false;

      controller._view.emit('changeCell', '0-0');

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call model.changeCellState() with parameters (0,0), after view emits changeCell', () => {
      const controller = new Controller();

      const spy = sinon.spy(Model.prototype, 'changeCellState');
      expect(spy.called).to.be.false;

      controller._view.emit('changeCell', '0-0');

      sinon.assert.calledWith(spy, '0', '0');
      spy.restore();
    });
  });
});
