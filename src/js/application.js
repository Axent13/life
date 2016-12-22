import Controller from './controller.js';

const startGame = () => {
  const controller = new Controller();
  controller.initializeInterval();
};

startGame();

export default startGame;
