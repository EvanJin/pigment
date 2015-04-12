/* jshint mocha: true */

var assert = require("assert"),
    Color = require("../color.js");

describe("models:cmyk", function() {
   it("should create a valid color object", function() {
       var c = new Color("cmyk(0, 40, 56, 4)");

       assert.ok(c.red === 245 && c.green === 147 && c.blue === 108 && c.alpha === 1);
   });

   it("should return a valid cmyk string", function() {
       var c = new Color({ red: 145, green: 100, blue: 171 });

       assert.equal(c.tocmyk(), "cmyk(15, 42, 0, 33)");
   });
});
