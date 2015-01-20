(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('NavController', ['$scope', '$location', function($scope, $location){

		$scope.isActive = function (viewLocation) {
		        return viewLocation === $location.path();
		    };

	}]);

}());
