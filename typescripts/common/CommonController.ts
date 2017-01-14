/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ICommonController{
    }

    class CommonController implements ICommonController{


        constructor(private root , private scope,public commonService,public translate, private localStorageService) {

            if(!localStorageService.get('lang')){
                localStorageService.set('lang','hu');
                translate.use(localStorageService.get('lang'));
            }else{
                translate.use(localStorageService.get('lang'));
            }

            root.language = localStorageService.get('lang');

        }

        public hasPermission(code){
            return this.commonService.hasPermission(code);
        }

        public changeLang(langKey){

            this.localStorageService.set('lang',langKey);
            this.translate.use(langKey);

            this.root.language = this.localStorageService.get('lang');

        }

        public logout(){
            console.log('common dafuq');
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('CommonController', ['$rootScope','$scope', 'CommonService','$translate', 'localStorageService', CommonController]);

    backApp.directive('changeLanguage', function () {
        return {
            restrict: 'E',
            controller: 'CommonController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/helpers/change-language.html'
        }
    });
}