bookingApp.controller('loginCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', 'tmhDynamicLocale', function ($rootScope, $scope, $timeout, $window, dataService, appService, tmhDynamicLocale) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Login';
    $rootScope.faicon = 'fa-elso-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();

    //-----------------------------------------------------------------------------------------------------------
    $scope.login = function (loginuser) {
        
        dataService.login().exec({}, loginuser).$promise.then(function (res, err) {
            if (res.status.message != 'Access Denied') {
               if (res.status.code == 200) {
                    $rootScope.loggedUser = res.data;
                    console.log($rootScope.loggedUser);
                    $rootScope.Roles = res.data.Roles;

                    moment.locale('en');

                    $rootScope.changeView('/');
                }
                else {
                    $rootScope.status = res.status;
                }
            } else {
                $rootScope.status = res.status;
            }
        });
    };
    //-----------------------END OF LOGIN STUFF--------------------------------------------------------

}]);

