class Model {

  constructor(fieldWidth = 30, fieldHeight = 30) {
    this._fieldWidth = fieldWidth;
    this._fieldHeight = fieldHeight;
    this._isPaused = true;
    this._changingCells = [];
    this._cells = [];
  }

  getHeight() {
    return this._fieldHeight;
  }

  setHeight(newFieldHeight) {
    this._fieldHeight = +newFieldHeight;
    this.createEmptyField();

    return this;
  }

  getWidth() {
    return this._fieldWidth;
  }

  setWidth(newFieldWidth) {
    this._fieldWidth = +newFieldWidth;
    this.createEmptyField();

    return this;
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
      this._cells[xPos][yPos] = this._cells[xPos][yPos] === 1 ? 0 : 1;
    }

    return this;
  }

  nextCellStates() {
    this._changingCells = [];

    this._cells.forEach((row, xPos) => {
      row.forEach((item, yPos) => {
        const aliveNeighboursCounter = this._checkingAliveNeighbours(xPos, yPos);

        if (this._isCellWillChange(xPos, yPos, aliveNeighboursCounter)) {
          this._changingCells.push([xPos, yPos]);
        }
      });
    });

    this._changingCells.forEach((coords) => {
      this.changeCellState(coords[0], coords[1]);
    });

    return this._changingCells;
  }

  static isNeighboursCountBad(neighboursCount) {
    return neighboursCount < 2 || neighboursCount > 3;
  }

  static isNeighboursCountGood(neighboursCount) {
    return neighboursCount === 3;
  }

  static isItNeighbour(xPos, yPos) {
    return !(xPos === 0 && yPos === 0);
  }

  static inRange(number, leftLimit, rightLimit) {
    if (leftLimit < rightLimit){
      return (number >= leftLimit && number < rightLimit);
    }
    return (number >= rightLimit && number < leftLimit);
  }

  _isCellAlive(xPos, yPos) {
    return this._cells[xPos][yPos] === 1;
  }

  _isCellBecomeAlive(xPos, yPos, neighboursCount) {
    return !this._isCellAlive(xPos, yPos) && Model.isNeighboursCountGood(neighboursCount);
  }

  _isCellBecomeDead(xPos, yPos, neighboursCount) {
    return this._isCellAlive(xPos, yPos) && Model.isNeighboursCountBad(neighboursCount);
  }

  _isCellWillChange(xPos, yPos, neighboursCount) {
    return this._isCellBecomeAlive(xPos, yPos, neighboursCount) || this._isCellBecomeDead(xPos, yPos, neighboursCount);
  }

  _isElementInsideField(xPos, yPos) {
    if (Model.inRange(yPos, 0, this._fieldWidth)) {
      if (Model.inRange(xPos, 0, this._fieldHeight)) {
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
