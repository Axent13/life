'use strict';

import * as Model from "./model.js";
import * as View from "./view.js";

Model.initialize();
View.initialize();

let isPaused = true;

let nextStep = function () {
};

let tick = setInterval(function() {
    if(!isPaused) {
        nextStep();
    }
}, 1000);

$('td').click(function () {
    View.changeCellState($(this));
    Model.changeCellState($(this).attr('id'));
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