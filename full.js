var Color = require("./color.js"),
    models = {};

models.schemes = require("./models/schemes.js");
models.colorblind = require("./models/colorblind.js");

for (var model in models) {
    Color.addModel(model, models[model]);
}

module.exports = Color;
