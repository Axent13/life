import {Model} from "../src/model.js";
import {View} from "../src/view.js";

var assert = require('assert');

describe('Model testing:', function () {
    describe('Checking nextCellStates() on some template fields', function () {

        it('2x2 square should stay unchanged', function () {
            let model = new Model(3, 3);

            model._cells[1][1] = 1;
            model._cells[1][2] = 1;
            model._cells[2][1] = 1;
            model._cells[2][2] = 1;

            let changing_cells = model.nextCellStates();
            assert.equal(changing_cells.length, 0);
        });

        it('line 3x1 should stay turn on 90deg', function () {
            let model = new Model(5, 5);

            model._cells[2][1] = 1;
            model._cells[2][2] = 1;
            model._cells[2][3] = 1;

            let changing_cells = model.nextCellStates();
            assert.deepEqual(changing_cells, [[1, 2], [2, 1], [2, 3], [3, 2]]);

        });

        it('moving colony makes a step', function () {
            let model = new Model(10, 10);

            model._cells[1][1] = 1;
            model._cells[2][2] = 1;
            model._cells[2][3] = 1;
            model._cells[3][1] = 1;
            model._cells[3][2] = 1;

            let changing_cells = model.nextCellStates();
            assert.deepEqual(changing_cells, [[1, 1], [1, 2], [2, 2], [3, 3]]);
        });

    });
    describe('Checking changeCellState(x, y)', function () {

        it('should return 1, if the cell was 0', function () {
            let model = new Model(1,1);

            model._cells[0][0] = 0;
            let result = model.changeCellState(0, 0);

            assert.equal(result, 1);
        });

        it('should return 0, if the cell was 1', function () {
            let model = new Model(1,1);

            model._cells[0][0] = 1;
            let result = model.changeCellState(0, 0);

            assert.equal(result, 0);
        });
    });
    describe('Checking _isElementInsideField(i, j)', function () {

        it('should return 1, if inside field', function () {
            let model = new Model(10,10);

            let result = model._isElementInsideField(5, 5);

            assert.equal(result, 1);
        });

        it('should return 0, if outside field', function () {
            let model = new Model(10,10);

            let result = model._isElementInsideField(11, 10);

            assert.equal(result, 0);
        });
    });
    describe('Checking _checkingAliveNeighbours(i, j)', function () {

        it('single cell without any neighbours', function () {
            let model = new Model(3,3);

            model._cells[1][1] = 1;

            let alive_neighbours = model._checkingAliveNeighbours(1, 1);

            assert.equal(alive_neighbours, 0);
        });

        it('2x2 square', function () {
            let model = new Model(3,3);

            model._cells[0][0] = 1;
            model._cells[0][1] = 1;
            model._cells[1][0] = 1;
            model._cells[1][1] = 1;

            assert.equal(model._checkingAliveNeighbours(0, 0), 3);
            assert.equal(model._checkingAliveNeighbours(0, 1), 3);
            assert.equal(model._checkingAliveNeighbours(1, 0), 3);
            assert.equal(model._checkingAliveNeighbours(1, 1), 3);
        });
    })
});

describe('View testing:', function () {
    describe('Checking drawField()', function () {

        it('0x0 field', function () {
            let view = new View(0, 0);

            let resulting_field = view.drawField();
            let expecting_result = "";

            assert.equal(resulting_field, expecting_result);
        });

        it('1x1 field', function () {
            let view = new View(1, 1);

            let resulting_field = view.drawField();
            let expecting_result = "<tr><td id='0-0' class='dead'></td></tr>";

            assert.equal(resulting_field, expecting_result);
        });

        it('2x1 field', function () {
            let view = new View(2, 1);

            let resulting_field = view.drawField();
            let expecting_result = "<tr><td id='0-0' class='dead'></td><td id='0-1' class='dead'></td></tr>";

            assert.equal(resulting_field, expecting_result);
        });

    });

});