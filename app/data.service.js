(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('PostList', ['$http', function($http){

			return $http.get('data/posts.json');


	}]);

}());

