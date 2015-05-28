exports = module.exports = {};

exports.parse = function (args, defaults) {
    var i,
        arg,
        arg_assign,
        eq,
        key,
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
        }

    }
    return options;

};
