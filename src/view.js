export default class View {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;
    }

    drawField() {
        let resultingField = '';
        for (let i = 0; i < this._fieldHeight; i += 1) {
            resultingField += '<tr>';
            for (let j = 0; j < this._fieldWidth; j += 1) {
                resultingField += `<td data-position=\'${i}-${j}\' class=\'dead\'></td>`;
            }
            resultingField += '</tr>';
        }
        const $gameField = $('.js-game-field');
        $gameField.html(resultingField);

        return resultingField;
    }

    changeCellState($cell) {
        $cell.toggleClass('alive dead');

        return $cell.attr('class');
    }
}
