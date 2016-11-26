/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var RightService = (function () {
        function RightService(rootScope, http, localStorageService) {
        }
        return RightService;
    }());
    backApp_1.RightService = RightService;
    var backApp = angular.module('backApp');
    backApp.service('RightService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new RightService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=RightService.js.map