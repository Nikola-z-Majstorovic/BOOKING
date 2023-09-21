bookingApp.controller('selfReservationCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, $timeout, $window, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Reservation';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------

}]);

