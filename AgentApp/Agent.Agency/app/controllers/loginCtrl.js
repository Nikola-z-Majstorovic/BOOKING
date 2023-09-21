bookingApp.controller('loginCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', function ($rootScope, $scope, $timeout, $window, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Login';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    //-----------------------------------------------------------------------------------------------------------
    $scope.login = function (loginuser) {
        //Logins user and creates session
        dataService.login().exec({}, loginuser).$promise.then(function (res, err) {
            //dont login user if there is some issue like with the role for example
            if (res.status.message != 'Access Denied') {
                if (res.status.code == 200) {
                    //Everything is ok, login and redirect to home page
                    $rootScope.loggedUser = res.data;
                    console.log($rootScope.loggedUser);
                    //Save roles here
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

