/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("ColorConstructor", function() {
    it("should throw error when adding invalid model", function() {
        assert.throws(function() {
            Color.addModel("invalid", {});
        });
    });

    it("should call init method", function() {
        Color.addModel("none", {
            match: function() {},
            init: function() { this.inited = true; },
            frommodel: function() {},
            tomodel: function() {}
        });

        var c = new Color("#f06860");

        assert.ok(c.inited);
    });

    it("should create a valid color object", function() {
        var c, d;

        c = new Color("rgb(128, 255, 32)");
        d = new Color("rgb(234, 224, 64, .5)");

        assert.ok(c.red === 128 && c.green === 255 && c.blue === 32 && c.alpha === 1);
        assert.ok(d.red === 234 && d.green === 224 && d.blue === 64 && d.alpha === 0.5);
    });

    it("should give back original color", function() {
        var c = new Color("#f06860");

        assert.ok(c.tohex() === "#f06860" && c.torgb() === "rgba(240, 104, 96, 1)");
    });

    it("should parse colors from string", function() {
        var colors = Color.parse("Some roses aren't #ff0000, some violets aren't rgb(0, 0, 255), nobody's wrong, except maybe you!");

        assert.ok(colors.length === 2 && colors[0].tohex() === "#ff0000" && colors[1].tohex() === "#0000ff");
    });

    it("should generate a random color", function() {
        var c = Color.random();

        assert.ok(typeof c.red === "number" && typeof c.green === "number" && typeof c.blue === "number");
    });
});
