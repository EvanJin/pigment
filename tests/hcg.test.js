var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('hcg(3, 56%, 86%)'),
    d = new Color('hcga(63, 56%, 86%, .3)');

  t.true(c.red === 239 && c.green === 104 && c.blue === 96 && c.alpha === 1);
  t.true(d.red === 232 && d.green === 239 && d.blue === 96 && d.alpha === 0.3);
});

test('should return a valid hcga string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.5 });

  t.is(c.tohcg(), 'hcg(3, 56%, 86%)');
  t.is(c.tohcga(), 'hcga(3, 56%, 86%, 0.5)');
});
