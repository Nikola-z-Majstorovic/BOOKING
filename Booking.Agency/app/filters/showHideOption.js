angular.module('bookingApp').filter('showHideOption', function () {
    return function (input, model) {

        var arr = _.filter(input, function (item) {
            return item.disabled == false || (item.disabled == true && item.value == model);
        });
        return arr;
    }
});