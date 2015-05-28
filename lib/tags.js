exports = module.exports = {};

exports.parse = function (args, defaults, replacements) {
    var i, j,
        arg,
        arg_assign,
        eq,
        key,
        keys,
        key_letter,
        value,
        options = {},
        map_singles = function (singles, value) {
            for (j = 0; j < singles.length; j++) {
                key_letter = singles[j];
                key = replacements[key_letter];
                if (j === (singles.length - 1) && value !== undefined) {
                    options[key] = value;
                } else {
                    options[key] = true;
                }
            }
        },
        map_keyword = function (keyword, value) {
              if (value !== undefined) {
                  options[keyword] = value;
              } else {
                  options[keyword] = true;
              }
        },
        map_integers = function (string) {
            if (/^[0-9]+$/.test(string)) {
                string = parseInt(string, 10);
            }
            return string;
        }

    if (typeof defaults === "object" && !(defaults instanceof Array)) {
        options = defaults;
    }
    for (i in args) {
        arg = args[i];
        if (arg.substr(0, 2) === '--') {
            arg_assign = arg.substr(2);
            eq = arg_assign.indexOf('=');
            if (eq !== -1) {
                key = arg_assign.substr(0, eq);
                value = arg_assign.substr(eq + 1);
                value = map_integers(value);
                map_keyword(key, value);
            } else {
                map_keyword(arg_assign);
            }
        } else {
            if (arg.substr(0, 1) === '-') {
                arg_assign = arg.substr(1);
                eq = arg_assign.indexOf('=');
                if (eq !== -1) {
                    keys = arg_assign.substr(0, eq);
                    value = arg_assign.substr(eq + 1);
                    value = map_integers(value);
                    map_singles(keys, value);
                } else {
                    map_singles(arg_assign);
                }
            }
        }

    }
    return options;

};
