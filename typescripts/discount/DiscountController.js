/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var DiscountController = (function () {
        function DiscountController(scope, http, window, discountService, discounts, discount) {
            this.scope = scope;
            this.http = http;
            this.window = window;
            this.discountService = discountService;
            this.discounts = discounts;
            this.discount = discount;
            this._formData = {};
            this.initDiscounts();
        }
        DiscountController.prototype.initDiscounts = function () {
            if (!this.discountService.discounts) {
                this.discountService.discounts = angular.fromJson(this.discounts);
            }
            if (this.discount) {
                this._formData = angular.fromJson(this.discount);
            }
        };
        DiscountController.prototype.save = function (back) {
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/discount/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/discount', '_self');
                }
                else {
                    self.window.open('/admin/discount/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        return DiscountController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('DiscountController', ['$scope', '$http', '$window', 'DiscountService', 'discounts', 'discount', DiscountController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=DiscountController.js.map