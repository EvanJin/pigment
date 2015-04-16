/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:xyz", function() {
    it("should create a valid color object", function() {
        var c = new Color("xyz(43, 29, 14)"),
            d = new Color("xyza(67, 80, 23, .3)");

        assert.ok(c.red === 241 && c.green === 102 && c.blue === 94 && c.alpha === 1);
        assert.ok(d.red === 234 && d.green === 239 && d.blue === 96 && d.alpha === 0.3);
    });

    it("should return a valid xyza string", function() {
        var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

        assert.equal(c.toxyz(), "xyza(43, 29, 14, 0.3)");
    });
});
