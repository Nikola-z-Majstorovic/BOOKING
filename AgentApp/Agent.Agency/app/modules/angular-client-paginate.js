angular.module('ngClientPaginate', [])
.filter('paginate', ['$rootScope', 'Paginator', function ($rootScope, Paginator) {
    return function (input, itemsPerPage) {

        if (!input) {
            return input;
        }
        if (itemsPerPage) {
            Paginator.itemsPerPage = itemsPerPage;
        }
        Paginator.itemCount = input.length;
        return input.slice(parseInt(Paginator.page * Paginator.itemsPerPage), parseInt((Paginator.page + 1) * Paginator.itemsPerPage + 1) - 1);
    }
}])
.filter('forLoop', function () {
    return function (input, start, end) {
        input = new Array(end - start);
        for (var i = 0; start < end; start++, i++) {
            input[i] = start;
        }
        return input;
    }
})
.filter('orderObjectBy', function () {
    return function (items, field, reverse) {

        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });

        if (field != undefined) {

            if (_.includes(field.toLowerCase(), 'time') || _.includes(field.toLowerCase(), 'date')) {
                filtered = _.sortBy(filtered, function (o) { return new moment(new Date(o[field])).format('YYYY-MM-DD HH:mm:ss'); });
            } else {
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
            }
          
        }

        if (!reverse) { filtered.reverse(); }
        return filtered;
    };
})
.service('Paginator', ['$rootScope', '$timeout', '$location', function ($rootScope, $timeout, $location) {

    this.page = 0;
    this.itemsPerPage = 5;
    this.itemsPerRow = '100%';
    this.ascDesc = 'asc';
    this.sortBy = '_id';
    this.query = '';
    this.itemCount = 0;

    this.resetPage = function () {
        this.page = 0;
    };

    this.setPage = function (page) {
        if (page > this.pageCount()) {
            return;
        }
        this.page = page;
    };
    this.nextPage = function () {
        if (this.isLastPage()) {
            return;
        }
        this.page++;
    };
    this.perviousPage = function () {
        if (this.isFirstPage()) {
            return;
        }
        this.page--;
    };
    this.firstPage = function () {
        this.page = 0;
    };
    this.lastPage = function () {
        this.page = this.pageCount() - 1;
    };
    this.isFirstPage = function () {
        return this.page == 0;
    };
    this.isLastPage = function () {
        return this.page == this.pageCount() - 1;
    };
    this.pageCount = function () {
        return Math.ceil(parseInt(this.itemCount) / parseInt(this.itemsPerPage));
    };
    
}])
.directive('paginator', ['$rootScope', 'Paginator', function ($rootScope, Paginator) {
    return {
        restrict: 'E',
        scope: {
            pageSize: '='
        },
        controller: function ($rootScope, $scope, $timeout, $location, $routeParams) {
            //------------------------------------------------------------
            $scope.paginator = Paginator;
            //------------------------------------------------------------
            $scope.calculatePages = function (cnt) {
                Paginator.itemCount = cnt;
                Paginator.pageCount();
                Paginator.resetPage();

                var pages = [];
                for (var i = 0; i < (parseInt(Paginator.itemCount) / parseInt(Paginator.itemsPerPage)) ; i++) {
                    pages.push({ name: (i + 1), value: i });
                }
                $scope.optionsPage = pages;
                $scope.optionPage = $scope.optionsPage[0];
            };
            //------------------------------------------------------------
            $scope.optionsPageChange = function (item) {
                $scope.optionPage = item;
                Paginator.setPage(item.value);
            }
            $scope.pageChange = function (name) {
                var index = _.findIndex($scope.optionsPage, 'name', name);
                $scope.optionPage = $scope.optionsPage[index];
            };
            //------------------------------------------------------------
            $scope.optionsPerPage = [
                { name: '5', value: '5' },
                { name: '10', value: '10' },
                { name: '20', value: '20' },
                { name: '30', value: '30' },
                { name: '40', value: '40' },
                { name: '50', value: '50' }

            ];
            $scope.optionPerPage = $scope.optionsPerPage[0];
            $scope.optionsPerPageChange = function (item) {

                Paginator.itemsPerPage = item.value;
                Paginator.page = 0;
            }
            //------------------------------------------------------------
            $scope.optionsAscDesc = [
                { name: 'Asc', value: false },
                { name: 'Desc', value: false }
            ];
            $scope.optionAscDesc = $scope.optionsAscDesc[0];
            $scope.optionsAscDescChange = function (item) {
                Paginator.ascDesc = item.value;
            }
            //------------------------------------------------------------
            $scope.sortChange = function (item) {
                Paginator.sortBy = item.value;
            }
            //------------------------------------------------------------
        },
        link: function (scope, element, attrs, Paginator, ngModel) {
            attrs.$observe('total', function (val) {
                scope.calculatePages(val);
            });
        },
        templateUrl: 'app/directives/pagination.html'
    };
}])
.directive('searcher', ['$rootScope', 'Paginator', function ($rootScope, Paginator) {
    return {
        restrict: 'E',
        scope: {

        },
        controller: function ($rootScope, $scope, $timeout, $location, $routeParams) {
                
            //------------------------------------------------------------
        },
        link: function (scope, element, attrs, Paginator, ngModel) {

        },
        templateUrl: 'app/directives/searcher.html'
    };
}])
.directive('sorter', function factory() {
    return {
        restrict: 'A',
        scope: {
            sortBy: '@',
            sortTitle: '@'
        },
        controller: function ($rootScope, $scope, Paginator, $timeout, $location, $routeParams) {
            //------------------------------------------------------------
            $rootScope.sortDirection = 'Asc';
            $scope.sortDirection = $rootScope.sortDirection;
            $rootScope.sortBy = $scope.sortBy;
            $rootScope.sortTitle = $scope.sortTitle;
            $scope.sortTitle = $scope.sortTitle;
            //------------------------------------------------------------
            $scope.sort = function (sortBy, sortDirection) {
                $scope.sortDirection = sortDirection;
                $rootScope.sortDirection = $scope.sortDirection
                if (sortDirection == 'Desc') {
                    $rootScope.sortBy = sortBy;
                    $rootScope.reverse = false;
                }
                else if (sortDirection == 'Asc') {
                    $rootScope.sortBy = '-' + sortBy;
                    $rootScope.reverse = true;
                }
            }
            //------------------------------------------------------------
        },
        link: function (scope, element, attrs) {
            scope.fullSortTitle = 'Sort by: ' + element.attr('sort-title') + ' -> ' + scope.sortDirection;
        },
        templateUrl: 'app/directives/sorter.html'
    };
});
