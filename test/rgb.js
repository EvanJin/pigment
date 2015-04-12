/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:rgb", function() {
    it("should create a valid color object", function() {
        var c, d;

        c = new Color("rgb(240, 104, 96)");
        d = new Color("rgba(233, 240, 96, .5)");

        assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
        assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.5);
    });
});
