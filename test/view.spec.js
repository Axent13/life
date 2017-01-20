import View from '../src/js/view.js';
const EventEmitter = require('events').EventEmitter;

const assert = require('assert');

describe('View testing:', () => {
  beforeEach(() => {
    const testBody = '<table class="game-field js-game-field"></table>';
    const $body = $('body');

    $body.html(testBody);
  });
  describe('Checking constructor', () => {
    it('should call method _startButtonBind() after creating', () => {
      const spy = sinon.spy(View.prototype, '_startButtonBind');

      new View();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call method _pauseButtonBind() after creating', () => {
      const spy = sinon.spy(View.prototype, '_pauseButtonBind');

      new View();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call method _changeCellStateBind() after creating', () => {
      const spy = sinon.spy(View.prototype, '_changeCellStateBind');

      new View();
      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call method _unfocusInputsBind() after creating', () => {
      const spy = sinon.spy(View.prototype, '_unfocusInputsBind');

      new View();
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('Checking drawField()', () => {
    it('0x0 field', () => {
      const view = new View();

      const resultingField = view.drawField(0, 0, []);
      const expectingResult = '';

      assert.equal(resultingField, expectingResult);
    });
    it('0x0 field - cheking DOM', () => {
      const view = new View();

      view.drawField(0, 0, []);
      const $body = $('body');
      const result = $body.html();
      const expectingResult = '<table class="game-field js-game-field"></table>';

      assert.equal(result, expectingResult);
    });
    it('1x1 field', () => {
      const view = new View();

      const resultingField = view.drawField(1, 1, [[0]]);
      const expectingResult = '<tr><td class="dead" data-position="0-0"></td></tr>';

      assert.equal(resultingField, expectingResult);
    });
    it('1x1 field - checking DOM', () => {
      const view = new View();

      view.drawField(1, 1, [[0]]);
      const $body = $('body');
      const result = $body.html();
      const expectingResult = '<table class="game-field js-game-field">' +
        '<tr><td class="dead" data-position="0-0"></td></tr></table>';

      assert.equal(result, expectingResult);
    });
    it('2x1 field', () => {
      const view = new View();

      const resultingField = view.drawField(1, 2, [[0, 0]]);
      const expectingResult = '<tr><td class="dead" data-position="0-0"></td><td class="dead" data-position="0-1"></td></tr>';

      assert.equal(resultingField, expectingResult);
    });
    it('2x1 field - checking DOM', () => {
      const view = new View();

      view.drawField(1, 2, [[0, 0]]);
      const $body = $('body');
      const result = $body.html();

      const expectingResult = '<table class="game-field js-game-field"><tr>' +
        '<td class="dead" data-position="0-0"></td>' +
        '<td class="dead" data-position="0-1"></td>' +
        '</tr></table>';

      assert.equal(result, expectingResult);
    });
  });

  describe('Checking _changeCellStateBind()', () => {
    beforeEach(() => {
      const testBody = '<table class="game-field js-game-field"><tr>' +
        '<td data-position="0-0" class="dead"></td></tr></table>';

      const $body = $('body');
      $body.html(testBody);
    });
    it('Click on dead cell changes it class to alive', () => {
      const view = new View();

      const $cell = $('td');
      $cell.trigger('click');

      assert.equal($cell.hasClass('alive'), true);
    });
    it('Click on dead cell removes class dead from it', () => {
      const view = new View();

      const $cell = $('td');
      $cell.trigger('click');

      assert.equal($cell.hasClass('dead'), false);
    });
    it('should emit changeCell', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $cell = $('td');
      $cell.trigger('click');

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should emit changeCell with parameter 0-0', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $cell = $('td');
      $cell.trigger('click');
      const cellPosition = $cell.attr('data-position');

      sinon.assert.calledWith(spy, 'changeCell', cellPosition);
      spy.restore();
    });
  });

  describe('Checking _unfocusInputsBind()', () => {
    beforeEach(() => {
      const testBody = '<form class="control">' +
        '<input class="control__height js-control__height" type="text" maxlength="3" placeholder="30" />' +
        '<input class="control__width js-control__width" type="text" maxlength="3" placeholder="30" />' +
        '</form>';

      const $body = $('body');
      $body.html(testBody);
    });
    it('should call method isPositiveNumber after unfocus js-cotrol__height', () => {
      const view = new View();
      const spy = sinon.spy(View, 'isPositiveNumber');

      const $heightInput = $('.js-control__height');
      $heightInput.val('10');
      $heightInput.focusout();

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call method isPositiveNumber with parameter 10 after unfocus js-cotrol__height', () => {
      const view = new View();
      const spy = sinon.spy(View, 'isPositiveNumber');

      const $heightInput = $('.js-control__height');
      $heightInput.val('10');
      $heightInput.focusout();

      sinon.assert.calledWith(spy, '10');
      spy.restore();
    });
    it('should emit after unfocus js-cotrol__height', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $heightInput = $('.js-control__height');
      $heightInput.val('10');
      $heightInput.focusout();

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should not emit if value was not a positive number after unfocus js-cotrol__height', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $heightInput = $('.js-control__height');
      $heightInput.val('-10');
      $heightInput.focusout();

      expect(spy.called).to.be.false;
      spy.restore();
    });
    it('should emit changeFieldHeight with parameter 10 after unfocus js-cotrol__height', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $heightInput = $('.js-control__height');
      $heightInput.val('10');
      $heightInput.focusout();

      sinon.assert.calledWith(spy, 'changeFieldHeight', '10');
      spy.restore();
    });
    it('should call method isPositiveNumber after unfocus js-cotrol__width', () => {
      const view = new View();
      const spy = sinon.spy(View, 'isPositiveNumber');

      const $widthInput = $('.js-control__width');
      $widthInput.val('10');
      $widthInput.focusout();

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should call method isPositiveNumber with parameter 10 after unfocus js-cotrol__width', () => {
      const view = new View();
      const spy = sinon.spy(View, 'isPositiveNumber');

      const $widthInput = $('.js-control__width');
      $widthInput.val('10');
      $widthInput.focusout();

      sinon.assert.calledWith(spy, '10');
      spy.restore();
    });
    it('should emit after unfocus js-cotrol__width', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $widthInput = $('.js-control__width');
      $widthInput.val('10');
      $widthInput.focusout();

      expect(spy.called).to.be.true;
      spy.restore();
    });
    it('should not emit if value was not a positive number after unfocus js-cotrol__width', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $widthInput = $('.js-control__width');
      $widthInput.val('-10');
      $widthInput.focusout();

      expect(spy.called).to.be.false;
      spy.restore();
    });
    it('should emit changeFieldWidth with parameter 10 after unfocus js-cotrol__width', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $widthInput = $('.js-control__width');
      $widthInput.val('10');
      $widthInput.focusout();

      sinon.assert.calledWith(spy, 'changeFieldWidth', '10');
      spy.restore();
    });
  });

  describe('Checking _startButtonBind()', () => {
    beforeEach(() => {
      const testBody = '<form class="control">' +
        '<button class="start-button js-start-button">Начать</button>' +
        '<button class="pause-button js-pause-button" disabled>Пауза</button>' +
        '</form>';

      const $body = $('body');
      $body.html(testBody);
    });
    it('Click on the js-start-button adds attr disabled to itself', () => {
      const view = new View();

      const $startButton = $('.js-start-button');
      $startButton.trigger('click');

      assert.equal($('.js-start-button').prop('disabled'), true);
    });
    it('Click on the js-start-button deletes attr disabled from js-pause-button', () => {
      const view = new View();

      const $startButton = $('.js-start-button');
      $startButton.trigger('click');

      assert.equal($('.js-pause-button').prop('disabled'), false);
    });
    it('should emit startGame after clicking on js-start-button', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $startButton = $('.js-start-button');
      $startButton.trigger('click');

      sinon.assert.calledWith(spy, 'startGame');
      spy.restore();
    });
  });

  describe('Checking _pauseButtonBind()', () => {
    beforeEach(() => {
      const testBody = '<form class="control">' +
        '<button class="start-button js-start-button">Начать</button>' +
        '<button class="pause-button js-pause-button" disabled>Пауза</button>' +
        '</form>';

      const $body = $('body');
      $body.html(testBody);
    });
    it('Click on the js-pause-button adds attr disabled to itself', () => {
      const view = new View();

      const $startButton = $('.js-pause-button');
      $startButton.trigger('click');

      assert.equal($('.js-pause-button').prop('disabled'), true);
    });
    it('Click on the js-pause-button deletes attr disabled from js-start-button', () => {
      const view = new View();

      const $startButton = $('.js-pause-button');
      $startButton.trigger('click');

      assert.equal($('.js-start-button').prop('disabled'), false);
    });
    it('should emit pauseGame after clicking on js-pause-button', () => {
      const view = new View();
      const spy = sinon.spy(View.prototype, 'emit');

      const $startButton = $('.js-pause-button');
      $startButton.trigger('click');

      sinon.assert.calledWith(spy, 'pauseGame');
      spy.restore();
    });
  });

  describe('Chacking isPositiveNumber', () => {
    it('should return true if argument 10', () => {
      const result = View.isPositiveNumber(10);

      assert.equal(result, true);
    });
    it('should return true if argument 30', () => {
      const result = View.isPositiveNumber('30');

      assert.equal(result, true);
    });
    it('should return false if argument 0', () => {
      const result = View.isPositiveNumber(0);

      assert.equal(result, false);
    });
    it('should return true if argument -10', () => {
      const result = View.isPositiveNumber(-10);

      assert.equal(result, false);
    });
    it('should return true if argument a45r', () => {
      const result = View.isPositiveNumber('a45r');

      assert.equal(result, false);
    });
  });
});
