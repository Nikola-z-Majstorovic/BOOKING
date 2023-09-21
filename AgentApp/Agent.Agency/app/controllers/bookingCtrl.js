bookingApp.controller('bookingCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', function ($rootScope, $scope, $timeout, $window, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Booking';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------
    //Returns all locations with accomodations
    dataService.getAll('Locations', null, null, function (res) {
        $rootScope.Locations = res.data;
        console.log($scope.Locations);
    });

}]);

