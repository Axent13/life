var template = require('../createCells.pug');

class View {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;

        this.startButtonBind();
        this.pauseButtonBind();
        this.changeCellStateBind();
    }

    changeCellStateBind() {
        $('.js-game-field').on('click', 'td', (event) => {
            $(event.currentTarget).toggleClass('alive dead');
        });

        return this;
    }

    startButtonBind() {
        $('.js-start-button').click((event) => {
            $(event.currentTarget).attr('disabled', 'true');
            const $pauseButton = $('.js-pause-button');
            $pauseButton.removeAttr('disabled');
        });

        return this;
    }

    pauseButtonBind() {
        $('.js-pause-button').click((event) => {
            $(event.currentTarget).attr('disabled', 'true');
            const $startButton = $('.js-start-button');
            $startButton.removeAttr('disabled');
        });

        return this;
    }

    getCellsStates() {
        const cellsStates = [];

        $('td').each((index, element) => {
            cellsStates.push($(element).attr('class'));
        });

        return cellsStates;
    }

    getGameState() {
        const $startButton = $('.js-start-button');
        if ($startButton.attr('disabled') === 'disabled') {
            return false;
        }
        return true;
    }

    drawField(cells) {
        const $gameField = $('.js-game-field');

        const locals = {
            fieldHeight: this._fieldHeight,
            fieldWidth: this._fieldWidth
        };

        $gameField.html(template(locals));

        return this;
    }

    _createNewCell(i, j, cellState) {
        let newCell = `<td data-position=\"${i}-${j}\" class=`;

        if (cellState === 1) {
            newCell += '\"alive\"></td>';
        } else {
            newCell += '\"dead\"></td>';
        }

        return newCell;
    }
}

export default View;
