/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IRight{
        id : number;
        name: string;
        parent:string;
        code:string;
        type: string;
    }

    interface IRole{
        id : number;
        code: string;
        type: string;
    }
    class RoleController{
        public error:string;
        public _formData : IRole;
        public orderedRights = [];
        public main = false;
        public isCollapsed = [];

        
        constructor(private scope, private location, private http, private window ,public commonService, private localStorageService,private roleService,private roleInit,private rights) {
            this.orderRights(rights);
            if(!roleService.roles){
                this.initRoles();
            }
            if(roleInit){
                this._formData = JSON.parse(roleInit);
            }
        }
        public orderRights(rights){
            if(!this.roleService.orderedRights && rights) {
                for (var i = 0; i < rights.length; i++) {
                    if (rights[i].type == "group") {
                        rights[i].rights = [];
                        this.orderedRights.push(rights[i]);
                    }
                }
                for (var y = 0; y < this.orderedRights.length; y++) {
                    for (var i = 0; i < rights.length; i++) {
                        if (rights[i].type == "subRight" && rights[i].parent == this.orderedRights[y].code) {
                            this.orderedRights[y].rights.push(rights[i])
                        }
                    }
                }
                this.roleService.orderedRights = this.orderedRights;
            }
        }

        public toggleCollapse(id){
            var index = this.isCollapsed.indexOf(id);
            if(index >=0){
                this.isCollapsed.splice(index, 1);
            }else{
                this.isCollapsed.push(id);
            }
        }

        public save(){
            var self = this;
            var data = JSON.stringify(this._formData);
            self.http.post('/admin/role/save', data).then(function successCallback(response) {
                self.roleService.roles.push(JSON.parse(response.data));
                self.location.path('/admin/role')
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }

        public initRoles(){

            var self = this;

            self.http.get('/admin/role/list').then(function successCallback(response) {
                self.roleService.roles = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('RoleController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService','RoleService','roleInit','rights', RoleController]);
}