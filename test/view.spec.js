import Model from '../src/model.js';
import View from '../src/view.js';

const assert = require('assert');

describe('View testing:', () => {
    beforeEach(() => {
        const testBody = '<table class="game-field js-game-field"></table>';
        const $body = $('body');

        $body.html(testBody);
    });

    describe('Checking constructor', () => {
        it('input fieldWidth should be equal to property _fieldWidth', () => {
            const fieldWidth = 10;
            const view = new View(fieldWidth, 1);

            assert.equal(view._fieldWidth, fieldWidth);
        });
        it('input fieldHeight should be equal to property _fieldHeight', () => {
            const fieldHeight = 10;
            const view = new View(1, fieldHeight);

            assert.equal(view._fieldHeight, fieldHeight);
        });
        it('properties _fieldWidth and _fieldHeight should be 30 in default', () => {
            const view = new View();

            assert.equal(view._fieldWidth, 30);
            assert.equal(view._fieldHeight, 30);
        });
    });
    describe('Checking drawField()', () => {
        it('0x0 field', () => {
            const view = new View(0, 0);

            const resultingField = view.drawField();
            const expectingResult = '';

            assert.equal(resultingField, expectingResult);
        });
        it('0x0 field - cheking DOM', () => {
            const view = new View(0, 0);

            view.drawField();
            const $body = $('body');
            const result = $body.html();
            const expectingResult = '<table class="game-field js-game-field"></table>';

            assert.equal(result, expectingResult);
        });
        it('1x1 field', () => {
            const model = new Model(1, 1);
            model.createEmptyField();
            const view = new View(1, 1);

            const resultingField = view.drawField(model.getCells());
            const expectingResult = '<tr><td data-position="0-0" class="dead"></td></tr>';

            assert.equal(resultingField, expectingResult);
        });
        it('1x1 field - checking DOM', () => {
            const model = new Model(1, 1);
            model.createEmptyField();
            const view = new View(1, 1);

            view.drawField(model.getCells());
            const $body = $('body');
            const result = $body.html();
            const expectingResult = '<table class="game-field js-game-field"><tbody>' +
                '<tr><td data-position="0-0" class="dead"></td></tr></tbody></table>';

            assert.equal(result, expectingResult);
        });
        it('2x1 field', () => {
            const model = new Model(2, 1);
            model.createEmptyField();
            const view = new View(2, 1);

            const resultingField = view.drawField(model.getCells());
            const expectingResult = '<tr><td data-position="0-0" class="dead"></td><td data-position="0-1" class="dead"></td></tr>';

            assert.equal(resultingField, expectingResult);
        });
        it('2x1 field - checking DOM', () => {
            const model = new Model(2, 1);
            model.createEmptyField();
            const view = new View(2, 1);

            view.drawField(model.getCells());
            const $body = $('body');
            const result = $body.html();

            const expectingResult = '<table class="game-field js-game-field"><tbody><tr>' +
                '<td data-position="0-0" class="dead"></td>' +
                '<td data-position="0-1" class="dead"></td>' +
                '</tr></tbody></table>';

            assert.equal(result, expectingResult);
        });
    });
    describe('Checking _createNewCell(i, j, cellState)', () => {
        it('Should create dead cell with position (0, 0)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(0, 0, 0);
            const expectingResult = '<td data-position="0-0" class="dead"></td>';

            assert.equal(resultingCell, expectingResult);
        });
        it('Should create alive cell with position (0, 0)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(0, 0, 1);
            const expectingResult = '<td data-position="0-0" class="alive"></td>';

            assert.equal(resultingCell, expectingResult);
        });
        it('Should create dead cell with position (10, 0)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(10, 0, 0);
            const expectingResult = '<td data-position="10-0" class="dead"></td>';

            assert.equal(resultingCell, expectingResult);
        });
        it('Should create alive cell with position (0, 10)', () => {
            const view = new View();

            const resultingCell = view._createNewCell(0, 10, 1);
            const expectingResult = '<td data-position="0-10" class="alive"></td>';

            assert.equal(resultingCell, expectingResult);
        });
    });
});
