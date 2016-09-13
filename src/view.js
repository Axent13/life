export class View {

    constructor(field_width = 30, field_height = 30) {
        this._field_width = field_width;
        this._field_height = field_height;
    }

    drawField() {
        let resulting_field = "";
        for(let i = 0; i < this._field_height; i++){
            resulting_field += "<tr>";
            for(let j = 0; j < this._field_width; j++){
                resulting_field += "<td id='" + i + "-" + j + "' class='dead'></td>";
            }
            resulting_field += "</tr>";
        }
        $("#game-field").html(resulting_field);

        return resulting_field;
    }

    changeCellState(cell) {
        cell.toggleClass("alive dead");

        return cell.attr('class');
    }
}


