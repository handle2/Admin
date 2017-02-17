/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var CommonService = (function () {
        function CommonService(rootScope, location, window, http, localStorageService) {
            this.rootScope = rootScope;
            this.location = location;
            this.window = window;
            this.http = http;
            this.localStorageService = localStorageService;
            if (!this.user) {
                this.reloadUserData();
            }
            this.getLangs();
        }
        CommonService.prototype.getLoggedUser = function () {
            return this.http.get('/admin/profile/getUser');
        };
        CommonService.prototype.reloadUserData = function () {
            var self = this;
            this.getLoggedUser().then(function (response) {
                self.user = JSON.parse(response.data);
            });
        };
        CommonService.prototype.hasPermission = function (code) {
            if (this.user && !this.user['$$state']) {
                return this.user.role.rights.indexOf(code) > -1 ? true : false;
            }
            return false;
        };
        CommonService.prototype.getLangs = function () {
            var self = this;
            this.http.get('/admin/language/getLangs').then(function (response) {
                self.langs = angular.fromJson(response.data);
            });
        };
        return CommonService;
    }());
    backApp_1.CommonService = CommonService;
    var backApp = angular.module('backApp');
    backApp.service('CommonService', ['$rootScope', '$location', '$window', '$http', 'localStorageService', function (rootScope, location, window, http, localStorageService) {
            return new CommonService(rootScope, location, window, http, localStorageService);
        }]);
})(backApp || (backApp = {}));
//# sourceMappingURL=CommonService.js.map