/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IDiscountController{
        initDiscounts():void;
        save(back:boolean):void;
    }
    
    class DiscountController implements IDiscountController{
        public _formData : any = {};

        constructor(private scope,private http, private window, private discountService, private discounts, private discount){
            this.initDiscounts();
        }

        public initDiscounts():void{
            if(!this.discountService.discounts){
                this.discountService.discounts = angular.fromJson(this.discounts);
            }

            if(this.discount){
                this._formData = angular.fromJson(this.discount);
            }
        }

        public save(back:boolean):void{
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/discount/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/discount', '_self');
                }else{
                    self.window.open('/admin/discount/edit/'+id, '_self');
                }
            },function (response) {

            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('DiscountController', ['$scope', '$http','$window','DiscountService','discounts','discount', DiscountController]);
}