/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ProdcategService = (function () {
        function ProdcategService(rootScope, http, localStorageService) {
            this.prodcategs = [];
        }
        return ProdcategService;
    }());
    backApp_1.ProdcategService = ProdcategService;
    var backApp = angular.module('backApp');
    backApp.service('ProdcategService', ['$rootScope', '$http', 'localStorageService', function (rootScope, http, localStorageService) {
            return new ProdcategService(rootScope, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ProdcategService.js.map