angular.module('bookingApp')
    .service('UnitConverter', ['$rootScope', '$timeout', 'appService', function ($rootScope, $timeout, appService) {

    }])
    .filter('unitConvert', ['$rootScope', 'UnitConverter', 'appService', function ($rootScope, UnitConverter, appService) {
        return function (input, conversionType) {
            return appService.DoConvert(input, conversionType);
    }
}]);