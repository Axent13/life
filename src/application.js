import Controller from './controller.js';

const controller = new Controller();

setInterval(() => {
    if (!controller._isPaused) {
        controller.nextStep();
    }
}, 1000);
