/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ProductController = (function () {
        function ProductController(scope, http, window, productService, prodcategs, product, products, discounts) {
            this.scope = scope;
            this.http = http;
            this.window = window;
            this.productService = productService;
            this.prodcategs = prodcategs;
            this.product = product;
            this.products = products;
            this.discounts = discounts;
            this._formData = {};
            if (products) {
                productService.products = JSON.parse(products);
            }
            if (product) {
                this._formData = angular.fromJson(product);
                this.categ = this._formData.categ;
                for (var i = 0; i < prodcategs.length; i++) {
                    if (prodcategs[i].url == this.categ) {
                        this.setInputs(prodcategs[i].inputs);
                    }
                }
            }
        }
        ProductController.prototype.setInputs = function (ids) {
            var self = this;
            var data = angular.toJson(ids);
            this.http.post('/admin/product/getInputs', data).then(function successCallback(response) {
                self.inputs = JSON.parse(response.data);
            }, function errorCallback(response) {
                self.error = response.data;
            });
        };
        ProductController.prototype.save = function (back) {
            var self = this;
            this._formData.categ = this.categ;
            console.log(this._formData);
            var data = angular.toJson(this._formData);
            this.http.post('/admin/product/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/product', '_self');
                }
                else {
                    self.window.open('/admin/product/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        return ProductController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('ProductController', ['$scope', '$http', '$window', 'ProductService', 'prodcategs', 'product', 'products', 'discounts', ProductController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ProductController.js.map