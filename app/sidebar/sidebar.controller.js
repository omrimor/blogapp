(function () {
    'use strict';
    var app = angular.module('Blogapp');

    app.controller('SideBarCtrl', function($scope, $routeParams, $location,
                    dataService, utils, byTypeFilter, sortByYearFilter){

        // Get the data from posts.json
        $scope.postsData = dataService.get(undefined, function(){
            $scope.tags = utils.getDataByType($scope.postsData, 'tags');
        });

        $scope.postsLen = $scope.postsData.length;
        $scope.prettyUrlToLower = utils.prettyUrlToLower;

        setTimeout(function () {
            // $scope.tags = utils.getDataByType($scope.postsData, 'tags');
            console.log($scope.tags);
        }, 2000);





    });

}());

