var Color = require("./core.js"),
    models = require("./models.js");

for (var model in models) {
    Color.addModel(model, models[model]);
}

module.exports = Color;
