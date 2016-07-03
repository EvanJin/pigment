var Color = require('./basic.js');
var models = {};

models.hsv = require('./models/hsv.js');
models.hwb = require('./models/hwb.js');
models.xyz = require('./models/xyz.js');
models.lab = require('./models/lab.js');
models.cmyk = require('./models/cmyk.js');
models.hcg = require('./models/hcg.js');

for (var model in models) {
  Color.addModel(model, models[model]);
}

module.exports = Color;
