bookingApp.controller('messagesCtrl', ['$rootScope', '$scope', 'dataService', 'appService', function ($rootScope, $scope, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-home';
    $rootScope.title = 'My Messages';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------
    //only call data service if user is present. This 'if' is to prevent exception on page refresh
    if ($rootScope.loggedUser.UserId != "") {
        dataService.getAll('Reservations', null, null, function (res) {
            $scope.Reservations = res.data;

            console.log($scope.Reservations);

        });
    } else {//redirect user on refresh
        $rootScope.changeView('/');
    }

    //Combine data from user and return
    $scope.getUserNameSurname = function (user) {
        return user.Name + ' ' + user.Surname;
    }


    $scope.messageContent = "Type your message here";
    $scope.messageBoxDisplay = false;
    $scope.displayMessageBox = function (display) {        
        $scope.messageBoxDisplay = display;
    }

    $scope.sendMessage = function (ReservationId, message) {
        if (message == undefined || message.length >= 2) {

            var messageObject = {
                ReservationId: ReservationId,
                Message: message,
                SenderId: $rootScope.loggedUser.UserId,
                MessageDate: new Date(),
                MessageSeen: 0
            }

            //Send message
            dataService.create('Messages', messageObject, function (res) {
                //hide message box
                $scope.messageBoxDisplay = false;

                for (i = 0; i <= $scope.Reservations.length - 1; i++) {
                    if ($scope.Reservations[i].Id == messageObject.ReservationId) {
                        messageObject.BookingAgencyUser = $rootScope.loggedUser;
                        messageObject.MessageDate = moment(messageObject.MessageDate).format('MM/DD/YYYY hh:mm:ss');
                        
                        console.log('bingouuu');
                        $scope.Reservations[i].SentMessages.push(messageObject);

                        console.log($scope.Reservations[i].SentMessages);


                        _.orderBy($scope.Reservations[i].SentMessages, ['MessageDate'], ['asc']);
                    }
                }




                    //refresh messages
                    //dataService.getAll('Reservations', null, null, function (res) {
                    //    //hide message box
                    //    $scope.messageBoxDisplay = false;

                    //    $scope.Reservations = angular.copy(res.data);

                    //    console.log($scope.Reservations);
                    //});
            });

        } else {
            alert('Message must be at least 2 characters long!');
        }
    }
    //-----------------------------------------------------------------------------------------------------------

    $scope.openConversation = function (reservation) {
        console.log('asdasda');


        var notSeenMessages = appService.lodashFilterBy(reservation.SentMessages, 'MessageSeen', 0); 

        var notSeenMessagesFromOtherUser = _.filter(notSeenMessages, function (message) {
            return message.SenderId != $rootScope.loggedUser.UserId;
        });


        if (notSeenMessagesFromOtherUser.length > 0) {
            dataService.update('Messages', 'MarkMessagesAsSeen', notSeenMessagesFromOtherUser, function (res) {
                //refresh messages
                console.log('bingo');

                for (i = 0; i <= notSeenMessagesFromOtherUser.length - 1; i++) {

                    var messageToMarkAsseen = appService.lodashFindBy(reservation.SentMessages, 'Id', notSeenMessagesFromOtherUser[i].Id);

                    if (messageToMarkAsseen != undefined) {
                        console.log('asdasda');
                        messageToMarkAsseen.MessageSeen = 1;
                    }

                }

            });
        }

    }

    $scope.formatDatePeriod = function (date) {
        return moment(new Date(date)).format('MM/DD/YYYY');
    }
}]);