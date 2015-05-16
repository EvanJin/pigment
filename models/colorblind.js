var Color = require("../core.js");

module.exports = {
    depends: [ "rgb" ],

    filterMatrix: function(matrix) {
        var c = {
                r: this.rgb[0],
                g: this.rgb[1],
                b: this.rgb[2],
                a: this.alpha
            },
            m = matrix,
            r, g, b, a,
            fu = function(n) {
                return (n < 0 ? 0 : (n < 255 ? n : 255 ));
            };

        r = ((c.r * m[0]) + (c.g * m[1]) + (c.b * m[2]) + (c.a * m[3]) + m[4]);
        g = ((c.r * m[5]) + (c.g * m[6]) + (c.b * m[7]) + (c.a * m[8]) + m[9]);
        b = ((c.r * m[10]) + (c.g * m[11]) + (c.b * m[12]) + (c.a * m[13]) + m[14]);
        a = ((c.r * m[15]) + (c.g * m[16]) + (c.b * m[17]) + (c.a * m[18]) + m[19]);

        return new Color({
            red: fu(r),
            green: fu(g),
            blue: fu(b),
            alpha: fu(a)
        });
    },

    normalCondition: function() {
        return this.filterMatrix([ 1, 0, 0, 0, 0,  0, 1, 0, 0, 0,  0, 0, 1, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    protanopiaCondition: function() {
        return this.filterMatrix([ 0.567, 0.433, 0, 0, 0,  0.558, 0.442, 0, 0, 0,  0, 0.242, 0.758, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    protanomalyCondition: function() {
        return this.filterMatrix([ 0.817, 0.183, 0, 0, 0,  0.333, 0.667, 0, 0, 0,  0, 0.125, 0.875, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    deuteranopiaCondition: function() {
        return this.filterMatrix([ 0.625, 0.375, 0, 0, 0,  0.7, 0.3, 0, 0, 0,  0, 0.3, 0.7, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    deuteranomalyCondition: function() {
        return this.filterMatrix([ 0.8, 0.2, 0, 0, 0,  0.258, 0.742, 0, 0, 0,  0, 0.142, 0.858, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    tritanopiaCondition: function() {
        return this.filterMatrix([ 0.95, 0.05, 0, 0, 0,  0, 0.433, 0.567, 0, 0,  0, 0.475, 0.525, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    tritanomalyCondition: function() {
        return this.filterMatrix([ 0.967, 0.033, 0, 0, 0,  0, 0.733, 0.267, 0, 0,  0, 0.183, 0.817, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    achromatopsiaCondition: function() {
        return this.filterMatrix([ 0.299, 0.587, 0.114, 0, 0,  0.299, 0.587, 0.114, 0, 0,  0.299, 0.587, 0.114, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1 ]);
    },

    achromatomalyCondition: function() {
        return this.filterMatrix([ 0.618, 0.320, 0.062, 0, 0,  0.163, 0.775, 0.062, 0, 0,  0.163, 0.320, 0.516, 0, 0, 0, 0, 0, 1, 0, 0, 0 ]);
    }
};
