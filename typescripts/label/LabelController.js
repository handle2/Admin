/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var LabelController = (function () {
        function LabelController(scope, http, window, labelService, label, labels) {
            this.scope = scope;
            this.http = http;
            this.window = window;
            this.labelService = labelService;
            this.label = label;
            this.labels = labels;
            this._formData = {};
            this.init();
        }
        LabelController.prototype.init = function () {
            if (this.label) {
                this._formData = this.label;
            }
            if (!this.labelService.labels) {
                this.labelService.labels = this.labels;
            }
        };
        LabelController.prototype.save = function (back) {
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/label/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/label', '_self');
                }
                else {
                    self.window.open('/admin/label/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        return LabelController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('LabelController', ['$scope', '$http', '$window', 'LabelService', 'label', 'labels', LabelController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=LabelController.js.map