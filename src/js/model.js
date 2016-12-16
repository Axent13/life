class Model {

  constructor(fieldWidth = 30, fieldHeight = 30) {
    this._fieldWidth = fieldWidth;
    this._fieldHeight = fieldHeight;
    this._isPaused = true;
    this._changingCells = [];
    this._cells = [];
  }

  getGameState() {
    return !this._isPaused;
  }

  setGameState(newState) {
    this._isPaused = !newState;
  }

  getCells() {
    return this._cells;
  }

  createEmptyField() {
    this._cells = Array.from({ length: this._fieldHeight }, () => {
      const col = new Array(this._fieldWidth).fill(0);
      return col;
    });

    return this;
  }

  changeCellState(x, y) {
    if (this._isElementInsideField(y, x) === 1) {
      if (this._cells[x][y] === 1) {
        this._cells[x][y] = 0;
      } else {
        this._cells[x][y] = 1;
      }
    }

    return this;
  }

  nextCellStates() {
    this._changingCells = [];

    this._cells.forEach((row, i) => {
      row.forEach((item, j) => {
        const aliveNeighboursCounter = this._checkingAliveNeighbours(i, j);

        if (!this._isCellAlive(i, j) && Model.isNeighboursOk(aliveNeighboursCounter)) {
          this._changingCells.push([i, j]);
        } else if (this._isCellAlive(i, j) && Model.isNeighboursFew(aliveNeighboursCounter)) {
          this._changingCells.push([i, j]);
        } else if (this._isCellAlive(i, j) && Model.isNeighboursMany(aliveNeighboursCounter)) {
          this._changingCells.push([i, j]);
        }
      });
    });

    this._changingCells.forEach((coords) => {
      this.changeCellState(coords[0], coords[1]);
    });

    return this._changingCells;
  }

  _isCellAlive(i, j) {
    return this._cells[i][j] === 1;
  }

  static isNeighboursFew(neighboursCount) {
    return neighboursCount < 2;
  }

  static isNeighboursMany(neighboursCount) {
    return neighboursCount > 3;
  }

  static isNeighboursOk(neighboursCount) {
    return neighboursCount === 3;
  }

  _isElementInsideField(i, j) {
    if (j >= 0 && j < this._fieldHeight) {
      if (i >= 0 && i < this._fieldWidth) {
        return 1;
      }
    }

    return 0;
  }

  _checkingAliveNeighbours(i, j) {
    const neighbourIndexes = [-1, 0, 1];

    const aliveNeighbours = neighbourIndexes.reduce((totalSum, y) => {
      const middleSum = neighbourIndexes.reduce((sum, x) => {
        if (!(x === 0 && y === 0)) {
          if (this._isElementInsideField(i + x, j + y) && this._isCellAlive(i + x, j + y)) {
            return sum + 1;
          }
        }
        return sum;
      }, 0);

      return totalSum + middleSum;
    }, 0);

    return aliveNeighbours;
  }
}

export default Model;
