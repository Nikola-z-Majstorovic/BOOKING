bookingApp.directive('numMin', ['appService', function (appService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {

            function minimum(value) {

                if (!isNaN(value)) {
                    var validity = Number(value) >= attributes.numMin;
                    ngModel.$setValidity('min-value', validity)
                }

                return value;
            }

            ngModel.$parsers.push(minimum);
            ngModel.$formatters.push(minimum);
        }

    };
}])