exports = module.exports = {};

exports.parse = function (args, defaults, replacements) {
    var i, j,
        arg,
        arg_assign,
        eq,
        key,
        keys,
        value,
        options = {};

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
                if (/^[0-9]+$/.test(value)) {
                    value = parseInt(value, 10);
                }
                options[key] = value;
            } else {
                options[arg_assign] = true;
            }
        } else {
            if (arg.substr(0, 1) === '-') {
                arg_assign = arg.substr(1);
                eq = arg_assign.indexOf('=');
                if (eq !== -1) {
                    keys = arg_assign.substr(0, eq);
                    value = arg_assign.substr(eq + 1);
                    if (/^[0-9]+$/.test(value)) {
                        value = parseInt(value, 10);
                    }
                    for (j = 0; j < keys.length; j++) {
                        key_letter = keys[j];
                        key = replacements[key_letter];
                        if (j === (keys.length - 1) && value !== '') {
                            options[key] = value;
                        } else {
                            options[key] = true;
                        }
                    }

                } else {
                    keys = arg_assign;
                    value = '';
                    for (j = 0; j < keys.length; j++) {
                        key_letter = keys[j];
                        key = replacements[key_letter];
                        if (j === (keys.length - 1) && value !== '') {
                            options[key] = value;
                        } else {
                            options[key] = true;
                        }
                    }

                }
            }
        }

    }
    return options;

};
