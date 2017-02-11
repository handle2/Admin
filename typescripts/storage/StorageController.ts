/// <reference path="./../../typings/tsd.d.ts" />
module backApp {

    interface IModalController{
        addSelected(product:any):void;
    }

    class ModalController implements IModalController{
        public selectedItems = [];

        public prodCheckbox = [];

        constructor(public scope,public products, public selectedProducts ,close){

            if(selectedProducts){
                this.selectedItems = selectedProducts;
                for(var i = 0;i<selectedProducts.length;i++){
                    this.prodCheckbox[selectedProducts[i].id] = true;
                }
            }
        }

        public addSelected(product){

            var prodObj = {
                id: product.id,
                name: product.name,
                price: 0,
                quantity: 0
            };

            var index = this.checkById(product.id);
            if(index>-1){
                this.selectedItems.splice(index, 1);
            }else{
                this.selectedItems.push(prodObj);
            }

        }

        public checkById(id):number{
            var index = -1;
            for(var i = 0;i<this.selectedItems.length;i++){
                if(this.selectedItems[i].id == id){
                    index = i;
                    break;
                }
            }
            return index;
        }
    }

    interface IStorageController{
        addProducts():void;
    }

    class StorageController implements IStorageController{
        public _formData : any = {
            products : []
        };

        public selectedItems = [];

        constructor(private scope, private modalService, private http, private window,private storageService,private storage,private storages,public products){
            this.init();
        }

        public initProducts(type){

            if(type == 'basic'){
                for(var i = 0;i<this.products.length; i++){
                    var prodObj = {
                        id: this.products[i].id,
                        name: this.products[i].name,
                        price: 0,
                        quantity: 0
                    };
                    this._formData.products.push(prodObj);
                }
            } else {
                this._formData.products = [];
            }
        }

        private init(){
            if(this.storage){
                this._formData = this.storage;
            }
            if(!this.storageService.storages){
                this.storageService.storages = this.storages;
            }
        }

        public save(back:boolean):void{
            var self = this;
            var data = angular.toJson(this._formData);
            this.http.post('/admin/storage/save',data).then(function (response) {
                var id = angular.fromJson(response.data);
                if(back){
                    self.window.open('/admin/storage', '_self');
                }else{
                    self.window.open('/admin/storage/edit/'+id, '_self');
                }
            },function (response) {

            });
        }

        public addProducts(){
            var self = this;
            this.modalService.showModal({
                templateUrl: "/modules/Admin/views/directives/modals/add-products.html",
                controller: 'ModalController',
                controllerAs : "ctrl",
                inputs:{
                    'products' : self.products,
                    'selectedProducts' : self._formData.products
                }
            }).then(function(modal) {

                modal.element.modal();

                self._formData.products = modal.controller.selectedItems;
            });
        }
    }

    var backApp = angular.module('backApp');
    backApp.controller('ModalController',['$scope','products','selectedProducts','close',ModalController]);
    backApp.controller('StorageController', ['$scope','ModalService', '$http','$window','StorageService','storage','storages','products', StorageController]);
}