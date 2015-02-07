(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('SinglePostCtrl', function($scope, $routeParams, dataService){

		// Get the data from posts.json
		$scope.postTitle = $routeParams.title;

		$scope.post = dataService.get($scope.postTitle).then(function(data){
			$scope.post = data;
		});

	});

}());

