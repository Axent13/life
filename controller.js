'use strict';

import * as Model from "./model.js";
import * as View from "./view.js";

Model.initialize();
View.initialize();

$('td').click(function () {
    View.changeCellState($(this));
    Model.changeCellState($(this).attr('id'));
});