bookingApp.controller('adminSettingsCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'dataService', 'appService', 'tmhDynamicLocale', function ($rootScope, $scope, $timeout, $window, dataService, appService, tmhDynamicLocale) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-user';
    $rootScope.title = 'Adming Settings';
    $rootScope.faicon = 'fa-booking-darkblue';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------

    //only call data service if admin is present. This 'if' is to prevent exception on page refresh
    if ($rootScope.loggedUser.UserId != "") {
        dataService.getAll('Users', null, null, function (res) {
            $scope.Users = res.data;
        });

        //Temp object that will hold selected user values when modal is opened
        $scope.editUser = {};
        //Used to display/hide modal
        $scope.changeUser = false;

        //Open modal
        $scope.openAgentSetup = function (user) {
            $scope.changeUser = true;

            $scope.editUser = angular.copy(user);
        }

        //Close modal
        $scope.cancelChangeUserToAgent = function () {
            $scope.changeUser = false;
            $scope.editUser = {};
        }

        //Update user role
        $scope.changeUserToAgent = function () {
            $scope.changeUser = false;
            dataService.update('Users', 'ChangeUserToAgent', $scope.editUser, function (res) {
                $scope.Users = res.data;
            });
        }

        //Call backend to use Membership class and disapprove user
        $scope.lockUser = function (user) {
            dataService.update('Users', 'LockUser', user, function (res) {
                $scope.Users = res.data;
            });
        }

        //Call backend to use Membership class and approve user
        $scope.unlockUser = function (user) {
            dataService.update('Users', 'UnockUser', user, function (res) {
                $scope.Users = res.data;
                console.log($scope.Users);
            });
        }

        //Get all comments
        dataService.getAll('Comments', null, null, function (res) {
            $scope.Comments = res.data;
        });

        //Approve comment so that it will be visible on Accomodation selection
        $scope.approveComment = function (comment) {
            dataService.update('Comments', null, comment, function (res) {
                $scope.Comments = res.data;
                console.log($scope.Comments);
            });
        }
    } else {//redirect user on refresh
        $rootScope.changeView('/');
    }

   
}]);

