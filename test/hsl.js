/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:hsl", function() {
    it("should create a valid color object", function() {
        var c, d;

        c = new Color("hsl(3, 83%, 66%)");
        d = new Color("hsla(63, 83%, 66%, .3)");

        assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
        assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.3);
    });
});
