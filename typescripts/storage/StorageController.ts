/// <reference path="./../../typings/tsd.d.ts" />
module backApp {
    interface IStorageController{
    }

    class StorageController implements IStorageController{
        public _formData : any = {};

        constructor(private scope,private http, private window,private storageService,private storage,private storages){
            this.init();
        }

        public init(){
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
    }

    var backApp = angular.module('backApp');
    backApp.controller('StorageController', ['$scope', '$http','$window','StorageService','storage','storages', StorageController]);
}