/**
 * @fileOverview - Color information and manipulation library - Core.
 * @author - Satyajit Sahoo <satyajit.happy@gmail.com>
 * @license - GPL-3.0+
 */

 var Color = (function() {
    var _models = {},
        _fn = {};

    _models._internal_ = {
        match: function(c) {
            return (typeof c === "object" && typeof c.red === "number" && typeof c.green === "number" && typeof c.blue === "number");
        },
        frommodel: function(c) {
            return c;
        },
        tomodel: function() {
            return {
                red: this.red,
                green: this.green,
                blue: this.blue,
                alpha: this.alpha
            };
        }
    };

    _fn.getType = function(color) {
        var type;

        if (!color) {
            return;
        }

        for (var model in _models) {
            if (typeof _models[model].match === "function") {
                if (_models[model].match(color)) {
                    type = model;

                    break;
                }
            } else if (_models[model].match instanceof RegExp) {
                if (_models[model].match.test(color)) {
                    type = model;

                    break;
                }
            }
        }

        return type;
    };

    function ColorConstructor(color) {
        var c, type, props;

        // Handle situation where called without "new" keyword
        if (false === (this instanceof ColorConstructor)) {
            return new ColorConstructor(color);
        }

        type = _fn.getType(color);

        if (type) {
            props = [ "red", "green", "blue" ];

            c = _models[type].frommodel(color);

            for (var i = 0, l = props.length; i < l; i++) {
                Object.defineProperty(this, props[i], {
                    value: (c[props[i]] >= 0 && c[props[i]] <= 255) ? c[props[i]] : 0,
                    writable: false,
                    enumerable: true
                });
            }

            Object.defineProperty(this, "alpha", {
                value: (typeof c.alpha === "number" && !isNaN(c.alpha) && c.alpha <= 1) ? c.alpha : 1,
                writable: false,
                enumerable: true
            });

            Object.defineProperty(this, "_color", {
                value: color,
                writable: false,
                enumerable: false
            });

            Object.defineProperty(this, "_type", {
                value: type,
                writable: false,
                enumerable: false
            });
        } else {
            throw new Error("Invalid color " + color);
        }
    }

    ColorConstructor.addModel = function(name, model) {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid model name " + name);
        }

        if (typeof model !== "object") {
            throw new Error("Invalid model object " + model);
        }

        if (model.depends) {
            if (Array.isArray(model.depends)) {
                for (var i = 0, l = model.depends.length; i < l; i++) {
                    if (typeof model.depends[i] === "string") {
                        if (_models[model.depends[i]] === -1) {
                            throw new Error("Unsatisfied dependency " + model.depends[i]);
                        }
                    } else {
                        throw new Error("Invalid dependency " + model.depends[i]);
                    }
                }
            } else {
                throw new Error("Invalid depends array " + model.depends);
            }
        }

        if (typeof model.match !== "function" && !(model.match instanceof RegExp)) {
            throw new Error("Invalid match method " + model.match);
        }

        if (typeof model.frommodel !== "function") {
            throw new Error("Invalid frommodel method " + model.frommodel);
        }

        if (typeof model.tomodel !== "function") {
            throw new Error("Invalid tomodel method " + model.tomodel);
        }

        for (var prop in model) {
            if (prop !== "tomodel" && /^to/.test(prop)) {
                throw new Error("Cannot use property prefixed by 'to' " + prop);
            }

            if (prop !== "frommodel" && /^from/.test(prop)) {
                throw new Error("Cannot use property prefixed by 'from' " + prop);
            }

            if (!/^(match|tomodel|frommodel)$/.test(prop)) {
                // Add extra methods
                ColorConstructor.prototype[prop] = model[prop];
            }
        }

        // Add helper methods to convert from and to the model
        ColorConstructor.prototype["from" + name] = function() {
            var args = Array.prototype.slice.call(arguments);

            args = args.length ? args : [ this._color ];

            return model.frommodel.apply(this, args);
        };

        ColorConstructor.prototype["to" + name] = function() {
            var args = Array.prototype.slice.call(arguments);

            if (this._type === name && !args.length) {
                return this._color;
            } else {
                return model.tomodel.apply(this);
            }
        };

        _models[name] = model;
    };

    ColorConstructor.random = function() {
        var r = function() {
            return Math.floor(Math.random() * 256);
        };

        return new ColorConstructor({
            red: r(),
            green: r(),
            blue: r()
        });
    };

    ColorConstructor.parse = function(str) {
        var c, map, colors, words, id;

        if (typeof str !== "string") {
            throw new Error("Invalid string " + str);
        }

        map = {};
        colors = [];

        words = str.match(/(\w+\((\s?(\d?.?\d+)%?\s?,?)+\)|[^,;:!'"\.\?\s]+|\S+)/gi, "") || [];

        for (var i = 0, l = words.length; i < l; i++) {
            if (_fn.getType(words[i])) {
                try {
                    c = new ColorConstructor(words[i]);
                } catch (e) {
                    continue;
                }

                id = c.red + ":" + c.green + ":" + c.blue + ":" + c.alpha;

                // Only list unique colors
                if (map[id]) {
                    continue;
                }

                map[id] = true;

                colors.push(c);
            }
        }

        return colors;
    };

    return ColorConstructor;
 }());

 if (typeof define === "function" && define.amd) {
     // Define as AMD module
     define(function() {
         return Color;
     });
 } else if (typeof module !== "undefined" && module.exports) {
     // Export to CommonJS
     module.exports = Color;
 } else {
     window.Color = Color;
 }
