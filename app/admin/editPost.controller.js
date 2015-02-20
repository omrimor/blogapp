(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('EditPostCtrl', function($scope, $routeParams, $location, $filter,
					dataService, utils){

		$scope.posts = dataService.get().then(function (data) {
			var posts;
		    posts = $filter('filterBy')(data.posts);
		    posts = $filter('orderBy')(posts, '-date');
		    $scope.posts = posts;
		});

	});


}());

