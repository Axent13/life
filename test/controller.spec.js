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
});
