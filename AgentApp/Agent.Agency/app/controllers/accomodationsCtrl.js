bookingApp.controller('accomodationsCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, $timeout, $window, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Accomodations';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------

    if ($rootScope.Locations == undefined) {
        $rootScope.changeView('/');
    }

    $scope.selectedLocationId = $routeParams.locationId;
    dataService.getAll('Accomodations', 'getAccomodationsForSelectedLocation', { objId: Number($routeParams.locationId) }, function (res) {
        $scope.Accomodations = res.data;
        $scope.MasterAccomodations = $scope.Accomodations;
    });


    

    $scope.getLocationName = function (locationId) {
        return appService.lodashFindBy($rootScope.Locations, 'Id', Number(locationId));
    }

    $scope.getHBName = function (HBId) {
        return appService.lodashFindBy($rootScope.enumHBType, 'value', Number(HBId));
    }
    
    $scope.getAccomodationType = function (type) {
        return appService.lodashFindBy($rootScope.enumAccomodationType, 'value', type);
    }

    $scope.GetRating = function (ratings) {
        if (ratings.length > 0) {
            var ratingSum = 0;

            for (i = 0; i <= ratings.length - 1; i++) {
                ratingSum = ratingSum + ratings[i].RatingMark;
            }

            return ratingSum / ratings.length;
        } else {
            return 'Not rated yet';
        }
    }

    
}]);

