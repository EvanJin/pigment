/* eslint-env mocha */

var assert = require('assert'),
  Color = require('../basic.js');

describe('models:rgb', function() {
  it('should create a valid color object', function() {
    var c = new Color('rgb(240, 104, 96)'),
      d = new Color('rgba(233, 240, 96, .5)');

    assert.ok(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
    assert.ok(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.5);
  });

  it('should return a valid rgba string', function() {
    var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

    assert.equal(c.torgb(), 'rgb(240, 104, 96)');
    assert.equal(c.torgba(), 'rgba(240, 104, 96, 0.3)');
  });

  it('should return luminance of color', function() {
    var c = new Color({ red: 240, green: 104, blue: 96 });

    assert.equal(c.luminance(), '0.29270422282503833');
  });

  it('should return darkness of color', function() {
    var c = new Color({ red: 240, green: 104, blue: 96 });

    assert.equal(c.darkness(), '0.4362666666666666');
  });

  it('should return negative of color', function() {
    var c = new Color({ red: 240, green: 104, blue: 96 });

    assert.equal(c.negate().torgb(), 'rgb(15, 151, 159)');
  });

  it('should return greyscale color', function() {
    var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

    assert.equal(c.greyscale().torgb(), 'rgb(143.75199999999998, 143.75199999999998, 143.75199999999998)');
    assert.equal(c.grayscale().torgb(), 'rgb(143.75199999999998, 143.75199999999998, 143.75199999999998)');
  });

  it('should mix color', function() {
    var c = new Color('rgb(240, 104, 96)'),
      d = new Color('rgb(233, 240, 96)');

    assert.equal(c.mix(d, 0.7).torgb(), 'rgb(235, 199, 96)');
    assert.equal(c.mix(d, 0.4).torgb(), 'rgb(237, 158, 96)');
  });
});
