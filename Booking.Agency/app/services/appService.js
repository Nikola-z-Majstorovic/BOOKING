bookingApp.factory('appService', ['$rootScope', '$location', '$timeout', '$window', function ($rootScope, $location, $timeout, $window) {
    return {
        init: function () {
            //-----------------------------------------------------------------------------------------------------
            $rootScope.appService = this;
            //-----------------------------------------------------------------------------------------------------
            $rootScope.loadingMessage = '';
            //-----------------------------------------------------------------------------------------------------
            $rootScope.arrReq = [];
            //-----------------------------------------------------------------------------------------------------
            $rootScope._ = window._;
            //-----------------------------------------------------------------------------------------------------
            $rootScope.loggedUser = {
                UserId: '',
                UserName: '',
            };
            //-----------------------------------------------------------------------------------------------------
            $rootScope.CultureName = moment().locale();
            //-----------------------------------------------------------------------------------------------------
            // section icon/title init
            $rootScope.icon = 'fa-user';
            $rootScope.title = 'Login';
            $rootScope.mode = 'view';
            //-----------------------------------------------------------------------------------------------------
            //#region Enums
            $rootScope.enumAccomodationType = [
              { name: 'Hotel', value: 0 },
              { name: 'Bead & breakfast', value: 1 },
              { name: 'Apartment', value: 2 }
            ];
            $rootScope.enumYesNo = [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 }
            ];
            $rootScope.enumHBType = [
              { name: 'Breakfast', value: 0 },
              { name: 'HB', value: 1 },
              { name: 'Pansion', value: 2 }
            ];
            //-----------------------------------------------------------------------------------------------------
            // Select/Options events
            //-----------------------------------------------------------------------------------------------------
            $rootScope.optionsChange = function (modelName, propertyName) {
                $rootScope[modelName][propertyName] = $rootScope[propertyName].value;
            }
            //-----------------------------------------------------------------------------------------------------
            $rootScope.getUrl = function () {
                return $rootScope.appService.getAppConf().App.Protocol + '' + $rootScope.appService.getAppConf().App.Host + ':' + $rootScope.appService.getAppConf().App.Port + '/' + $rootScope.appService.getAppConf().App.Api;
            };
            //-----------------------------------------------------------------------------------------------------
            $rootScope.replaceGuid = function () {
                if ($rootScope.loggedUser) {
                    if ($rootScope.loggedUser.UserId) {
                        return $rootScope.loggedUser.UserId.replace('0', '9');
                    } else { return ''; }
                } else { return ''; }
            };
            //-----------------------------------------------------------------------------------------------------
            $rootScope.changeView = function (view) {
                $location.path(view);
            };
            //-----------------------------------------------------------------------------------------------------
        },
        //Some lodash functions wrapped up
        lodashRemoveBy: function (array, propertyName, propertyValue) {
            return _.remove(array, [propertyName, propertyValue]);
        },
        lodashFindBy: function (array, propertyName, propertyValue) {
            return _.find(array, [propertyName, propertyValue]);
        },
        lodashFilterBy: function (array, propertyName, propertyValue) {
            return _.filter(array, [propertyName, propertyValue]);
        },
        lodashSortBy: function (array, propertyName) {
            return _.sortBy(array, [propertyName]);
        },
        findBy: function (array, propertyName, propertyValue) {
            if (array) {
                if (array.length != 0) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i][propertyName] === propertyValue) {
                            return array[i];
                        }
                    }
                }
            }
            return null;
        },
        //used when calling backend, transfering headers and data that will be used in sessions and booking grids
        getAppConf: function () {
            var format = '';
            var AppConf = {
                Header: this.getHeader(),
                App: {
                    Protocol: 'http://',
                    Host: $location.host(),
                    Port: $location.port(),
                    Api: 'api'
                },
                Section: {
                    Route: $location.path(),
                    Mode: 'view'
                },
                Grid: {
                    PageCount: 5,
                    ItemsPerPage: 5,
                    SortBy: '',
                    SortDirection: 'Asc'
                },

                User: {
                    UserId: $rootScope.loggedUser.UserId,
                    UserName: $rootScope.loggedUser.UserName,
                    FullName: $rootScope.loggedUser.FullName
                },
                Roles: $rootScope.loggedUser.Roles
            };
            if ($rootScope.loggedUser.UserId != '') {
                AppConf.User.UserId = $rootScope.loggedUser.UserId;
                AppConf.User.UserName = $rootScope.loggedUser.UserName;
                AppConf.User.FullName = $rootScope.loggedUser.FullName;
            }
            return AppConf;
        },
        getHeader: function () {
            if ($rootScope.loggedUser) {
                return {
                    UserId: $rootScope.loggedUser.UserId,
                }
            }
            else {
                return {
                    UserId: '',
                }
            }
        },
        refreshScroll: function (refreshOnly) {
            var that = this;
            $timeout(function () {
                var sclEl = $('.scroller');
                if (sclEl.length != 0) {
                    $(sclEl).scrollTop(0);
                }
            }, 300);
        }

    };
}]);
