angular.module('ngBookingGrid', [])
.directive('bookingGrid', ['$rootScope', 'appService', function ($rootScope, appService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        transclude: true,
        replace: true,
        link: function (scope, element, attrs, ctrl) {

        },
        controller: function ($scope, $element, $attrs) {

        },
        templateUrl: "app/modules/templates/grid.html"
    }
}])
.directive('bookingGridRow', ['$rootScope', 'appService', function ($rootScope, appService) {
    return {
        restrict: 'E',
        require: ['^bookingGrid'],
        scope: true,
        transclude: true,
        replace: true,
        templateUrl: "app/modules/templates/row.html",

        link: function (scope, el, attrs, ctrls) {

        },
        controller: function ($scope) {

        }
    }
}]);