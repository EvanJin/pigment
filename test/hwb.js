/* eslint-env mocha */

var assert = require('assert'),
  Color = require('../basic.js');

describe('models:hwb', function() {
  it('should create a valid color object', function() {
    var c = new Color('hwb(3, 38%, 6%)'),
      d = new Color('hwba(63, 38%, 6%, .3)');

    assert.ok(c.red === 240 && c.green === 104 && c.blue === 97 && c.alpha === 1);
    assert.ok(d.red === 233 && d.green === 240 && d.blue === 97 && d.alpha === 0.3);
  });

  it('should return a valid hwba string', function() {
    var c = new Color({ red: 240, green: 104, blue: 97, alpha: 0.3 });

    assert.equal(c.tohwb(), 'hwb(3, 38%, 6%)');
    assert.equal(c.tohwba(), 'hwba(3, 38%, 6%, 0.3)');
  });
});
