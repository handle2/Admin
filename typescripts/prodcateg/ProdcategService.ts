/// <reference path="./../../typings/tsd.d.ts" />

module backApp{
    export interface IProdcateg{
        id : number;
        code: string;
        type: string;
        rights: Array<string>;
        roles: Array<string>;
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