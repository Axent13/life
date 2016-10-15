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

            const [x, y] = $(this).attr('data-position').split('-');
            that._model.changeCellState(x, y);
        });

        $('.js-start-button').click( function() {
            $(this).attr('disabled', 'true');
            const $pauseButton = $('.js-pause-button');
            $pauseButton.removeAttr('disabled');
            that._isPaused = false;
        });

        $('.js-pause-button').click( function() {
            $(this).attr('disabled', 'true');
            const $startButton = $('.js-start-button');
            $startButton.removeAttr('disabled');
            that._isPaused = true;
        });
    }

    nextStep() {
        const changingCells = this._model.nextCellStates();
        for (let i = 0; i < changingCells.length; i += 1) {
            this._model.changeCellState(changingCells[i][0], changingCells[i][1]);

            const currentPosition = `${changingCells[i][0]}-${changingCells[i][1]}`;
            this._view.changeCellState($(`[data-position = ${currentPosition}]`));
        }

        return this;
    }
}
