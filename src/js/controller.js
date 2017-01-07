import Model from './model.js';
import View from './view.js';

class Controller {

  constructor() {
    this._view = new View();
    this._gameStateListen();
    this._changeCellListen();
    this._unfocusInputsListen();

    this._model = new Model();
    this._model.createEmptyField();

    this._view.drawField(this._model.getHeight(), this._model.getWidth(), this._model.getCells());
  }

  initializeInterval() {
    const intervalId = setInterval(() => {
      if (this._model.getGameState()) {
        this.nextStep();
      }
    }, 1000);

    return intervalId;
  }

  nextStep() {
    this._model.nextCellStates();
    this._view.drawField(this._model.getHeight(), this._model.getWidth(), this._model.getCells());

    return this;
  }

  _gameStateListen() {
    this._view.on('startGame', () => {
      this._model.setGameState(true);
      this._intervalId = this.initializeInterval();
    });
    this._view.on('pauseGame', () => {
      this._model.setGameState(false);
      clearInterval(this._intervalId);
    });
  }

  _changeCellListen() {
    this._view.on('changeCell', (cellPosition) => {
      const [xCoordinate, yCoordinate] = cellPosition.split('-');
      this._model.changeCellState(xCoordinate, yCoordinate);
    });
  }

  _unfocusInputsListen() {
    this._view.on('changeFieldHeight', (newFieldHeight) => {
      this._model.setHeight(newFieldHeight);
      this._view.drawField(this._model.getHeight(), this._model.getWidth(), this._model.getCells());
    });
    this._view.on('changeFieldWidth', (newFieldWidth) => {
      this._model.setWidth(newFieldWidth);
      this._view.drawField(this._model.getHeight(), this._model.getWidth(), this._model.getCells());
    });
  }

}

export default Controller;
