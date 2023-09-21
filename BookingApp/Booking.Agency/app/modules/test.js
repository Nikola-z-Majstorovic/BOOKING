angular.module('test')
.config(['$httpProvider', function ($httpProvider) {

    // ISO 8601 Date Pattern: YYYY-mm-ddThh:MM:ss
    var dateMatchPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    var convertDates = function (obj) {
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;

            var value = obj[key];
            var typeofValue = typeof (value);

            if (typeofValue === 'object') {
                // If it is an object, check within the object for dates.
                convertDates(value);
            } else if (typeofValue === 'string') {
                if (dateMatchPattern.test(value)) {
                    obj[key] = new Date(value);
                }
            }
        }
    }

    $httpProvider.defaults.transformResponse.push(function (data) {
        if (typeof (data) === 'object') {
            convertDates(data);
        }

        return data;
    });
}])