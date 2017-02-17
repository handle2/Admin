/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ModalController = (function () {
        function ModalController(scope, products, selectedProducts, close) {
            this.scope = scope;
            this.products = products;
            this.selectedProducts = selectedProducts;
            this.selectedItems = [];
            this.prodCheckbox = [];
            if (selectedProducts) {
                this.selectedItems = selectedProducts;
                for (var i = 0; i < selectedProducts.length; i++) {
                    this.prodCheckbox[selectedProducts[i].id] = true;
                }
            }
        }
        ModalController.prototype.addSelected = function (product) {
            var prodObj = {
                id: product.id,
                name: product.name,
                price: 0,
                quantity: 0
            };
            var index = this.checkById(product.id);
            if (index > -1) {
                this.selectedItems.splice(index, 1);
            }
            else {
                this.selectedItems.push(prodObj);
            }
        };
        ModalController.prototype.checkById = function (id) {
            var index = -1;
            for (var i = 0; i < this.selectedItems.length; i++) {
                if (this.selectedItems[i].id == id) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        return ModalController;
    }());
    var StorageController = (function () {
        function StorageController(scope, modalService, http, window, storageService, storage, storages, products) {
            this.scope = scope;
            this.modalService = modalService;
            this.http = http;
            this.window = window;
            this.storageService = storageService;
            this.storage = storage;
            this.storages = storages;
            this.products = products;
            this._formData = {
                products: []
            };
            this.selectedItems = [];
            this.init();
        }
        StorageController.prototype.initProducts = function (type) {
            if (type == 'basic') {
                for (var i = 0; i < this.products.length; i++) {
                    var prodObj = {
                        id: this.products[i].id,
                        name: this.products[i].name,
                        price: 0,
                        quantity: 0
                    };
                    this._formData.products.push(prodObj);
                }
            }
            else {
                this._formData.products = [];
            }
        };
        StorageController.prototype.init = function () {
            if (this.storage) {
                this._formData = this.storage;
            }
            if (!this.storageService.storages) {
                this.storageService.storages = this.storages;
            }
        };
        StorageController.prototype.save = function (back) {
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/storage/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/storage', '_self');
                }
                else {
                    self.window.open('/admin/storage/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        StorageController.prototype.addProducts = function () {
            var self = this;
            this.modalService.showModal({
                templateUrl: "/modules/Admin/views/directives/modals/add-products.html",
                controller: 'ModalController',
                controllerAs: "ctrl",
                inputs: {
                    'products': self.products,
                    'selectedProducts': self._formData.products
                }
            }).then(function (modal) {
                modal.element.modal();
                self._formData.products = modal.controller.selectedItems;
            });
        };
        return StorageController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('ModalController', ['$scope', 'products', 'selectedProducts', 'close', ModalController]);
    backApp.controller('StorageController', ['$scope', 'ModalService', '$http', '$window', 'StorageService', 'storage', 'storages', 'products', StorageController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=StorageController.js.map