angular.module('bookingApp').filter('yesNo', function () {
    return function (input) {
        if (input != undefined) {
            if (input == true) {
                return 'Yes';
            } else {
                return 'No';
            }
        }
        else {
            return 'N/A'
        }
    }
});