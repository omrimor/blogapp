(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('dataService', ['$http', function($http){

			return $http.get('data/posts.json');


	}]);

}());

