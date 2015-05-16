/* eslint-env mocha */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:hsv", function() {
    it("should create a valid color object", function() {
        var c = new Color("hsv(3, 60%, 94%)"),
            d = new Color("hsva(63, 60%, 94%, .3)");

        assert.ok(c.red === 240 && c.green === 103 && c.blue === 96 && c.alpha === 1);
        assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.3);
    });

    it("should return a valid hsva string", function() {
        var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.5 });

        assert.equal(c.tohsv(), "hsv(3, 60%, 94%)");
        assert.equal(c.tohsva(), "hsva(3, 60%, 94%, 0.5)");
        assert.equal(c.tohsb(), "hsb(3, 60%, 94%)");
        assert.equal(c.tohsba(), "hsba(3, 60%, 94%, 0.5)");
    });
});
