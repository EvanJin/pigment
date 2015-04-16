/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:lab", function() {
    it("should create a valid color object", function() {
        var c = new Color("lab(61, 53, 31)");

        assert.ok(c.red === 241 && c.green === 102 && c.blue === 94 && c.alpha === 1);
    });

    it("should return a valid xyza string", function() {
        var c = new Color({ red: 240, green: 104, blue: 96 });

        assert.equal(c.tolab(), "lab(61, 53, 31)");
    });
});
