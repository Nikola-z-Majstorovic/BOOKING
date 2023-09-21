bookingApp.controller('createAcomodationCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, $timeout, $window, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Accomodation Create';
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

  


    //$scope.createAccomodation = function () {

    //    dataService.create('Accomodations', $scope.accomodation, function (res) {
    //        $rootScope.changeView('/agentsettings');
    //        console.log('Accomodation is created');
       
    //    });
    //}

    $scope.createAccomodation = function () {

        dataService.create('Accomodations', $scope.accomodation, function (res) {
            var accomodation = res.data;
            $scope.fileNamesArray = [];
            var files = document.getElementById('file').files;
            for (i = 0; i <= files.length - 1; i++) {

                $scope.fileNamesArray.push(files[i].name);

                var f = files[i];

                var formD = new FormData();
                var reader = new FileReader();

                formD.append("file", f);

                dataService.uploadImage(accomodation.AccomodationId).exec(formD).$promise.then(function (res, err) {


                });
            }

            $rootScope.changeView('/agentsettings');
            console.log('Accomodation is created');

        })


    }


    
}]);

