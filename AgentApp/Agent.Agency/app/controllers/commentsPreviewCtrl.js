bookingApp.controller('commentsPreviewCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, $timeout, $window, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Comments Preview';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------

    dataService.get('Comments', $routeParams.accomodationId, function (res) {

        console.log(res.data);
        $scope.comments = res.data;
    });




}]);

