/* global Color */

module.exports = {
    depends: [ "hsl" ],

    schemeFromDegrees: function(degrees) {
        var self = this;

        degrees = Array.isArray(degrees) ? degrees : [];

        return degrees.map(function(d) {
            var hue = (self.hsl[0] + d) % 360;

            return new Color(self.fromhsl.call({
                hsl: [ hue, self.hsl[1], self.hsl[2] ]
            }));
        });
    },

    complementaryScheme: function() {
        return this.schemeFromDegrees([ 0, 180 ]);
    },

    splitComplementaryScheme: function() {
        return this.schemeFromDegrees([ 0, 150, 320 ]);
    },

    splitComplementaryCWScheme: function() {
        return this.schemeFromDegrees([ 0, 150, 300 ]);
    },

    splitComplementaryCCWScheme: function() {
        return this.schemeFromDegrees([ 0, 60, 210 ]);
    },

    triadicScheme: function() {
        return this.schemeFromDegrees([ 0, 120, 240 ]);
    },

    clashScheme: function() {
        return this.schemeFromDegrees([ 0, 90, 270 ]);
    },

    tetradicScheme: function() {
        return this.schemeFromDegrees([ 0, 90, 180, 270 ]);
    },

    neutralScheme: function() {
        return this.schemeFromDegrees([ 0, 15, 30, 45, 60, 75 ]);
    },

    analogousScheme: function() {
        return this.schemeFromDegrees([ 0, 30, 60, 90, 120, 150 ]);
    },

    fourToneCWScheme: function() {
        return this.schemeFromDegrees([ 0, 60, 180, 240 ]);
    },

    fourToneCCWScheme: function() {
        return this.schemeFromDegrees([ 0, 120, 180, 300 ]);
    },

    fiveToneAScheme: function() {
        return this.schemeFromDegrees([ 0, 115, 155, 205, 245 ]);
    },

    fiveToneBScheme: function() {
        return this.schemeFromDegrees([ 0, 40, 90, 130, 245 ]);
    },

    fiveToneCScheme: function() {
        return this.schemeFromDegrees([ 0, 50, 90, 205, 320 ]);
    },

    fiveToneDScheme: function() {
        return this.schemeFromDegrees([ 0, 40, 155, 270, 310 ]);
    },

    fiveToneEScheme: function() {
        return this.schemeFromDegrees([ 0, 115, 2, 30, 270, 320 ]);
    },

    sixToneCWScheme: function() {
        return this.schemeFromDegrees([ 0, 30, 120, 150, 240, 270 ]);
    },

    sixToneCCWScheme: function() {
        return this.schemeFromDegrees([ 0, 90, 120, 210, 240, 330 ]);
    },

    monochromaticScheme: function(n) {
        var self = this,
            lumas = [];

        n = (n && typeof n === "number") ? n : 10;

        for (var i = 0; i < n; i++) {
            lumas.push((self.hsl[2] + (i * n)) % 100);
        }

        lumas.sort(function(a, b) {
            return a - b;
        });

        return lumas.map(function(l) {
            return new Color(self.fromhsl.call({
                hsl: [ self.hsl[0], self.hsl[1], l ]
            }));
        });
    }
};
