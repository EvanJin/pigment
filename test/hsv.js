/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:hsv", function() {
    it("should create a valid color object", function() {
        var c, d;

        c = new Color("hsv(3, 60%, 94%)");
        d = new Color("hsva(63, 60%, 94%, .3)");

        assert.ok(c.red === 240 && c.green === 103 && c.blue === 96 && c.alpha === 1);
        assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.3);
    });
});