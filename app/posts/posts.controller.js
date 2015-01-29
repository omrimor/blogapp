(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('AllPostsCtrl', function($scope, $routeParams, $location,
					dataService, utils, byTypeFilter, sortByYearFilter){

		// console.log($routeParams);
		// console.log($location.search());

		$scope.postsData = dataService.get();
		$scope.prettyUrl = utils.prettyUrl;






		$scope.currentPage = parseInt($routeParams.page, 10) || 0;
		$scope.pageSize = 3;

		// $scope.filterBy = function(){
		// 	var filterObj = {};
		// 	if($routeParams){
		// 		for (var prop in $routeParams) {
		// 			if($routeParams.hasOwnProperty(prop)){

		// 				if(filterObj[prop] === 'category'){
		// 					filterObj[prop] = 'tags';
		// 				}

		// 				// console.log(prop, $routeParams[prop]);
		// 				if(filterObj[prop] === undefined){
		// 					filterObj[prop] = $routeParams[prop];
		// 				}
		// 			}
		// 		}
		// 	}
		// 	// console.log(filterObj);
		// 	return filterObj;

		// 	// {author: 'Alex Ilyaev'}

		// };

	});


	// StartFrom custom filter
	app.filter('startFrom', function() {
	    return function(arr, start) {
	    	if(arr){
		    	// console.log('im after ' + arr);
		        start++;
		        return arr.slice(start);
	    	}

	    };
	});

}());

