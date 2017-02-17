/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var LanguageService = (function () {
        function LanguageService(scope, http, localStorageService) {
        }
        return LanguageService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('LanguageService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new LanguageService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=LanguageService.js.map