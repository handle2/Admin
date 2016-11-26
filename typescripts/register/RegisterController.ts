/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IProfile {
        username:string,
        password:string,
        password_again:string,
        email:string,
        name:string
    }

    class RegisterController {

        public form:IProfile;

        constructor(private scope, private location, private http) {

        }

        

        public register() {
            var data = JSON.stringify(this.form);
            this.http.post('/admin/register/profile', data).then(function (response) {

            }, function (response) {

            });
        }
    }

    var backApp = angular.module('backApp');


    backApp.controller('RegisterController', ['$scope', '$location', '$http', RegisterController]);
    backApp.directive('registerForm', function () {
        return {
            restrict: 'E',
            controller: 'RegisterController as ctrl',
            templateUrl: '/modules/Admin/views/directives/register/register-form.html'
        }
    });
}