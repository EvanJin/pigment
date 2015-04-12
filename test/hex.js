 /* jshint mocha: true */

 var assert = require("assert"),
     Color = require("../color.js");

 describe("models:hex", function() {
     it("should create a valid color object", function() {
        var c = new Color("#f06860");

        assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
     });
 });
