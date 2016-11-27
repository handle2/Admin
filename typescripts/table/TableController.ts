/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    class TableController{

        public keys : Array<string>;

        constructor(private scope,private http) {
            var self = this;
            if(!scope.keys){
                this.scope.$watch('rows', (newValue) => {
                    self.readKeys(newValue);
                });
            }else{
                this.keys = scope.keys;
            }
        }

        private readKeys(stuff){
            if(!this.keys && stuff){
                var object = stuff[0];
                var keys = Object.getOwnPropertyNames(object);
                var index = keys.indexOf("$$hashKey");
                if(index >= 0){
                    keys.splice(index, 1);
                }
                this.keys = keys;
            }
        }
        
        public delete(type,id){
            var self = this;
            this.http.post('/admin/'+type+'/delete',id).then(function (response) {
                for(var i = 0;i< self.scope.rows.length;i++){
                    if( self.scope.rows[i].id == id){
                        self.scope.rows.splice(i, 1);
                    }
                }
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('TableController', ['$scope','$http', TableController]);

    backApp.directive('smartTable', function() {
        return {
            templateUrl : '/modules/Admin/views/directives/table/smart-table.html',
            controller : 'TableController',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope : {
                rows : '=',
                count : '=',
                type : '=',
                keys : '='
            }
        };
    });
}