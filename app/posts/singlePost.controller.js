(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('SinglePostCtrl', ['$scope', '$routeParams', '$location', 'PostList',
		function($scope, $routeParams, $location, PostList){

		// console.log($routeParams.page);
		// console.log($location.search());

		// Get the data from posts.json
		PostList
			.success(function(data, status){
				$scope.postsData = data.posts;
			})
			.error(function(data, status){
				console.error(status, data);
			});

		$scope.postTitle = $routeParams.title;
		// console.log($scope.postTitle);

		$scope.getCurrentPage = function(title){
			return '../data/posts/' + title + '.html';

		};


	}]);

}());

