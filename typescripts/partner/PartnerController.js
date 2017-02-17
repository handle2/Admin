/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var PartnerOption = (function () {
        function PartnerOption() {
        }
        return PartnerOption;
    }());
    var PartnerController = (function () {
        function PartnerController(scope, location, http, window, partnerService, partner, partners, roles) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.partnerService = partnerService;
            this.partner = partner;
            this.partners = partners;
            this.roles = roles;
            this.options = [];
            this._formData = {};
            if (partner) {
                this._formData = partner;
            }
            if (partners && !partnerService.partners) {
                this.initOptions();
                partnerService.partners = partners;
            }
        }
        PartnerController.prototype.initOptions = function () {
            var self = this;
            var option = new PartnerOption();
            option.name = "send_new_password";
            option.method = function (id) {
                self.sendPassword(id);
            };
            option.permission = "partner.password";
            option.buttonclass = "btn btn-info";
            this.options.push(option);
        };
        PartnerController.prototype.sendPassword = function (id) {
            this.http.get('/admin/partner/sendPassword/' + id).then(function (response) {
                alert(angular.fromJson(response.data));
            }, function (response) {
            });
        };
        PartnerController.prototype.save = function (back) {
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/partner/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/partner', '_self');
                }
                else {
                    self.window.open('/admin/partner/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        return PartnerController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('PartnerController', ['$scope', '$location', '$http', '$window', 'PartnerService', 'partner', 'partners', 'roles', PartnerController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=PartnerController.js.map