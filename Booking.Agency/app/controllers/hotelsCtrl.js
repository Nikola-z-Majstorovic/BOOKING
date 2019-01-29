bookingApp.controller('hotelsCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', 'tmhDynamicLocale', function ($rootScope, $scope, $timeout, $window, dataService, appService, tmhDynamicLocale) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Hotels';
    $rootScope.faicon = 'fa-elso-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $root.query = "";
    //-----------------------------------------------------------------------------------------------------------
    dataService.get('Accomodations', 'getSelectedAccomodations', 0, function (res) {
        $scope.hotels = res.data;
    });
    //-----------------------END OF LOGIN STUFF--------------------------------------------------------

}]);

