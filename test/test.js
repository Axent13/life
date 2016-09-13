import * as Model from '../src/model';

var assert = require('assert');

describe('Checking nextCellStates() on some template fields', function () {

    beforeEach(function () {
        Model.initialize();
    });

    it('2x2 square should stay unchanged', function() {
        Model.cells[1][1] = 1;
        Model.cells[1][2] = 1;
        Model.cells[2][1] = 1;
        Model.cells[2][2] = 1;

        let changing_cells = Model.nextCellStates();
        assert.equal(changing_cells.length, 0);
    });

    it('line 3x1 should stay turn on 90deg', function() {
        Model.cells[2][1] = 1;
        Model.cells[2][2] = 1;
        Model.cells[2][3] = 1;

        let changing_cells = Model.nextCellStates();
        assert.deepEqual(changing_cells, [[1, 2], [2, 1], [2, 3], [3, 2]]);

    });

    it('moving colony makes a step', function() {
        Model.cells[1][1] = 1;
        Model.cells[2][2] = 1;
        Model.cells[2][3] = 1;
        Model.cells[3][1] = 1;
        Model.cells[3][2] = 1;

        let changing_cells = Model.nextCellStates();
        assert.deepEqual(changing_cells, [[1, 1], [1, 2], [2, 2], [3, 3]]);
    });

});