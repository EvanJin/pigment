var test = require('ava');
var Color = require('../basic.js');

test('should throw error when adding invalid model', function(t) {
  t.throws(function() {
    Color.addModel('invalid', {
      match: function() {},
    });
  });
});

test('should throw error when dependency not satisfied', function(t) {
  t.throws(function() {
    Color.addModel('none', {
      depends: [ 'nonexistent' ],
    });
  });
});

test('should call init method', function(t) {
  var inited;

  Color.addModel('none', {
    init: function() { inited = true; },
  });

  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.true(c && inited);
});

test('should create a valid color object', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 }),
    d = new Color({ red: 233, green: 240, blue: 96, alpha: 0.5 });

  t.true(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
  t.true(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.5);
});

test('should parse colors from string', function(t) {
  var colors = Color.parse("Orange is a carrot, yellow is a pear, #008000 is the grass, and #a52a2a is a bear, rgba(128, 0, 128, 1) is a plum, rgba(0, 0, 255, 1) is the sky, hsla(0, 0%, 0%, 1) is a witch's hat, and hsla(0, 100%, 50%, 1) is cherry pie.");

  t.is(colors.length, 9);
  t.is(colors[0].tohex(), '#ffa500');
  t.is(colors[1].tohex(), '#ffff00');
  t.is(colors[2].tohex(), '#008000');
  t.is(colors[3].tohex(), '#a52a2a');
  t.is(colors[4].tohex(), '#800080');
  t.is(colors[5].tohex(), '#dda0dd');
  t.is(colors[6].tohex(), '#0000ff');
  t.is(colors[7].tohex(), '#000000');
  t.is(colors[8].tohex(), '#ff0000');
});

test('should generate a random color', function(t) {
  var c = Color.random();

  t.true(typeof c.red === 'number' && typeof c.green === 'number' && typeof c.blue === 'number');
});
