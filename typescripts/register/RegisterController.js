/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var RegisterController = (function () {
        function RegisterController(scope, location, http) {
            this.scope = scope;
            this.location = location;
            this.http = http;
        }
        RegisterController.prototype.register = function () {
            var data = JSON.stringify(this.form);
            this.http.post('/admin/register/profile', data).then(function (response) {
            }, function (response) {
            });
        };
        return RegisterController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('RegisterController', ['$scope', '$location', '$http', RegisterController]);
    backApp.directive('registerForm', function () {
        return {
            restrict: 'E',
            controller: 'RegisterController as ctrl',
            templateUrl: '/modules/Admin/views/directives/register/register-form.html'
        };
    });
})(backApp || (backApp = {}));
//# sourceMappingURL=RegisterController.js.map