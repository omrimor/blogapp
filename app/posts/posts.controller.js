(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('AllPostsCtrl', ['$scope', '$routeParams', '$location', 'PostList',
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

		$scope.currentPage = parseInt($routeParams.page, 10) || 0;
		$scope.pageSize = 3;
		console.log($scope.currentPage);

		$scope.replaceStr = function(str){
			return str.replace(/[^a-zA-Z-]/g, '').replace(/\s+/g, '-');
		};

		$scope.prevPage = function(){
		    if ($scope.currentPage > 0){
			    $scope.currentPage = $scope.currentPage - 1;
		    }
	        if ($scope.currentPage === 0){
	    	    $scope.currentPage = null;
				console.log('im zero');
	        }
		};

		$scope.nextPage = function(){
		    if ($scope.currentPage < $scope.pageSize - 1){
			    $scope.currentPage = $scope.currentPage + 1;
		    }
		};

	}]);


	// StartFrom custom filter
	app.filter('startFrom', [function() {
	    return function(arr, start) {
	    	if(arr){
		    	// console.log('im after ' + arr);
		        start++;
		        return arr.slice(start);
	    	}

	    };
	}]);

}());

