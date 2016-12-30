/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class ProductService{

        public products;
        public prodcategs;

        constructor(scope, http,productService){

        }

    }

    var backApp = angular.module('backApp');

    backApp.service('ProductService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new ProductService(rootScope,http,localStorageService);
    }]);
}