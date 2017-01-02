/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class DiscountService{

        public products;
        public prodcategs;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('DiscountService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new DiscountService(rootScope,http,localStorageService);
    }]);
}