bookingApp.controller('agentSettingsCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', function ($rootScope, $scope, $timeout, $window, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Agent Settings';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------

    //only call data service if user is present. This 'if' is to prevent exception on page refresh
    //if ($rootScope.loggedUser.UserId != "") {

    dataService.getAll('Accomodations', 'getAccomodationsForSelectedOwner', { objId: $rootScope.loggedUser.UserId }, function (res) {
            $scope.Accomodations = res.data;
            $scope.MasterAccomodations = $scope.Accomodations;

            console.log($scope.Accomodations);


            
             
          

    });
     
    //} else {//redirect user on refresh
    //    $rootScope.changeView('/');
    //}



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

