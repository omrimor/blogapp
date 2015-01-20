(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('AllPostsCtrl', ['$scope', '$routeParams', '$location', 'dataService',
		function($scope, $routeParams, $location, dataService){

		// console.log($routeParams.page);
		// console.log($location.search());

		// Get the data from posts.json
		dataService
			.success(function(data, status){
				$scope.postsData = data.posts;
			})
			.error(function(data, status){
				console.error(status, data);
			});

		$scope.currentPage = 0;
		$scope.pageSize = 3;

	}]);

	// StartFrom custom filter
	app.filter('startFrom', [function() {
	    return function(arr, start) {
	    	// Bug: this is where i get the error
	    	console.log('im after ' + arr);

	        start++;
	        return arr.slice(start);
	    };
	}]);

}());

