/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IProdcateg{

    }

    interface IProdcategController{
        save():void;
        initProdcateg():void;
    }
    class ProdcategController implements IProdcategController{
        public error:string;
        public _formData : IProdcateg = {

        };


        constructor(private scope, private location, private http, private window , private localStorageService,private prodcategService) {
            if(!prodcategService.prodcategs || prodcategService.prodcategs.length == 0){
                this.initProdcateg();
            }
        }

        public initProdcateg(){

        }

        public save(){
            var self = this;
            var data = JSON.stringify(this._formData);
            self.http.post('/admin/prodcateg/save', data).then(function successCallback(response) {
               
            }, function errorCallback(response) {
                self.error = response.data;
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('ProdcategController', ['$scope', '$location', '$http', '$window','localStorageService','ProdcategService', ProdcategController]);
}