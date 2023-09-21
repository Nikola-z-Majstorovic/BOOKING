/// <reference path="formattedDate.js" />
bookingApp.directive('rptdone', ['$rootScope', '$timeout', 'appService', function ($rootScope, $timeout, appService) {
    return function (scope, element, attrs) {
        if (scope.$last) {
            appService.refreshScroll(true);
        }
    };
}]);



