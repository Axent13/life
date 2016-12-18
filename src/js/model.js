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

  changeCellState(xPos, yPos) {
    if (this._isElementInsideField(xPos, yPos) === 1) {
      if (this._cells[xPos][yPos] === 1) {
        this._cells[xPos][yPos] = 0;
      } else {
        this._cells[xPos][yPos] = 1;
      }
    }

    return this;
  }

  nextCellStates() {
    this._changingCells = [];

    this._cells.forEach((row, yPos) => {
      row.forEach((item, xPos) => {
        const aliveNeighboursCounter = this._checkingAliveNeighbours(xPos, yPos);

        if (!this._isCellAlive(xPos, yPos) && Model.isNeighboursOk(aliveNeighboursCounter)) {
          this._changingCells.push([xPos, yPos]);
        } else if (this._isCellAlive(xPos, yPos) && Model.isNeighboursFew(aliveNeighboursCounter)) {
          this._changingCells.push([xPos, yPos]);
        } else if (this._isCellAlive(xPos, yPos) && Model.isNeighboursMany(aliveNeighboursCounter)) {
          this._changingCells.push([xPos, yPos]);
        }
      });
    });

    this._changingCells.forEach((coords) => {
      this.changeCellState(coords[0], coords[1]);
    });

    return this._changingCells;
  }

  _isCellAlive(xPos, yPos) {
    return this._cells[xPos][yPos] === 1;
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

  static isItNeighbour(xPos, yPos) {
    return !(xPos === 0 && yPos === 0);
  }

  _isElementInsideField(xPos, yPos) {
    if (yPos >= 0 && yPos < this._fieldHeight) {
      if (xPos >= 0 && xPos < this._fieldWidth) {
        return 1;
      }
    }

    return 0;
  }

  _isNeighbourAlive(xPos, yPos) {
    return this._isElementInsideField(xPos, yPos) && this._isCellAlive(xPos, yPos);
  }

  _checkingAliveNeighbours(xPos, yPos) {
    const neighbourIndexes = [-1, 0, 1];

    const aliveNeighbours = neighbourIndexes.reduce((totalSum, yNeighbourPos) => {
      const middleSum = neighbourIndexes.reduce((sum, xNeighbourPos) => {
        if (Model.isItNeighbour(xNeighbourPos, yNeighbourPos)) {
          if (this._isNeighbourAlive(xPos + xNeighbourPos, yPos + yNeighbourPos)) {
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
