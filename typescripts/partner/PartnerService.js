/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var PartnerService = (function () {
        function PartnerService(scope, http, localStorageService) {
        }
        return PartnerService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('PartnerService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new PartnerService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=PartnerService.js.map