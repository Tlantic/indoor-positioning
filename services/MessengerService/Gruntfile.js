'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: { // Task
            listFolders: { // Target
                options: { // Options
                    stderr: false
                },
                command: 'ls'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        }

    });

    //Load NPM task
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);


    //Test task.
    grunt.registerTask('build', ['jshint:all']);
};