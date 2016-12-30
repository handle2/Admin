/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IProductController{
        save():void;
        setInputs(ids:Array<number>):void;
    }

    class ProductController implements IProductController{
        public _formData : any = {};
        public categ;
        public error;
        public inputs;

        constructor(private scope, private http, private productService, public prodcategs, public product){

        }

        public setInputs(ids){
            var self = this;
            var data = angular.toJson(ids);
            this.http.post('/admin/product/getInputs', data).then(function successCallback(response) {
                self.inputs = JSON.parse(response.data);

            }, function errorCallback(response) {
                self.error = response.data;
            });
        }

        public save(){

        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('ProductController', ['$scope', '$http','ProductService','prodcategs','product', ProductController]);
}