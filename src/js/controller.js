import Model from './model.js';
import View from './view.js';

class Controller {

  constructor(fieldWidth = 30, fieldHeight = 30) {
    this._fieldWidth = fieldWidth;
    this._fieldHeight = fieldHeight;

    this._view = new View(this._fieldWidth, this._fieldHeight);
    this._gameStateListen();
    this._changeCellListen();

    this._model = new Model(this._fieldWidth, this._fieldHeight);
    this._model.createEmptyField();

    this._view.drawField(this._model.getCells());
  }

  initializeInterval() {
    setInterval(() => {
      if (this._model.getGameState()) {
        this.nextStep();
      }
    }, 1000);
  }

  nextStep() {
    this._model.nextCellStates();
    this._view.drawField(this._model.getCells());

    return this;
  }

  _gameStateListen() {
    this._view.on('startGame', () => {
      this._model.setGameState(true);
    });
    this._view.on('pauseGame', () => {
      this._model.setGameState(false);
    });
  }

  _changeCellListen() {
    this._view.on('changeCell', (cellPosition) => {
      const [xCoordinate, yCoordinate] = cellPosition.split('-');
      this._model.changeCellState(xCoordinate, yCoordinate);
    });
  }

}

export default Controller;
