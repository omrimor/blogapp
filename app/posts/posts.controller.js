(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('PostsCtrl', function($scope, $routeParams, $location, $filter,
					dataService, utils){

		$scope.posts = dataService.get().then(function (data) {
			var posts;
		    posts = $filter('filterBy')(data.data.posts);
		    posts = $filter('orderBy')(posts, '-date');
		    $scope.posts = posts;
		});

		$scope.prettyUrl = utils.prettyUrl;
		$scope.prettyUrlToLower = utils.prettyUrlToLower;
		$scope.currentPage = parseInt($routeParams.page, 10) || 1;
		$scope.limit = 3;
		$scope.qParams = $location.url();

		$scope.getParams =  function(url){
		    var splitArrr = url.split('?');
		    var filterParams = '?' + splitArrr[1];

		    if(filterParams !== '?' + undefined){
			    return filterParams;
		    }
		};

		// Handle '1' num is url when paging back to first page
		if($routeParams.page === '1'){
			$location.path('/posts');
		}
	});


	// StartFrom custom filter
	app.filter('postsLimit', function() {
	    return function(data, limit, currentPage) {
	    	if(!data || !angular.isArray(data)){
	    		return data;
	    	}
	    	// Get start & end index
    		var end = currentPage * limit;
    		var start = end - limit;

	        return data.slice(start, end);

	    };
	});

}());

