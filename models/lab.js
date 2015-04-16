var white = [ 95.047, 100.000, 108.883 ];

module.exports = {
    match: /^l\*?a\*?b\*?\s?\(\s?(\d+\.?\d?)\s?,\s?-?(\d+\.?\d?)?\s?,\s?-?(\d+\.?\d?)?\s?/i,

    depends: [ "xyz" ],

    init: function() {
        var xyz = [];

        for (var i = 0, l = this.xyz.length; i < l; i++) {
            xyz[i] = this.xyz[i] / white[i];
            xyz[i] = (xyz[i] > 0.008856) ? Math.pow(xyz[i], 1 / 3) : ((7.787 * xyz[i]) + (16 / 116));
        }

        this.lab = [
            116 * xyz[1] - 16,
            500 * (xyz[0] - xyz[1]),
            200 * (xyz[1] - xyz[2])
        ];
    },

    frommodel: function(c) {
        var lab, p,
            xyz = [];

        lab = c.replace(/[lab\*()]/g, "").split(",");

        xyz[1] = (parseInt(lab[0], 10) + 16) / 116;
        xyz[0] = (parseInt(lab[1], 10) / 500) + xyz[1];
        xyz[2] = xyz[1] - (parseInt(lab[2], 10) / 200);

        for (var i = 0, l = xyz.length; i < l; i++) {
            p = Math.pow(xyz[i], 3);

            xyz[i] = (p > 0.008856) ? p : ((xyz[i] - 16 / 116 ) / 7.787);
            xyz[i] = Math.round(xyz[i] * white[i]);
        }

        return this.fromxyz(this.toxyz.call({ xyz: xyz }));
    },

    tomodel: function() {
        return "lab(" + this.lab[0] + ", " + this.lab[1] + ", " + this.lab[2] + ")";
    }
};
