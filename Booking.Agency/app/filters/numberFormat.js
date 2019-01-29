angular.module('bookingApp').filter('numberFormat', ['$rootScope', 'appService', function ($rootScope, appService) {
    return function (input) {
        var locale = window.navigator.userLanguage || window.navigator.language;
       
        if (input != null && input != '0') {
            return input.toString().replace('.', ',');
        }
        else { return 'N/A' }
    };
}]);