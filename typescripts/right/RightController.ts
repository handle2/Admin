/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class RightController{
        public error:string;
        
        constructor(private scope, private location, private http, private window ,public commonService, private localStorageService,private rightService) {
            if(!rightService.rights){
                this.initRights();
            }
        }

        public initRights(){
            var self = this;
            if(!self.commonService.user){
                self.commonService.getLoggedUser().then(function (response) {
                     this.commonService.user = JSON.parse(response.data);
                     self.http.get('/admin/right/getRights', this.commonService.user.level).then(function successCallback(response) {
                         self.rightService.rights = JSON.parse(response.data);
                     }, function errorCallback(response) {
                     self.error = response.data;
                     });
                });
            }else{
                self.http.get('/admin/right/getRights', this.commonService.user.level).then(function successCallback(response) {
                    self.rightService.rights = JSON.parse(response.data);
                }, function errorCallback(response) {
                    self.error = response.data;
                });
            }
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('RightController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService','RightService', RightController]);
}