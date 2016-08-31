import * as Controller from '../controller';

describe("pow", function() {

    it("возводит в n-ю степень", function() {
        assert.equal(Controller.pow(2, 3), 8);
    });

});