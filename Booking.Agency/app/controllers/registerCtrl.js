bookingApp.controller('registerCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', 'tmhDynamicLocale', function ($rootScope, $scope, $timeout, $window, dataService, appService, tmhDynamicLocale) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Register';
    $rootScope.faicon = 'fa-elso-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();

    //-----------------------------------------------------------------------------------------------------------

    $scope.register = function (registeruser) {
        console.log(registeruser);
        dataService.register().exec({}, registeruser).$promise.then(function (res, err) {
            
            var result = res.data;
            console.log(result);
            
        });
    }


    //-----------------------END OF LOGIN STUFF--------------------------------------------------------

}]);

