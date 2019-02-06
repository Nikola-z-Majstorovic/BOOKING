bookingApp.controller('homeCtrl', ['$rootScope', '$scope', 'dataService', 'appService', function ($rootScope, $scope, dataService, appService) {
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.icon = 'fa-home';
    $rootScope.title = 'Home';
    $rootScope.mode = 'view';
    //-----------------------------------------------------------------------------------------------------------
    appService.refreshScroll();
    //-----------------------------------------------------------------------------------------------------------
    $rootScope.query = "";
    //-----------------------------------------------------------------------------------------------------------
  
    //-----------------------------------------------------------------------------------------------------------



    $scope.UploadFile = function () {

        $scope.fileNamesArray = [];
        console.log(document.getElementById('file').files);
        var files = document.getElementById('file').files;
        for (i = 0; i <= files.length - 1; i++) {

            $scope.fileNamesArray.push(files[i].name);
            var f = files[i];

            var formD = new FormData();
            var reader = new FileReader();


            formD.append("file", f);
            //reader.readAsText(f);

            dataService.uploadImage('dsadsa', 'dasdsa', 12).exec(formD).$promise.then(function (res, err) {


            });
        }

    }


}]);