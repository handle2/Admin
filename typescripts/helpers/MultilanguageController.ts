/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class MultilanguageController{

        public multi : any = {};
        
        constructor(private scope,private http,private commonService) {
            var self = this;
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('MultilanguageController', ['$scope','$http','CommonService', MultilanguageController]);

    backApp.directive('multilangBox', function() {
        return {
            templateUrl : '/modules/Admin/views/directives/helpers/multilang-box.html',
            controller : 'MultilanguageController',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope : {
                fields : '=',
                langs : '='
            }
        };
    });
}