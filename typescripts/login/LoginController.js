/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var LoginController = (function () {
        function LoginController(scope, location, http, window, commonService, localStorageService) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.commonService = commonService;
            this.localStorageService = localStorageService;
            this.error = "";
        }
        LoginController.prototype.logout = function () {
            var self = this;
            this.http.post('/admin/logout').then(function successCallback(response) {
                self.localStorageService.removeItem('username');
                self.window.open('/admin', '_self');
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        LoginController.prototype.login = function () {
            var self = this;
            var data = JSON.stringify(this.form);
            this.http.post('/admin/enter', data).then(function successCallback(response) {
                self.localStorageService.set('username', self.form.username);
                self.window.open('/admin', '_self');
                self.commonService.getLoggedUser();
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        return LoginController;
    }());
    backApp_1.LoginController = LoginController;
    var backApp = angular.module('backApp');
    backApp.controller('LoginController', ['$scope', '$location', '$http', '$window', 'CommonService', 'localStorageService', LoginController]);
    backApp.directive('loginForm', function () {
        return {
            restrict: 'E',
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/login/login-form.html'
        };
    });
    backApp.directive('logoutButton', function () {
        return {
            restrict: 'E',
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/login/logout-button.html'
        };
    });
})(backApp || (backApp = {}));
//# sourceMappingURL=LoginController.js.map