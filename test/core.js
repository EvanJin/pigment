/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("core", function() {
    it("should throw error when adding invalid model", function() {
        assert.throws(function() {
            Color.addModel("invalid", {});
        });
    });

    it("should throw error when dependency not satisfied", function() {
        assert.throws(function() {
            Color.addModel("none", {
                depends: [ "nonexistent" ],
                match: function() {},
                frommodel: function() {},
                tomodel: function() {}
            });
        });
    });

    it("should call init method", function() {
        Color.addModel("none", {
            match: function() {},
            init: function() { this.inited = true; },
            frommodel: function() {},
            tomodel: function() {}
        });

        var c = new Color({ red: 240, green: 104, blue: 96 });

        assert.ok(c.inited);
    });

    it("should create a valid color object", function() {
        var c, d;

        c = new Color({ red: 240, green: 104, blue: 96 });
        d = new Color({ red: 233, green: 240, blue: 96, alpha: 0.5 });

        assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
        assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.5);
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
