(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('AllPostsCtrl', function($scope, $routeParams, $location,
					dataService, utils){

		// console.log($routeParams);
		// console.log($location.search());


		$scope.postsData = dataService.get();
		$scope.prettyUrl = utils.prettyUrl;
		$scope.prettyUrlToLower = utils.prettyUrlToLower;
		$scope.currentPage = parseInt($routeParams.page, 10) || 0;
		$scope.pageSize = 3;
		$scope.home = $location.path().substring(1);
		$scope.searchVal = $routeParams.search;


		// Handle '0' num is url when paging back to first page
		if($routeParams.page === '0'){
			$location.path('/posts');
		}

		// Handle filtering the data array based on url params
		$scope.filterBy = function(arr, inx){
			var filterObj = {},
				isFilter = false;

			// Default - if no params passed
			if($scope.home === 'posts' || $scope.home === 'posts/' + $scope.currentPage){
				isFilter = true;
			}

			// If found params in url
			if($routeParams){
				for (var prop in $routeParams) {
					if($routeParams.hasOwnProperty(prop)){

						if(filterObj[prop] === undefined){
							filterObj[prop] = $routeParams[prop];
						}

						// If category
						if(prop === 'category'){
							for (var a = 0; a < arr.tags.length; a++) {
								var itemTags = arr.tags[a];

								if(filterObj[prop] === $scope.prettyUrlToLower(itemTags)){
									filterObj.tags = itemTags;
									delete filterObj.category;
									// console.log(filterObj);
									isFilter = true;
								}
							}
						}

						// if(prop === 'search'){
						// 	// console.log(arr);
						// 	for (var item in arr) {
						// 		if (arr.hasOwnProperty(item)) {
						// 			var content = arr[item];

						// 			if(item === 'title' || item === 'author' || item === 'description'){
						// 				var cleanContent = $scope.prettyUrlToLower(content);
						// 				if(cleanContent.indexOf(filterObj[prop]) > -1){
						// 					console.log('found match', content);
						// 					console.log(arr, inx);
						// 				}
						// 			}

						// 		}
						// 	}
						// }

						// If author
						if(prop === 'author'){
							if(filterObj[prop] === $scope.prettyUrlToLower(arr[prop])){
								filterObj[prop] = arr[prop];
								// console.log(filterObj);
								isFilter = true;
							}
						}

						// If month
						if(prop === 'month'){
							var date = new Date(parseInt(arr.date, 10)),
							    month = date.getMonth(),
							    year = date.getFullYear(),
							    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
							                     'July', 'August', 'September', 'October', 'November', 'December' ];

						    if(filterObj[prop] === $scope.prettyUrlToLower(monthNames[month] + '-' + year)){
						    	filterObj.date = arr.date;
						    	delete filterObj.month;
						    	isFilter = true;
						    }
						}
					}
				}
			}
			if(isFilter){
				return arr;
			}
			return isFilter;
		};

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

