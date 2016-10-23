import Model from '../src/model.js';
import View from '../src/view.js';
import Controller from '../src/controller.js';

const assert = require('assert');

describe('Model testing:', () => {
    describe('Checking constructor', () => {
        it('input fieldWidth should be equal to property _fieldWidth', () => {
            const fieldWidth = 10;
            const model = new Model(fieldWidth, 1);

            assert.equal(model._fieldWidth, fieldWidth);
        });
        it('input fieldHeight should be equal to property _fieldHeight', () => {
            const fieldHeight = 10;
            const model = new Model(1, fieldHeight);

            assert.equal(model._fieldHeight, fieldHeight);
        });
        it('properties _fieldWidth and _fieldHeight should be 30 in default', () => {
            const model = new Model();

            assert.equal(model._fieldWidth, 30);
            assert.equal(model._fieldHeight, 30);
        });
    });
    describe('Checking getCells()', () => {
        it('Should return [[1, 1, 1], [0, 0, 0]]', () => {
            const model = new Model(3, 2);
            model.createEmptyField();

            model.changeCellState(0, 0);
            model.changeCellState(0, 1);
            model.changeCellState(0, 2);

            const result = model.getCells();
            assert.deepEqual(result, [[1, 1, 1], [0, 0, 0]]);
        });
        it('Should return [[1, 0]]', () => {
            const model = new Model(2, 1);
            model.createEmptyField();

            model.changeCellState(0, 0);

            const result = model.getCells();
            assert.deepEqual(result, [[1, 0]]);
        });
    });
    describe('Checking _createEmptyField()', () => {
        it('1x2 field', () => {
            const model = new Model(1, 2);
            model.createEmptyField();

            const result = model.getCells();
            assert.deepEqual(result, [[0], [0]]);
        });
        it('2x2 field', () => {
            const model = new Model(2, 2);
            model.createEmptyField();

            const result = model.getCells();
            assert.deepEqual(result, [[0, 0], [0, 0]]);
        });
    });
    describe('Checking changeCellState(x, y)', () => {
        it('should return 1, if the cell was 0', () => {
            const model = new Model(1, 1);
            model.createEmptyField();

            model._cells[0][0] = 0;
            model.changeCellState(0, 0);
            const result = model._cells[0][0];

            assert.equal(result, 1);
        });
        it('should return 0, if the cell was 1', () => {
            const model = new Model(1, 1);
            model.createEmptyField();

            model._cells[0][0] = 1;
            model.changeCellState(0, 0);
            const result = model._cells[0][0];

            assert.equal(result, 0);
        });
    });
    describe('Checking nextCellStates() on some template fields', () => {
        it('2x2 square should stay unchanged', () => {
            const model = new Model(3, 3);
            model.createEmptyField();

            model.changeCellState(1, 1);
            model.changeCellState(1, 2);
            model.changeCellState(2, 1);
            model.changeCellState(2, 2);

            const changingCells = model.nextCellStates();
            assert.equal(changingCells.length, 0);
        });

        it('line 3x1 should turn on 90deg', () => {
            const model = new Model(5, 5);
            model.createEmptyField();

            model.changeCellState(2, 1);
            model.changeCellState(2, 2);
            model.changeCellState(2, 3);

            const changingCells = model.nextCellStates();
            assert.deepEqual(changingCells, [[1, 2], [2, 1], [2, 3], [3, 2]]);
        });

        it('moving colony makes a step', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            model.changeCellState(1, 1);
            model.changeCellState(2, 2);
            model.changeCellState(2, 3);
            model.changeCellState(3, 1);
            model.changeCellState(3, 2);

            const changingCells = model.nextCellStates();
            assert.deepEqual(changingCells, [[1, 1], [1, 2], [2, 2], [3, 3]]);
        });
    });
    describe('Checking _isElementInsideField(i, j)', () => {
        it('should return 1, if inside field(1, 0)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(1, 0);

            assert.equal(result, 1);
        });
        it('should return 1, if inside field(0, 1)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(0, 1);

            assert.equal(result, 1);
        });
        it('should return 1, if inside field(9, 0)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(9, 0);

            assert.equal(result, 1);
        });
        it('should return 1, if inside field(0, 9)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(0, 9);

            assert.equal(result, 1);
        });
        it('should return 1, if inside field(9, 9)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(9, 9);

            assert.equal(result, 1);
        });
        it('should return 1, if inside field(5, 5)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(5, 5);

            assert.equal(result, 1);
        });
        it('should return 0, if outside field(0, -1)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(0, -1);

            assert.equal(result, 0);
        });
        it('should return 0, if outside field(-1, -1)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(-1, -1);

            assert.equal(result, 0);
        });
        it('should return 0, if outside field(-1, 0)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(-1, 0);

            assert.equal(result, 0);
        });
        it('should return 0, if outside field(10, 9)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(10, 9);

            assert.equal(result, 0);
        });
        it('should return 0, if outside field(9, 10)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(9, 10);

            assert.equal(result, 0);
        });
        it('should return 0, if outside field(10 ,10)', () => {
            const model = new Model(10, 10);
            model.createEmptyField();

            const result = model._isElementInsideField(10, 10);

            assert.equal(result, 0);
        });
    });
    describe('Checking _checkingAliveNeighbours(i, j)', () => {
        it('single cell without any neighbours', () => {
            const model = new Model(3, 3);
            model.createEmptyField();

            model.changeCellState(1, 1);

            const aliveNeighbours = model._checkingAliveNeighbours(1, 1);

            assert.equal(aliveNeighbours, 0);
        });

        it('2x2 square', () => {
            const model = new Model(3, 3);
            model.createEmptyField();

            model.changeCellState(0, 0);
            model.changeCellState(0, 1);
            model.changeCellState(1, 0);
            model.changeCellState(1, 1);

            assert.equal(model._checkingAliveNeighbours(0, 0), 3);
            assert.equal(model._checkingAliveNeighbours(0, 1), 3);
            assert.equal(model._checkingAliveNeighbours(1, 0), 3);
            assert.equal(model._checkingAliveNeighbours(1, 1), 3);
        });
    });
});

describe('View testing:', () => {
    beforeEach(() => {
        const testBody = '<table class="game-field js-game-field"></table>';
        const $body = $('body');

        $body.html(testBody);
    });

    describe('Checking constructor', () => {
        it('input fieldWidth should be equal to property _fieldWidth', () => {
            const fieldWidth = 10;
            const view = new View(fieldWidth, 1);

            assert.equal(view._fieldWidth, fieldWidth);
        });
        it('input fieldHeight should be equal to property _fieldHeight', () => {
            const fieldHeight = 10;
            const view = new View(1, fieldHeight);

            assert.equal(view._fieldHeight, fieldHeight);
        });
        it('properties _fieldWidth and _fieldHeight should be 30 in default', () => {
            const view = new View();

            assert.equal(view._fieldWidth, 30);
            assert.equal(view._fieldHeight, 30);
        });
    });
    describe('Checking drawField()', () => {
        it('0x0 field', () => {
            const view = new View(0, 0);

            const resultingField = view.drawField();
            const expectingResult = '';

            assert.equal(resultingField, expectingResult);
        });
        it('0x0 field - cheking DOM', () => {
            const view = new View(0, 0);

            view.drawField();
            const $body = $('body');
            const result = $body.html();
            const expectingResult = '<table class="game-field js-game-field"></table>';

            assert.equal(result, expectingResult);
        });
        it('1x1 field', () => {
            const model = new Model(1, 1);
            model.createEmptyField();
            const view = new View(1, 1);

            const resultingField = view.drawField(model.getCells());
            const expectingResult = '<tr><td data-position="0-0" class="dead"></td></tr>';

            assert.equal(resultingField, expectingResult);
        });
        it('1x1 field - checking DOM', () => {
            const model = new Model(1, 1);
            model.createEmptyField();
            const view = new View(1, 1);

            view.drawField(model.getCells());
            const $body = $('body');
            const result = $body.html();
            const expectingResult = '<table class="game-field js-game-field"><tbody>' +
                '<tr><td data-position="0-0" class="dead"></td></tr></tbody></table>';

            assert.equal(result, expectingResult);
        });
        it('2x1 field', () => {
            const model = new Model(2, 1);
            model.createEmptyField();
            const view = new View(2, 1);

            const resultingField = view.drawField(model.getCells());
            const expectingResult = '<tr><td data-position="0-0" class="dead"></td><td data-position="0-1" class="dead"></td></tr>';

            assert.equal(resultingField, expectingResult);
        });
        it('2x1 field - checking DOM', () => {
            const model = new Model(2, 1);
            model.createEmptyField();
            const view = new View(2, 1);

            view.drawField(model.getCells());
            const $body = $('body');
            const result = $body.html();

            const expectingResult = '<table class="game-field js-game-field"><tbody><tr>' +
                '<td data-position="0-0" class="dead"></td>' +
                '<td data-position="0-1" class="dead"></td>' +
                '</tr></tbody></table>';

            assert.equal(result, expectingResult);
        });
    });
    describe('Checking _createNewCell(i, j, cellState)', () => {
        it('Should create dead cell with position (0, 0)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(0, 0, 0);
            const expectingResult = '<td data-position="0-0" class="dead"></td>';

            assert.equal(resultingCell, expectingResult);
        });
        it('Should create alive cell with position (0, 0)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(0, 0, 1);
            const expectingResult = '<td data-position="0-0" class="alive"></td>';

            assert.equal(resultingCell, expectingResult);
        });
        it('Should create dead cell with position (10, 0)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(10, 0, 0);
            const expectingResult = '<td data-position="10-0" class="dead"></td>';

            assert.equal(resultingCell, expectingResult);
        });
        it('Should create alive cell with position (0, 10)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(0, 10, 1);
            const expectingResult = '<td data-position="0-10" class="alive"></td>';

            assert.equal(resultingCell, expectingResult);
        });
    });
});
describe('Constructor testing', () => {
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
