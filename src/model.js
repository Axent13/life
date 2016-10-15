export default class Model {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;

        this._cells = [];
        for (let i = 0; i < this._fieldHeight; i += 1) {
            this._cells[i] = [];
            for (let j = 0; j < this._fieldWidth; j += 1) {
                this._cells[i][j] = 0;
            }
        }
    }

    changeCellState(x, y) {
        if (this._cells[x][y] === 1) {
            this._cells[x][y] = 0;
        } else {
            this._cells[x][y] = 1;
        }

        return this;
    }

    nextCellStates() {
        const changingCells = [];

        this._cells.forEach((row, i) => {
            row.forEach((item, j) => {
                let aliveNeighboursCounter = 0;

                aliveNeighboursCounter = this._checkingAliveNeighbours(i, j);

                if (this._cells[i][j] === 0 && aliveNeighboursCounter === 3) {
                    changingCells.push([i, j]);
                } else if (this._cells[i][j] === 1 && aliveNeighboursCounter < 2) {
                    changingCells.push([i, j]);
                } else if (this._cells[i][j] === 1 && aliveNeighboursCounter > 3) {
                    changingCells.push([i, j]);
                }
            });
        });
        return changingCells;
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
        let aliveNeighbours = 0;

        for (let y = j - 1; y <= j + 1; y += 1) {
            for (let x = i - 1; x <= i + 1; x += 1) {
                if (!(x === i && y === j)) {
                    if (this._isElementInsideField(x, y) && this._cells[x][y] === 1) {
                        aliveNeighbours += 1;
                    }
                }
            }
        }

        return aliveNeighbours;
    }
}
