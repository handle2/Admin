/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var StorageService = (function () {
        function StorageService(scope, http, localStorageService) {
        }
        return StorageService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('StorageService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new StorageService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=StorageService.js.map