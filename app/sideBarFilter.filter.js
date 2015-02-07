(function () {
	'use strict';
	var app = angular.module('Blogapp');

	// Custom filter by key in data
	app.filter('filterBy', function ($filter, $location, utils) {
		return function(data){

			var qParams = $location.search();

			console.log(qParams);

			if(qParams.search){
				return $filter('filter')(data, {
					title: qParams.search,
					author: qParams.search,
					tags: qParams.search
				});
			}

			if(qParams.category){

				console.log(qParams.category);

				console.log($filter('filter')(data, {
					tags: qParams.category
				}));

				return $filter('filter')(data, {
					tags: qParams.category
				});
			}

			if(qParams.author){
				return $filter('filter')(data, {
					author: qParams.author
				});
			}

			if(qParams.month){
				return $filter('filter')(data, {
					date: qParams.month
				});
			}

			return data;

		};

	});

}());

