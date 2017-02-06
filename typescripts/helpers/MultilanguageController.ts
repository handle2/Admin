/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class MultilanguageController{

        public defaultLang : string = 'en';
        
        constructor(private scope,private http,private commonService) {
            var self = this;
        }
        
        public setDefaultLang(code:string):void{
            this.defaultLang = code;
        }
        
        public getDefaultLang(code){
            return code != this.defaultLang?true:false;
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