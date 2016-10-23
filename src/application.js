import Controller from './controller.js';

const controller = new Controller();

const startGame = () => {
    setInterval(() => {
        if (!controller._isPaused) {
            controller.nextStep();
        }
    }, 1000);
};

startGame();

export default startGame;
