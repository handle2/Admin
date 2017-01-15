/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class LanguageService{

        public languages;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('LanguageService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new LanguageService(rootScope,http,localStorageService);
    }]);
}