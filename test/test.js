import Model from '../src/model.js';
import View from '../src/view.js';

const assert = require('assert');

describe('Model testing:', () => {
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
    describe('Checking drawField()', () => {
        it('0x0 field', () => {
            const view = new View(0, 0);

            const resultingField = view.drawField();
            const expectingResult = '';

            assert.equal(resultingField, expectingResult);
        });

        it('1x1 field', () => {
            const model = new Model(1, 1);
            model.createEmptyField();
            const view = new View(1, 1);

            const resultingField = view.drawField(model.getCells());
            const expectingResult = "<tr><td data-position='0-0' class='dead'></td></tr>";

            assert.equal(resultingField, expectingResult);
        });

        it('2x1 field', () => {
            const model = new Model(2, 1);
            model.createEmptyField();


            const view = new View(2, 1);

            const resultingField = view.drawField(model.getCells());
            const expectingResult = "<tr><td data-position='0-0' class='dead'></td><td data-position='0-1' class='dead'></td></tr>";

            assert.equal(resultingField, expectingResult);
        });
    });
});
