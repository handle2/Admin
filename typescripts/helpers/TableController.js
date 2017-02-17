/// <reference path="./../../typings/tsd.d.ts" />
var backApp;
(function (backApp_1) {
    var TableController = (function () {
        function TableController(scope, http, commonService) {
            this.scope = scope;
            this.http = http;
            this.commonService = commonService;
            this.options = [];
            var self = this;
            if (scope.options) {
                this.options = scope.options;
            }
            if (!scope.keys) {
                this.scope.$watch('rows', function (newValue) {
                    self.readKeys(newValue);
                });
            }
            else {
                this.keys = scope.keys;
            }
        }
        TableController.prototype.readKeys = function (stuff) {
            if (!this.keys && stuff) {
                var object = stuff[0];
                var keys = Object.getOwnPropertyNames(object);
                var index = keys.indexOf("$$hashKey");
                if (index >= 0) {
                    keys.splice(index, 1);
                }
                this.keys = keys;
            }
        };
        TableController.prototype.delete = function (type, id) {
            var self = this;
            this.http.post('/admin/' + type + '/delete', id).then(function (response) {
                for (var i = 0; i < self.scope.rows.length; i++) {
                    if (self.scope.rows[i].id == id) {
                        self.scope.rows.splice(i, 1);
                    }
                }
            });
        };
        TableController.prototype.checkPerm = function (action) {
            if (action == 'delete') {
                return this.commonService.hasPermission(this.scope.delete);
            }
            if (action == 'save') {
                return this.commonService.hasPermission(this.scope.update);
            }
            return this.commonService.hasPermission(action);
        };
        return TableController;
    }());
    var backApp = angular.module('backApp');
    backApp.controller('TableController', ['$scope', '$http', 'CommonService', TableController]);
    backApp.directive('smartTable', function () {
        return {
            templateUrl: '/modules/Admin/views/directives/helpers/smart-table.html',
            controller: 'TableController',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope: {
                rows: '=',
                count: '=',
                type: '=',
                keys: '=',
                delete: '=',
                update: '=',
                options: '='
            }
        };
    });
})(backApp || (backApp = {}));
//# sourceMappingURL=TableController.js.map