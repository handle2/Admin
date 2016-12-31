/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IProductController{
        save(back:boolean):void;
        setInputs(ids:Array<number>):void;
    }

    class ProductController implements IProductController{
        public _formData : any = {};
        public categ;
        public error;
        public inputs;

        constructor(private scope, private http, private window, private productService, public prodcategs, public product, public products){

            if(products){
                productService.products = JSON.parse(products);
            }
            if(product){
                this._formData = angular.fromJson(product);
                this.categ = this._formData.categ;
                for(var i = 0;i<prodcategs.length;i++){
                    if(prodcategs[i].url == this.categ){
                        this.setInputs(prodcategs[i].inputs);
                    }
                }
            }
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

        public save(back){
            var self = this;
            this._formData.categ = this.categ;
            console.log(this._formData);
            var data = angular.toJson(this._formData);
            this.http.post('/admin/product/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/product', '_self');
                }else{
                    self.window.open('/admin/product/edit/'+id, '_self');
                }
            },function (response) {
                
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('ProductController', ['$scope', '$http','$window','ProductService','prodcategs','product','products', ProductController]);
}