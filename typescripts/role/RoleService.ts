/// <reference path="./../../typings/tsd.d.ts" />

module backApp{
    export interface IRole{
        id : number;
        code: string;
        type: string;
        rights: Array<string>;
        roles: Array<string>;
    }

    export class RoleService{
        public roles : Array<IRole> = [];
        public orederedRights;

        constructor(rootScope,http,localStorageService){

        }
    }
    var backApp = angular.module('backApp');


    backApp.service('RoleService', ['$rootScope','$http','localStorageService', function(rootScope,http,localStorageService){
        return new RoleService(rootScope,http,localStorageService);
    }]);
}