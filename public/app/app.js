(function () {
	'use strict';
	var app = angular.module('Blogapp', ['ngRoute', 'ngSanitize']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				redirectTo: '/posts'
			})
			.when('/posts/:page?',{
				templateUrl: 'app/posts/posts.view.html',
				controller: 'PostsCtrl',
				activetab: 'posts'
			})
			.when('/post/:title?',{
				templateUrl: 'app/posts/singlePost.view.html',
				controller: 'SinglePostCtrl',
				activetab: 'posts'
			})
			.when('/admin',{
				templateUrl: 'app/admin/admin.view.html',
				controller: 'AdminCtrl',
				activetab: 'admin'
			})
			.when('/admin/edit/post/:title',{
				templateUrl: 'app/admin/edit.view.html',
				controller: 'EditPostCtrl',
				activetab: 'admin'
			})
			.when('/admin/new/post',{
				templateUrl: 'app/admin/edit.view.html',
				controller: 'NewPostCtrl',
				activetab: 'admin'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
}());
