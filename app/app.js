(function () {
	'use strict';
	var app = angular.module('Blogapp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'all_posts/all_posts.html',
				controller: 'AllPostsCtrl'
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
