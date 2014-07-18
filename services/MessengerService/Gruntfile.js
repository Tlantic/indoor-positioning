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
        }

    });

    //Load NPM task
    grunt.loadNpmTasks('grunt-shell');


    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);


    //Test task.
    grunt.registerTask('build', ['shell']);
};