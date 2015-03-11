(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('AdminCtrl', function($rootScope, $scope, $routeParams, $location, $filter,
					dataService, utils){

		$rootScope.hideSideBar = false;

		dataService.get().then(function (data) {
			var posts;
		    posts = $filter('filterBy')(data.posts);
		    posts = $filter('orderBy')(posts, '-date');
		    $scope.posts = posts;
		});



		// Initialize values for table sorting
		$scope.orderByField = 'date';
		$scope.reverseSort = true;

		// Set the asc/dsc table order
		$scope.setOrderBy = function(value){
			$scope.orderByField = value;
			$scope.reverseSort = !$scope.reverseSort;
		};

		$scope.editPost = function(title){
			$location.path('/admin/edit/post/' + utils.prettyUrl(title));
		};

	});



}());

