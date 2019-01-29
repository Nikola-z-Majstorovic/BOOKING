angular.module('ngSectionHeader', [])
.service('SectionHeader', ['$rootScope', '$timeout', '$location', function ($rootScope, $timeout, $location) {

}])
.directive('sectionHeader', ['$rootScope', '$parse', 'SectionHeader', 'appService', function ($rootScope, $parse, SectionHeader, appService) {
    return {
        restrict: 'E',
        scope: true,
        controller: function ($rootScope, $scope, $timeout, $location, $routeParams) {
            $scope.lodashFindBy = function (array, propertyName, propertyValue) {
                return appService.lodashFindBy(array, propertyName, propertyValue);
            }
        },
        link: function (scope, elem, attr, ctrl) {
            
        },
        templateUrl: 'app/modules/templates/sectionheader.html'
    };
}]);
