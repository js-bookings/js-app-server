"use strict";
exports.__esModule = true;
var src_1 = require("./../src");
var chai_1 = require("chai");
describe('helloWorld', function () {
    it('Should return greetings', function () {
        chai_1.expect(src_1.helloWorld()).equals('Howdy!');
    });
});
