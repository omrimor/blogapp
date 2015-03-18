(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('EditPostCtrl', function($rootScope, $scope, $routeParams, $location,
		$filter, $sanitize, $http, dataService, utils){

		$rootScope.hideSideBar = true;

		$scope.postTitle = $routeParams.title;

		var postTitleToServer = utils.prettyUrlToLower($scope.postTitle);

		$scope.post = dataService.get($scope.postTitle).then(function(data){
			$scope.post = data;

			// Get the markdown from the post key
			$http.get($scope.post.mdPath)
			    .success(function (data) {
			        $scope.post.mdSource = data;
			    });
		});


		marked.setOptions({
		  // GitHub Flavored Markdown
		  gfm: true,
		  // GFM tables
		  tables: true,
		  // GFM line breaks
		  breaks: true,
		  // Better lists handling
		  smartLists: true,
		  // Better punctuation handling
		  smartypants: true,
		  // Code blocks language prefix (reset default)
		  langPrefix: '',
		  // Prefix for headings ID's
		  headerPrefix: 'hid-',
		  highlight: false
		});

		$scope.getMarkdown = function(markdown){
			if(markdown === undefined){
				markdown = '';
			}
			var html = marked(markdown);
			return html;
		};


		$scope.isEditMode = function(path){
			if(path === '/admin/new/post'){
				console.log(path);
				return false;
			}
			return true;
		};

		$scope.submitNewPost = function(post){
			// Convert the tags back to string to allow editing
			var tagsStr = post.tags.toString();
			// Then turn back to new array before adding to post object
			var tagsArr = tagsStr.split(',');
			post.tags = tagsArr;

			if($scope.addNewPost.$valid){

				dataService.save(postTitleToServer, post)
		            .then(function (data) {

		            	console.log(data);

						// Redirect back to the admin panel
						$location.path('/admin');
	            });
			}
		};

		$scope.deletePost = function(post){
			dataService.deletePost(post.title)
	            .then(function (data) {
					// Redirect back to the admin panel
					$location.path('/admin');
            });
		};

	});


}());

