 /* eslint-env mocha */

 var assert = require("assert"),
     Color = require("../basic.js");

 describe("models:hex", function() {
    it("should create a valid color object", function() {
        var c = new Color("#f06860");

        assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
    });

    it("should return a valid hex string", function() {
        var c = new Color({ red: 240, green: 104, blue: 96 });

        assert.equal(c.tohex(), "#f06860");
    });
 });
