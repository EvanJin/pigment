module.exports = {
    match: /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
    tocolor: function(c) {
        var rgb = c.replace(/[rgba()]/g, "").split(",");

        return {
            red: parseInt(rgb[0], 10),
            green: parseInt(rgb[1], 10),
            blue: parseInt(rgb[2], 10),
            alpha: rgb[3] ? parseFloat(rgb[3]) : 1
        };
    },
    fromcolor: function() {
        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    }
};
