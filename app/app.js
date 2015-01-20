(function () {
	'use strict';
	var app = angular.module('Blogapp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				redirectTo: '/posts'
			})
			.when('/posts/:page?',{
				templateUrl: 'app/posts/posts.view.html',
				controller: 'AllPostsCtrl'
			})
			.when('/admin',{
				templateUrl: 'app/admin/admin.html',
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
