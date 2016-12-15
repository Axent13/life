import Model from './model.js';
import View from './view.js';

class Controller {

    constructor(fieldWidth = 30, fieldHeight = 30) {
        this._fieldWidth = fieldWidth;
        this._fieldHeight = fieldHeight;


        this._view = new View(this._fieldWidth, this._fieldHeight);
        this.eventListen();

        this._model = new Model(this._fieldWidth, this._fieldHeight);
        this._model.createEmptyField();
        this._isPaused = true;

        this._view.drawField(this._model.getCells());
    }

    eventListen() {
        this._view.on('event', () => {
            console.log('It is on!');
        });
    }

    initializeInterval() {
        setInterval(() => {
            this._isPaused = this._view.getGameState();
            if (!this._isPaused) {
                this.nextStep();
            }
        }, 1000);
    }

    nextStep() {


        this._model.updateStates(this._view.getCellsStates());
        this._model.nextCellStates();
        this._view.drawField(this._model.getCells());

        return this;
    }
}

export default Controller;
