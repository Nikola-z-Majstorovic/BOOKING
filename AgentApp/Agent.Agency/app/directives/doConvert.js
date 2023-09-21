bookingApp.directive('doConvert', ['$rootScope', '$timeout', 'appService', '$parse', function ($rootScope, $timeout, appService, $parse) {
    return {
        require: ['^form', 'ngModel'],
        link: function (scope, element, attrs, ctrls) {
            scope.conversionType = attrs['doConvert'];

            ctrls[1].$parsers.push(function (data) {
                //convert data from view format to model format
                var isUs = appService.IsUs();

                var dec = parseFloat(data);
                if (data != null && data != undefined && data != "") {
                    return Number(data);
                } else {
                    return data;
                }
            });

            ctrls[1].$formatters.push(function (data) {
                //convert data from model format to view format
                var isUs = appService.IsUs();

                var ret = null;

                if (data != null && data != undefined) {
                     ret = Number(appService.DoConvert(data, scope.conversionType));
                }

                ctrls[1].$setViewValue(ret);
                ctrls[1].$render();

                $timeout(function () {
                    //any code in here will automatically have an apply run afterwards
                    ctrls[0][attrs.id].$validate();
                });
                
                
                return ret;
            });
        }
    }
}]);