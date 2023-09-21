bookingApp.controller('registerCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', function ($rootScope, $scope, $timeout, $window, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Register';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();

    //-----------------------------------------------------------------------------------------------------------
    //Register user
    $scope.register = function (registeruser) {
        console.log(registeruser);
        dataService.register().exec({}, registeruser).$promise.then(function (res, err) {
            if (res.status.code == 200) {               
                 $rootScope.changeView('/login');
            }
        });
    }


    //-----------------------END OF LOGIN STUFF--------------------------------------------------------

}]);

