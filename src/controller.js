import Model from './model.js';
import View from './view.js';

class Controller {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;

        this._view = new View(this._fieldWidth, this._fieldHeight);
        this._model = new Model(this._fieldWidth, this._fieldHeight);
        this._model.createEmptyField();
        this._isPaused = true;

        this._view.drawField(this._model.getCells());

        this.changeCellStateEvent();
        this.startButtonEvent();
        this.pauseButtonEvent();
    }

    changeCellStateEvent() {
        $('.js-game-field').on('click', 'td', (event) => {
            const [x, y] = $(event.currentTarget).attr('data-position').split('-');
            this._model.changeCellState(x, y);
            this._view.drawField(this._model.getCells());
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

    initializeInterval() {
        setInterval(() => {
            if (!this._isPaused) {
                this.nextStep();
            }
        }, 1000);
    }

    nextStep() {
        this._model.nextCellStates();
        this._view.drawField(this._model.getCells());

        return this;
    }
}

export default Controller;
