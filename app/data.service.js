(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('dataService', function($http){
		var dataObj = {};

		// Get data and populate to an object by id
		var getData = function(id){
			$http.get('data/posts.json')
				.success(function(data, status){
					dataObj[id].data = data.posts;
				})
				.error(function(data, status){
					console.error(status, data);
				});
		};
		var get = function(id){
			if(typeof id === 'undefined'){
				id = 'all';
			}
			// Return previous fetched data
			if (dataObj[id]){
				return dataObj[id];
			}

			// Add id as data objects
			dataObj[id] = {};
			// Fetch data, now will populate the id object
			getData(id);

			return dataObj[id];
		};

		return {
			get: get
		};
			// return $http.get('data/posts.json');
	});

}());

