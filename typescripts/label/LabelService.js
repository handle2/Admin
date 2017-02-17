/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var LabelService = (function () {
        function LabelService(scope, http, localStorageService) {
        }
        return LabelService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('LabelService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new LabelService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=LabelService.js.map