/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IMasterController{
    }

    class MasterController implements IMasterController{

        constructor(private root , private scope, public commonService, private localStorageService) {

        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('MasterController', ['$rootScope','$scope', 'CommonService', 'localStorageService', MasterController]);

}