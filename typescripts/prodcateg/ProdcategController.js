/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ProdcategController = (function () {
        function ProdcategController(scope, http, window, localStorageService, prodcategService, prodcateg, prodcategs, extInputs) {
            this.scope = scope;
            this.http = http;
            this.window = window;
            this.localStorageService = localStorageService;
            this.prodcategService = prodcategService;
            this.prodcateg = prodcateg;
            this.prodcategs = prodcategs;
            this.extInputs = extInputs;
            this._formData = {
                id: null,
                name: null,
                url: null,
                inputs: []
            };
            this.inputs = [];
            this.exsInputs = extInputs;
            if (prodcateg) {
                this._formData = JSON.parse(prodcateg);
            }
            if ((!prodcategService.prodcategs || prodcategService.prodcategs.length == 0) && prodcategs) {
                prodcategService.prodcategs = JSON.parse(prodcategs);
            }
            this.initInputs(extInputs);
        }
        ProdcategController.prototype.initInputs = function (extInputs) {
            for (var i = 0; i < this._formData.inputs.length; i++) {
                for (var j = 0; j < extInputs.length; j++) {
                    if (extInputs[j].id == this._formData.inputs[i]) {
                        this.inputs.push(extInputs[j]);
                    }
                }
            }
        };
        ProdcategController.prototype.initProdcateg = function () {
            var self = this;
            self.http.get('/admin/prodcateg/list').then(function successCallback(response) {
                self.prodcategService.prodcategs = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        ProdcategController.prototype.addInput = function () {
            var actId = this.inputs.length > 0 ? this.inputs[this.inputs.length - 1].id + 1 : 1;
            var input = {
                id: actId,
                type: null,
                url: null,
                name: null,
                children: [],
                length: null
            };
            this.inputs.push(input);
        };
        ProdcategController.prototype.removeInput = function (id) {
            for (var i = 0; i < this.inputs.length; i++) {
                if (this.inputs[i].id == id) {
                    this.inputs.splice(i, 1);
                }
            }
            for (var i = 0; i < this._formData.inputs.length; i++) {
                if (this._formData.inputs[i] == id) {
                    this._formData.inputs.splice(i, 1);
                }
            }
        };
        ProdcategController.prototype.addItem = function (input) {
            var seq = input.children.length > 0 ? input.children[input.children.length - 1].seq + 1 : 1;
            var item = {
                seq: seq,
                name: null,
                url: null
            };
            if (!input.url) {
                input.children.push(item);
            }
        };
        ProdcategController.prototype.toggleExtInput = function (input) {
            var index = this._formData.inputs.indexOf(input.id);
            if (index > -1) {
                this._formData.inputs.splice(index, 1);
                for (var i = 0; i < this.inputs.length; i++) {
                    if (this.inputs[i].id == input.id) {
                        this.inputs.splice(i, 1);
                    }
                }
            }
            else {
                this._formData.inputs.push(input.id);
                this.inputs.push(input);
            }
        };
        ProdcategController.prototype.checkActiveInput = function (id) {
            if (this._formData.inputs.indexOf(id) === -1) {
                return true;
            }
            else {
                return false;
            }
        };
        ProdcategController.prototype.save = function (back) {
            var self = this;
            var notInputs = [];
            for (var i = 0; i < this.inputs.length; i++) {
                if (!this.inputs[i].url) {
                    notInputs.push(this.inputs[i]);
                }
            }
            var all = {
                data: this._formData,
                inputs: notInputs
            };
            var data = angular.toJson(all);
            self.http.post('/admin/prodcateg/save', data).then(function successCallback(response) {
                self._formData.inputs.concat(response.data[1]);
                if (back) {
                    self.window.open('/admin/prodcateg', '_self');
                }
                else {
                    self.window.open('/admin/prodcateg/edit/' + response.data[0], '_self');
                }
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        return ProdcategController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('ProdcategController', ['$scope', '$http', '$window', 'localStorageService', 'ProdcategService', 'prodcateg', 'prodcategs', 'extInputs', ProdcategController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ProdcategController.js.map