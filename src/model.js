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

    nextCellStates() {
        let changing_cells = [];

        for(let i = 0; i < this._field_height; i++){
            for(let j = 0; j < this._field_width; j++){
                let alive_neighbours = 0;

                if (i === 0 && j === 0){
                    //левый верхний угол
                    this._cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                } else if (i === 0 && j === (this._field_width - 1) ){
                    //правый верхний угол
                    this._cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                } else if (i === (this._field_height - 1) && j === 0){
                    //левый нижний угол
                    this._cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                } else if (i === (this._field_height - 1) && j === (this._field_width - 1)){
                    //правый нижний угол
                    this._cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                } else if (i === 0){
                    //верхняя строка
                    this._cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                } else if (i === (this._field_height - 1) ){
                    //нижняя строка
                    this._cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                } else if (j === 0){
                    //левый столбец
                    this._cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                } else if (j === (this._field_width - 1)){
                    //правый столбец
                    this._cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                } else {
                    //внутри поля
                    this._cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                    this._cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                    this._cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                }

                if(this._cells[i][j] === 0 && alive_neighbours === 3){
                    changing_cells.push([i, j]);
                } else if (this._cells[i][j] === 1 && alive_neighbours < 2){
                    changing_cells.push([i, j]);
                } else if (this._cells[i][j] === 1 && alive_neighbours > 3){
                    changing_cells.push([i, j]);
                }
            }
        }

        return changing_cells;
    }
}
