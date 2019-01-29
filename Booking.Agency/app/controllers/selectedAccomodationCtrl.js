bookingApp.controller('selectedAccomodationCtrl', ['$rootScope', '$scope', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-home';
    $rootScope.title = 'Home';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------
    dataService.get('Accomodations', null, $routeParams.accomodationId, function (res) {
        $scope.selectedAccomodation = res.data;
    });
    //-----------------------------------------------------------------------------------------------------------
}]);