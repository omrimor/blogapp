'use strict';

/**
 * Load modules
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Create the initial Users data file
var postsPath = require('./modules/data');

// Init a new Express app instance
var app = express();
// Set the app port (used at the end with `listen`)
app.set('port', process.env.PORT || 3000);

/**
 * Define Middleware handlers
 * These run on every request
 */

// Add extra logging in the console
app.use(logger('dev'));
// Request's body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Define Routes handling
 */

// On root, serve `public/index.html`
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

var prettyUrlToLower = function(str){
	var re = /[\. ,:-]+/g;
	return str.replace(re, '-').toLowerCase();
};


// Handle POST request to save a new user data
app.post('/posts', function (req, res) {
	// console.log(req.method, req.path, req.body);

	var title = req.body.title;
	var newData = req.body.data;

	// Read existing data
	fs.readFile(postsPath, function (err, data) {
		if (err) {
			console.log(err);
			// Tell the client there was an error by sending back `null`
			return res.status(501).send(null);
		}

		// Add the new user to the users data array
		data = JSON.parse(data);
		var posts = data.posts;
		var post;
		var exists = false;

		// Find the spesific post
		// Update its data - go over all the posts
		for (var i = 0; posts.length > i; i++) {
			post = posts[i];

			if(prettyUrlToLower(post.title) === title){

				exists = true;
				// Merge the content
				for (var key in newData) {
					if( newData.hasOwnProperty(key)){
						post[key] = newData[key];
					}
				}
			}
		}

		if(!exists){
			// TODO: Needs to Validate data
			data.posts.push(req.body.data);
		}
		// Write the new data back to the file
		fs.writeFile(postsPath, JSON.stringify(data), function () {
			// Status 201 means "Request fulfilled, and a resource was created"
			res.status(201);
			// Send back the same data we received (best practice)
			res.send(req.body.data);
		});
	});
});

// Handle DELETE request to delete existing post
app['delete']('/posts/:title', function (req, res) {
	console.log(req.method, req.path, req.body);

	// Decode the param title
	var decodeTitle = decodeURI(req.params.title);

	// Read existing data
	fs.readFile(postsPath, function (err, data) {
		if (err) {
			console.log(err);
			// Tell the client there was an error by sending back `null`
			return res.status(501).send(null);
		}

		data = JSON.parse(data);
		var posts = data.posts;

		// Run through posts array
		// Match post title against the req title
		// When match, remove the post from array
		posts.forEach(function(elm, inx){
			if(elm.title === decodeTitle){
				posts.splice(inx, 1);
			}
		});

		// Write the new data back to the file
		fs.writeFile(postsPath, JSON.stringify(data), function () {
			// Status 201 means "Request fulfilled, and a resource was created"
			res.status(201);
			// Send back the same data we received (best practice)
			res.send(req.params.title);
		});
	});
});

// Handle GET request to get all users data
app.get('/posts', function (req, res) {
	// Get all users data
	fs.readFile(postsPath, function (err, data) {
		if (err) {
			console.log(err);
			// Tell the client there was an error by sending back `null`
			return res.status(501).send(null);
		}

		// Send the data back to the client
		res.send(data);
	});
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server at a specific port
app.listen(app.get('port'));

console.log('Listening on: http://localhost:', app.get('port'));
