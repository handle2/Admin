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
                var self = this;
                this.user = this.getLoggedUser().then(function (response) {
                    self.user = JSON.parse(response.data);
                });
            }
        }
        CommonService.prototype.getLoggedUser = function () {
            var username = JSON.stringify(this.localStorageService.get('username'));
            return this.http.post('/admin/profile/getUser', username);
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