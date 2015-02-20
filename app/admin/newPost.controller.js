(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('NewPostCtrl', function($rootScope, $scope, $routeParams, $location, $filter,
					dataService, utils, $sanitize){

		$rootScope.hideSideBar = true;
		$scope.generalAlert = false;
		$scope.titleAlert = false;

		$scope.posts = dataService.get().then(function (data) {
			var posts;
		    posts = $filter('filterBy')(data.posts);
		    posts = $filter('orderBy')(posts, '-date');
		    $scope.posts = posts;
		});


		// TODO:
		// The “Delete Post” button should be hidden!

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
			console.log(path);
		};

		$scope.submitNewPost = function(newPost){
			// Make sure the title is unique
			$($scope.posts).each(function(inx, obj){
				if($scope.addNewPost.postTitle.$valid){
					if(obj.title === $scope.newPost.title){
						console.log($scope.newPost.title);
						$scope.generalAlert = false;
						$scope.titleAlert = true;
						$scope.addNewPost.postTitle.$invalid = true;
						$scope.addNewPost.$invalid = true;
					}
				}
			});

			// If form is invalid
			if($scope.addNewPost.$invalid){
				console.log('form is wrong');
				$scope.generalAlert = true;
			}

			// If for is valid
			if($scope.addNewPost.$valid) {
				// Remove the alert message
				$scope.generalAlert = false;

				// Assign date to the newPost
				var dateObj = new Date();
				var newDate = dateObj.getTime();
				newPost.date = newDate;

				// Make the string of tags input into array
				if(newPost.tags){
					var tagsArr = newPost.tags.split(',');
					newPost.tags = tagsArr;
				}

				// Save the newPost into posts array
				$scope.posts = dataService.savePost(newPost).then(function (data) {
					var posts;
					newPost = angular.copy(newPost);
					data.posts.push(newPost);
					posts = data.posts;
					$scope.posts = posts;
				});

				// Redirect back to the admin panel
				$location.path('/admin');
			}
		};


	});


}());

