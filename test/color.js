/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("ColorConstructor", function() {
    it("should throw error when adding invalid model", function() {
        assert.throws(function() {
            Color.addModel("invalid", {});
        });
    });

    it("should create a valid color object", function() {
        var c, d;

        c = new Color("rgb(128, 255, 32)");
        d = new Color("rgb(234, 224, 64, .5)");

        assert.ok(c.red === 128 && c.green === 255 && c.blue === 32 && c.alpha === 1);
        assert.ok(d.red === 234 && d.green === 224 && d.blue === 64 && d.alpha === 0.5);
    });

    it("should generate a random color", function() {
        var c = Color.random();

        assert.ok(typeof c.red === "number" && typeof c.green === "number" && typeof c.blue === "number");
    });
});
