/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var DiscountService = (function () {
        function DiscountService(scope, http, localStorageService) {
        }
        return DiscountService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('DiscountService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new DiscountService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=DiscountService.js.map