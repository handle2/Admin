/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var RightController = (function () {
        function RightController(scope, location, http, window, commonService, localStorageService, rightService, rightInit) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.commonService = commonService;
            this.localStorageService = localStorageService;
            this.rightService = rightService;
            this.rightInit = rightInit;
            this.subRights = [];
            this.success = [];
            if (!rightService.rights) {
                this.initRights("group");
            }
            if (rightInit) {
                var self = this;
                this._formData = JSON.parse(rightInit);
                this.http.get('/admin/right/getSub/' + this._formData.code).then(function successCallback(response) {
                    self.subRights = JSON.parse(response.data);
                });
            }
        }
        RightController.prototype.initRights = function (type) {
            var self = this;
            self.http.get('/admin/right/list/' + type).then(function successCallback(response) {
                self.rightService.rights = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        RightController.prototype.save = function () {
            var self = this;
            var data = JSON.stringify(this._formData);
            this.http.post('/admin/right/save', data).then(function (response) {
                var newRight = JSON.parse(response.data);
                self.saveSubs(newRight.code);
                if (!self._formData.id) {
                    self.rightService.rights.push(newRight);
                }
                else {
                    for (var i = 0; i < self.rightService.rights.length; i++) {
                        if (newRight.id == self.rightService.rights[i].id) {
                            self.rightService.rights.splice(i, 1);
                            self.rightService.rights.push(newRight);
                        }
                    }
                }
                self.location.path('/admin/right');
            });
        };
        RightController.prototype.addRight = function () {
            this.subRights.push({ id: null, code: null, type: null, name: null });
        };
        RightController.prototype.addRoute = function (sub) {
            sub.actions.push({ controller: "", action: "" });
        };
        RightController.prototype.saveSubs = function (parentCode) {
            var self = this;
            var newRights = [];
            this.success = [];
            for (var i = 0; i < this.subRights.length; i++) {
                this.subRights[i].type = 'subRight';
                this.subRights[i].parent = parentCode;
                if (this.subRights[i].code.indexOf(parentCode) === -1) {
                    this.subRights[i].code = parentCode + '.' + this.subRights[i].code;
                }
                var data = angular.toJson(this.subRights[i]);
                this.http.post('/admin/right/save', data).then(function (response) {
                    var res = JSON.parse(response.data);
                    newRights.push(res);
                    self.success.push("Sikeres jogosultság mentés:" + res.code);
                });
            }
            this.subRights = newRights;
        };
        RightController.prototype.removeSub = function (sub) {
            console.log(sub.$$hashKey, this.subRights);
            if (sub.id) {
                this.http.post('/admin/right/delete', sub.id);
            }
            for (var i = 0; i < this.subRights.length; i++) {
                if (sub.$$hashKey == this.subRights[i].$$hashKey) {
                    this.subRights.splice(i, 1);
                }
            }
        };
        return RightController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('RightController', ['$scope', '$location', '$http', '$window', 'CommonService', 'localStorageService', 'RightService', 'rightInit', RightController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=RightController.js.map