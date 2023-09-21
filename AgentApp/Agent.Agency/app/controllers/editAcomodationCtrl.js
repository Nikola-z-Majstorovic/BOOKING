bookingApp.controller('editAcomodationCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, $timeout, $window, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Accomodation Edit';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------

    if ($rootScope.Locations == undefined) {
        $rootScope.changeView('/');
    }

    $scope.getLocationName = function (locationId) {
        return appService.lodashFindBy($rootScope.Locations, 'Id', Number(locationId));
    }

    $scope.getHBName = function (HBId) {
        return appService.lodashFindBy($rootScope.enumHBType, 'value', Number(HBId));
    }
    
    $scope.getAccomodationType = function (type) {
        return appService.lodashFindBy($rootScope.enumAccomodationType, 'value', type);
    }

  
    dataService.get('Accomodations', $routeParams.accomodationId, function (res) {
        $scope.accomodation = res.data;
        console.log(res.data);
    });

    $scope.saveEditAccomodation = function () {

        dataService.update('Accomodations', null, $scope.accomodation, function (res) {
            $rootScope.changeView('/agentsettings');
            console.log('Accomodation is edited');
       
        });
    }





    
}]);

