/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ContentService = (function () {
        function ContentService(scope, http, localStorageService) {
        }
        return ContentService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('ContentService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new ContentService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ContentService.js.map