bookingApp.controller('accomodationsCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', 'tmhDynamicLocale', '$routeParams', function ($rootScope, $scope, $timeout, $window, dataService, appService, tmhDynamicLocale, $routeParams) {
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


    $scope.kitchen = false;
    $scope.wifi = false;
    $scope.tv = false;
    $scope.parking = false;
    $scope.bathroom = false;
    $scope.noPersons = null;
    $scope.type = null;
    $scope.hb = null;

    $scope.masterFilter = function () {
        //$scope.masterFilterObject = {};
        //if ($scope.wifi) {
        //    $scope.masterFilterObject.Wifi = [1];
        //} else {
        //    delete $scope.masterFilterObject.Wifi;
        //}
        //if ($scope.kitchen) {
        //    $scope.masterFilterObject.Kitchen = [1];
        //} else {
        //    delete $scope.masterFilterObject.Kitchen;
        //}
        //if ($scope.tv) {
        //    $scope.masterFilterObject.TV = [1];
        //} else {
        //    delete $scope.masterFilterObject.TV;
        //}
        //if ($scope.parking) {
        //    $scope.masterFilterObject.Parking = [1];
        //} else {
        //    delete $scope.masterFilterObject.Parking;
        //}
        var filterBy = { Wifi: [Number($scope.wifi)], TV: [Number($scope.tv)], Parking: [Number($scope.parking)], Kitchen: [Number($scope.kitchen)], Bathroom: [Number($scope.bathroom)], NoPersons: [Number($scope.noPersons), Number($scope.noPersons)+1], Type: [Number($scope.type)], HB: [Number($scope.hb)] };
        console.log(filterBy);
        //var filterBy = $scope.masterFilterObject;
        var result = $scope.MasterAccomodations.filter(function (o) {
            return Object.keys(filterBy).every(function (k) {
                return filterBy[k].some(function (f) {
                    return o[k] === f;
                });
            });
        });

        console.log(result);
        $scope.Accomodations = angular.copy(result);


        //Filter by price range
        if ($scope.minPrice != null && $scope.maxPrice != null) {
            var result = _.filter($scope.Accomodations, function(accomodation){
                return accomodation.Price >= $scope.minPrice && accomodation.Price <= $scope.maxPrice;
            });

            $scope.Accomodations = result;
        }else if($scope.minPrice == null && $scope.maxPrice != null){
            var result = _.filter($scope.Accomodations, function (accomodation) {
                return accomodation.Price <= $scope.maxPrice;
            });

            $scope.Accomodations = result;
        } else if ($scope.minPrice != null && $scope.maxPrice == null) {
            var result = _.filter($scope.Accomodations, function (accomodation) {
                return accomodation.Price >= $scope.minPrice
            });

            $scope.Accomodations = result;
        }



        //console.log(_.size($scope.masterFilterObject));
        //if (_.size($scope.masterFilterObject) == 0) {
        //    $scope.Accomodations = $scope.MasterAccomodations;
        //}
        //console.log(result);

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

