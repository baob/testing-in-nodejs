exports = module.exports = {};

exports.parse = function (args, defaults, replacements) {
    var i, j,
        arg,
        arg_assign,
        eq,
        key,
        key_letter,
        value,
        options = {},
        map_keyword = function (keyword, value) {
            if (value !== undefined) {
                options[keyword] = value;
            } else {
                options[keyword] = true;
            }
        },
        map_singles = function (singles, value) {
            for (j = 0; j < singles.length; j++) {
                key_letter = singles[j];
                key = replacements[key_letter];
                if (j === (singles.length - 1)) {
                    map_keyword(key, value);
                } else {
                    map_keyword(key);
                }
            }
        },
        map_integers = function (string) {
            if (/^[0-9]+$/.test(string)) {
                string = parseInt(string, 10);
            }
            return string;
        },
        extract_assignment = function (assignment, map_function) {
            eq = assignment.indexOf('=');
            if (eq !== -1) {
                key = assignment.substr(0, eq);
                value = assignment.substr(eq + 1);
                value = map_integers(value);
                map_function(key, value);
            } else {
                map_function(assignment);
            }
        };

    if (typeof defaults === "object" && !(defaults instanceof Array)) {
        options = defaults;
    }
    for (i in args) {
        arg = args[i];
        if (arg.substr(0, 2) === '--') {
            arg_assign = arg.substr(2);
            extract_assignment(arg_assign, map_keyword);
        } else {
            if (arg.substr(0, 1) === '-') {
                arg_assign = arg.substr(1);
                extract_assignment(arg_assign, map_singles);
            }
        }

    }
    return options;

};
