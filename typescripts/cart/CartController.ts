/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface ICartController{

    }

    class CartController implements ICartController{

        constructor(private scope, private location, private http, private window ,public cartService,public cart, public carts) {
            console.log('dafaq');
        }

        public save(){

        }

    }

    var backApp = angular.module('backApp');
    backApp.controller('CartController', ['$scope', '$location', '$http', '$window','CartService','cart','carts', CartController]);
}