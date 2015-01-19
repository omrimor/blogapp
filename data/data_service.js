(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('dataService', ['$scope', '$http', function($scope, $http){

		var getPostsData = function(){
			$http.get('/posts.json').
			  success(function(data, status, headers, config) {
			  	return data;
			  });
		};

		  return {
		  	getPostsData: getPostsData
		  };

	}]);

}());

