/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ProductService = (function () {
        function ProductService(scope, http, productService) {
        }
        return ProductService;
    }());
    var backApp = angular.module('backApp');
    backApp.service('ProductService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new ProductService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ProductService.js.map