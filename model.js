'use strict';

export let cells = [];

export let field_width = 30;
export let field_height = 30;

export let initialize = function () {
    for(let i = 0; i < field_height; i++){
        cells[i] = [];
        for(let j = 0; j < field_width; j++){
            cells[i][j] = 0;
        }
    }
};

export let changeCellState = function (cell_id) {
    let [x, y] = cell_id.split('-');

    if(cells[x][y] === 1){
        cells[x][y] = 0;
    } else {
        cells[x][y] = 1;
    }
};

