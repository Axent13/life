import Model from './model.js';
import View from './view.js';

export default class Controller {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._view = new View(fieldWidth, fieldHeight);
        this._model = new Model(fieldWidth, fieldHeight);
        this._isPaused = true;

        this._view.drawField();

        const that = this;
        $('td').click( function() {
            that._view.changeCellState($(this));

            const [x, y] = $(this).attr('id').split('-');
            that._model.changeCellState(x, y);
        });

        $('#start-button').click( function() {
            $(this).attr('disabled', 'true');
            const $pauseButton = $('#pause-button');
            $pauseButton.removeAttr('disabled');
            that._isPaused = false;
        });

        $('#pause-button').click( function() {
            $(this).attr('disabled', 'true');
            const $startButton = $('#start-button');
            $startButton.removeAttr('disabled');
            that._isPaused = true;
        });
    }

    nextStep() {
        const changingCells = this._model.nextCellStates();
        for (let i = 0; i < changingCells.length; i += 1) {
            this._model.changeCellState(changingCells[i][0], changingCells[i][1]);

            const currentID = `#${changingCells[i][0]}-${changingCells[i][1]}`;
            this._view.changeCellState($(currentID));
        }
    }
}
