bookingApp.factory('flashService', ['$rootScope', '$timeout', '$location', function ($rootScope, $timeout, $location) {
    return {
        //-------------------------------------------------------------------------
        ok: function (status) {
            if (status.messages != undefined) {
                $rootScope.msgtype = 'ok';
                $rootScope.message = status.message;
                $rootScope.code = status.code;
                $rootScope.messages = [];
                $rootScope.errors = [];
                $rootScope.messages = status.messages;

                if ($rootScope.messages) {
                    if ($rootScope.messages.length != 0) {
                        $('#slider').toggleClass('slidedown slideup');
                        $timeout(function () {
                            $rootScope.code = null;
                            $rootScope.errors = [];
                            $rootScope.messages = [];
                            $("#slider").toggleClass("slidedown slideup");
                        }, 2500);
                    }
                }
            }
            return null;
        },
        err: function (status) {
            $rootScope.msgtype = 'err';
            $rootScope.message = status.message;
            $rootScope.code = status.code;
            $rootScope.messages = [];
            $rootScope.errors = status.errors;
            $rootScope.messages = status.messages;

            if ($rootScope.errors) {
                if ($rootScope.errors.length != 0) {
                    $('#slider').toggleClass('slidedown slideup');
                    $timeout(function () {
                        $rootScope.code = null;
                        $rootScope.errors = [];
                        $rootScope.messages = [];
                        $("#slider").toggleClass("slidedown slideup");
                    }, 4000);
                }
            }
            return null;
        }
        //-------------------------------------------------------------------------
    };
}]);