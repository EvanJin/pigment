/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:name", function() {
    it("should create a valid color object", function() {
       var c = new Color("crimson");

       assert.ok(c.red === 220 && c.green === 20 && c.blue === 60 && c.alpha === 1);
    });
});
