import Model from './model.js';
import View from './view.js';

class Controller {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;


        this._view = new View(this._fieldWidth, this._fieldHeight);
        this.gameStateListen();
        this.changeCellListen();

        this._model = new Model(this._fieldWidth, this._fieldHeight);
        this._model.createEmptyField();
        this._isPaused = true;

        this._view.drawField(this._model.getCells());
    }

    gameStateListen() {
        this._view.on('startGame', () => {
            this._isPaused = false;
        });
        this._view.on('pauseGame', () => {
            this._isPaused = true;
        });
    }

    changeCellListen() {
        this._view.on('changeCell', (cellPosition) => {
            const [x, y] = cellPosition.split('-');
            this._model.changeCellState(x, y);
        });
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
