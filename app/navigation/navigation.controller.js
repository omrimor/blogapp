(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('NavController', ['$scope', '$location', '$route',
					function($scope, $location, $route){


	    $scope.$route = $route;


	}]);

}());
