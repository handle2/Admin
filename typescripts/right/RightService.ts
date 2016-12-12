/// <reference path="./../../typings/tsd.d.ts" />

module backApp{
    interface IRoute{
        action:string;
        controller:string;
    }
    interface IRight{
        id : number;
        name: string;
        code: string;
        type: string;
        parent: string;
        actions: Array<IRoute>;
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