/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ICommonController{
        changeLang(langKey):void;
        hasPermission(code):boolean;
    }

    class CommonController implements ICommonController{


        constructor(private root , private scope, private window, private location, public commonService,public translate, private localStorageService) {

            if(!localStorageService.get('lang')){
                localStorageService.set('lang','hu');
                translate.use(localStorageService.get('lang'));
            }else{
                translate.use(localStorageService.get('lang'));
            }

            this.setLangSession(localStorageService.get('lang'));
            root.language = localStorageService.get('lang');

        }

        public hasPermission(code){
            return this.commonService.hasPermission(code);
        }

        public changeLang(langKey){

            if(this.localStorageService.get('lang')!=langKey){
                this.localStorageService.set('lang',langKey);
                this.translate.use(langKey);
                this.setLangSession(langKey);
                this.root.language = this.localStorageService.get('lang');
            }

            var currentUrl =  this.location.path();
            this.window.open(currentUrl, '_self');
        }

        private setLangSession(code){
            this.commonService.http.post('/admin/language/setLang',angular.toJson(code));
        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('CommonController', ['$rootScope','$scope','$window','$location', 'CommonService','$translate', 'localStorageService', CommonController]);

    backApp.directive('changeLanguage', function () {
        return {
            restrict: 'E',
            controller: 'CommonController',
            controllerAs: 'ctrl',
            templateUrl: '/modules/Admin/views/directives/helpers/change-language.html'
        }
    });
}