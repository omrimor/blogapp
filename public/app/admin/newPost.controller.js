(function () {
	'use strict';

	var app = angular.module('Blogapp');

	app.controller('NewPostCtrl', function($rootScope, $scope, $routeParams, $location, $filter,
					dataService, utils, $sanitize){

		$rootScope.hideSideBar = true;
		$scope.generalAlert = false;
		$scope.titleAlert = false;

		$scope.path = $location.path();

		$scope.isEditMode = function(path){
			if(path === '/admin/new/post'){
				return false;
			}
			return true;
		};

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

		$scope.submitNewPost = function(post){

			// Make sure the title is unique
			$($scope.posts).each(function(inx, obj){
				if($scope.addNewPost.postTitle.$valid){
					if(obj.title === $scope.post.title){
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

			// If form is valid
			if($scope.addNewPost.$valid) {
				// Remove the alert message
				$scope.generalAlert = false;

				// Assign date to the newPost
				var date = new Date();
				var newDate = date.getTime();
				post.date = newDate.toString();

				// Make the string of tags input into array
				if(post.tags){
					var tagsArr = post.tags.split(',');
					post.tags = tagsArr;
				}

				dataService.save(post.title, post)
		            .then(function (data) {

		            	// Broadcast the new data to the sideBarCtrl
		            	// to add to the sidebar filters objects
		            	$rootScope.$broadcast('newPostAdded', { data: data });

						// Redirect back to the admin panel
						$location.path('/admin');

	            });

			}
		};

	});


}());

