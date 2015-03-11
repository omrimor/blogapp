(function () {
	'use strict';
	var app = angular.module('Blogapp');

	// Custom filter by key in data
	app.filter('filterBy', function ($filter, $location, $routeParams, utils) {

		return function(data){
			var qParams = $location.search();

			// If typing search input
			if(qParams.search){
				return $filter('filter')(data, qParams.search);
			}

			// If filtering by category
			if(qParams.category){
				return $filter('filter')(data, {
					tags: qParams.category
				});
			}

			// If filtering by author
			if(qParams.author){
				return data.filter(function(elm){
					if(qParams.author === utils.prettyUrlToLower(elm.author)){
						return elm;
					}
				});
			}

			// If filtering by month
			if(qParams.month){
				return $filter('filter')(data.filter(function(elm){
					var date = new Date(parseInt(elm.date, 10)),
					    month = date.getMonth(),
					    year = date.getFullYear(),
					    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
					                     'July', 'August', 'September', 'October', 'November', 'December' ];

				    if(qParams.month === utils.prettyUrlToLower(monthNames[month] + '-' + year)){
				    	return elm;
				    }
				},
				{
					month: qParams.month
				}));
			}
			return data;
		};

	});

}());

