/// <reference path="./../../typings/tsd.d.ts" />

module backApp{
    interface IRight{
        id : number;
        code: string;
        categ: string;
        types: Array<string>;
    }

    export class RightService{
        public rights : Array<IRight>;

        constructor(rootScope,http,localStorageService){

        }
    }
    var backApp = angular.module('backApp');


    backApp.service('RightService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new RightService(rootScope,http,localStorageService);
    }]);
}