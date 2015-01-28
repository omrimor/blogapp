(function () {
    'use strict';
    var app = angular.module('Blogapp');

    app.controller('SideBarCtrl', function($scope, $routeParams, $location,
                    dataService, utils, byTypeFilter, sortByYearFilter){

        // Get the data from posts.json
        $scope.postsData = dataService.get();

        $scope.postsLen = $scope.postsData.length;
        $scope.prettyUrlToLower = utils.prettyUrlToLower;




    });

}());

