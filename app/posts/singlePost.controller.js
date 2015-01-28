(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('SinglePostCtrl', function($scope, $routeParams, $location, dataService, utils){

		// console.log($routeParams.page);
		// console.log($location.search());

		// Get the data from posts.json
		$scope.postTitle = $routeParams.title;
		$scope.singlePostData = dataService.get($scope.postTitle);

	});

}());

