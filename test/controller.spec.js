import Controller from '../src/controller.js';

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
            assert.deepEqual(result, [[0, 1], [1, 0], [1, 2], [2, 1]]);
        });
    });
    describe('Checking startButtonEvent()', () => {
        beforeEach(() => {
            const testBody = '<form class="control">' +
                '<button class="start-button js-start-button">Начать</button>' +
                '<button class="pause-button js-pause-button" disabled>Пауза</button>' +
                '</form>';

            const $body = $('body');
            $body.html(testBody);
        });
        it('Click on the js-start-button makes _isPaused to be false', () => {
            const controller = new Controller();

            const $startButton = $('.js-start-button');
            $startButton.trigger('click');

            assert.equal(controller._isPaused, false);
        });
        it('Click on the js-start-button adds attr disabled to itself', () => {
            const controller = new Controller();

            const $startButton = $('.js-start-button');
            $startButton.trigger('click');

            assert.equal($('.js-start-button').prop('disabled'), true);
        });
        it('Click on the js-start-button deletes attr disabled from js-pause-button', () => {
            const controller = new Controller();

            const $startButton = $('.js-start-button');
            $startButton.trigger('click');

            assert.equal($('.js-pause-button').prop('disabled'), false);
        });
    });
    describe('Checking pauseButtonEvent()', () => {
        beforeEach(() => {
            const testBody = '<form class="control">' +
                '<button class="start-button js-start-button">Начать</button>' +
                '<button class="pause-button js-pause-button" disabled>Пауза</button>' +
                '</form>';

            const $body = $('body');
            $body.html(testBody);
        });
        it('Click on the js-pause-button makes _isPaused to be true', () => {
            const controller = new Controller();
            controller._isPaused = false;

            const $startButton = $('.js-pause-button');
            $startButton.trigger('click');

            assert.equal(controller._isPaused, true);
        });
        it('Click on the js-pause-button adds attr disabled to itself', () => {
            const controller = new Controller();

            const $startButton = $('.js-pause-button');
            $startButton.trigger('click');

            assert.equal($('.js-pause-button').prop('disabled'), true);
        });
        it('Click on the js-pause-button deletes attr disabled from js-start-button', () => {
            const controller = new Controller();

            const $startButton = $('.js-pause-button');
            $startButton.trigger('click');

            assert.equal($('.js-start-button').prop('disabled'), false);
        });
    });
    describe('Checking changeCellStateEvent()', () => {
        beforeEach(() => {
            const testBody = '<table class="game-field js-game-field"></table>';

            const $body = $('body');
            $body.html(testBody);
        });

        it('Click on dead cell changes it class to alive', () => {
            const controller = new Controller(1, 1);

            let $cell = $('td');
            $cell.trigger('click');
            $cell = $('td');

            assert.equal($cell.hasClass('alive'), true);
        });
        it('Click on dead cell removes class dead from it', () => {
            const controller = new Controller(1, 1);

            let $cell = $('td');
            $cell.trigger('click');
            $cell = $('td');

            assert.equal($cell.hasClass('dead'), false);
        });
        it('Click on alive cell changes it class to dead', () => {
            const controller = new Controller(1, 1);
            controller._model.changeCellState(0, 0);

            let $cell = $('td');
            $cell.trigger('click');
            $cell = $('td');

            assert.equal($cell.hasClass('dead'), true);
        });
        it('Click on alive cell removes class alive from it', () => {
            const controller = new Controller(1, 1);
            controller._model.changeCellState(0, 0);

            let $cell = $('td');
            $cell.trigger('click');
            $cell = $('td');

            assert.equal($cell.hasClass('alive'), false);
        });
    });
    describe('Checking initializeInterval()', () => {
        it('should not run if _isPaused === true', () => {
            const controller = new Controller();
            controller.initializeInterval();
            let spy = sinon.spy(Controller.prototype, 'nextStep');

            expect(spy.called).to.be.false;
            spy.restore();
        });
        it('should not run if _isPaused === false but not passed at least 1 second', () => {
            let clock = sinon.useFakeTimers();

            const controller = new Controller();
            controller.initializeInterval();

            let spy = sinon.spy(Controller.prototype, 'nextStep');

            expect(spy.called).to.be.false;

            controller._isPaused = true;
            clock.tick(500);
            expect(spy.called).to.be.false;

            spy.restore();
            clock.restore();
        });
        it('should run if _isPaused === false and passed at least 1 second', () => {
            let clock = sinon.useFakeTimers();

            const controller = new Controller();
            controller.initializeInterval();

            let spy = sinon.spy(Controller.prototype, 'nextStep');

            expect(spy.called).to.be.false;

            controller._isPaused = false;
            clock.tick(1000);
            expect(spy.called).to.be.true;

            spy.restore();
            clock.restore();
        });
    });
});
