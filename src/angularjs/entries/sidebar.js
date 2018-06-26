import angular from 'angular';

export default angular.module('sidebar', ['$scope', function (s) {
    return {
        restrict: 'E',
        templateUrl: './tpl/sidebar.html'
    }
}]);