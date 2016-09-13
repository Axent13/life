import * as Model from "./model.js";
import * as View from "./view.js";

Model.initialize();
View.initialize();

let isPaused = true;

let nextStep = function () {
    let changing_cells = Model.nextCellStates();
    for(let i = 0; i < changing_cells.length; i++){
        let current_ID = `#${changing_cells[i][0]}-${changing_cells[i][1]}`;
        Model.changeCellState($(current_ID));
        View.changeCellState($(current_ID));
    }
};

let tick = setInterval(function() {
    if(!isPaused) {
        nextStep();
    }
}, 1000);

$('td').click(function () {
    View.changeCellState($(this));
    Model.changeCellState($(this));
});

$('#start-button').click(function () {
    $(this).attr('disabled', 'true');
    $('#pause-button').removeAttr('disabled');
    isPaused = false;
});

$('#pause-button').click(function () {
    $(this).attr('disabled', 'true');
    $('#start-button').removeAttr('disabled');
    isPaused = true;
});