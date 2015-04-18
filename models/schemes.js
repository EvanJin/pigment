/* global Color */

module.exports = {
    depends: [ "hsl" ],

    schemeFromDegrees: function() {
        var degrees = Array.prototype.slice.call(arguments),
            scheme = [],
            hue;

        for (var i = 0, l = degrees.length; i < l; i++) {
            hue = (this.hsl[0] + degrees[i]) % 360;

            scheme.push(new Color(this.fromhsl.call({
                hsl: [ hue, this.hsl[1], this.hsl[2] ]
            })));
        }

        return scheme;
    },

    complementaryScheme: function() {
        return this.schemeFromDegrees(0, 180);
    },

    splitComplementaryScheme: function() {
        return this.schemeFromDegrees(0, 150, 320);
    },

    splitComplementaryCWScheme: function() {
        return this.schemeFromDegrees(0, 150, 300);
    },

    splitComplementaryCCWScheme: function() {
        return this.schemeFromDegrees(0, 60, 210);
    },

    triadicScheme: function() {
        return this.schemeFromDegrees(0, 120, 240);
    },

    clashScheme: function() {
        return this.schemeFromDegrees(0, 90, 270);
    },

    tetradicScheme: function() {
        return this.schemeFromDegrees(0, 90, 180, 270);
    },

    neutralScheme: function() {
        return this.schemeFromDegrees(0, 15, 30, 45, 60, 75);
    },

    analogousScheme: function() {
        return this.schemeFromDegrees(0, 30, 60, 90, 120, 150);
    },

    fourToneCWScheme: function() {
        return this.schemeFromDegrees(0, 60, 180, 240);
    },

    fourToneCCWScheme: function() {
        return this.schemeFromDegrees(0, 120, 180, 300);
    },

    fiveToneAScheme: function() {
        return this.schemeFromDegrees(0, 115, 155, 205, 245);
    },

    fiveToneBScheme: function() {
        return this.schemeFromDegrees(0, 40, 90, 130, 245);
    },

    fiveToneCScheme: function() {
        return this.schemeFromDegrees(0, 50, 90, 205, 320);
    },

    fiveToneDScheme: function() {
        return this.schemeFromDegrees(0, 40, 155, 270, 310);
    },

    fiveToneEScheme: function() {
        return this.schemeFromDegrees(0, 115, 2, 30, 270, 320);
    },

    sixToneCWScheme: function() {
        return this.schemeFromDegrees(0, 30, 120, 150, 240, 270);
    },

    sixToneCCWScheme: function() {
        return this.schemeFromDegrees(0, 90, 120, 210, 240, 330);
    },

    monochromaticScheme: function(n) {
        var scheme = [],
            lumas = [];

        n = (n && typeof n === "number") ? n : 10;

        for (var i = 0; i < n; i++) {
            lumas.push((this.hsl[2] + (i * n)) % 100);
        }

        lumas.sort(function(a, b) {
            return a - b;
        });

        for (var j = 0, l = lumas.length; j < l; j++) {
            scheme.push(new Color(this.fromhsl.call({
                hsl: [ this.hsl[0], this.hsl[1], lumas[j] ]
            })));
        }

        return scheme;
    }
};
