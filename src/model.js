export class Model {

    constructor(field_width = 30, field_height = 30) {
        this._field_width = field_width;
        this._field_height = field_height;

        this._cells = [];
        for(let i = 0; i < this._field_height; i++){
            this._cells[i] = [];
            for(let j = 0; j < this._field_width; j++){
                this._cells[i][j] = 0;
            }
        }
    }

    changeCellState(x, y) {

        if(this._cells[x][y] === 1){
            this._cells[x][y] = 0;

            return 0;
        } else {
            this._cells[x][y] = 1;

            return 1;
        }
    }

    _isElementInsideField(i, j) {
        if(j >= 0 && j < this._field_height){
            if(i >= 0 && i < this._field_width){
                return 1;
            }
        }

        return 0;
    }

    _checkingAliveNeighbours(i, j) {
        let alive_neighbours = 0;

        for(let y = j - 1; y <= j + 1; y++){
            for(let x = i - 1; x <= i + 1; x++){
                if(x === i && y === j){
                    continue;
                } else {
                    if(this._isElementInsideField(x, y) && this._cells[x][y] === 1){
                        alive_neighbours++;
                    }
                }
            }
        }

        return alive_neighbours;
    }

    nextCellStates() {
        let changing_cells = [];

        for(let i = 0; i < this._field_height; i++){
            for(let j = 0; j < this._field_width; j++){
                let alive_neighbours_counter = 0;

                alive_neighbours_counter = this._checkingAliveNeighbours(i, j);

                if(this._cells[i][j] === 0 && alive_neighbours_counter === 3){
                    changing_cells.push([i, j]);
                } else if (this._cells[i][j] === 1 && alive_neighbours_counter < 2){
                    changing_cells.push([i, j]);
                } else if (this._cells[i][j] === 1 && alive_neighbours_counter > 3){
                    changing_cells.push([i, j]);
                }
            }
        }

        return changing_cells;
    }
}
