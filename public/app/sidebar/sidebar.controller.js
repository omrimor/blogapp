(function () {
    'use strict';
    var app = angular.module('Blogapp');

    app.controller('SideBarCtrl', function($scope, $routeParams, $location, $filter,
                    dataService, utils){

        dataService.get().then(function (data) {
            $scope.posts = data.posts;
            $scope.tags = utils.getDataByType($scope.posts, 'tags');
            $scope.authors = utils.getDataByType($scope.posts, 'author');
            $scope.dates = utils.getDataByType($scope.posts, 'date');
            $scope.orderDates = utils.getDataByYear($scope.dates);

            $scope.postsLen = $scope.posts.length;
        });

        // Recieve the broadcast from the newPostCtrl
        // update the sidebar objects with the new data
        $scope.$on('newPostAdded', function(event, args) {
            var posts = args.data.posts;

            $scope.tags = utils.getDataByType(posts, 'tags');
            $scope.authors = utils.getDataByType($scope.posts, 'author');
            $scope.dates = utils.getDataByType($scope.posts, 'date');
            $scope.orderDates = utils.getDataByYear($scope.dates);
        });

        $scope.prettyUrlToLower = utils.prettyUrlToLower;

        $scope.search = function (query) {
              $location.search('');
              $location.search('search', query);
        };

        // Handle adding active class to current selected
        $scope.isActive = function(name){
            $scope.currentPath = $location.path().substring(1);

            $scope.currentFilter = $routeParams.category || $routeParams.author ||
            $routeParams.month || $routeParams.search || $scope.currentPath;

            // Remove active class if showing search results
            if($routeParams.search){
                return false;
            }

            if($scope.currentPath.length > 5){
                var splitArrr = $scope.currentFilter.split('/');
                $scope.currentFilter = splitArrr[0];

            }

            if($scope.currentFilter === $routeParams.month){
                var splitArr = $scope.currentFilter.split('-');
                $scope.currentFilter = splitArr[0];
            }

            // In the first run , angular throws an undefined of the name
            if(name === undefined){
                name = $scope.currentPath;
            }
            return $scope.prettyUrlToLower(name) === $scope.currentFilter ? 'active' : '';
        };

    });

}());

