module.exports = function (grunt) {

    grunt.initConfig({
        jasmine: {
            pivotal: {
                src: 'code/*.js',
                options: {
                    specs: 'test/tests.js'
                }
            }
        },

        mocha: {
            all: {
                src: ['mocha-tests.html'],
                options: {
                    run: true
                }
            }

        },

        jshint: {
            all: ['test/tests.js', 'test/tests-mocha.js'],
            options: {
                curly: true
            }
        },

        watch: {
            files: ['test/*.js'],
            tasks: ['jshint', 'jasmine', 'mocha']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jasmine', 'mocha']);

};
