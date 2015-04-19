var Color = require("./basic.js"),
    models = {};

models.hsv = require("./models/hsv.js");
models.xyz = require("./models/xyz.js");
models.lab = require("./models/lab.js");
models.cmyk = require("./models/cmyk.js");

for (var model in models) {
    Color.addModel(model, models[model]);
}

module.exports = Color;
