/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IRole{
        id : number;
        code: string;
        type: string;
        rights: Array<string>;
        roles: Array<string>;
        langs : Object;
    }

    interface IRoleController{
        toggleRight(code:string):void;
        toggleRole(code:string):void;
        orderRights(rights:Array<any>):void;
        toggleCollapse(id:number):void;
        save():void;
        initRoles():void;
    }
    class RoleController implements IRoleController{
        public error:string;
        public _formData : IRole = {
            id:null,
            code:null,
            type:null,
            rights : [],
            roles: [],
            langs: {}
        };
        public orderedRights = [];
        public main = false;
        public roles = false;
        public isCollapsed = [];
        
        public rightsObject = {};

        public rolesObject = {};
        
        constructor(private scope, private location, private http, private window ,public commonService, private localStorageService,private roleService,private roleInit,private rights) {
            this.orderRights(rights);
            if(!roleService.roles || roleService.roles.length == 0){
                this.initRoles();
            }
            if(roleInit){
                this._formData = roleInit;
                for(var k = 0;k < this._formData.rights.length;k++){
                    this.rightsObject[this._formData.rights[k]] = true;
                }

                for(var k = 0;k < this._formData.roles.length;k++){
                    this.rolesObject[this._formData.roles[k]] = true;
                }
                if(!this._formData.langs){
                    this._formData.langs = {};
                }
            }
        }
        
        public toggleRight(code:string){
            var index = this._formData.rights.indexOf(code);
            if(index===-1){
                this._formData.rights.push(code);
            }else{
                this._formData.rights.splice(index,1);
            }
        }

        public toggleRole(code:string){
            var index = this._formData.roles.indexOf(code);
            if(index===-1){
                this._formData.roles.push(code);
            }else{
                this._formData.roles.splice(index,1);
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
            var data = angular.toJson(this._formData);
            self.http.post('/admin/role/save', data).then(function successCallback(response) {
                self.roleService.roles.push(response.data);
                self.commonService.reloadUserData();
                self.location.path('/admin/role')
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }

        public initRoles(){

            var self = this;

            self.http.get('/admin/role/list').then(function successCallback(response) {
                self.roleService.roles = response.data;
            }, function errorCallback(response) {
                self.error = response.data;
            });

        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('RoleController', ['$scope', '$location', '$http', '$window','CommonService','localStorageService','RoleService','roleInit','rights', RoleController]);
}