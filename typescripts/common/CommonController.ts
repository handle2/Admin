/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ICommonController{
        changeLang(langKey):void;
        hasPermission(code):boolean;
    }

    class CommonController implements ICommonController{

        public defaultLang : string;

        constructor(private root , private scope, private window, private location, public commonService,public translate, private localStorageService) {



        }

        public langInit(key){
            this.commonService.defaultLang = key;
            if(!this.localStorageService.get('lang')){
                this.localStorageService.set('lang',key);
                this.translate.use(this.localStorageService.get('lang'));
            }else{
                this.translate.use(this.localStorageService.get('lang'));
            }

            this.setLangSession(this.localStorageService.get('lang'));
            this.root.language = this.localStorageService.get('lang');
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
    
}