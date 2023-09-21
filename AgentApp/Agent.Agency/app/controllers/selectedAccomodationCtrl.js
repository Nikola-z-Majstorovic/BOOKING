bookingApp.controller('selectedAccomodationCtrl', ['$rootScope', '$scope', 'dataService', 'appService', '$routeParams', function ($rootScope, $scope, dataService, appService, $routeParams) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-home';
    $rootScope.title = 'Reservation';//We can change this value to accomodation name, later when we update database to hold Accomodation Name
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------
    //dates array that will hold disabled dates
    $scope.dates = [];
    //flag used for displaying/hidding modal
    $scope.makeReservation = false;
    //Comments array
    $scope.Comments = [];
    //Get selected accomodation, reservations for this accomodation are also included here
    dataService.get('Accomodations', $routeParams.accomodationId, function (res) {
        $scope.selectedAccomodation = res.data;

        //Only show approved comments
        $scope.Comments = appService.lodashFilterBy($scope.selectedAccomodation.Comments, 'Approved', 1);

        var reservations = $scope.selectedAccomodation.Reservations;
        console.log($scope.selectedAccomodation);

        $scope.dates = [];
        for (i = 0; i <= reservations.length - 1; i++) {

            //add reservation start date to forbiden dates
            var tempStartDate = moment(new Date(reservations[i].StartPeriod)).format('DD/MM/YYYY');
            $scope.dates.push(tempStartDate);

            var startDate = moment(new Date(reservations[i].StartPeriod));
            var endDate = moment(new Date(reservations[i].EndPeriod));
            //Create dates between start and end date of reservation
            while (startDate < endDate) {
                startDate = moment(startDate).add(1, 'days');

                $scope.dates.push(startDate.format('DD/MM/YYYY'));
            }
            //add reservation end date to forbiden dates
            var tempEndDate = moment(new Date(reservations[i].EndPeriod)).format('DD/MM/YYYY'); 
            $scope.dates.push(tempEndDate);
        }

        //Rating stuff
        if ($scope.selectedAccomodation.Ratings.length > 0) {
            var ratingSum = 0;

            for (i = 0; i <= $scope.selectedAccomodation.Ratings.length - 1; i++) {
                ratingSum = ratingSum + $scope.selectedAccomodation.Ratings[i].RatingMark;
            }

            $scope.rating = ratingSum / $scope.selectedAccomodation.Ratings.length;
        } else {
            $scope.rating = 'Not rated yet';
        }

        if ($rootScope.loggedUser.UserId != "") {

            //Comment stuff
            var userReservations = appService.lodashFilterBy($rootScope.loggedUser.Reservations, 'AccomodationId', $scope.selectedAccomodation.AccomodationId);

            //console.log(userReservations);

            if (userReservations != undefined) {
                var userReservation = appService.lodashFindBy(userReservations, 'CommentConsumed', false);
                if (userReservation != undefined && new Date(userReservation.EndPeriod) < new Date()) {
                    $scope.messageBoxDisplay = false;
                    $scope.canComment = true;
                    $scope.reservationToConsumeComment = userReservation;
                }

                
                var userRatings = appService.lodashFilterBy($rootScope.loggedUser.Reservations, 'AccomodationId', $scope.selectedAccomodation.AccomodationId);
                //Rating stuff
                if (userRatings != undefined) {
                    console.log(userRatings);
                    var userRating = appService.lodashFindBy(userRatings, 'RatingConsumed', false);
                    console.log(userRating);
                    if (userRating != undefined && new Date(userRating.EndPeriod) < new Date()) {
                        console.log(userRating);
                        $scope.canRate = true;
                        $scope.reservationToConsumeRating = userRating;
                    }
                }
            }

        }

    });
    //dataService.get('Reservations', $routeParams.accomodationId, function (res) {
    //    $scope.Reservations = res.data;

    //    console.log($scope.Reservations);
    //});
    //-----------------------------------------------------------------------------------------------------------

    //Initialize dates
    $scope.today = function () {
        $scope.checkInDate = new Date();
        $scope.checkOutDate = new Date();
    };
    
    //Check if created date button holds same date as send date for disabling
    $scope.areDatesEqual = function (date1, date2) {
        return date1 == date2.toLocaleDateString();
    }

    //options used for angular ui date picker
    $scope.options = {
        minDate: new Date(),
        showWeeks: false,
        dateDisabled: function (data) {
            var date = data.date, mode = data.mode;
            var isRealDate = false;
            for (var i = 0; i < $scope.dates.length; i++) {
                if ($scope.areDatesEqual($scope.dates[i], date)) {
                    isRealDate = true;
                }
            }
            return (mode === 'day' && isRealDate);
        }
    };

    //Reservations stuff
    $scope.createReservation = function () {
        $scope.makeReservation = false; // turn off reservation modal

        //create appropriate reservation object
        var reservation = {
            UserId: $rootScope.loggedUser.UserId,
            AccomodationId: $scope.selectedAccomodation.AccomodationId,
            StartPeriod: $scope.checkInDate,
            EndPeriod: $scope.checkOutDate,
            Confirmed: 1,
            CommentConsumed: false
        };

        console.log(reservation);

        //Make reservation
        dataService.create('Reservations', reservation, function (res) {
            $scope.selectedAccomodation = res.data;

            $rootScope.changeView('/messages');
        });
    }

    $scope.displayReservationBox = function () {        
        $scope.makeReservation = true; // turn on reservation modal
        $scope.today();
    }

    $scope.cancelReservation = function () {
        $scope.makeReservation = false; // turn off reservation modal
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

    


    $scope.messageContent = "Type your comment here";
    
    $scope.displayMessageBox = function (display) {
        $scope.messageBoxDisplay = display;
    }

    $scope.postComment = function (comment) {

        if (comment.length >= 5) {

            var commentObject = {
                UserId: $rootScope.loggedUser.UserId,
                AccomodationId: $scope.selectedAccomodation.AccomodationId,                
                CommentContent: comment,
                Approved: 0,
                CommentDate: new Date()
            }

            //create comment
            dataService.create('Comments', commentObject, function (res) {
  
                //Now set reservation comment used
                dataService.update('Reservations', 'ConsumeReservationComment', $scope.reservationToConsumeComment, function (res) {
                    //Refresh logged user reservations
                    $rootScope.loggedUser.Reservations = res.data;

                    $scope.messageBoxDisplay = false;
                    $scope.canComment = false;
                });
            });

        } else {
            alert("Comment must be at least 5 characters long!");
        }
    }


    $scope.rate = function (rateValue) {

        var ratingObject = {
            UserId: $rootScope.loggedUser.UserId,
            AccomodationId: $scope.selectedAccomodation.AccomodationId,
            RatingMark: rateValue
        }

        dataService.update('Reservations', 'RateAccomodation', ratingObject, function (res) {
            dataService.update('Reservations', 'ConsumeReservationRating', $scope.reservationToConsumeRating, function (res) {
                //Refresh logged user reservations
                $rootScope.loggedUser.Reservations = res.data;

                $scope.canRate = false;

                //Refresh rating
                $scope.selectedAccomodation.Ratings.push(ratingObject);
                var ratingSum = 0;

                console.log($scope.selectedAccomodation.Ratings);

                for (i = 0; i <= $scope.selectedAccomodation.Ratings.length - 1; i++) {
                    ratingSum = ratingSum + $scope.selectedAccomodation.Ratings[i].RatingMark;
                }

                $scope.rating = ratingSum / $scope.selectedAccomodation.Ratings.length;
            });
        });
        
    }
}]);