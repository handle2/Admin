/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var LanguageController = (function () {
        function LanguageController(scope, location, http, window, languageService, language, languages) {
            this.scope = scope;
            this.location = location;
            this.http = http;
            this.window = window;
            this.languageService = languageService;
            this.language = language;
            this.languages = languages;
            this._formData = {};
            if (language) {
                this._formData = language;
            }
            if (languages && !languageService.languages) {
                languageService.languages = languages;
            }
        }
        LanguageController.prototype.save = function (back) {
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/language/save', data).then(function (response) {
                var id = angular.fromJson(response.data);
                if (back) {
                    self.window.open('/admin/language', '_self');
                }
                else {
                    self.window.open('/admin/language/edit/' + id, '_self');
                }
            }, function (response) {
            });
        };
        return LanguageController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('LanguageController', ['$scope', '$location', '$http', '$window', 'LanguageService', 'language', 'languages', LanguageController]);
})(backApp || (backApp = {}));
//# sourceMappingURL=LanguageController.js.map