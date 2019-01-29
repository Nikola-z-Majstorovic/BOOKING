angular.module('ngDatetimePicker', [])
.factory('datetimePickerService', ['$rootScope', 'appService', '$timeout', function ($rootScope, appService, $timeout) {
    var interval = null;
    return {
        test: function () {

        },
        initDateTimePicker: function (scope) {
            scope.format = appService.getAppConf().Culture.DateTimeFormat;

            if ($rootScope.getTimeFormat() == '12h') {
                scope.showAmPm = true;
            }
            else {
                scope.showAmPm = false;
            }
           

            scope.ampms = [
                { name: 'AM/PM', id: '' },
                { name: 'AM', id: 0 },
                { name: 'PM', id: 1 }
            ];
            scope.months = [
                { name: 'Month', id: '', behindFilter: 'z' },
                { name: 'Jan', id: 0, behindFilter: 'Jan01' },
                { name: 'Feb', id: 1, behindFilter: 'Feb02' },
                { name: 'Mar', id: 2, behindFilter: 'Mar03' },
                { name: 'Apr', id: 3, behindFilter: 'Apr04' },
                { name: 'May', id: 4, behindFilter: 'May05' },
                { name: 'Jun', id: 5, behindFilter: 'Jun06' },
                { name: 'Jul', id: 6, behindFilter: 'Jul07' },
                { name: 'Aug', id: 7, behindFilter: 'Aug08' },
                { name: 'Sep', id: 8, behindFilter: 'Sep09' },
                { name: 'Oct', id: 9, behindFilter: 'Oct10' },
                { name: 'Nov', id: 10, behindFilter: 'Nov11' },
                { name: 'Dec', id: 11, behindFilter: 'Dec12' }
            ];
            scope.days = [
                { name: 'Day', id: '' },
                { name: '01', id: 1 },
                { name: '02', id: 2 },
                { name: '03', id: 3 },
                { name: '04', id: 4 },
                { name: '05', id: 5 },
                { name: '06', id: 6 },
                { name: '07', id: 7 },
                { name: '08', id: 8 },
                { name: '09', id: 9 },
                { name: '10', id: 10 },
                { name: '11', id: 11 },
                { name: '12', id: 12 },
                { name: '13', id: 13 },
                { name: '14', id: 14 },
                { name: '15', id: 15 },
                { name: '16', id: 16 },
                { name: '17', id: 17 },
                { name: '18', id: 18 },
                { name: '19', id: 19 },
                { name: '20', id: 20 },
                { name: '21', id: 21 },
                { name: '22', id: 22 },
                { name: '23', id: 23 },
                { name: '24', id: 24 },
                { name: '25', id: 25 },
                { name: '26', id: 26 },
                { name: '27', id: 27 },
                { name: '28', id: 28 },
                { name: '29', id: 29 },
                { name: '30', id: 30 },
                { name: '31', id: 31 }
            ];
            scope.years = [];
            var tmpX = this.getArrayOfNumbersBetween(1920, 2020);
            tmpX = appService.lodashSortBy(tmpX, 'id').reverse();

            scope.years.push({ name: 'Year', id: '' });

            for (var i = 0; i < tmpX.length ; i++) {
                scope.years.push({ name: '' + tmpX[i] + '', id: tmpX[i] });
            }
            if ($rootScope.getTimeFormat() == '12h') {
                scope.hours = [
                    { name: 'Hour', id: '' },
                    { name: '01', id: 01 },
                    { name: '02', id: 02 },
                    { name: '03', id: 03 },
                    { name: '04', id: 04 },
                    { name: '05', id: 05 },
                    { name: '06', id: 06 },
                    { name: '07', id: 07 },
                    { name: '08', id: 08 },
                    { name: '09', id: 09 },
                    { name: '10', id: 10 },
                    { name: '11', id: 11 },
                    { name: '12', id: 12 },
                ];
            } else {
                scope.hours = [
                    { name: 'Hour', id: '' },
                    { name: '00', id: 0 },
                    { name: '01', id: 01 },
                    { name: '02', id: 02 },
                    { name: '03', id: 03 },
                    { name: '04', id: 04 },
                    { name: '05', id: 05 },
                    { name: '06', id: 06 },
                    { name: '07', id: 07 },
                    { name: '08', id: 08 },
                    { name: '09', id: 09 },
                    { name: '10', id: 10 },
                    { name: '11', id: 11 },
                    { name: '12', id: 12 },
                    { name: '13', id: 13 },
                    { name: '14', id: 14 },
                    { name: '15', id: 15 },
                    { name: '16', id: 16 },
                    { name: '17', id: 17 },
                    { name: '18', id: 18 },
                    { name: '19', id: 19 },
                    { name: '20', id: 20 },
                    { name: '21', id: 21 },
                    { name: '22', id: 22 },
                    { name: '23', id: 23 }
                ];
            }

            scope.minutes = [
                { name: 'Minute', id: '' },
                { name: '00', id: 00 },
                { name: '01', id: 01 },
                { name: '02', id: 02 },
                { name: '03', id: 03 },
                { name: '04', id: 04 },
                { name: '05', id: 05 },
                { name: '06', id: 06 },
                { name: '07', id: 07 },
                { name: '08', id: 08 },
                { name: '09', id: 09 },
                { name: '10', id: 10 },
                { name: '11', id: 11 },
                { name: '12', id: 12 },
                { name: '13', id: 13 },
                { name: '14', id: 14 },
                { name: '15', id: 15 },
                { name: '16', id: 16 },
                { name: '17', id: 17 },
                { name: '18', id: 18 },
                { name: '19', id: 19 },
                { name: '20', id: 20 },
                { name: '21', id: 21 },
                { name: '22', id: 22 },
                { name: '23', id: 23 },
                { name: '24', id: 24 },
                { name: '25', id: 25 },
                { name: '26', id: 26 },
                { name: '27', id: 27 },
                { name: '28', id: 28 },
                { name: '29', id: 29 },
                { name: '30', id: 30 },
                { name: '31', id: 31 },
                { name: '32', id: 32 },
                { name: '33', id: 33 },
                { name: '34', id: 34 },
                { name: '35', id: 35 },
                { name: '36', id: 36 },
                { name: '37', id: 37 },
                { name: '38', id: 38 },
                { name: '39', id: 39 },
                { name: '40', id: 40 },
                { name: '41', id: 41 },
                { name: '42', id: 42 },
                { name: '43', id: 43 },
                { name: '44', id: 44 },
                { name: '45', id: 45 },
                { name: '46', id: 46 },
                { name: '47', id: 47 },
                { name: '48', id: 48 },
                { name: '49', id: 49 },
                { name: '50', id: 50 },
                { name: '51', id: 51 },
                { name: '52', id: 52 },
                { name: '53', id: 53 },
                { name: '54', id: 54 },
                { name: '55', id: 55 },
                { name: '56', id: 56 },
                { name: '57', id: 57 },
                { name: '58', id: 58 },
                { name: '59', id: 59 }
            ];
            

            var tmp;
            if (!scope.modelValue) {
                scope.enabled = false;
            }

            if (scope.modelValue) {
                tmp = new Date(scope.modelValue);
                //tmp = moment(scope.modelValue, scope.format).toDate();

                if (!scope.showTime) {
                    tmp.setHours(0, 0, 0, 0);
                }
            }
            else {
                if (scope.enabled) {
                    tmp = new Date();
                    if (!scope.showTime) {
                        tmp.setHours(0, 0, 0, 0);
                    }
                    scope.modelValue = moment(tmp);////////.format(scope.format);
                }
                else {

                }
            }
            if (scope.enabled) {
                this.updateDatePickerSelection(scope);
                this.updateModel(scope);
                
            } else {
                scope.selectedDay = scope.days[0];
                scope.selectedMonth = scope.months[0];
                scope.selectedYear = scope.years[0];

                scope.selectedHour = scope.hours[0];
                scope.selectedMinute = scope.minutes[0];

                scope.selectedAmPm = scope.ampms[0];

                scope.modelValue = null;
            }
            
            
        },
        updateModel: function (scope) {
           
            if (!scope.showTime) {
                if ($rootScope.getTimeFormat() == '12h') {
                    scope.selectedHour = this.findBy(scope.hours, 'id', 12);
                }
                else {
                    scope.selectedHour = this.findBy(scope.hours, 'id', 0);
                }
                scope.selectedMinute = this.findBy(scope.minutes, 'id', 0);
                scope.selectedAmPm = this.findBy(scope.ampms, 'id', 0);
            }
            var h, m;
            
            if (scope.selectedHour != undefined) {
                h = scope.selectedHour.id;
            } else {
                scope.selectedHour = scope.hours[0];
            }
            if (scope.selectedMinute != undefined) {
                m = scope.selectedMinute.id;
            } else {
                scope.selectedMinute = scope.minutes[0];
            }

            if (!scope.showTime) {
                h = '00';
                m = '00';
            }

            var datetime;
            var mnt = 0;

            var isNull = false;

            if (scope.showTime) {
                if (scope.selectedDay == undefined || scope.selectedMonth == undefined || scope.selectedYear == undefined || scope.selectedHour.id == undefined || scope.selectedMinute.id == undefined) {
                    isNull = true;
                    datetime = null;
                }
                else if (scope.selectedDay.id === '' || scope.selectedMonth.id === '' || scope.selectedYear.id === '' || scope.selectedHour.id === '' || scope.selectedMinute.id === '') {
                    isNull = true;
                    datetime = null;
                }
                if ($rootScope.getTimeFormat() == '12h') {
                    if (scope.selectedAmPm.id === '') {
                        isNull = true;
                        datetime = null;
                    }
                }
            }
            else {
                if (scope.selectedDay == undefined || scope.selectedMonth == undefined || scope.selectedYear == undefined) {
                    isNull = true;
                    datetime = null;
                }
                else if (scope.selectedDay.id === '' || scope.selectedMonth.id === '' || scope.selectedYear.id === '') {
                    isNull = true;
                    datetime = null;
                }

                if ($rootScope.getTimeFormat() == '12h') {
                    // 12
                    scope.selectedHour = scope.hours[12];
                    scope.selectedMinute = scope.minutes[0];
                } else {
                    // 00
                    scope.selectedHour = scope.hours[1];
                    scope.selectedMinute = scope.minutes[0];
                }
            }
           
            if (!isNull) {
                if (isNaN(parseInt(scope.selectedMonth.id))) {
                    mnt = 0;
                }
                else {
                    mnt = scope.selectedMonth.id + 1;
                }
                if ($rootScope.getTimeFormat() == '12h') {
                    //var datetime = new Date(mnt + '/' + scope.selectedDay.id + '/' + scope.selectedYear.id + ' ' + h + ':' + m + ':00 ' + scope.selectedAmPm.name);
                    datetime = mnt + '/' + scope.selectedDay.id + '/' + scope.selectedYear.id + ' ' + h + ':' + m + ':00 ' + scope.selectedAmPm.name;
                    //var datetime = moment.utc([scope.selectedYear.id, mnt - 1, scope.selectedDay.id, h, m, 0]).format(scope.format);
                }
                else {
                    //var datetime = new Date(mnt + '/' + scope.selectedDay.id + '/' + scope.selectedYear.id + ' ' + h + ':' + m + ':00');
                    datetime = mnt + '/' + scope.selectedDay.id + '/' + scope.selectedYear.id + ' ' + h + ':' + m + ':00';
                    //var datetime = moment.utc([scope.selectedYear.id, mnt - 1, scope.selectedDay.id, h, m, 0]).format(scope.format);
                }
            }

            scope.modelValue = datetime;//moment(datetime);////////.format(scope.format);

            $timeout(function () {
                scope.onChangeFn();
            }, 0);
                
        },
        getArrayOfNumbersBetween: function (start, end) {
            var list = [];
            for (var i = start; i <= end; i++) {
                list.push(i);
            }
            return list;
        },
        findBy: function (array, propertyName, propertyValue) {
            return _.find(array, [propertyName, propertyValue]);
        },
        updateDatePickerSelection: function (scope) {
            var tmp;
            if (!scope.modelValue) {
                scope.enabled = false;
            }

            if (scope.modelValue) {
                tmp = new Date(scope.modelValue);
                //tmp = moment(scope.modelValue, scope.format).toDate();

                if (!scope.showTime) {
                    tmp.setHours(0, 0, 0, 0);
                }
            }
            else {
                if (scope.enabled) {
                    tmp = new Date();
                    if (!scope.showTime) {
                        tmp.setHours(0, 0, 0, 0);
                    }
                    scope.modelValue = moment(tmp);////////.format(scope.format);
                }
                else {

                }
            }
            if (scope.enabled) {
                scope.selectedDay = this.findBy(scope.days, 'id', tmp.getDate());
                scope.selectedMonth = this.findBy(scope.months, 'id', tmp.getMonth());
                scope.selectedYear = this.findBy(scope.years, 'id', tmp.getFullYear());

                var h = tmp.getHours();

                if ($rootScope.getTimeFormat() == '12h') {
                    if (h >= 12) {
                        h = h - 12;

                    }
                    if (h == 0) {
                        h = 12;
                    }
                }
                scope.selectedHour = this.findBy(scope.hours, 'id', h);
                scope.selectedMinute = this.findBy(scope.minutes, 'id', tmp.getMinutes());

                var am_pm = tmp.getHours() >= 12 ? "PM" : "AM";

                if (am_pm == 'AM') {
                    scope.selectedAmPm = scope.ampms[1];
                }
                else if (am_pm == 'PM') {
                    scope.selectedAmPm = scope.ampms[2];
                }
            }
        }
    }
}])
.directive('datetimePicker', ['$rootScope', '$interval', '$compile', '$parse', '$timeout', '$filter', 'datetimePickerService', 'appService', function ($rootScope, $interval, $compile, $parse, $timeout, $filter, datetimePickerService, appService) {
    return {
        require: ['ngModel', '^form'],
        scope: {
            modelValue: '=ngModel',
            onChangeFn: '&',
            showTime: '@',
            enabled: '@'
        },
        link: function (scope, elem, attr, ngModelCtrl) {

            scope.isClickedBeforeBlur = false;
            if (scope.showTime == 'true') {
                scope.showTime = true;
            } else {
                scope.showTime = false;
            }
            scope.showMonthInput = false;
            scope.showDayInput = false;
            scope.showYearInput = false;
            scope.showHourInput = false;
            scope.showMinuteInput = false;
            scope.showAmPmInput = false;

            scope.showMonthPicker = true;
            scope.showDayPicker = true;
            scope.showYearPicker = true;
            scope.showHourPicker = true;
            scope.showMinutePicker = true;
            scope.showAmPmPicker = true;

            scope.showMonthList = false;
            scope.showDayList = false;
            scope.showYearList = false;
            scope.showHourList = false;
            scope.showMinuteList = false;
            scope.showAmPmList = false;

            scope.searchMonth = '';
            scope.searchDay = '';
            scope.searchYear = '';
            scope.searchHour = '';
            scope.searchMinute = '';
            scope.searchAmPm = '';

            //---------------------------------------------------------------------
            scope.onPickerClick = function (str) {
                if (str == 'month') {
                    scope.showMonthInput = true;
                    scope.showMonthPicker = false;
                    scope.showMonthList = true;
                    scope.searchMonth = '';

                    $timeout(function () {
                        $('[name="month"]').focus();
                    }, 100);
                }
                else if (str == 'day') {
                    scope.showDayInput = true;
                    scope.showDayPicker = false;
                    scope.showDayList = true;
                    scope.searchDay = '';

                    $timeout(function () {
                        $('[name="day"]').focus();
                    }, 100);
                }
                else if (str == 'year') {
                    scope.showYearInput = true;
                    scope.showYearPicker = false;
                    scope.showYearList = true;
                    scope.searchYear = '';

                    $timeout(function () {
                        $('[name="year"]').focus();
                    }, 100);
                }
                else if (str == 'hour') {
                    scope.showHourInput = true;
                    scope.showHourPicker = false;
                    scope.showHourList = true;
                    scope.searchHour = '';

                    $timeout(function () {
                        $('[name="hour"]').focus();
                    }, 100);
                }
                else if (str == 'minute') {
                    scope.showMinuteInput = true;
                    scope.showMinutePicker = false;
                    scope.showMinuteList = true;
                    scope.searchMinute = '';

                    $timeout(function () {
                        $('[name="minute"]').focus();
                    }, 100);
                }
                else if (str == 'ampm') {
                    scope.showAmPmInput = true;
                    scope.showAmPmPicker = false;
                    scope.showAmPmList = true;
                    scope.searchAmPm = '';

                    $timeout(function () {
                        $('[name="ampm"]').focus();
                    }, 100);
                }
            };
            scope.updateOnBlur = function (str) {

                if (str == 'month') {
                    scope.searchResultMonth = $filter('filter')(scope.months, scope.searchMonth);
                    if (scope.searchResultMonth.length == 0) {
                        scope.selectedMonth = datetimePickerService.findBy(scope.months, 'id', scope.months[1].id);
                    }
                    else {
                        if (scope.searchResultMonth.length != scope.months.length) { // something is typed in search box
                            if (scope.searchResultMonth[0].name == scope.months[0].name) {
                                scope.searchResultMonth.splice(0, 1);
                            }
                            scope.selectedMonth = datetimePickerService.findBy(scope.months, 'id', scope.searchResultMonth[0].id);
                        }
                    }
                }
                else if (str == 'day') {
                    scope.searchResultDay = $filter('filter')(scope.days, scope.searchDay);
                    if (scope.searchResultDay.length == 0) {
                        scope.selectedDay = datetimePickerService.findBy(scope.days, 'id', scope.days[0].id);
                    }
                    else {
                        if (scope.searchResultDay.length != scope.days.length) { // something is typed in search box
                            if (scope.searchResultDay[0].name == scope.days[0].name) {
                                scope.searchResultDay.splice(0, 1);
                            }
                            scope.selectedDay = datetimePickerService.findBy(scope.days, 'id', scope.searchResultDay[0].id);
                        }
                    }
                }
                else if (str == 'year') {
                    scope.searchResultYear = $filter('filter')(scope.years, scope.searchYear);
                    if (scope.searchResultYear.length == 0) {
                        scope.selectedYear = datetimePickerService.findBy(scope.years, 'id', scope.years[0].id);
                    }
                    else {
                        if (scope.searchResultYear.length != scope.years.length) { // something is typed in search box
                            if (scope.searchResultYear[0].name == scope.years[0].name) {
                                scope.searchResultYear.splice(0, 1);
                            }
                            scope.selectedYear = datetimePickerService.findBy(scope.years, 'id', scope.searchResultYear[0].id);
                        }
                        
                    }
                }
                else if (str == 'hour') {
                    scope.searchResultHour = $filter('filter')(scope.hours, scope.searchHour);
                    if (scope.searchResultHour.length == 0) {
                        scope.selectedHour = datetimePickerService.findBy(scope.hours, 'id', scope.hours[0].id);
                    }
                    else {
                        if (scope.searchResultHour.length != scope.hours.length) { // something is typed in search box
                            if (scope.searchResultHour[0].name == scope.hours[0].name) {
                                scope.searchResultHour.splice(0, 1);
                            }
                            scope.selectedHour = datetimePickerService.findBy(scope.hours, 'id', scope.searchResultHour[0].id);
                        }
                    }
                }
                else if (str == 'minute') {
                    scope.searchResultMinute = $filter('filter')(scope.minutes, scope.searchMinute);
                    if (scope.searchResultMinute.length == 0) {
                        scope.selectedMinute = datetimePickerService.findBy(scope.minutes, 'id', scope.minutes[0].id);
                    }
                    else {
                        if (scope.searchResultMinute.length != scope.minutes.length) { // something is typed in search box
                            if (scope.searchResultMinute[0].name == scope.minutes[0].name) {
                                scope.searchResultMinute.splice(0, 1);
                            }
                            scope.selectedMinute = datetimePickerService.findBy(scope.minutes, 'id', scope.searchResultMinute[0].id);
                        }
                    }
                }
                else if (str == 'ampm') {
                    scope.searchResultAmPm = $filter('filter')(scope.ampms, scope.searchAmPm);
                    if (scope.searchResultAmPm.length == 0) {
                        scope.selectedAmPm = datetimePickerService.findBy(scope.ampms, 'id', scope.ampms[0].id);
                    }
                    else {
                        if (scope.searchResultAmPm.length != scope.ampms.length) { // something is typed in search box
                            if (scope.searchResultAmPm[0].name == scope.ampms[0].name) {
                                scope.searchResultAmPm.splice(0, 1);
                            }
                            scope.selectedAmPm = datetimePickerService.findBy(scope.ampms, 'id', scope.searchResultAmPm[0].id);
                        }
                    }
                }
                
            };
            scope.onBlur = function (str) {
                var tmpIsClickedBeforeBlur = angular.copy(scope.isClickedBeforeBlur)

                if (scope.isClickedBeforeBlur == true) {
                    scope.isClickedBeforeBlur = false;
                    return;
                }

                if (str == 'month') {
                    scope.showMonthInput = false;
                    scope.showMonthPicker = true;
                    scope.showMonthList = false;
                    if (tmpIsClickedBeforeBlur == false) {
                        scope.updateOnBlur(str);
                    }
                    scope.monthChanged(scope.selectedMonth);
                }
                else if (str == 'day') {
                    scope.showDayInput = false;
                    scope.showDayPicker = true;
                    scope.showDayList = false;
                    if (tmpIsClickedBeforeBlur == false) {
                        scope.updateOnBlur(str);
                    }
                    scope.dayChanged(scope.selectedDay);
                }
                else if (str == 'year') {
                    scope.showYearInput = false;
                    scope.showYearPicker = true;
                    scope.showYearList = false;
                    if (tmpIsClickedBeforeBlur == false) {
                        scope.updateOnBlur(str);
                    }
                    scope.yearChanged(scope.selectedYear);
                }
                else if (str == 'hour') {
                    scope.showHourInput = false;
                    scope.showHourPicker = true;
                    scope.showHourList = false;
                    if (tmpIsClickedBeforeBlur == false) {
                        scope.updateOnBlur(str);
                    }
                    scope.hourChanged(scope.selectedHour);
                }
                else if (str == 'minute') {
                    scope.showMinuteInput = false;
                    scope.showMinutePicker = true;
                    scope.showMinuteList = false;
                    if (tmpIsClickedBeforeBlur == false) {
                        scope.updateOnBlur(str);
                    }
                    scope.minuteChanged(scope.selectedMinute);
                }
                else if (str == 'ampm') {
                    scope.showAmPmInput = false;
                    scope.showAmPmPicker = true;
                    scope.showAmPmList = false;
                    if (tmpIsClickedBeforeBlur == false) {
                        scope.updateOnBlur(str);
                    }
                    scope.ampmChanged(scope.selectedAmPm);
                }
            }
            scope.$watch('enabled', function (val) {
                if (val == 'true') {
                    scope.enabled = true;
                    datetimePickerService.initDateTimePicker(scope);
                    $('.datetimepicker').show();

                } else if (val == 'false') {
                    scope.enabled = false;
                    datetimePickerService.initDateTimePicker(scope);
                    $('.datetimepicker').hide();
                    scope.modelValue = null;
                }
            });

            scope.$watch('modelValue', function (val) {
                //console.log(val);
                if (val == null) {
                    datetimePickerService.initDateTimePicker(scope);
                    scope.modelValue = null;
                }
            });
            
            scope.$watch('showTime', function (val) {
                if (val == 'true' || val == true) {
                    scope.showTime = true;
                    
                }
                else {
                    scope.showTime = false;
                    if ($rootScope.getTimeFormat() == '12h') {
                        scope.selectedHour = datetimePickerService.findBy(scope.hours, 'id', 01);
                    }
                    else {
                        scope.selectedHour = datetimePickerService.findBy(scope.hours, 'id', 0);
                    }
                    scope.selectedMinute = datetimePickerService.findBy(scope.minutes, 'id', 0);
                    scope.selectedAmPm = datetimePickerService.findBy(scope.ampms, 'id', 0);
                }

            });
            //---------------------------------------------------------------------
            scope.listItemClick = function (str, item) {
                scope.isClickedBeforeBlur = true;

                if (str == 'month') {
                    scope.showMonthInput = false;
                    scope.showMonthPicker = true;
                    scope.showMonthList = false;
                    scope.searchMonth = '';
                    scope.selectedMonth = item;
                    scope.monthChanged(item);
                }
                else if (str == 'day') {
                    scope.showDayInput = false;
                    scope.showDayPicker = true;
                    scope.showDayList = false;
                    scope.searchDay = '';
                    scope.selectedDay = item;
                    scope.dayChanged(item);
                }
                else if (str == 'year') {
                    scope.showYearInput = false;
                    scope.showYearPicker = true;
                    scope.showYearList = false;
                    scope.searchYear = '';
                    scope.selectedYear = item;
                    scope.yearChanged(item);
                }
                else if (str == 'hour') {
                    scope.showHourInput = false;
                    scope.showHourPicker = true;
                    scope.showHourList = false;
                    scope.searchHour = '';
                    scope.selectedHour = item;
                    scope.hourChanged(item);
                }
                else if (str == 'minute') {
                    scope.showMinuteInput = false;
                    scope.showMinutePicker = true;
                    scope.showMinuteList = false;
                    scope.searchMinute = '';
                    scope.selectedMinute = item;
                    scope.minuteChanged(item);
                }
                else if (str == 'ampm') {
                    scope.showAmPmInput = false;
                    scope.showAmPmPicker = true;
                    scope.showAmPmList = false;
                    scope.searchAmPm = '';
                    scope.selectedAmPm = item;
                    scope.ampmChanged(item);
                }
            };
            //---------------------------------------------------------------------
            scope.monthChanged = function (value) {
                scope.selectedMonth = datetimePickerService.findBy(scope.months, 'id', value.id);
                datetimePickerService.updateModel(scope);
            };
            scope.dayChanged = function (value) {
                scope.selectedDay = datetimePickerService.findBy(scope.days, 'id', value.id);
                datetimePickerService.updateModel(scope);
            };
            scope.yearChanged = function (value) {
                scope.selectedYear = datetimePickerService.findBy(scope.years, 'id', value.id);
                datetimePickerService.updateModel(scope);
            };
            //---------------------------------------------------------------------
            scope.hourChanged = function (value) {
                scope.selectedHour = datetimePickerService.findBy(scope.hours, 'id', value.id);
                datetimePickerService.updateModel(scope);
            };
            scope.minuteChanged = function (value) {
                scope.selectedMinute = datetimePickerService.findBy(scope.minutes, 'id', value.id);
                datetimePickerService.updateModel(scope);
            };
            //---------------------------------------------------------------------
            scope.ampmChanged = function (value) {
                scope.selectedAmPm = datetimePickerService.findBy(scope.ampms, 'id', value.id);
                datetimePickerService.updateModel(scope);
            };
            //---------------------------------------------------------------------
            //init here
            datetimePickerService.initDateTimePicker(scope);
            //---------------------------------------------------------------------

            scope.$watch('modelValue', function (val) {
                scope.modelValue = val;

                datetimePickerService.updateDatePickerSelection(scope);
                datetimePickerService.updateModel(scope);
            });
        },
        controller: function ($scope) {

        },
        templateUrl: "app/modules/templates/datetimepicker.html"
    }
}]);