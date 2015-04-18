var models = {};

models.name = require("./models/name.js");
models.rgb = require("./models/rgb.js");
models.hex = require("./models/hex.js");
models.hsl = require("./models/hsl.js");
models.hsv = require("./models/hsv.js");
models.xyz = require("./models/xyz.js");
models.lab = require("./models/lab.js");
models.cmyk = require("./models/cmyk.js");
models.schemes = require("./models/schemes.js");
models.colorblind = require("./models/colorblind.js");

module.exports = models;
