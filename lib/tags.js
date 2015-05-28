exports = module.exports = {};

exports.parse = function (args) {
    var i,
        arg,
        arg_assign,
        eq,
        key,
        value,
        options = {};

    for (i in args) {
        arg = args[i];
        if (arg.substr(0, 2) === '--') {
            arg_assign = arg.substr(2);
            eq = arg_assign.indexOf('=');
            key = arg_assign.substr(0, eq);
            value = arg_assign.substr(eq + 1);
            if (/^[0-9]+$/.test(value)) {
                value = parseInt(value, 10);
            }
            options[key] = value;
        }

    }
    return options;

};
