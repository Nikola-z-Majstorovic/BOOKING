angular.module('ngTitle', [])
.directive('title', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (element.attr('title')) {
                $(element).hover(function () {
                    // on mouseenter       
                    element.attr('data-placement', 'auto');
             
                    $(element).tooltip('show');
                }, function () {
                    // on mouseleave                 
                    $(element).tooltip('hide');
                });
            }

        }
    };
}]);
