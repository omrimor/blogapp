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
				controller: 'AllPostsCtrl',
				activetab: 'posts'
			})
			.when('/post/:title?',{
				templateUrl: 'app/posts/singlePost.view.html',
				controller: 'SinglePostCtrl'
			})
			.when('/admin',{
				templateUrl: 'app/admin/admin.html',
				controller: 'LoginCtrl',
				activetab: 'admin'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
}());
