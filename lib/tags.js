'use strict';

exports = module.exports = {};

exports.parse = function (args, defaults, replacements) {
    var i, j,
        arg,
        argAssign,
        eq,
        key,
        keyLetter,
        value,
        options = {};

    function mapKeyword(keyword, inValue) {
        options[keyword] = (inValue === undefined) ? true : inValue;
    }

    function mapSingles(singles, inValue) {
        if (replacements === undefined) {
            return;
        }
        for (j = 0; j < singles.length; j++) {
            keyLetter = singles[j];
            key = replacements[keyLetter];
            if (key !== undefined) {
                if (j === (singles.length - 1)) {
                    mapKeyword(key, inValue);
                } else {
                    mapKeyword(key);
                }
            }
        }
    }

    function mapIntegers(string) {
        if (/^[0-9]+$/.test(string)) {
            string = parseInt(string, 10);
        }
        return string;
    }

    function extractAssignment(assignment, mapFunction) {
        eq = assignment.indexOf('=');
        if (eq !== -1) {
            key = assignment.substr(0, eq);
            value = mapIntegers(assignment.substr(eq + 1));
            mapFunction(key, value);
        } else {
            mapFunction(assignment);
        }
    }

    if (typeof defaults === 'object' && !(defaults instanceof Array)) {
        options = defaults;
    }
    for (i in args) {
        if (args.hasOwnProperty(i)) {
            arg = args[i];
            if (arg.substr(0, 2) === '--') {
                argAssign = arg.substr(2);
                extractAssignment(argAssign, mapKeyword);
            } else if (arg.substr(0, 1) === '-') {
                argAssign = arg.substr(1);
                extractAssignment(argAssign, mapSingles);
            }
        }
    }
    return options;

};
