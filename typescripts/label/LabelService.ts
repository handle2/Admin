/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class LabelService{

        public labels;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('LabelService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new LabelService(rootScope,http,localStorageService);
    }]);
}