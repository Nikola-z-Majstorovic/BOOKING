bookingApp.controller('homeCtrl', ['$rootScope', '$scope', 'dataService', 'appService', function ($rootScope, $scope, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-home';
    $rootScope.title = 'Home';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------
  
    //-----------------------------------------------------------------------------------------------------------


    //Load all locations
    dataService.getAll('Locations', null, null, function (res) {
        $rootScope.Locations = res.data;
        console.log($scope.Locations);
    });

    dataService.getAll('Users', null, null, function (res) {
        $rootScope.allUsers = res.data;
    });
}]);