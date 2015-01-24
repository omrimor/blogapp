(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('SinglePostCtrl', function($scope, $routeParams, $location, dataService){

		// console.log($routeParams.page);
		// console.log($location.search());
		console.log('SinglePostCtrl');

		// Get the data from posts.json
		dataService
			.success(function(data, status){
				$scope.postsData = data.posts;
			})
			.error(function(data, status){
				console.error(status, data);
			});

		$scope.postTitle = $routeParams.title;
		console.log($scope.postTitle);

		$scope.getCurrentPage = function(title){
			return './data/posts/' + title + '.html';
		};


	});

}());

