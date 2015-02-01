(function () {
    'use strict';
    var app = angular.module('Blogapp');

    app.controller('SideBarCtrl', function($scope, $routeParams, $location,
                    dataService, utils, byTypeFilter, sortByYearFilter){

        // Get the data from posts.json, pass a callback function to get
        // the custom arrays for the sidebar
        $scope.postsData = dataService.get(undefined, function(){
            $scope.tags = utils.getDataByType($scope.postsData, 'tags');
            $scope.authors = utils.getDataByType($scope.postsData, 'author');
            $scope.dates = utils.getDataByType($scope.postsData, 'date');
            $scope.orderDates = utils.getDataByYear($scope.dates);
        });

        $scope.postsLen = $scope.postsData.length;
        $scope.prettyUrlToLower = utils.prettyUrlToLower;

        $scope.submitSearch = function() {
              $scope.submitValue = $scope.search;
              // console.log($scope.submitValue);
              $location.path('/posts').search('search', $scope.submitValue);
          };


        // Handle adding active class to current selected
        $scope.isActive = function(name){
            $scope.currentPath = $location.path().substring(1);

            $scope.currentFilter = $routeParams.category || $routeParams.author ||
            $routeParams.month || $scope.currentPath;

            if($scope.currentPath.length > 5){
                var splitArrr = $scope.currentFilter.split('/');
                $scope.currentFilter = splitArrr[0];
            }

            if($scope.currentFilter === $routeParams.month){
                var splitArr = $scope.currentFilter.split('-');
                $scope.currentFilter = splitArr[0];
            }
            return $scope.prettyUrlToLower(name) === $scope.currentFilter ? 'active' : '';
        };

    });

}());

