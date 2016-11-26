/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var RightController = (function () {
        function RightController(scope, location, http, window, commonService, localStorageService, rightService) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.commonService = commonService;
            this.localStorageService = localStorageService;
            this.rightService = rightService;
            if (!rightService.rights) {
                this.initRights();
            }
        }
        RightController.prototype.initRights = function () {
            var self = this;
            if (!self.commonService.user) {
                self.commonService.getLoggedUser().then(function (response) {
                    this.commonService.user = JSON.parse(response.data);
                    self.http.post('/admin/right/getRights', this.commonService.user.level).then(function successCallback(response) {
                        self.rightService.rights = JSON.parse(response.data);
                    }, function errorCallback(response) {
                        self.error = response.data;
                    });
                });
            }
            else {
                self.http.post('/admin/right/getRights', this.commonService.user.level).then(function successCallback(response) {
                    self.rightService.rights = JSON.parse(response.data);
                }, function errorCallback(response) {
                    self.error = response.data;
                });
            }
        };
        return RightController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('RightController', ['$scope', '$location', '$http', '$window', 'CommonService', 'localStorageService', 'RightService', RightController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=RightController.js.map