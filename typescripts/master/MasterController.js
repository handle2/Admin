/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var MasterController = (function () {
        function MasterController(root, scope, commonService, localStorageService) {
            this.root = root;
            this.scope = scope;
            this.commonService = commonService;
            this.localStorageService = localStorageService;
        }
        return MasterController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('MasterController', ['$rootScope', '$scope', 'CommonService', 'localStorageService', MasterController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=MasterController.js.map