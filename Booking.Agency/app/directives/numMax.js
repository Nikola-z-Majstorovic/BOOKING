bookingApp.directive('numMax', ['appService', function (appService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {

            function maximum(value) {
                
                if (!isNaN(value)) {
                    
                    var validity = Number(value) <= attributes.numMax;
                    ngModel.$setValidity('max-value', validity);
                }

                return value;
            }

            ngModel.$parsers.push(maximum);
            ngModel.$formatters.push(maximum);
        }

    };
}])