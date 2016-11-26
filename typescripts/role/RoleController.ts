/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IRole{
        id : number;
        code: string;
        type: string;
    }
    class RoleController{
        public error:string;
        public _formData : IRole;
        
        constructor(private scope, private location, private http, private window ,public commonService, private localStorageService,private roleService,private id) {
            if(!roleService.roles){
                this.initRoles();
            }
        }

        public save(){
            this._formData.id = this.id;
            console.log("this._formDat",this._formData);
            var self = this;
            var data = JSON.stringify(this._formData);
            self.http.post('/admin/role/save', data).then(function successCallback(response) {
                console.log('response',response);
                self.roleService.roles.push(JSON.parse(response.data));
                self.location.path('/admin/role')
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }

        public initRoles(){

            var self = this;
            if(!self.commonService.user){
                self.commonService.getLoggedUser().then(function (response) {
                     this.commonService.user = JSON.parse(response.data);
                     self.http.post('/admin/role/getRoles', this.commonService.user.level).then(function successCallback(response) {
                         self.roleService.roles = JSON.parse(response.data);
                     }, function errorCallback(response) {
                     self.error = response.data;
                     });
                });
            }else{
                self.http.post('/admin/role/getRoles', this.commonService.user.level).then(function successCallback(response) {
                    self.roleService.roles = JSON.parse(response.data);
                }, function errorCallback(response) {
                    self.error = response.data;
                });
            }
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('RoleController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService','RoleService','id', RoleController]);
}