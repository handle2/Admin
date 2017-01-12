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

        public changeLang(langKey){
            console.log('dafuq',langKey);
            this.translate.use(langKey);
        }

        public logout(){
            console.log('common dafuq');
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('CommonController', ['$scope', 'CommonService','$translate', CommonController]);

    backApp.directive('changeLanguage', function () {
        return {
            restrict: 'E',
            controller: 'CommonController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/helpers/change-language.html'
        }
    });
}