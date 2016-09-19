export default class View {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._field_width = fieldWidth;
        this._field_height = fieldHeight;
    }

    drawField() {
        let resultingField = '';
        for (let i = 0; i < this._field_height; i += 1) {
            resultingField += '<tr>';
            for (let j = 0; j < this._field_width; j += 1) {
                resultingField += `<td id=\'${i}-${j}\' class=\'dead\'></td>`;
            }
            resultingField += '</tr>';
        }
        $('#game-field').html(resultingField);

        return resultingField;
    }

    changeCellState(cell) {
        cell.toggleClass('alive dead');

        return cell.attr('class');
    }
}
