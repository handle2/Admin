/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ContentController = (function () {
        function ContentController(scope, location, http, window, commonService) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.commonService = commonService;
            console.log(commonService.loggedUsername);
        }
        ContentController.prototype.getUsername = function () {
            console.log(this.commonService.loggedUsername);
        };
        return ContentController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('ContentController', ['$scope', '$location', '$http', '$window', 'CommonService', ContentController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ContentController.js.map