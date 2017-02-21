/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class CartService{

        public carts;

        constructor(scope, http, localStorageService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('CartService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new CartService(rootScope,http,localStorageService);
    }]);
}