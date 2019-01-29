angular.module('ngQtip', [])
    .factory('qtipService', ['$rootScope', '$window', function ($rootScope, $window) {
        return {
            getTooltipJson: function (keyId) {
                if (keyId) {
                    if ($rootScope.validation) {
                        if ($rootScope.validation.jsonValidationLabelsTitles) {
                            return _.find($rootScope.validation.jsonValidationLabelsTitles, function (item) {
                                return (item.KeyId == keyId);
                            });
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }

                }
                else {
                    return null;
                }
            },
            initTooltip: function (element) {
                $(element).qtip({
                    content: { attr: 'data-bubble-tooltip' },
                    style: { classes: 'corner' },
                    position: { my: 'top left', target: 'mouse', viewport: $(window), adjust: { x: 18, y: 0 } }
                });
            },
            setTooltipHtml: function (element) {
                var jsonItem = this.getTooltipJson(element.attr('for'));
                if (jsonItem) {
                    if (jsonItem.Min == jsonItem.SoftMin && jsonItem.Max == jsonItem.SoftMax) {
                        var html = element.attr('data-bubble-title') + '<br/><span style="color: red;">Hard limit: (' + jsonItem.Min + '-' + jsonItem.Max + ') ' + jsonItem.Unit;
                    } else {
                        var html = element.attr('data-bubble-title') + '<br/><span style="color: red;">Hard limit: (' + jsonItem.Min + '-' + jsonItem.Max + ') ' + jsonItem.Unit + '</span><br/><span style="color: green;">Usual range: (' + jsonItem.SoftMin + '-' + jsonItem.SoftMax + ') ' + jsonItem.Unit + '</span>';
                    }
                    $(element).attr('data-bubble-tooltip', html);
                }
            }
        }
    }])
.directive('bubbleTooltip', ['$compile', 'qtipService', function ($compile, qtipService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            qtipService.setTooltipHtml(element);
            qtipService.initTooltip(element);
        }
    };
}]);
