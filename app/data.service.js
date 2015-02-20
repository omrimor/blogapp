(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('dataService', function($http, $q, $log, utils){

		var dataCache = {},
			defer = $q.defer(),
			postsPromise = defer.promise;

		// Fetch data
		$http.get('data/posts.json')
		.success(function (data, status){
			dataCache.posts = data.posts;
			defer.resolve(dataCache);
		})
		.error(function (data, status){
			$log.error(status, data);
		});

		// Public API
		return {
			get: function (id){
				if(id){
					return this.getById(id);
				}
				return postsPromise;
			},
			getById: function (id){
				var defer = $q.defer();

			 	// Varify the data is ready, even if the data is already fetched
				postsPromise.then(function (data){
					// Compare the same title
					var prettyId = utils.prettyUrl(id);

					// Filter the data to the relevant post
					$.each(data.posts, function (inx, post){
						if(utils.prettyUrl(post.title) === prettyId){
							defer.resolve(post);

							// Stop the loop
							return false;
						}
					});
				});

				return defer.promise;
			},
			savePost: function(newPost){
				if(newPost){
					return postsPromise;
				}
			}
		};
	});

}());

