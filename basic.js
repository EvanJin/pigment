var Color = require('./core.js');
var models = {};

models.name = require('./models/name.js');
models.rgb = require('./models/rgb.js');
models.hex = require('./models/hex.js');
models.hsl = require('./models/hsl.js');

for (var model in models) {
  Color.addModel(model, models[model]);
}

module.exports = Color;
