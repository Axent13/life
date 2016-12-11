import Controller from '../src/js/controller.js';

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

            $('[data-position=0-0]').toggleClass('alive dead');
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

            $('[data-position=1-0]').toggleClass('alive dead');
            $('[data-position=1-1]').toggleClass('alive dead');
            $('[data-position=1-2]').toggleClass('alive dead');
            controller.nextStep();

            const result = controller._model._changingCells;
            assert.deepEqual(result, [[0, 1], [1, 0], [1, 2], [2, 1]]);
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
            const $startButton = $('.js-start-button');

            controller.initializeInterval();

            let spy = sinon.spy(Controller.prototype, 'nextStep');

            expect(spy.called).to.be.false;

            $startButton.trigger('click');
            clock.tick(10000);
            expect(spy.called).to.be.true;

            spy.restore();
            clock.restore();
        });
    });
});
