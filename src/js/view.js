const templateCreateCells = require('../createCells.pug');
const eventEmitter = require('events');

class View extends eventEmitter {

  constructor() {
    super();
    this._startButtonBind();
    this._pauseButtonBind();
    this._changeCellStateBind();
    this._unfocusInputsBind();
  }

  drawField(modelFieldHeight, modelFieldWidth, cells) {
    const $gameField = $('.js-game-field');

    const locals = {
      fieldHeight: modelFieldHeight,
      fieldWidth: modelFieldWidth,
      cellsStates: cells,
    };

    $gameField.html(templateCreateCells(locals));

    return $gameField.html();
  }

  _changeCellStateBind() {
    $('.js-game-field').on('click', 'td', (event) => {
      $(event.currentTarget).toggleClass('alive dead');
      const cellPosition = $(event.currentTarget).attr('data-position');
      this.emit('changeCell', cellPosition);
    });

    return this;
  }

  _unfocusInputsBind() {
    const $heightInput = $('.js-control__height');
    $heightInput.focusout(() => {
      const newFieldHeight = $heightInput.val();

      if (View.isPositiveNumber(newFieldHeight)) {
        this.emit('changeFieldHeight', newFieldHeight);
      }
    });
    const $widthInput = $('.js-control__width');
    $widthInput.focusout(() => {
      const newFieldWidth = $widthInput.val();

      if (View.isPositiveNumber(newFieldWidth)) {
        this.emit('changeFieldWidth', newFieldWidth);
      }
    });

    return this;
  }

  _startButtonBind() {
    $('.js-start-button').click((event) => {
      $(event.currentTarget).attr('disabled', 'true');
      const $pauseButton = $('.js-pause-button');
      $pauseButton.removeAttr('disabled');

      this.emit('startGame');
    });

    return this;
  }

  _pauseButtonBind() {
    $('.js-pause-button').click((event) => {
      $(event.currentTarget).attr('disabled', 'true');
      const $startButton = $('.js-start-button');
      $startButton.removeAttr('disabled');

      this.emit('pauseGame');
    });

    return this;
  }

  static isPositiveNumber(num) {
    return (!isNaN(num) && num > 0);
  }

}

export default View;
