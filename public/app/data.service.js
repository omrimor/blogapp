(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('dataService', function($http, $q, $log, utils){

		var dataCache = {},
			defer = $q.defer(),
			postsPromise = defer.promise;

		// Fetch data local ///////////////////////////////////////////

		// $http.get('data/posts.json')
		// .success(function (data, status){
		// 	dataCache.posts = data.posts;
		// 	defer.resolve(dataCache);
		// })
		// .error(function (data, status){
		// 	$log.error(status, data);
		// });


		// Node setup ///////////////////////////////////////////

		// Fetch data from the server
		$http.get('/posts')
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

			save: function (title, post) {
				var defer = $q.defer();

			    $http.post('/posts', {
			        title: title,
			        data: post
			    })
		        .success(function (data, status) {
		        	dataCache.posts.push(data);
		            defer.resolve(dataCache);
		        });

			    return defer.promise;
			},

			deletePost: function(title) {
				var defer = $q.defer();

			    $http['delete']('/posts/' + title)
			        .success(function (data, status) {
			        	dataCache.posts.forEach(function(elm, inx){
			        		if(elm.title === data){
			        			dataCache.posts.splice(inx, 1);
					            defer.resolve(dataCache);
			        		}
			        	});
			        	console.log('im dataCache.posts after!! splice',dataCache,dataCache.posts.length);
			        });

			    return defer.promise;
			}

		};
	});

}());

