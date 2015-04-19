/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../basic.js");

describe("models:name", function() {
    it("should create a valid color object", function() {
       var c = new Color("crimson");

       assert.ok(c.red === 220 && c.green === 20 && c.blue === 60 && c.alpha === 1);
    });

    it("should return a valid name", function() {
        var c = new Color({ red: 210, green: 105, blue: 30 });

        assert.equal(c.toname(), "chocolate");
    });

    it("should work with transparent color", function() {
        var c = new Color({ red: 0, green: 0, blue: 0, alpha: 0 }),
            d = new Color("transparent");

        assert.equal(c.toname(), "transparent");
        assert.ok(d.red === 0 && d.green === 0 && d.blue === 0 && d.alpha === 0);
    });
});
