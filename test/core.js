/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("core", function() {
    it("should throw error when adding invalid model", function() {
        assert.throws(function() {
            Color.addModel("invalid", {
                match: function() {}
            });
        });
    });

    it("should throw error when dependency not satisfied", function() {
        assert.throws(function() {
            Color.addModel("none", {
                depends: [ "nonexistent" ]
            });
        });
    });

    it("should call init method", function() {
        Color.addModel("none", {
            init: function() { this.inited = true; }
        });

        var c = new Color({ red: 240, green: 104, blue: 96 });

        assert.ok(c.inited);
    });

    it("should create a valid color object", function() {
        var c = new Color({ red: 240, green: 104, blue: 96 }),
            d = new Color({ red: 233, green: 240, blue: 96, alpha: 0.5 });

        assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
        assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.5);
    });

    it("should parse colors from string", function() {
        var colors = Color.parse("Orange is a carrot, yellow is a pear, #008000 is the grass, and #a52a2a is a bear, rgba(128, 0, 128, 1) is a plum, rgba(0, 0, 255, 1) is the sky, hsla(0, 0%, 0%, 1) is a witch's hat, and hsla(0, 100%, 50%, 1) is cherry pie.");

        assert.equal(colors.length, 9);
        assert.equal(colors[0].tohex(), "#ffa500");
        assert.equal(colors[1].tohex(), "#ffff00");
        assert.equal(colors[2].tohex(), "#008000");
        assert.equal(colors[3].tohex(), "#a52a2a");
        assert.equal(colors[4].tohex(), "#800080");
        assert.equal(colors[5].tohex(), "#dda0dd");
        assert.equal(colors[6].tohex(), "#0000ff");
        assert.equal(colors[7].tohex(), "#000000");
        assert.equal(colors[8].tohex(), "#ff0000");
    });

    it("should generate a random color", function() {
        var c = Color.random();

        assert.ok(typeof c.red === "number" && typeof c.green === "number" && typeof c.blue === "number");
    });
});
