bookingApp.directive('numMaxPrecision', ['appService', function (appService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {

            function maxPrecision(value) {

                if (!isNaN(value)) {
                    var validity = appService.countDecimalPlaces(value) <= attributes.numMaxPrecision;
                    ngModel.$setValidity('max-precision', validity);
                }

                return value;
            }

            ngModel.$parsers.push(maxPrecision);
            ngModel.$formatters.push(maxPrecision);
        }

    };
}])
