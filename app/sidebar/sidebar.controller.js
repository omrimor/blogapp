(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.controller('SideBarCtrl', ['$scope', '$routeParams', '$location', 'PostList',
		function($scope, $routeParams, $location, PostList){

		// Get the data from posts.json
		PostList
			.success(function(data, status){
				$scope.postsData = data.posts;
				$scope.postsLen = $scope.postsData.length;

				// Helper function to get name & number from given key in data
				var getNameAndNum = function(type){
					var obj = {},
						result = [];

					$scope.postsData.forEach(function(item){
						// Check if item is typeOf Array
						if(Array.isArray(item[type])){
							for (var i = 0; i < item[type].length; i++) {
								if(obj[item[type][i]] === undefined){
									obj[item[type][i]] = 1;
								}
								else{
									obj[item[type][i]]++;
								}
							}
						}
						else {
							if(obj[item[type]] === undefined){
								obj[item[type]] = 1;
							}
							else{
								obj[item[type]]++;
							}
						}
					});

					// Push the new created keys and values of obj to result array
					for(var prop in obj){
					  if(obj.hasOwnProperty(prop)){
						result.push({name: prop, num: obj[prop]});
					  }
					}
					return result;
				};

				$scope.tagsNameAndNum = getNameAndNum('tags');
				$scope.authorNameAndNum = getNameAndNum('author');
				$scope.dateNameAndNum = getNameAndNum('date');
			})

			.error(function(data, status){
				console.error(status, data);
			});



	}]);

}());

