/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var RoleService = (function () {
        function RoleService(rootScope, http, localStorageService) {
        }
        return RoleService;
    }());
    backApp_1.RoleService = RoleService;
    var backApp = angular.module('backApp');
    backApp.service('RoleService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new RoleService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=RoletService.js.map