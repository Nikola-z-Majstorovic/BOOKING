bookingApp.directive('customFileInput', ['appService', function (appService) {
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var fileInput = element[0].querySelector('input[type=file]');

            fileInput.addEventListener('change', handleFileInput);

            scope.$on('$destroy', function () {
                fileInput.removeEventListener('change', handleFileInput);
            });

            function handleFileInput(evt) {
                if (!this.files || !this.files[0]) { return; }

                var loadedFile = this.files[0];

                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(loadedFile);
                });

            }

        }
    };
}])