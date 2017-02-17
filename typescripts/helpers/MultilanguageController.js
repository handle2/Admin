/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var MultilanguageController = (function () {
        function MultilanguageController(scope, http, commonService) {
            this.scope = scope;
            this.http = http;
            this.commonService = commonService;
            this.defaultLang = 'en';
            var self = this;
        }
        MultilanguageController.prototype.setDefaultLang = function (code) {
            this.defaultLang = code;
        };
        MultilanguageController.prototype.getDefaultLang = function (code) {
            return code != this.defaultLang ? true : false;
        };
        return MultilanguageController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('MultilanguageController', ['$scope', '$http', 'CommonService', MultilanguageController]);
    backApp.directive('multilangBox', function () {
        return {
            templateUrl: '/modules/Admin/views/directives/helpers/multilang-box.html',
            controller: 'MultilanguageController',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope: {
                fields: '=',
                langs: '='
            }
        };
    });
})(backApp || (backApp = {}));
//# sourceMappingURL=MultilanguageController.js.map