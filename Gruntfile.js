module.exports = function (grunt) {
	'use strict';

	var port = grunt.option('port') || 9001;

	// Display the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	// Lazy load all Grunt tasks
	require('jit-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Find available port in range
		portPick: {
			options: {
				limit: 20
			},
			localServer: {
				options: {
					port: port
				},
				targets: [
					'nodemon.options.env.PORT'
				]
			}
		},
		nodemon: {
			options: {
				env: {
					PORT: port,
					cwd: __dirname
				}
			},
			dev: {
				script: 'server.js'
			}
		}
	});

	// Run Nodemon to load a server file along with watch for public files
	grunt.registerTask('serve', ['portPick', 'nodemon']);

	// Default task(s).
	grunt.registerTask('default', ['serve']);
};

