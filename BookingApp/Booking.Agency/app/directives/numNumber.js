bookingApp.directive('numNumber', ['appService', function (appService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {

            function validateNumber(value) {

                //fix for decimal separator
                if (value != null && value != 0) {
                    if (value != '') {
                        var xxx = value.toString().replace(',', '.');
                        value = parseFloat(xxx);
                    }
                    if (value != '') {
                        var validity = !isNaN(value);
                        ngModel.$setValidity('number', validity)
                        return Number(value);
                    } else {
                        ngModel.$setValidity('number', true)
                        return Number(value);
                    }

                } else {
                    ngModel.$setValidity('number', true)
                    return value;
                }
            }

            ngModel.$parsers.push(validateNumber);
            ngModel.$formatters.push(validateNumber);
        }

    };
}])