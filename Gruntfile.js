module.exports = function (grunt) {
	'use strict';

	var port = grunt.option('port') || 9001,
		lrPort = grunt.option('lr-port') || 35731,
		hostname = 'localhost',
		baseFolder = '.';

	// Display the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	// Lazy load all Grunt tasks
	require('jit-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		// Trigger relevant tasks when the files they watch has been changed
		// This includes adding/deleting files/folders as well
		watch: {
			// Will try to connect to a LiveReload script
			options: {
				livereload: lrPort
			},
			configs: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js', 'package.json']
			},
			css: {
				files: ['**/**/*.css']
			},
			js: {
				files: ['**/**/*.js']
			},
			lib: {
				files: ['lib/css/**/*.css', 'lib/js/**/*.js']
			},
			index: {
				files: 'index.html'
			}
		},
		// Setup a local server (using Node) with LiveReload enabled
		connect: {
			server: {
				options: {
					port: port,
					base: baseFolder,
					hostname: hostname,
					livereload: lrPort,
					open: true
				}
			}
		}
	});

	// Open local server and watch for file changes
	grunt.registerTask('serve', ['connect', 'watch']);

	// Default task(s).
	grunt.registerTask('default', ['serve']);
};
