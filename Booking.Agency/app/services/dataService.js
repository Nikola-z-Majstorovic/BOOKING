bookingApp.factory('dataService', ['$resource', '$window', '$routeParams', '$location', '$route', '$cookieStore', '$timeout', '$filter', '$rootScope', 'flashService', 'appService', function ($resource, $window, $routeParams, $location, $route, $cookieStore, $timeout, $filter, $rootScope, flashService, appService) {
    
    return {        
        get: function (ctrlName, id, cb) {            
            if (id) {
                this._get(ctrlName, id).exec().$promise.then(function (res) {
                    $rootScope.status = res.status;
                    if (cb) {
                        cb(res);
                    }
                    return;
                });
            }
            else if ($routeParams.id) {
                this._get(ctrlName, $routeParams.id).exec().$promise.then(function (res) {
                    $rootScope.status = res.status;
                    flashService.ok(res.status);
                    if (cb) {
                        cb(res);
                    }
                    return;
                });
            }
            else {
                $rootScope.status = {};
                if (cb) {
                    cb(res);
                }
                return;
            }
        },
        _get: function (ctrlName, id) {
            return $resource($rootScope.getUrl() + '/' + ctrlName + '/get', { objId: id }, { exec: { method: 'GET', headers: appService.getHeader() } });
        },
        getAll: function (ctrlName, action, params, cb) {
                this._getAll(ctrlName, action, params).exec().$promise.then(function (res) {
                    $rootScope.status = res.status;
                    if (cb) {
                        cb(res);
                    }
                    return;
                });
        },
        _getAll: function (ctrlName, action, params) {
            if (action == null) {
                action = 'getall';
            }
            if (params == null) {
                params = {};
            }
            return $resource($rootScope.getUrl() + '/' + ctrlName + '/' + action, params, { exec: { method: 'GET', headers: appService.getHeader() } });
        },
        create: function (ctrlName, obj, cb) {
            this._create(ctrlName).exec(obj).$promise.then(function (res) {
                $rootScope.status = res.status;
                if (cb) {
                    cb(res);
                }
                return;
            });
        },
        _create: function (ctrlName) {
            return $resource($rootScope.getUrl() + '/' + ctrlName + '/create', {}, { exec: { method: 'POST', headers: appService.getHeader() } });
        },
        update: function (ctrlName, action, obj, cb) {
            
            this._update(ctrlName, action).exec(obj).$promise.then(function (res) {
                $rootScope.status = res.status;
                if (cb) {
                    cb(res);
                }
                return;
            });
        },
        _update: function (ctrlName, action) {
            if (action == null) {
                action = 'update';
            }
            return $resource($rootScope.getUrl() + '/' + ctrlName + '/' + action, {}, { exec: { method: 'PUT', headers: appService.getHeader() } });
        },
        delete: function (ctrlName, id, cb) {
            var result = confirm("Are you sure you want to delete?");
            if (result) {
                this._delete(ctrlName, id).exec().$promise.then(function (res) {
                    $rootScope.status = res.status;
                    if (cb) {
                        cb(res);
                    }
                    return;
                });
            }
        },
        _delete: function (ctrlName, id) {
            return $resource($rootScope.getUrl() + '/' + ctrlName + '/delete', { objId: id }, { exec: { method: 'DELETE', headers: appService.getHeader() } });
        },
        login: function () {
            return $resource($rootScope.getUrl() + '/users/login', {}, { exec: { method: 'POST' } });
        },
        register: function () {
            return $resource($rootScope.getUrl() + '/users/register', {}, { exec: { method: 'POST' } });
        },
        logout: function (cb) {
            return $resource($rootScope.getUrl() + '/users/logout', {}, { exec: { method: 'POST' } }).exec().$promise.then(function (res) {
                $rootScope.loggedUser = null;
                $window.location.reload();
                if (cb) {
                    cb(res);
                }
                $rootScope.changeView('/login');
                return;
            });
        }
    }
}]);

