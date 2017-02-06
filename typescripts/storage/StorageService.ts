/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class StorageService{

        public storages;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('StorageService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new StorageService(rootScope,http,localStorageService);
    }]);
}