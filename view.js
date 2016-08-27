'use strict';

let field_width = 30;
let field_height = 30;

export let initialize = function () {
    let resulting_field = "";
    for(let i = 0; i < field_height; i++){
        resulting_field += "<tr>";
        for(let j = 0; j < field_width; j++){
            resulting_field += "<td id='" + i + "-" + j + "' class='dead'></td>";
        }
        resulting_field += "</tr>";
    }
    $("#game-field").html(resulting_field);
};

export let changeCellState = function (cell) {
    cell.toggleClass("alive dead");
};