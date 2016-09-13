import {Controller} from "./controller.js";

let controller = new Controller();

let tick = setInterval(function() {
    if(!controller._isPaused) {
        controller.nextStep();
    }
}, 1000);