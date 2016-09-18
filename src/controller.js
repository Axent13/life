import {Model} from "./model.js";
import {View} from "./view.js";

export class Controller {

    constructor(field_width = 30, field_height = 30) {
        this._view = new View(field_width, field_height);
        this._model = new Model(field_width, field_height);
        this._isPaused = true;

        this._view.drawField();

        let that = this;
        $('td').click(function () {
            that._view.changeCellState($(this));

            let [x, y] = $(this).attr('id').split('-');
            that._model.changeCellState(x, y);
        });

        $('#start-button').click(function () {
            $(this).attr('disabled', 'true');
            $('#pause-button').removeAttr('disabled');
            that._isPaused = false;
        });

        $('#pause-button').click(function () {
            $(this).attr('disabled', 'true');
            $('#start-button').removeAttr('disabled');
            that._isPaused = true;
        });
    }

    nextStep() {
        let changing_cells = this._model.nextCellStates();
        for(let i = 0; i < changing_cells.length; i++){
            this._model.changeCellState(changing_cells[i][0], changing_cells[i][1]);

            let current_ID = `#${changing_cells[i][0]}-${changing_cells[i][1]}`;
            this._view.changeCellState($(current_ID));
        }
    }
}