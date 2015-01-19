(function () {
	'use strict';
	var app = angular.module('Blogapp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'partials/main.html',
				controller: 'MainCtrl'
			})
			.when('/login',{
				templateUrl: 'partials/login.html',
				controller: 'LoginCtrl'
			})
			.when('/employee/:employeeId',{
				templateUrl: 'partials/employee.html',
				controller: 'employeeCtrl'
			})

			.otherwise({
				redirectTo: '/'
			});
	}]);
}());
