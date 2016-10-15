import Model from './model.js';
import View from './view.js';

export default class Controller {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._view = new View(fieldWidth, fieldHeight);
        this._model = new Model(fieldWidth, fieldHeight);
        this._isPaused = true;

        this._view.drawField();

        this.changeCellStateEvent();
        this.startButtonEvent();
        this.pauseButtonEvent();
    }

    changeCellStateEvent() {
        $('td').click((event) => {
            this._view.changeCellState($(event.currentTarget));

            const [x, y] = $(event.currentTarget).attr('data-position').split('-');
            this._model.changeCellState(x, y);
        });

        return this;
    }

    startButtonEvent() {
        $('.js-start-button').click((event) => {
            $(event.currentTarget).attr('disabled', 'true');
            const $pauseButton = $('.js-pause-button');
            $pauseButton.removeAttr('disabled');
            this._isPaused = false;
        });

        return this;
    }

    pauseButtonEvent() {
        $('.js-pause-button').click((event) => {
            $(event.currentTarget).attr('disabled', 'true');
            const $startButton = $('.js-start-button');
            $startButton.removeAttr('disabled');
            this._isPaused = true;
        });

        return this;
    }

    nextStep() {
        const changingCells = this._model.nextCellStates();
        changingCells.forEach((item, i) => {
            const currentPosition = `${changingCells[i][0]}-${changingCells[i][1]}`;
            this._view.changeCellState($(`[data-position = ${currentPosition}]`));
        });

        return this;
    }
}
