/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class TableController{

        public keys : Array<string>;

        constructor(private scope, private location, private http) {
            var self = this;
            this.scope.$watch('rows', (newval) => {
                    self.read(newval);
            });
        }

        public read(stuff){
            if(!this.keys && stuff){
                var object = stuff[0];
                var keys = Object.getOwnPropertyNames(object);
                this.keys = keys;
            }
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('TableController', ['$scope', '$location', '$http', TableController]);

    backApp.directive('smartTable', function() {
        return {
            templateUrl : '/modules/Admin/views/directives/table/smart-table.html',
            controller : 'TableController',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope : {
                count : '=',
                rows : '='
            }
        };
    });
}