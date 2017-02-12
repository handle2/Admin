/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class PartnerService{

        public partners;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('PartnerService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new PartnerService(rootScope,http,localStorageService);
    }]);
}