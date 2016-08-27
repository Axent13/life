'use strict';

export let cells = [];

let field_width = 30;
let field_height = 30;

export let initialize = function () {
    for(let i = 0; i < field_height; i++){
        cells[i] = [];
        for(let j = 0; j < field_width; j++){
            cells[i][j] = 0;
        }
    }
};

export let changeCellState = function (cell) {
    let [x, y] = cell.attr('id').split('-');

    if(cells[x][y] === 1){
        cells[x][y] = 0;
    } else {
        cells[x][y] = 1;
    }
};

export let nextCellStates = function () {
    let changing_cells = [];

    for(let i = 0; i < field_height; i++){
        for(let j = 0; j < field_width; j++){
            let alive_neighbours = 0;

            if (i === 0 && j === 0){
                //левый верхний угол
                cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j] === 1 ? alive_neighbours++ : false;
            } else if (i === 0 && j === (field_width - 1) ){
                //правый верхний угол
                cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j] === 1 ? alive_neighbours++ : false;
            } else if (i === (field_height - 1) && j === 0){
                //левый нижний угол
                cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i][j + 1] === 1 ? alive_neighbours++ : false;
            } else if (i === (field_height - 1) && j === (field_width - 1)){
                //правый нижний угол
                cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i][j - 1] === 1 ? alive_neighbours++ : false;
            } else if (i === 0){
                //верхняя строка
                cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i][j + 1] === 1 ? alive_neighbours++ : false;
            } else if (i === (field_height - 1) ){
                //нижняя строка
                cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i][j + 1] === 1 ? alive_neighbours++ : false;
            } else if (j === 0){
                //левый столбец
                cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j] === 1 ? alive_neighbours++ : false;
            } else if (j === (field_width - 1)){
                //правый столбец
                cells[i - 1][j] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j] === 1 ? alive_neighbours++ : false;
            } else {
                //внутри поля
                cells[i - 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j - 1] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j] === 1 ? alive_neighbours++ : false;
                cells[i + 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j + 1] === 1 ? alive_neighbours++ : false;
                cells[i - 1][j] === 1 ? alive_neighbours++ : false;
            }

            if(cells[i][j] === 0 && alive_neighbours === 3){
                changing_cells.push([i, j]);
            } else if (cells[i][j] === 1 && alive_neighbours < 2){
                changing_cells.push([i, j]);
            } else if (cells[i][j] === 1 && alive_neighbours > 3){
                changing_cells.push([i, j]);
            }
        }
    }

    return changing_cells;
};