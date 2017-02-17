/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var ContentController = (function () {
        function ContentController(scope, location, http, window, contentService, content, contents, labels) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.contentService = contentService;
            this.content = content;
            this.contents = contents;
            this.labels = labels;
            this.accordion = {
                main: false,
                pictures: true,
                text: true,
                labels: true
            };
            this.frontLabels = [];
            this.langData = {};
            this._formData = {
                langs: {}
            };
            if (content) {
                this._formData = content;
                if (this._formData.labels) {
                    for (var i = 0; i < this._formData.labels.length; i++) {
                        this.frontLabels[this._formData.labels[i]] = true;
                    }
                }
            }
            if (contents && !contentService.contents) {
                contentService.contents = contents;
            }
        }
        ContentController.prototype.toggleLabel = function (code) {
            if (!this._formData.labels) {
                this._formData.labels = [];
            }
            var index = this._formData.labels.indexOf(code);
            if (index > -1) {
                this.frontLabels[code] = false;
                this._formData.labels.splice(index, 1);
            }
            else {
                this.frontLabels[code] = true;
                this._formData.labels.push(code);
            }
        };
        ContentController.prototype.save = function (back) {
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/content/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/content', '_self');
                }
                else {
                    self.window.open('/admin/content/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        return ContentController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('ContentController', ['$scope', '$location', '$http', '$window', 'ContentService', 'content', 'contents', 'labels', ContentController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=ContentController.js.map