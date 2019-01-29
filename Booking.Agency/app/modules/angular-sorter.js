angular.module('ngBookingSorter', [])
.directive('bookingSorter', ['$rootScope', 'appService', function ($rootScope, appService) {
    return {
        restrict: 'E',
        scope: {
            sort: '='
        },
        transclude: true,
        replace: true,
        link: function (scope, element, attrs, ctrl) {

            scope.ascDesc = [
                { name: 'Asc', value: 'Asc' },
                { name: 'Desc', value: 'Desc' }
            ];
            scope.sort_Change = function (item) {
                $rootScope.sortBy = item;
            };
            scope.ascDesc_Change = function (item) {
                if (item === 'Asc') {
                    $rootScope.sortDirection = true;
                } else if (item === 'Desc') {
                    $rootScope.sortDirection = false;
                }
            };
        },
        controller: function($scope, $element, $attrs) {
            
        },
        templateUrl: "app/modules/templates/sorter.html"
    }
}]);