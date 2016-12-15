const templateCreateCells = require('../createCells.pug');
const eventEmitter = require('events');

class View extends eventEmitter {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        super();
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;

        this.startButtonBind();
        this.pauseButtonBind();
        this.changeCellStateBind();
    }

    changeCellStateBind() {
        $('.js-game-field').on('click', 'td', (event) => {
            $(event.currentTarget).toggleClass('alive dead');
            const cellPosition = $(event.currentTarget).attr('data-position');
            this.emit('changeCell', cellPosition);
        });

        return this;
    }

    startButtonBind() {
        $('.js-start-button').click((event) => {
            $(event.currentTarget).attr('disabled', 'true');
            const $pauseButton = $('.js-pause-button');
            $pauseButton.removeAttr('disabled');

            this.emit('startGame');
        });

        return this;
    }

    pauseButtonBind() {
        $('.js-pause-button').click((event) => {
            $(event.currentTarget).attr('disabled', 'true');
            const $startButton = $('.js-start-button');
            $startButton.removeAttr('disabled');

            this.emit('pauseGame');
        });

        return this;
    }

    drawField(cells) {
        const $gameField = $('.js-game-field');

        const locals = {
            fieldHeight: this._fieldHeight,
            fieldWidth: this._fieldWidth,
            cellsStates: cells
        };

        $gameField.html(templateCreateCells(locals));

        this.emit('event');

        return $gameField.html();
    }
}

export default View;
