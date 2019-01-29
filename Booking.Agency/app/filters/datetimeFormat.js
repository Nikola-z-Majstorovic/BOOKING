angular.module('bookingApp')
.filter('datetimeFormat', ['$rootScope', 'appService', function ($rootScope, appService) {
    return function (input, showSeconds, showTime, customFormat) {
        var locale = window.navigator.userLanguage || window.navigator.language;
        if (input != null && input != '0001-01-01T00:00:00Z') {
            var format = appService.getAppConf().Culture.DateTimeFormat;
            var lang = $rootScope.getLocale();
            
            var df = moment().locale(lang).localeData()._longDateFormat['L'];
            var tf = moment().locale(lang).localeData()._longDateFormat['LTS'];
            format = df + ' ' + tf;

            var args;

            if (!showSeconds) {
                //remove seconds from format
                ///format = format.replace(':ss', '');
                tf = moment().locale(lang).localeData()._longDateFormat['LT'];
                format = df + ' ' + tf;
            }
            
            if (customFormat != undefined) {
                format = customFormat;
            }

            if ($rootScope.getTimeFormat() == '') {

            }
            else if ($rootScope.getTimeFormat() == '12h') {
                format = format.replace('HH', 'hh');
                if (!format.endsWith('A')) {
                    format = format + ' A'; // show am/pm
                }
            }
            else if ($rootScope.getTimeFormat() == '24h') {
                if (format.contains('hh:')) {
                    format = format.replace('hh', 'HH');
                } else if (format.contains('h:')) {
                    format = format.replace('h', 'HH');
                }
                //format = format.replace('hh', 'HH');
                if (format.endsWith('A')) {
                    format = format.replace('A', ''); // dont show am/pm
                }
            }

            

            if (showTime != undefined) {
                if (!showTime) {
                    var spl;
                    if (customFormat != undefined) {
                        format = format.replace(' hh:mm A', '');

                        format = format.replace(' A', '');
                    }
                    else {
                        spl = format.split(' ');
                        format = spl[0];
                    }
                }
            }

            args = [format];
            var datetime = new Date(input);
            momentObj = moment(datetime, format);
            var dtStr = momentObj['format'].apply(momentObj, args);
            return dtStr;
        }
        else { return 'Not Entered' }
    };
}]);