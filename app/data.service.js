(function () {
	'use strict';
	var app = angular.module('Blogapp');

	app.factory('dataService', function($http, $q, utils){

		// Get data using http and store in var
		var promise = $http.get('data/posts.json')
		    .error(function (data, status) {
		        console.error(status, data);
		    });

		return {
			 get: function(id){
			 	if(id){
			 		return this.getById(id);
			 	}
		        return promise;
			 },

			 getById: function(id){
			 	var defer = $q.defer();

			 	// Varify the data is ready
			 	promise.then(function(data){
			 		var prettyId;
			 		prettyId = utils.prettyUrl(id);

			 		// Filter the data and get only requested post
			 		$.each(data.data.posts, function(inx, post){
			 			if(utils.prettyUrl(post.title) === prettyId){
			 				defer.resolve(post);
			 				return false;
			 			}
			 		});
			 	});

			 	return defer.promise;
			 }
		};

	});

}());

