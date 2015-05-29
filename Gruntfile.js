module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        complexity: {
            generic: {
                src: ['lib/**/*.js', 'test/**/*.js'],
                exclude: ['doNotTest.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'report.xml',         // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    pmdXML: 'pmd.xml',               // create pmd report
                    errorsOnly: false,               // show only maintainability errors
                    cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                    halstead: [8, 13, 20],           // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: false,     // only display maintainability
                    broadcast: false                 // broadcast data over event-bus
                }
            }
        }



    });

    grunt.loadNpmTasks('grunt-complexity');
    grunt.registerTask('default', 'complexity');

};
