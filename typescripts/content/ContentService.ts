/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class ContentService{

        public contents;
        public labels;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('ContentService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new ContentService(rootScope,http,localStorageService);
    }]);
}