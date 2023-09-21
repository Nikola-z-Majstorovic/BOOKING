angular.module('ngModelState', [])
.service('ModelStateErrorsService', ['$rootScope', '$timeout', '$location', function ($rootScope, $timeout, $location) {

}])
.directive('modelStateErrors', ['$rootScope', '$parse', 'ModelStateErrorsService', 'appService', function ($rootScope, $parse, ModelStateErrorsService, appService) {
    return {
        restrict: 'E',
        scope: true,
        controller: function ($rootScope, $scope, $timeout, $location, $routeParams) {

        },
        link: function (scope, elem, attr, ctrl) {

        },
        templateUrl: 'app/modules/templates/modelstateerrors.html'
    };
}]);
