// A directive to have ui-select open on focus
bookingApp.directive('uiSelectOpenOnFocus', ['$timeout', function ($timeout) {
    return {
        require: 'uiSelect',
        restrict: 'A',
        link: function ($scope, el, attrs, uiSelect) {
            var autoopen = true;

            angular.element(uiSelect.focusser).on('focus', function () {
                //uiSelect.refresh();
                if (autoopen) {
                    uiSelect.activate();
                }
            });

            // Disable the auto open when this select element has been activated.
            $scope.$on('uis:activate', function () {
                autoopen = false;
            });

            // Re-enable the auto open after the select element has been closed
            $scope.$on('uis:close', function () {
                autoopen = false;
                $timeout(function () {
                    autoopen = true;
                }, 100);
            });
        }
    };
}]);