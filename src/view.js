class View {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
    }

    drawField(cells) {
        let resultingField = '';
        for (let i = 0; i < this._fieldHeight; i += 1) {
            resultingField += '<tr>';
            for (let j = 0; j < this._fieldWidth; j += 1) {
                resultingField += this._createNewCell(i, j, cells[i][j]);
            }
            resultingField += '</tr>';
        }
        const $gameField = $('.js-game-field');
        $gameField.html(resultingField);

        return resultingField;
    }

    _createNewCell(i, j, cellState) {
        let newCell = `<td data-position=\'${i}-${j}\' class=`;

        if (cellState === 1) {
            newCell += '\'alive\'></td>';
        } else {
            newCell += '\'dead\'></td>';
        }

        return newCell;
    }

    changeCellState($cell) {
        $cell.toggleClass('alive dead');

        return $cell.attr('class');
    }
}

export default View;
