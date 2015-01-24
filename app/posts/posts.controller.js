(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('AllPostsCtrl', function($scope, $routeParams, $location, dataService){

		// console.log($routeParams.page);
		// console.log($location.search());

		// Get the data from posts.json
		// dataService
		// 	.success(function(data, status){
		// 		$scope.postsData = data.posts;
		// 	})
		// 	.error(function(data, status){
		// 		console.error(status, data);
		// 	});


		$scope.postsData = dataService.get();
		console.log($scope.postsData);

		// setTimeout(function () {
		// 	console.log($scope.postsData);
		// }, 1000);

		$scope.currentPage = parseInt($routeParams.page, 10) || 0;
		$scope.pageSize = 3;

		// $scope.total = $scope.postsData.length/$scope.pageSize;
		// console.log($scope.total);
		// console.log($scope.currentPage);

		$scope.replaceStr = function(str){
			return str.replace(/[^a-zA-Z-]/g, '').replace(/\s+/g, '-');
		};

        if ($scope.currentPage === 0){
    	    // $scope.currentPage = null;
			console.log('im zero');
        }

	});


	// StartFrom custom filter
	// app.filter('startFrom', function() {
	//     return function(arr, start) {
	//     	if(arr){
	// 	    	// console.log('im after ' + arr);
	// 	        start++;
	// 	        return arr.slice(start);
	//     	}

	//     };
	// });

}());

