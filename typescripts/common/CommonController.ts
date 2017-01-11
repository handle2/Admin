/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ICommonController{
    }

    class CommonController implements ICommonController{


        constructor(private scope,public commonService,public translate) {
        }

        public hasPermission(code){
            return this.commonService.hasPermission(code);
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('CommonController', ['$scope', 'CommonService','$translate', CommonController]);
}