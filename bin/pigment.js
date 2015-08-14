#!/usr/bin/env node

"use strict";

var pack = require("../package.json"),
    Color = require("../full");

// First argument should be the color string
var color = process.argv[2],
    args = process.argv.slice(3),
    items;

function isArg(val) {
    return /^--.+$/.test(val);
}

function isNumber(val) {
    return /^(\d+|(\d*\.\d+))+$/.test(val);
}

function parseArgs(rest) {
    var ops = [],
        curr, prev, next;

    // Create a list of operations to do on the color
    for (var i = 0, l = rest.length; i < l; i++) {
        curr = rest[i];
        prev = rest[i - 1];
        next = rest[i + 1];

        if (isArg(curr)) {
            ops.push({
                fn: curr.replace(/^--/, ""),
                params: next && !isArg(next) ? [ isNumber(next) ? parseFloat(next, 10) : next ] : []
            });
        } else if (!isArg(prev) && ops.length) {
            ops[ops.length - 1].params.push(isNumber(curr) ? parseFloat(curr, 10) : curr);
        }

        if (ops.length) {
            ops[ops.length - 1].index = i;
        }
    }

    return ops;
}

function processColor(c, rest) {
    // Run the color operations
    parseArgs(rest).forEach(function(op) {
        if (Array.isArray(c)) {
            c = c.map(function(co) {
                return processColor(co, rest.slice(op.index - 1));
            });

            return;
        }

        if (typeof c === "string") {
            // Try to create a new color object
            try {
                c = new Color(c);
            } catch(e) {
                process.stderr.write(e.message + "\n");
                process.exit(1);
            }
        }

        if (typeof c[op.fn] === "function") {
            c = c[op.fn].apply(c, op.params);
        } else {
            process.stderr.write("Invalid opteration --" + op.fn + "!\n");
            process.exit(1);
        }
    });

    return c;
}

if (!color) {
    process.stderr.write("No color specified!\n");
    process.exit(1);
}

if (color.indexOf("-") === 0) {
    switch (color) {
    case "-h":
    case "--help":
        process.stdout.write(pack.description + ".\n\n");
        process.stdout.write("Usage: pigment [COLOR]... [OPTIONS]...\n\n");
        process.stdout.write("e.g. - pigment '#f06860' --rotate 45 --mix '#e9f060' .5 --lighten .3 --tohex\n\n");
        process.stdout.write("Refer the API documentation for all available options.\n");
        process.stdout.write("http://npmjs.com/package/pigment\n");
        break;
    case "-v":
    case "--version":
        process.stdout.write(pack.version + "\n");
        break;
    case "-r":
    case "--random":
        color = Color.random().torgba();
        break;
    case "-p":
    case "--parse":
        if (args.length === 0) {
            process.stderr.write("Nothing to parse!\n");
            process.exit(1);
        }

        items = Color.parse(args.join(" "));

        if (items.length === 0) {
            process.stderr.write("No colors found in text!\n");
            process.exit(1);
        }

        break;
    default:
        process.stdout.write("Invalid parameters passed. See '--help' for usage.\n");
        process.exit(1);
    }
}

color = items && items.length ? items : processColor(color, args);

if (Array.isArray(color)) {
    color = color.map(function(c) {
        return typeof c === "string" ? c : c.torgba();
    }).join(", ");
} else {
    if (typeof color !== "string") {
        color = color.torgba();
    }
}

process.stdout.write(color + "\n");

process.exit(0);
