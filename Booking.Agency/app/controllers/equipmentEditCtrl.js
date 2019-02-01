bookingApp.controller('equipmentEditCtrl', ['$rootScope', '$scope', '$timeout', '$window', '$routeParams', 'dataService', 'appService', function ($rootScope, $scope, $timeout, $window, $routeParams, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    console.log('equipmentEditCtrl.');
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-users';
    $rootScope.title = 'Equipment';
    $rootScope.mode = 'edit';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshIScroller();
    //-----------------------------------------------------------------------------------------------------------
    //console.log($rootScope.runDetail);
    //-----------------------------------------------------------------------------------------------------------
    $scope.RunDetail = appService.lodashFindBy($rootScope.run.RunDetails, 'RunDetailId', $routeParams.runDetailId);
    console.log($scope.RunDetail);
    //-----------------------------------------------------------------------------------------------------------
    $scope.enumMembraneLungManufacturers = [];
    $scope.enumHeatExchangerManufacturers = [];
    $scope.enumPumpManufacturers = [];
    $scope.enumHemofilterManufacturers = [];
    //-----------------------------------------------------------------------------------------------------------
    $scope.enumMembraneLungDevices = [];
    $scope.enumHeatExchangerDevices = [];
    $scope.enumPumpDevices = [];
    $scope.enumHemofilterDevices = [];
    //-----------------------------------------------------------------------------------------------------------
    $scope.MembraneLungManufacturer_OnChange = function () {
        $scope.enumMembraneLungDevices = appService.lodashFilterBy($scope.enumAllMembraneLungDevices, 'ManufacturerId', $scope.RunDetail.MembraneLung.Manufacturer.ManufacturerId);
    }
    $scope.HeatExchangerManufacturer_OnChange = function () {
        $scope.enumHeatExchangerDevices = appService.lodashFilterBy($scope.enumAllHeatExchangerDevices, 'ManufacturerId', $scope.RunDetail.HeatExchanger.Manufacturer.ManufacturerId);
    }
    $scope.PumpManufacturer_OnChange = function () {
        $scope.enumPumpDevices = appService.lodashFilterBy($scope.enumAllPumpDevices, 'ManufacturerId', $scope.RunDetail.Pump.Manufacturer.ManufacturerId);
    }
    $scope.HemofilterManufacturer_OnChange = function () {
        $scope.enumHemofilterDevices = appService.lodashFilterBy($scope.enumAllHemofilterDevices, 'ManufacturerId', $scope.RunDetail.Hemofilter.Manufacturer.ManufacturerId);
    }
    //-----------------------------------------------------------------------------------------------------------
    // Get all manufacturers and filter with lodash
    dataService.getAll('Equipment', 'GetAllManufacturers', {}, function (res) {
        $scope.AllManufactuters = _.sortBy(res.data, 'Name');
        console.log($scope.AllManufactuters);

        // MembruaneLungs filter
        $scope.enumMembraneLungManufacturers = _.filter($scope.AllManufactuters, function (o) { return o.MembraneLungs.length });
        $scope.enumAllMembraneLungDevices = _.sortBy(_.flatten(_.map($scope.AllManufactuters, 'MembraneLungs')), 'Name');
        $scope.enumMembraneLungDevices = $scope.enumAllMembraneLungDevices;

        // HeatExchangers filter
        $scope.enumHeatExchangerManufacturers = _.filter($scope.AllManufactuters, function (o) { return o.HeatExchangers.length != 0; }, 'Name');
        $scope.enumAllHeatExchangerDevices = _.sortBy(_.flatten(_.map($scope.AllManufactuters, 'HeatExchangers')), 'Name');
        $scope.enumHeatExchangerDevices = $scope.enumAllHeatExchangerDevices;

        // Pumps filter
        $scope.enumPumpManufacturers = _.filter($scope.AllManufactuters, function (o) { return o.Pumps.length != 0; }, 'Name');
        $scope.enumAllPumpDevices = _.sortBy(_.flatten(_.map($scope.AllManufactuters, 'Pumps')), 'Name');
        $scope.enumPumpDevices = $scope.enumAllPumpDevices;

        // Hemofilters filter
        $scope.enumHemofilterManufacturers = _.filter($scope.AllManufactuters, function (o) { return o.Hemofilters.length != 0; }, 'Name');
        $scope.enumAllHemofilterDevices = _.sortBy(_.flatten(_.map($scope.AllManufactuters, 'Hemofilters')), 'Name');
        $scope.enumHemofilterDevices = $scope.enumAllHemofilterDevices;

        $scope.MembraneLungManufacturer_OnChange();
        $scope.HeatExchangerManufacturer_OnChange();
        $scope.PumpManufacturer_OnChange();
        $scope.HemofilterManufacturer_OnChange();
    });
    //-----------------------------------------------------------------------------------------------------------
    //Save or Update
    $scope.save = function (strNextOrBack) {

            //Update Equipment
            dataService.update('equipment', null, $scope.RunDetail, function (res) {
                console.log($scope.RunDetail);
                if (res.status.code == 200) {
                    $rootScope.run = res.data;
                    
                    $timeout(function () {
                        //$rootScope.changeView('/rundetails/view/' + $rootScope.run.RunId + '/' + $scope.cannulation.RunDetailId);
                        if (strNextOrBack == '') {
                            $rootScope.changeView('/rundetails/view/' + $rootScope.run.RunId + '/' + $scope.RunDetail.RunDetailId);                            
                        }
                        else if (strNextOrBack == 'next') {
                            $rootScope.changeView('/rundetails/cannulations/edit/' + $rootScope.run.RunId + '/' + $scope.RunDetail.RunDetailId);
                        }
                        else if (strNextOrBack == 'back') {
                            $rootScope.changeView('/rundetailinfo/edit/' + $rootScope.run.RunId + '/' + $scope.RunDetail.RunDetailId);
                        }
                    }, 2000);

                }
            });
        }
    
    //-----------------------------------------------------------------------------------------------------------
}]);

