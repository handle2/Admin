/// <reference path="./../../typings/tsd.d.ts" />

module backApp{
    export interface IProdcateg{
        id : number;
        url : string;
        name : string;
        inputs : Array<number>;
    }

    export class ProdcategService{
        public prodcategs : Array<IProdcateg> = [];

        constructor(rootScope,http,localStorageService){

        }
    }
    var backApp = angular.module('backApp');


    backApp.service('ProdcategService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new ProdcategService(rootScope,http,localStorageService);
    }]);
}