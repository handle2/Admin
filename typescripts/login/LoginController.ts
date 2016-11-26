/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    export interface ILogin {
        username:string,
        password:string
    }

    export class LoginController {

        public form:ILogin;
        public error:string = "";

        constructor(private scope, private location, private http, private window ,public commonService,private localStorageService) {
        }

        public logout() {

            var self = this;
            this.http.post('/admin/logout').then(function successCallback(response) {
                self.localStorageService.removeItem('username');
                self.window.open('/admin', '_self');
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }

        public login() {
            var self = this;
            var data = JSON.stringify(this.form);
            this.http.post('/admin/enter', data).then(function successCallback(response) {
                self.localStorageService.set('username',self.form.username);
                self.window.open('/admin', '_self');
                self.commonService.getLoggedUser();
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('LoginController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService', LoginController]);
    backApp.directive('loginForm', function () {
        return {
            restrict: 'E',
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/login/login-form.html'
        }
    });
    backApp.directive('logoutButton', function () {
        return {
            restrict: 'E',
            controller: 'LoginController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/login/logout-button.html'
        }
    });
}