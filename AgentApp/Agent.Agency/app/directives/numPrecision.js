bookingApp.directive('numPrecision', ['appService', function (appService) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attributes, ngModel) {
			var precision = attributes.numPrecision;

			function setPrecision(value) {
				//var value = ngModel.$modelValue;
                
				//since this is just a mask, don't hide decimal values that
				//go beyond our precision and don't format empty values
				if (value && !isNaN(value) && appService.countDecimalPlaces(value) <= precision) {
					var formatted = Number(value).toFixed(precision);
                    
					ngModel.$viewValue = formatted;
					ngModel.$render();
				}
			}

			element.bind('blur', setPrecision);
			setTimeout(setPrecision, 0); //after initial page render
		}

	};
}])
