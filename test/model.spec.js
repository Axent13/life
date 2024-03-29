import Model from '../src/js/model.js';

const chai = require('chai');
const assert = chai.assert;

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
    it('_isPaused should be true after model is created', () => {
      const model = new Model();

      assert.equal(model._isPaused, true);
    });
    it('changingCells should be empty array after model is created', () => {
      const model = new Model();

      assert.deepEqual(model._changingCells, []);
    });
    it('cells should be empty array after model is created', () => {
      const model = new Model();

      assert.deepEqual(model._cells, []);
    });
  });

  describe('Checking getHeight()', () => {
    it('should return current height 1', () => {
      const model = new Model(10, 1);

      const result = model.getHeight();

      assert.equal(result, 1);
    });
    it('should return current height 10', () => {
      const model = new Model(1, 10);

      const result = model.getHeight();

      assert.equal(result, 10);
    });
  });

  describe('Checking setHeight()', () => {
    it('should change height to 1', () => {
      const model = new Model(10, 10);

      model.setHeight(1);
      const result = model.getHeight();

      assert.equal(result, 1);
    });
    it('should change height to 10', () => {
      const model = new Model(1, 1);

      model.setHeight(10);
      const result = model.getHeight();

      assert.equal(result, 10);
    });
    it('should call method createEmptyField()', () => {
      const model = new Model(1, 1);

      const spy = sinon.spy(Model.prototype, 'createEmptyField');
      model.setHeight(10);

      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('Checking getWidth()', () => {
    it('should return current width 1', () => {
      const model = new Model(1, 10);

      const result = model.getWidth();

      assert.equal(result, 1);
    });
    it('should return current width 10', () => {
      const model = new Model(10, 1);

      const result = model.getWidth();

      assert.equal(result, 10);
    });
  });

  describe('Checking setWidth()', () => {
    it('should change width to 1', () => {
      const model = new Model(10, 10);

      model.setWidth(1);
      const result = model.getWidth();

      assert.equal(result, 1);
    });
    it('should change width to 10', () => {
      const model = new Model(1, 1);

      model.setWidth(10);
      const result = model.getWidth();

      assert.equal(result, 10);
    });
    it('should call method createEmptyField()', () => {
      const model = new Model(1, 1);

      const spy = sinon.spy(Model.prototype, 'createEmptyField');
      model.setWidth(10);

      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('Checking getGameState()', () => {
    it('Should return false in default', () => {
      const model = new Model();

      const expectingResult = model.getGameState();

      assert.equal(expectingResult, false);
    });
    it('Should return true, if game is not paused', () => {
      const model = new Model();
      model._isPaused = false;

      const expectingResult = model.getGameState();

      assert.equal(expectingResult, true);
    });
    it('Should return false, if game is paused', () => {
      const model = new Model();
      model._isPaused = true;

      const expectingResult = model.getGameState();

      assert.equal(expectingResult, false);
    });
  });

  describe('Checking setGameState()', () => {
    it('Game must be paused, if incoming argument false', () => {
      const model = new Model();
      model.setGameState(false);

      const expectingResult = model._isPaused;

      assert.equal(expectingResult, true);
    });
    it('Game must not be paused, if incoming argument true', () => {
      const model = new Model();
      model.setGameState(true);

      const expectingResult = model._isPaused;

      assert.equal(expectingResult, false);
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

  describe('Checking isNeighboursCountBad()', () => {
    it('Must return true, if neighbours < 2', () => {
      const expectingResult = Model.isNeighboursCountBad(0);

      assert.equal(expectingResult, true);
    });
    it('Must return true, if neighbours > 3', () => {
      const expectingResult = Model.isNeighboursCountBad(4);

      assert.equal(expectingResult, true);
    });
    it('Must return true, if neighbours > 3', () => {
      const expectingResult = Model.isNeighboursCountBad(8);

      assert.equal(expectingResult, true);
    });
    it('Must return false, if neighbours >= 2', () => {
      const expectingResult = Model.isNeighboursCountBad(2);

      assert.equal(expectingResult, false);
    });
    it('Must return true, if neighbours <= 3', () => {
      const expectingResult = Model.isNeighboursCountBad(3);

      assert.equal(expectingResult, false);
    });
  });

  describe('Checking isNeghboursGood()', () => {
    it('Must return true, if neighbours === 3', () => {
      const expectingResult = Model.isNeighboursCountGood(3);

      assert.equal(expectingResult, true);
    });
    it('Must return false, if neighbours === 2', () => {
      const expectingResult = Model.isNeighboursCountGood(2);

      assert.equal(expectingResult, false);
    });
    it('Must return false, if neighbours < 2', () => {
      const expectingResult = Model.isNeighboursCountGood(0);

      assert.equal(expectingResult, false);
    });
    it('Must return false, if neighbours > 3', () => {
      const expectingResult = Model.isNeighboursCountGood(8);

      assert.equal(expectingResult, false);
    });
  });

  describe('Checking isItNeighbour()', () => {
    it('Must return false, if both arguments === 0', () => {
      const expectingResult = Model.isItNeighbour(0, 0);

      assert.equal(expectingResult, false);
    });
    it('Must return true, if one of the arguments !== 0', () => {
      const expectingResult = Model.isItNeighbour(0, 1);

      assert.equal(expectingResult, true);
    });
    it('Must return true, if one of the arguments !== 0', () => {
      const expectingResult = Model.isItNeighbour(1, 0);

      assert.equal(expectingResult, true);
    });
    it('Must return true, if both arguments !== 0', () => {
      const expectingResult = Model.isItNeighbour(1, 1);

      assert.equal(expectingResult, true);
    });
  });

  describe('Checking inRange()', () => {
    it('should return true, if number 20 is in range 10-30', () => {
      const result = Model.inRange(20, 10, 30);

      assert.equal(result, true);
    });
    it('should return true, if number 10 is in range 10-30', () => {
      const result = Model.inRange(10, 10, 30);

      assert.equal(result, true);
    });
    it('should return true, if number 29 is in range 10-30', () => {
      const result = Model.inRange(29, 10, 30);

      assert.equal(result, true);
    });
    it('should return false, if number 40 is in range 10-30', () => {
      const result = Model.inRange(40, 10, 30);

      assert.equal(result, false);
    });
    it('should return false, if number 5 is in range 10-30', () => {
      const result = Model.inRange(5, 10, 30);

      assert.equal(result, false);
    });
  });

  describe('Checking _isCellAlive()', () => {
    it('Must return true, if cell is alive', () => {
      const model = new Model(1, 1);
      model.createEmptyField();

      model.changeCellState(0, 0);

      const expectingResult = model._isCellAlive(0, 0);
      assert.equal(expectingResult, true);
    });
    it('Must return false, if cell is dead', () => {
      const model = new Model(1, 1);
      model.createEmptyField();

      const expectingResult = model._isCellAlive(0, 0);
      assert.equal(expectingResult, false);
    });
  });

  describe('Checking _isCellBecomeAlive()', () => {
    it('must return false for alive cell', () => {
      const model = new Model(1, 1);
      model.createEmptyField();

      model.changeCellState(0, 0);

      const expectingResult = model._isCellBecomeAlive(0, 0, 0);
      assert.equal(expectingResult, false);
    });
    it('must return false for dead cell with 0 neighbours', () => {
      const model = new Model(1, 1);
      model.createEmptyField();

      const expectingResult = model._isCellBecomeAlive(0, 0, 0);
      assert.equal(expectingResult, false);
    });
    it('must return true for dead cell with 3 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      const expectingResult = model._isCellBecomeAlive(1, 1, 3);
      assert.equal(expectingResult, true);
    });
    it('must return false for dead cell with 2 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      const expectingResult = model._isCellBecomeAlive(1, 1, 2);
      assert.equal(expectingResult, false);
    });
  });

  describe('Checking _isCellBecomeDead()', () => {
    it('must return false for dead cell', () => {
      const model = new Model(1, 1);
      model.createEmptyField();

      const expectingResult = model._isCellBecomeDead(0, 0, 0);
      assert.equal(expectingResult, false);
    });
    it('must return false for alive cell with 2 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      model.changeCellState(1, 1);

      const expectingResult = model._isCellBecomeDead(1, 1, 2);
      assert.equal(expectingResult, false);
    });
    it('must return true for alive cell with 5 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      model.changeCellState(1, 1);

      const expectingResult = model._isCellBecomeDead(1, 1, 5);
      assert.equal(expectingResult, true);
    });
    it('must return true for alive cell with 0 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      model.changeCellState(1, 1);

      const expectingResult = model._isCellBecomeDead(1, 1, 0);
      assert.equal(expectingResult, true);
    });
  });

  describe('Checking _isCellWillChange()', () => {
    it('must return false for alive cell with 2 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      model.changeCellState(1, 1);

      const expectingResult = model._isCellWillChange(1, 1, 2);
      assert.equal(expectingResult, false);
    });
    it('must return true for alive cell with 0 neighbours', () => {
      const model = new Model(1, 1);
      model.createEmptyField();

      model.changeCellState(0, 0);

      const expectingResult = model._isCellWillChange(0, 0, 0);
      assert.equal(expectingResult, true);
    });
    it('must return true for dead cell with 3 neighbours', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      const expectingResult = model._isCellBecomeAlive(1, 1, 3);
      assert.equal(expectingResult, true);
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

  describe('Checking _isNeighbourAlive()', () => {
    it('Should return true, if neighbour cell is alive', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      model.changeCellState(0, 0);
      model.changeCellState(1, 0);

      const expectingResult = model._isNeighbourAlive(0, 0);
      assert.equal(expectingResult, true);
    });
    it('Should return false, if neighbour cell is dead', () => {
      const model = new Model(3, 3);
      model.createEmptyField();

      model.changeCellState(0, 0);
      model.changeCellState(1, 0);

      const expectingResult = model._isNeighbourAlive(0, 2);
      assert.equal(expectingResult, false);
    });
    it('Should return false, if neighbour out if field', () => {
      const model = new Model();
      model.createEmptyField();

      model.changeCellState(0, 0);

      const expectingResult = model._isNeighbourAlive(0, 10);
      assert.equal(expectingResult, false);
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
