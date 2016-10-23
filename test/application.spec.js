import Controller from '../src/controller.js';
import startGame from '../src/application.js';

const assert = require('assert');

describe('Application testing', () => {
    describe('Checking startGame', () => {
        it('should be runned after 1000 miliseconds', () => {
            const controller = new Controller(0, 0);

            let clock = sinon.useFakeTimers();
            let spy = sinon.spy(controller.nextStep());

            console.log(spy);

            //controller._isPaused = false;

            startGame();

            //expect(controller).to.be.false;

            clock.restore();
        });
    });
});

