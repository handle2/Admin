/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var RoleController = (function () {
        function RoleController(scope, location, http, window, commonService, localStorageService, roleService, roleInit, rights) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.commonService = commonService;
            this.localStorageService = localStorageService;
            this.roleService = roleService;
            this.roleInit = roleInit;
            this.rights = rights;
            this._formData = {
                id: null,
                code: null,
                type: null,
                rights: [],
                roles: [],
                langs: {}
            };
            this.orderedRights = [];
            this.main = false;
            this.roles = false;
            this.isCollapsed = [];
            this.rightsObject = {};
            this.rolesObject = {};
            this.orderRights(rights);
            if (!roleService.roles || roleService.roles.length == 0) {
                this.initRoles();
            }
            if (roleInit) {
                this._formData = JSON.parse(roleInit);
                for (var k = 0; k < this._formData.rights.length; k++) {
                    this.rightsObject[this._formData.rights[k]] = true;
                }
                for (var k = 0; k < this._formData.roles.length; k++) {
                    this.rolesObject[this._formData.roles[k]] = true;
                }
                if (!this._formData.langs) {
                    this._formData.langs = {};
                }
            }
        }
        RoleController.prototype.toggleRight = function (code) {
            var index = this._formData.rights.indexOf(code);
            if (index === -1) {
                this._formData.rights.push(code);
            }
            else {
                this._formData.rights.splice(index, 1);
            }
        };
        RoleController.prototype.toggleRole = function (code) {
            var index = this._formData.roles.indexOf(code);
            if (index === -1) {
                this._formData.roles.push(code);
            }
            else {
                this._formData.roles.splice(index, 1);
            }
        };
        RoleController.prototype.orderRights = function (rights) {
            if (!this.roleService.orderedRights && rights) {
                for (var i = 0; i < rights.length; i++) {
                    if (rights[i].type == "group") {
                        rights[i].rights = [];
                        this.orderedRights.push(rights[i]);
                    }
                }
                for (var y = 0; y < this.orderedRights.length; y++) {
                    for (var i = 0; i < rights.length; i++) {
                        if (rights[i].type == "subRight" && rights[i].parent == this.orderedRights[y].code) {
                            this.orderedRights[y].rights.push(rights[i]);
                        }
                    }
                }
                this.roleService.orderedRights = this.orderedRights;
            }
        };
        RoleController.prototype.toggleCollapse = function (id) {
            var index = this.isCollapsed.indexOf(id);
            if (index >= 0) {
                this.isCollapsed.splice(index, 1);
            }
            else {
                this.isCollapsed.push(id);
            }
        };
        RoleController.prototype.save = function () {
            var self = this;
            var data = JSON.stringify(this._formData);
            self.http.post('/admin/role/save', data).then(function successCallback(response) {
                self.roleService.roles.push(JSON.parse(response.data));
                self.commonService.reloadUserData();
                self.location.path('/admin/role');
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        RoleController.prototype.initRoles = function () {
            var self = this;
            self.http.get('/admin/role/list').then(function successCallback(response) {
                self.roleService.roles = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        return RoleController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('RoleController', ['$scope', '$location', '$http', '$window', 'CommonService', 'localStorageService', 'RoleService', 'roleInit', 'rights', RoleController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=RoleController.js.map